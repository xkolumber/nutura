import React from "react";
import IconLeftArrow from "./Icons/IconLeftArrow";
import { useSwiper } from "swiper/react";

const SwiperLeftButton = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()} className="hidden md:block ">
      <IconLeftArrow />
    </button>
  );
};

export default SwiperLeftButton;
