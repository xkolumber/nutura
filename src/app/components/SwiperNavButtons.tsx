import React from "react";
import { useSwiper } from "swiper/react";
import IconLeftArrow from "./Icons/IconLeftArrow";
import IconRightArrow from "./Icons/IconRightArrow";
import Link from "next/link";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="w-full flex justify-center items-center gap-8 mt-8">
      <button onClick={() => swiper.slidePrev()}>
        {" "}
        <IconLeftArrow />
      </button>
      <Link href={"/obchod"}>
        <button className="btn btn--secondary ">Všetky produkty</button>
      </Link>
      <button onClick={() => swiper.slideNext()}>
        <IconRightArrow />
      </button>
    </div>
  );
};
