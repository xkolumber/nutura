"use client";
import React, { useState } from "react";
import { ShopSectionProduct } from "../lib/all_interfaces";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import IconMinus from "./Icons/IconMinus";
import { SwiperNavButtons } from "./SwiperNavButtons";

interface Props {
  products: ShopSectionProduct[];
}

const ProductsWithCategories = ({ products }: Props) => {
  console.log("ano dlai sme to");
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleOpacity = (index: number) => {
    setHoveredIndex(index);
  };
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 55,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 55,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 55,
        },
      }}
      freeMode={true}
    >
      {products.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Link
              href={`/obchod/produkt/${item.slug}`}
              className="flex flex-col "
            >
              <div
                className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-full justify-center relative min-h-[300px] xl:min-h-[400px] 2xl:min-h-[400px] 3xl:min-h-[500px]"
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
                  className="w-full h-[200px] xl:h-[300px] 3xl:h-[400px] object-contain z-[1000] "
                  alt="Produktový obrázok"
                />
              </div>{" "}
            </Link>
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-col w-full 2xl:w-[80%] 2xl:mt-4">
                <p className=" text-black pt-4  uppercase font-bold text-center">
                  {item.nazov}
                </p>

                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-4 xl:gap-6"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <SwiperNavButtons />
    </Swiper>
  );
};

export default ProductsWithCategories;
