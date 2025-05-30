"use client";
import React, { useState } from "react";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import StepBack from "@/app/components/StepBack";
import { auth } from "@/app/firebase/config";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { createSlug } from "@/app/lib/functionsClient";
import Tiptap from "@/app/components/TipTapEditor/TipTap";

const Page = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [actualizeData, setActualizeData] = useState<ProductFirebase>({
    id: "",
    cena: 0,
    cena_zlava: 0,
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
    zlava: false,
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
        cena: Number(actualizeData.cena),
        cena_zlava: Number(actualizeData.cena_zlava),
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
        zlava: actualizeData.zlava,
        zlozenie: actualizeData.zlozenie,
        viditelnost: actualizeData.viditelnost,
      });
      console.log("Product added successfully with ID: ");
      toast.success("Produkt bol úspešne pridaný");

      await queryClient.refetchQueries({
        queryKey: ["admin_products"],
      });

      router.push("/admin/produkty");
    } catch (error) {
      toast.success("Produkt bol úspešne pridaný");
      console.error("Error adding product:", error);
    }
    setIsLoading(false);
  };

  const handleTextChange = (field: string, value: string) => {
    setActualizeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setActualizeData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
  return (
    <>
      <div className="products_admin">
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
          <div className="product_admin_row !flex-col">
            <p>Popis produktu:</p>
            <Tiptap
              content={actualizeData.popis_produkt}
              onChange={(value) => handleTextChange("popis_produkt", value)}
            />
          </div>

          <div className="product_admin_row">
            <p>Foto Produktu:</p>

            <input type="file" onChange={handleFileChange} required />
          </div>

          <div className="product_admin_row">
            <p>Foto Produktu - pozadie:</p>

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
            <p> Zľava:</p>
            <input
              type="checkbox"
              name="zlava"
              checked={actualizeData.zlava}
              onChange={handleChangeCheckbox}
            />
          </div>

          {actualizeData.zlava && (
            <div className="product_admin_row">
              <p>Cena v zľave:</p>
              <input
                type="number"
                name="cena_zlava"
                value={actualizeData.cena_zlava}
                onChange={handleChange}
                required
              />
            </div>
          )}
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
              <ClipLoader size={20} color={"#000000"} loading={true} />
            ) : (
              "Nahrať produkt"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
