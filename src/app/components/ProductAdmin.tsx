"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../auth/Provider";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StepBack from "./StepBack";
import { ProductFirebase } from "../lib/all_interfaces";

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
  const [yesAdd, setYesAdd] = useState(false);
  const [actualizeData, setActualizeData] = useState<ProductFirebase>(data);

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    data.kategorie
  );
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  //   const [products, setProducts] = useState<AdminProduct[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [newPrice, setNewPrice] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleWeightChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(e.target.value);
  };

  const handlePriceChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(parseFloat(e.target.value));
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

  //   const handleCheckboxChange = (productTitle: string) => {
  //     setSelectedProducts((prevSelected) => {
  //       const updatedSelected = prevSelected.includes(productTitle)
  //         ? prevSelected.filter((nazov) => nazov !== productTitle)
  //         : [...prevSelected, productTitle];

  //       setActualizeData((prevData) => ({
  //         ...prevData,
  //         podporne_produkty: updatedSelected,
  //       }));

  //       return updatedSelected;
  //     });
  //   };
  //   const handleCheckboxChangeProfi = (productTitle: string) => {
  //     setSelectedProfi((prevSelected) => {
  //       const updatedSelected = prevSelected.includes(productTitle)
  //         ? prevSelected.filter((nazov) => nazov !== productTitle)
  //         : [...prevSelected, productTitle];

  //       setActualizeData((prevData) => ({
  //         ...prevData,
  //         profi_vyuzitie: updatedSelected,
  //       }));

  //       return updatedSelected;
  //     });
  //   };

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

  //   const handleChangeEffects = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     index: number
  //   ) => {
  //     const { name, value } = e.target;
  //     setActualizeData((prevData) => {
  //       const updatedUcinky = [...prevData.ucinky];
  //       updatedUcinky[index] = value;
  //       return { ...prevData, ucinky: updatedUcinky };
  //     });
  //   };
  //   const handleWeightChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     price: number,
  //     weight: string
  //   ) => {
  //     const newWeight = e.target.value;
  //     const updatedVahaCena = { ...actualizeData.vaha_cena };
  //     delete updatedVahaCena[weight];
  //     updatedVahaCena[newWeight] = price;

  //     setActualizeData((prevData) => ({
  //       ...prevData,
  //       vaha_cena: updatedVahaCena,
  //     }));
  //   };
  //   const handlePriceChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     weight: string
  //   ) => {
  //     const newPrice = parseFloat(e.target.value);
  //     setActualizeData((prevData) => ({
  //       ...prevData,
  //       vaha_cena: {
  //         ...prevData.vaha_cena,
  //         [weight]: newPrice,
  //       },
  //     }));
  //   };
  //   const handleDeleteWeight = (weight: string) => {
  //     setActualizeData((prevData) => {
  //       const updatedVahaCena = { ...prevData.vaha_cena };
  //       delete updatedVahaCena[weight];
  //       return {
  //         ...prevData,
  //         vaha_cena: updatedVahaCena,
  //       };
  //     });
  //   };
  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const db = getFirestore(auth.app);
  //       const paymentCollectionRef = collection(db, "produkty");

  //       try {
  //         setIsLoadingAll(true);
  //         const paymentSnapshot = await getDocs(paymentCollectionRef);

  //         const productss: AdminProduct[] = [];
  //         paymentSnapshot.forEach((doc) => {
  //           const promoData = doc.data() as AdminProduct;
  //           const promoId = doc.id;
  //           const promoWithId: AdminProduct = { ...promoData, id: promoId };
  //           productss.push(promoWithId);
  //         });

  //         if (productss.length > 0) {
  //           setProducts(productss);
  //         } else {
  //           setProducts([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching promo codes:", error);
  //       } finally {
  //         setIsLoadingAll(false);
  //       }
  //     };

  //     fetchProducts();
  //   }, []);

  const categories = [
    "Ovocie a zelenina",
    "Okrasné rastliny",
    "Kvitnúce rastliny",
    "Bylinky",
    "Ihličnany a lesné rastliny",
    "Čučoriedky, azalky a rododendróny",
    "Trávniky",
    "Bonsaje",
    "Izbové rastliny",
    "Doplnky",
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

      const db = getFirestore(auth.app);
      const productDocRef = doc(db, "produkty", actualizeData.id);

      await updateDoc(productDocRef, {
        cena: actualizeData.cena,
        kategorie: actualizeData.kategorie,
        nazov: actualizeData.nazov,
        objem: actualizeData.objem,
        odporucane_davkovanie: actualizeData.odporucane_davkovanie,
        pocet_vstrekov: actualizeData.pocet_vstrekov,
        produkt_foto: actualizeData.produkt_foto,
        produkt_pozadie: actualizeData.produkt_pozadie,
        skladovanie: actualizeData.skladovanie,
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
    <div className="main_section products_admin">
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
            <input type="file" onChange={handleFileChange} />
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
