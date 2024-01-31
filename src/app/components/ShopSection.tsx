"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../lib/interface_product";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/sanityImageUrl";
import { ClipLoader } from "react-spinners";

const ShopSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedCategory: "",
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

    fetchAllProducts();
  }, []);

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
      <h2 className="uppercase">Obchod</h2>

      <select name="categories" id="categories" onChange={handleCategoryChange}>
        {categories.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mt-8 md:mt-24">
        {isLoading ? (
          <ClipLoader size={40} color={"#174218"} loading={isLoading} />
        ) : (
          filteredData.map((item, index) => (
            <Link href={`/produkt/${item.slug.current}`} key={index}>
              <div className="flex flex-col items-center">
                <Image
                  src={urlFor(item.photo).url()}
                  width={500}
                  height={500}
                  priority={true}
                  className="w-full h-full rounded-xl"
                  alt="Produktový obrázok"
                />
                <p className="text-secondary pt-4 xl:pt-8">{item.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopSection;
