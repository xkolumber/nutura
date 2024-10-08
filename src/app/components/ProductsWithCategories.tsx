"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShopSectionProduct } from "../lib/all_interfaces";
import { SwiperNavButtons } from "./Swiper/SwiperNavButtons";

interface Props {
  products: ShopSectionProduct[];
}

const ProductsWithCategories = ({ products }: Props) => {
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
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 70vw, (max-width: 1200px) 20vw, 30vw"
                  priority={true}
                  quality={100}
                  className={`absolute w-full h-full object-cover transition-opacity ${
                    hoveredIndex === index ? "opacity-100" : "opacity-40"
                  } z-10 ease-in `}
                  alt="Produktový obrázok"
                />
                <Image
                  src={item.produkt_foto}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 70vw, (max-width: 1200px) 20vw, 30vw"
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
