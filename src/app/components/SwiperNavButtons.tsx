import React from "react";
import { useSwiper } from "swiper/react";
import IconLeftArrow from "./Icons/IconLeftArrow";
import IconRightArrow from "./Icons/IconRightArrow";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
      <button onClick={() => swiper.slidePrev()}>
        <IconLeftArrow />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <IconRightArrow />
      </button>
    </div>
  );
};
