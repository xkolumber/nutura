"use client";
import React, { useState } from "react";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import { useAuth } from "@/app/auth/Provider";
import { createSlug } from "@/app/components/ProductAdmin";
import StepBack from "@/app/components/StepBack";
import { auth } from "@/app/firebase/config";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { doRevalidate } from "@/app/lib/functionsServer";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [actualizeData, setActualizeData] = useState<ProductFirebase>({
    id: "",
    cena: 0,
    kategorie: [],
    nazov: "",
    nutricna_informacia: [],
    objem: 0,
    odporucane_davkovanie: "",
    pocet_vstrekov: 0,
    popis_produkt: "",
    produkt_foto: "",
    produkt_pozadie: "",
    sklad: 0,
    slug: "",
    upozornenie: "",
    zlozenie: "",
    viditelnost: true,
  });
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };
  const handleFileChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile2(e.target.files?.[0] || null);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setActualizeData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  const handleCheckboxChangeCategory = (productTitle: string) => {
    setSelectedCategory((prevSelected) => {
      const updatedSelected = prevSelected.includes(productTitle)
        ? prevSelected.filter((nazov) => nazov !== productTitle)
        : [...prevSelected, productTitle];

      setActualizeData((prevData) => ({
        ...prevData,
        kategorie: updatedSelected,
      }));

      return updatedSelected;
    });
  };

  const categories = [
    "antioxidanty",
    "klby-a-kosti",
    "fyzicka-aktivita",
    "imunitny-system",
    "zdravie-muza",
    "zdravie-zeny",
    "menstruacia-a-menopauza",
    "spanok",
    "deti",
    "zrely-vek",
    "traviace-tazkosti-a-pooperacne-stavy",
    "zdravie-oci-a-zraku",
    "unava",
    "srdcovo-cievny-system",
    "omega-3-mastne-kyseliny",
    "zelezo",
    "vitamin-b-12",
    "vitamin-d",
    "mineralne-latky",
    "multivitaminy",
    "tehotenstvo-a-dojcenie",
    "stres-a-nervozita",
  ];

  const handleSaveProduct = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let downloadURL = null;
      if (file !== null) {
        const storage = getStorage();
        const storageRef = ref(storage, `produkty/${file.name}`);
        await uploadBytes(storageRef, file);

        downloadURL = await getDownloadURL(storageRef);
      }
      let downloadURL2 = null;
      if (file2 !== null) {
        const storage = getStorage();
        const storageRef = ref(storage, `produkty_pozadie/${file2.name}`);
        await uploadBytes(storageRef, file2);

        downloadURL2 = await getDownloadURL(storageRef);
      }

      const db = getFirestore(auth.app);

      await addDoc(collection(db, "produkty"), {
        cena: actualizeData.cena,
        kategorie: actualizeData.kategorie,
        nazov: actualizeData.nazov,
        objem: actualizeData.objem,
        odporucane_davkovanie: actualizeData.odporucane_davkovanie,
        pocet_vstrekov: Number(actualizeData.pocet_vstrekov),
        popis_produkt: actualizeData.popis_produkt,
        produkt_foto: downloadURL ? downloadURL : actualizeData.produkt_foto,
        produkt_pozadie: downloadURL2
          ? downloadURL2
          : actualizeData.produkt_pozadie,
        sklad: Number(actualizeData.sklad),
        slug: createSlug(actualizeData.nazov),
        zlozenie: actualizeData.zlozenie,
        viditelnost: actualizeData.viditelnost,
      });
      console.log("Product added successfully with ID: ");
      toast.success("Produkt bol úspešne pridaný");
      doRevalidate("/admin/produkty");
      router.push("/admin/produkty");
    } catch (error) {
      toast.success("Produkt bol úspešne pridaný");
      console.error("Error adding product:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="products_admin">
        {user && (
          <form onSubmit={handleSaveProduct}>
            <Toaster />
            <div className="flex flex-row justify-between items-center">
              <h2>Nový produkt</h2>
              <StepBack />
            </div>

            <div className="product_admin_row">
              <p>Názov produktu:</p>
              <input
                type="text"
                name="nazov"
                value={actualizeData.nazov}
                onChange={handleChange}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Popis produktu:</p>
              <input
                type="text"
                name="popis_produkt"
                value={actualizeData.popis_produkt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="product_admin_row">
              <p>Foto Produktu:</p>

              <input type="file" onChange={handleFileChange} required />
            </div>

            <div className="product_admin_row">
              <p>Foto Produktu - pozadie:</p>
              {/* <Image
                src={data.produkt_pozadie}
                alt="foto produkt"
                width={100}
                height={100}
                priority={true}
              /> */}
              <input type="file" onChange={handleFileChange2} required />
            </div>

            <div className="product_admin_row">
              <p>Kategórie:</p>
              <div className="product_admin_col">
                {categories.map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      checked={selectedCategory.includes(category)}
                      onChange={() => handleCheckboxChangeCategory(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="product_admin_row">
              <p>Cena produktu:</p>
              <input
                type="text"
                name="cena"
                value={actualizeData.cena}
                onChange={handleChange}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Počet produktov na sklade:</p>
              <input
                type="text"
                name="sklad"
                value={actualizeData.sklad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Počet vstrekov | denná dávka:</p>
              <input
                type="text"
                name="pocet_vstrekov"
                value={actualizeData.pocet_vstrekov}
                onChange={handleChange}
                required
              />
            </div>

            <div className="product_admin_row">
              <p>Zloženie:</p>
              <input
                type="text"
                name="zlozenie"
                value={actualizeData.zlozenie}
                onChange={handleChange}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Odporúčané dávkovanie:</p>
              <input
                type="text"
                name="odporucane_davkovanie"
                value={actualizeData.odporucane_davkovanie}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn--secondary !mt-16" type="submit">
              {isLoading ? (
                <ClipLoader size={20} color={"#32a8a0"} loading={true} />
              ) : (
                "Nahrať produkt"
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
