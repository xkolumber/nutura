"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/app/auth/Provider";
import { AdminProduct } from "../page";
import { auth } from "@/app/firebase/config";
import toast, { Toaster } from "react-hot-toast";
import AdminHeader from "@/app/components/AdminHeader";
import Link from "next/link";
import StepBack from "@/app/components/StepBack";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { createSlug } from "@/app/components/ProductAdmin";

const Page = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [yesAdd, setYesAdd] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProfi, setSelectedProfi] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);

  const [actualizeData, setActualizeData] = useState<ProductFirebase>({
    id: "",
    cena: 0,
    kategorie: [],
    nazov: "",
    objem: 0,
    odporucane_davkovanie: "",
    pocet_vstrekov: 0,
    popis_produkt: "",
    produkt_foto: "",
    produkt_pozadie: "",
    skladovanie: "",
    slug: "",
    zlozenie: "",
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

  const handleSaveProduct = async () => {
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

      const newProductDocRef = await addDoc(collection(db, "produkty"), {
        cena: actualizeData.cena,
        kategorie: actualizeData.kategorie,
        nazov: actualizeData.nazov,
        objem: actualizeData.objem,
        odporucane_davkovanie: actualizeData.odporucane_davkovanie,
        pocet_vstrekov: actualizeData.pocet_vstrekov,
        popis_produkt: actualizeData.popis_produkt,
        produkt_foto: downloadURL ? downloadURL : actualizeData.produkt_foto,
        produkt_pozadie: downloadURL2
          ? downloadURL2
          : actualizeData.produkt_pozadie,
        skladovanie: actualizeData.skladovanie,
        slug: createSlug(actualizeData.nazov),
        zlozenie: actualizeData.zlozenie,
      });
      console.log("Product added successfully with ID: ");
      toast.success("Produkt bol úspešne pridaný");
      window.location.reload();
    } catch (error) {
      toast.success("Produkt bol úspešne pridaný");
      console.error("Error adding product:", error);
    }
  };
  console.log(actualizeData);
  return (
    <>
      <AdminHeader />
      <div className="main_section products_admin">
        {user && (
          <>
            <Toaster />
            <div className="flex flex-row justify-between items-center">
              <h2>Novy produkt</h2>
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
              {/* <Image
                src={data.produkt_foto}
                alt="foto produkt"
                width={100}
                height={100}
                priority={true}
                className="h-[200px] object-contain"
              /> */}
              <input type="file" onChange={handleFileChange} />
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

            <button
              className="btn btn--secondary !mt-16"
              onClick={handleSaveProduct}
            >
              Nahrať produkt
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
