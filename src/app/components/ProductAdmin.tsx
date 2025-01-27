"use client";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { TextareaHTMLAttributes, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../auth/Provider";
import { auth } from "../firebase/config";
import { ProductFirebase } from "../lib/all_interfaces";
import StepBack from "./StepBack";

import { ClipLoader } from "react-spinners";
import { createSlug } from "../lib/functionsClient";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  data: ProductFirebase;
}

const ProductAdmin = ({ data }: Props) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [yesAdd, setYesAdd] = useState(false);
  const [actualizeData, setActualizeData] = useState<ProductFirebase>(data);

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    data.kategorie
  );
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingActualize, setIsLoadingActualize] = useState(false);

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
      | React.ChangeEvent<HTMLTextAreaElement>
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

  const handleUpdateProduct = async (e: any) => {
    e.preventDefault();
    setIsLoadingActualize(true);
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
        viditelnost: actualizeData.viditelnost,
      });
      console.log("Product updated successfully.");
      toast.success("Produkt bol úspešne upravený");
      await queryClient.refetchQueries({
        queryKey: ["admin_products"],
      });
      await queryClient.refetchQueries({
        queryKey: ["admin_products", actualizeData.id],
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setIsLoadingActualize(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsLoadingDelete(true);
      const db = getFirestore(auth.app);
      const productDocRef = doc(db, "produkty", productId);

      await deleteDoc(productDocRef);
      console.log("Product deleted successfully.");
      toast.success("Produkt bol úspešne odstránený");
      await queryClient.refetchQueries({
        queryKey: ["admin_products"],
      });

      router.push("/admin/produkty");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Pri odstraňovaní produktu sa vyskytla chyba");
    }
    setIsLoadingDelete(false);
  };

  const handleChangeCheck = (isChecked: boolean) => {
    setActualizeData({
      ...actualizeData,
      viditelnost: isChecked,
    });
  };
  return (
    <div className="products_admin">
      {user && (
        <form onSubmit={handleUpdateProduct}>
          <Toaster />
          <div className="flex flex-row justify-between items-center">
            <h2>{data.nazov}</h2>
            <StepBack />
          </div>
          <div className="product_admin_row">
            <p>Viditeľnosť produktu:</p>
            <input
              type="checkbox"
              name="viditelnost"
              onChange={(e) => handleChangeCheck(e.target.checked)}
              checked={actualizeData.viditelnost}
            />
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
            <textarea
              className="!h-[15rem]"
              name="popis_produkt"
              value={actualizeData.popis_produkt}
              onChange={handleChange}
              required
            />
          </div>

          <div className="product_admin_row">
            <p>Foto Produktu:</p>
            <Image
              src={data.produkt_foto}
              alt="foto produkt"
              width={100}
              height={100}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 30vw"
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
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 30vw"
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
            <textarea
              name="zlozenie"
              value={actualizeData.zlozenie}
              onChange={handleChange}
              required
              className="!h-[15rem]"
            />
          </div>
          <div className="product_admin_row">
            <p>Odporúčané dávkovanie:</p>
            <textarea
              className="!h-[15rem]"
              name="odporucane_davkovanie"
              value={actualizeData.odporucane_davkovanie}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row justify-between">
            <button
              className="btn btn--secondary !mt-16 min-w-[150px]"
              type="submit"
              disabled={isLoadingActualize}
            >
              {isLoadingActualize ? (
                <ClipLoader size={20} color={"#000000"} loading={true} />
              ) : (
                "Aktualizovať"
              )}
            </button>

            <button
              className="btn btn--secondary !mt-16 min-w-[150px]"
              onClick={() => handleDeleteProduct(actualizeData.id)}
            >
              {isLoadingDelete ? (
                <ClipLoader size={20} color={"#000000"} loading={true} />
              ) : (
                "Odstrániť produkt"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductAdmin;
