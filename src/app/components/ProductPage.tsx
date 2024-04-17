"use client";
import React, { useEffect, useState } from "react";
import { ProductFirebase, ShopSectionProduct } from "../lib/all_interfaces";
import { redirect } from "next/navigation";
import Image from "next/image";
import Navbar from "./Navbar";
import ImageForPages from "./ImageForPages";
import Navbar2 from "./Navbar2";
import toast, { Toaster } from "react-hot-toast";
import IconMinus from "./Icons/IconMinus";
import IconPlus from "./Icons/IconPlus";
import useCartStore from "../counter/store";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductsWithCategories from "./ProductsWithCategories";
import Link from "next/link";

interface Props {
  slug: string;
}

const ProductPage = (slug: Props) => {
  const [data, setData] = useState<ProductFirebase>();
  const [dataWithCategory, setDataWithCategory] = useState<
    ShopSectionProduct[]
  >([]);
  const [success, setSuccess] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/fetch-certain-product?slug=${slug.slug}`
        );

        const data = await response.json();

        setData(data);
        setCategories(data.kategorie);
        setSuccess(true);
      } catch (error) {
        redirect("/error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataBasedOnCategory = async () => {
      if (success) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/fetch-products-categories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
              categories: categories,
              id: data?.id,
            }),
          });

          const data2 = await response.json();

          setDataWithCategory(data2.allProducts);
        } catch (error) {
          redirect("/error");
        } finally {
          setSuccess(false);
          setIsLoading(false);
        }
      }
    };

    fetchDataBasedOnCategory();
  }, [success]);

  const handleAddToCart = (id: string, quantity: number) => {
    addToCart({ id, quantity });

    toast.success("Pridané do košíka");
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <>
      <ImageForPages />
      <Navbar2 />
      <Toaster />

      <div className="main_section mt-24 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2>
              {data ? (
                data.nazov
              ) : (
                <Skeleton count={1} width={200} baseColor="#c7cfb8" />
              )}
            </h2>
            <p className="w-full md:w-[80%] mt-2 md:mt-4 xl:mt-8">
              {data ? (
                data.popis_produkt
              ) : (
                <Skeleton count={8} baseColor="#c7cfb8" />
              )}
            </p>
            <div className="flex flex-row gap-8 mt-8 xl:mt-12">
              <div className="flex flex-col ">
                {" "}
                <h5>Cena</h5>
                <p className="text-[18px] xl:text-[24px] 3xl:text-[34px]">
                  {data ? (
                    data.cena + "€ / ks"
                  ) : (
                    <Skeleton count={1} baseColor="#c7cfb8" />
                  )}{" "}
                </p>
              </div>
              <div className="flex flex-col">
                {" "}
                <h5>Objem</h5>
                <p className="text-[18px] xl:text-[24px] 3xl:text-[34px]">
                  {data ? (
                    data.objem
                  ) : (
                    <Skeleton count={1} baseColor="#c7cfb8" />
                  )}{" "}
                  ml
                </p>
              </div>
            </div>

            <h5 className="mt-4">Počet kusov</h5>
            <div className="flex flex-row items-center gap-4 mt-2">
              <button onClick={decreaseQuantity}>
                <IconMinus />
              </button>
              <div className="border border-secondary pt-2 pb-2 pl-8 pr-8 rounded-3xl bg-primary text-secondary">
                {quantity}
              </div>
              <button onClick={increaseQuantity}>
                <IconPlus />
              </button>
            </div>
            {data && (
              <button
                className="btn btn--secondary !mb-16 md:!mb-0"
                onClick={() => handleAddToCart(data?.id, quantity)}
              >
                Pridať do košíka
              </button>
            )}
          </div>
          {data ? (
            <div className="flex flex-col md:w-1/2">
              <div className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-[400px] 2xl:h-[600px] 3xl:h-[700px] justify-center relative">
                <Image
                  src={data.produkt_pozadie}
                  width={0}
                  height={0}
                  priority={true}
                  quality={100}
                  sizes="100vw"
                  className={`absolute w-full h-full object-cover transition-opacity rounded-xl  z-10 ease-in `}
                  alt="Produktový obrázok"
                />
                <Image
                  src={data.produkt_foto}
                  width={500}
                  height={500}
                  priority={true}
                  quality={100}
                  className="w-full  h-[300px] xl:h-[400px] 2xl:h-[450px]  object-contain z-[100] "
                  alt="Produktový obrázok"
                />
              </div>
              <p className="text-center mt-2">{data.nazov}</p>
            </div>
          ) : (
            <div className="flex flex-col md:w-1/2  h-[400px] 2xl:h-[600px] 3xl:h-[700px]">
              <div className="2xl:hidden">
                {" "}
                <Skeleton height={400} baseColor="#c7cfb8" borderRadius={12} />
              </div>
              <div className="hidden 2xl:block">
                {" "}
                <Skeleton height={600} baseColor="#c7cfb8" borderRadius={12} />
              </div>
              <div className="hidden 3xl:block">
                {" "}
                <Skeleton height={700} baseColor="#c7cfb8" borderRadius={12} />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="product_more_info mt-12 md:mt-24 xl:mt-32">
            <h2>Zloženie</h2>
            <p>{data && data.zlozenie}</p>
            <table className="w-full mt-12">
              <tbody>
                <tr className="border-b border-secondary">
                  <th className="text-left uppercase">
                    <h5>Obsah aktívnych látok</h5>
                  </th>
                  <th className="uppercase text-left">
                    <h5>{data && data.pocet_vstrekov} vstrekov</h5>
                  </th>
                </tr>
                {data?.nutricna_informacia.map((item, index) => (
                  <tr key={index} className="border-b border-secondary ">
                    <td className="w-1/2 md:w-3/4 pt-[6px] pb-[6px]">
                      {item.nutrient}
                    </td>
                    <td className="border-l border-secondary pl-4">
                      {" "}
                      {item.hodnota}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>* % odporúčanej dennej dávky</p>
            <p>** Doporučená denná dávka nie je stanovená</p>
            <h2 className="mt-12 xl:mt-24">Skladovanie</h2>
            <p>
              Sladujte pri izbovej teplote. Skladujte mimo dosahu malých detí.
              Chráňte pred priamym slnečným žiarením.
            </p>
            <h2 className="mt-12 xl:mt-24">Odporúčané dávkovanie</h2>
            <p>{data && data.odporucane_davkovanie}</p>

            <h2 className="mt-12 xl:mt-24">Upozornenie</h2>
            <p>{data && data.upozornenie}</p>
            <h2 className="mt-12 xl:mt-24">Ostatné informácie</h2>
            <p>Minimálna trvanlivosť do: viď obal.,</p>
            <p>
              Distribútor: SOUL MATE s.r.o., Pod kalváriou 38, 941 23 Andovce,
              Slovensko.
            </p>
          </div>
        </div>

        {dataWithCategory.length > 0 && (
          <div className="mt-8 md:mt-32 xl:mt-40">
            <ProductsWithCategories products={dataWithCategory} />
            {/* <div className="flex justify-center">
              <Link href={"/obchod"}>
                <button className="btn btn--secondary !mt-4  md:!mt-16 ">
                  Všetky produkty
                </button>
              </Link>
            </div> */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
