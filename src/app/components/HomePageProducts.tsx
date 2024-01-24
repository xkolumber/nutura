"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

const nutriElements = [
  {
    title: "VITAMIN D3 - LIPOSOMAL 75 mcg",
    src_photo: "/produkt1.jpg",
  },
  {
    title: "VITAMIN D3 - LIPOSOMAL 75 mcg",
    src_photo: "/produkt2.jpg",
  },
  {
    title: "VITAMIN D3 - LIPOSOMAL 75 mcg",
    src_photo: "/produkt3.jpg",
  },
  {
    title: "VITAMIN D3 - LIPOSOMAL 75 mcg",
    src_photo: "/produkt1.jpg",
  },
  {
    title: "VITAMIN D3 - LIPOSOMAL 75 mcg",
    src_photo: "/produkt2.jpg",
  },
];

const HomePageProducts = () => {
  return (
    <>
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
          delay: 0, // No delay between transitions
          disableOnInteraction: false, // Allow user interaction without stopping autoplay
        }}
        loop={true}
        speed={3000}
      >
        {nutriElements.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <Image
                  src={item.src_photo}
                  width={500}
                  height={500}
                  className="w-full h-full rounded-xl "
                  alt="Produktový obrázok"
                />
                <p className=" text-secondary pt-4 xl:pt-8">{item.title}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-center">
        <button className="btn btn--secondary !mt-16 xl:!mt-32">
          Všetky produkty
        </button>
      </div>
    </>
  );
};

export default HomePageProducts;
