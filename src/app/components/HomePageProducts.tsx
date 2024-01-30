"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/interface_product";
import { urlFor } from "../lib/sanityImageUrl";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const HomePageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

        setProducts(products);

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
  return (
    <>
      {isLoading ? (
        <ClipLoader size={40} color={"#174218"} loading={isLoading} />
      ) : (
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
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={3000}
        >
          {products.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={`/produkt/${item.slug.current}`}>
                  <div className="flex flex-col items-center">
                    <Image
                      src={urlFor(item.photo).url()}
                      width={500}
                      height={500}
                      priority={true}
                      quality={100}
                      className="w-full h-full rounded-xl "
                      alt="Produktový obrázok"
                    />
                    <p className=" text-secondary pt-4 xl:pt-8">{item.title}</p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="flex justify-center">
        <Link href={"/obchod"}>
          <button className="btn btn--secondary !mt-16 xl:!mt-32">
            Všetky produkty
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePageProducts;
