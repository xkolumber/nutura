"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/sanityImageUrl";
import { ClipLoader } from "react-spinners";
import { Product, ProductFirebase } from "../lib/all_interfaces";
import useCartStore from "../counter/store";
import toast, { Toaster } from "react-hot-toast";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";

const ShopSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ProductFirebase[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [quantity, setQuantity] = useState([1, 1, 1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fetch-all-products");

        const data = await response.json();

        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (filteredData) {
      setQuantity(new Array(filteredData.length).fill(1));
    }
  }, [filteredData]);

  const handleOpacity = (index: number) => {
    setHoveredIndex(index);
  };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);

    try {
      setIsLoading(true);
      const response = await fetch("/api/get-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCategory: category,
        }),
      });

      const products = await response.json();

      setFilteredData(products);

      if (response.ok) {
        setIsLoading(false);
      } else {
        console.error("failed");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const increaseQuantity = (index: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = newQuantity[index] + 1;
      return newQuantity;
    });
  };

  const decreaseQuantity = (index: number) => {
    if (quantity[index] > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = [...prevQuantity];
        newQuantity[index] = newQuantity[index] - 1;
        return newQuantity;
      });
    }
  };

  const handleAddToCart = (id: string, quantity: number) => {
    addToCart({ id, quantity });
    toast.success("Pridané do košíka");
  };

  const categories = [
    "",
    "Antioxidanty",
    "Kĺby a kosti",
    "Fyzická aktivita",
    "Imunitný systém",
    "Zdravie muža",
    "Zdravie ženy",
    "Menštuácia a menopauza",
    "Spánok",
    "Deti",
    "Zrelý vek",
    "Tráviace ťažkosti a pooperačné stavy",
    "Zdravie očí a zrazku",
    "Únava",
    "Srdcovo-cievny systém",
    "Omega 3 mastné kyseliny",
    "Železo",
    "Vitamín B 12",
    "Vitamín D",
    "Minerálne látky",
    "Multivitamíny",
    "Tehotenstvo a dojčenie",
    "Stres a nervozita",
  ];
  console.log(selectedCategory);

  return (
    <div className="main_section mt-32 md:mt-0">
      <Toaster />
      <h2 className="uppercase">Obchod</h2>

      <select name="categories" id="categories" onChange={handleCategoryChange}>
        {categories.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-24">
        {isLoading ? (
          <div className="min-h-[500px]">
            <ClipLoader size={40} color={"#174218"} loading={isLoading} />
          </div>
        ) : (
          filteredData &&
          filteredData.map((item, index) => (
            <div key={index}>
              <Link
                href={`/obchod/produkt/${item.slug}`}
                className="flex flex-col h-[400px]"
              >
                <div
                  className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-full justify-center relative"
                  onMouseEnter={() => handleOpacity(index)}
                  onMouseLeave={() => handleOpacity(-1)}
                >
                  <Image
                    src={item.produkt_pozadie}
                    width={0}
                    height={0}
                    priority={true}
                    quality={100}
                    sizes="100vw"
                    className={`absolute w-full h-full object-cover transition-opacity ${
                      hoveredIndex === index ? "opacity-100" : "opacity-40"
                    } z-10 ease-in `}
                    alt="Produktový obrázok"
                  />
                  <Image
                    src={item.produkt_foto}
                    width={500}
                    height={500}
                    priority={true}
                    quality={100}
                    className="w-full h-[200px]  object-contain z-[1000] "
                    alt="Produktový obrázok"
                  />
                </div>{" "}
              </Link>
              <div className="flex flex-col w-full justify-center items-center">
                <div className="flex flex-col w-[100%]">
                  <p className="text-black pt-4 uppercase font-semibold">
                    {item.nazov}
                  </p>
                  <p>{item.cena} €</p>
                  <div className="flex flex-row justify-between items-center">
                    <p className="uppercase font-medium">Počet kusov</p>
                    <div className="flex flex-row items-center gap-4  ml-12 md:ml-0 scale-125 md:scale-100">
                      <div
                        className="cursor-pointer"
                        onClick={() => decreaseQuantity(index)}
                      >
                        <IconMinus />
                      </div>

                      <div className="border border-secondary pt-2 pb-2 pl-8 pr-8 rounded-[32px] text-secondary">
                        {quantity[index]}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => increaseQuantity(index)}
                      >
                        <IconPlus />
                      </div>
                    </div>
                    <button
                      className="btn btn--fourthtiary"
                      onClick={() => handleAddToCart(item.id, quantity[index])}
                    >
                      Kúpiť
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopSection;
