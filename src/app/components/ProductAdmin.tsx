"use client";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../auth/Provider";
import { auth } from "../firebase/config";
import { ProductFirebase } from "../lib/all_interfaces";
import StepBack from "./StepBack";

interface Props {
  data: ProductFirebase;
}

export function createSlug(title: string): string {
  const slug = title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

  return slug;
}

const ProductAdmin = ({ data }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [yesAdd, setYesAdd] = useState(false);
  const [actualizeData, setActualizeData] = useState<ProductFirebase>(data);

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    data.kategorie
  );
  const [isLoadingAll, setIsLoadingAll] = useState(false);

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

  const handleUpdateProduct = async () => {
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
      const productDocRef = doc(db, "produkty", actualizeData.id);

      await updateDoc(productDocRef, {
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
      });
      console.log("Product updated successfully.");
      toast.success("Produkt bol úspešne upravený");

      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const db = getFirestore(auth.app);
      const productDocRef = doc(db, "produkty", productId);

      await deleteDoc(productDocRef);
      console.log("Product deleted successfully.");
      toast.success("Produkt bol úspešne odstránený");
      router.push("/admin/produkty");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Pri odstraňovaní produktu sa vyskytla chyba");
    }
  };
  return (
    <div className="products_admin">
      {user && (
        <>
          <Toaster />
          <div className="flex flex-row justify-between items-center">
            <h2>{data.nazov}</h2>
            <StepBack />
          </div>

          <div className="product_admin_row">
            <p>Názov produktu:</p>
            <input
              type="text"
              name="nazov"
              value={actualizeData.nazov}
              onChange={handleChange}
            />
          </div>
          <div className="product_admin_row">
            <p>Popis produktu:</p>
            <input
              type="text"
              name="popis_produkt"
              value={actualizeData.popis_produkt}
              onChange={handleChange}
            />
          </div>

          <div className="product_admin_row">
            <p>Foto Produktu:</p>
            <Image
              src={data.produkt_foto}
              alt="foto produkt"
              width={100}
              height={100}
              priority={true}
              className="h-[200px] object-contain"
            />
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="product_admin_row">
            <p>Foto Produktu - pozadie:</p>
            <Image
              src={data.produkt_pozadie}
              alt="foto produkt"
              width={100}
              height={100}
              priority={true}
            />
            <input type="file" onChange={handleFileChange2} />
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
            />
          </div>
          <div className="product_admin_row">
            <p>Počet produktov na sklade:</p>
            <input
              type="text"
              name="sklad"
              value={actualizeData.sklad}
              onChange={handleChange}
            />
          </div>

          <div className="product_admin_row">
            <p>Počet vstrekov | denná dávka:</p>
            <input
              type="text"
              name="pocet_vstrekov"
              value={actualizeData.pocet_vstrekov}
              onChange={handleChange}
            />
          </div>

          <div className="product_admin_row">
            <p>Zloženie:</p>
            <input
              type="text"
              name="zlozenie"
              value={actualizeData.zlozenie}
              onChange={handleChange}
            />
          </div>
          <div className="product_admin_row">
            <p>Odporúčané dávkovanie:</p>
            <input
              type="text"
              name="odporucane_davkovanie"
              value={actualizeData.odporucane_davkovanie}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row justify-between">
            <button
              className="btn btn--secondary !mt-16"
              onClick={handleUpdateProduct}
            >
              Aktualizovať
            </button>

            <button
              className="btn btn--secondary !mt-16"
              onClick={() => handleDeleteProduct(actualizeData.id)}
            >
              Odstrániť produkt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductAdmin;
