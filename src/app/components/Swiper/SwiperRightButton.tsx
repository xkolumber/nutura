import { useSwiper } from "swiper/react";
import IconRightArrow from "../Icons/IconRightArrow";

const SwiperRightButton = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slideNext()} className="hidden md:block">
      <IconRightArrow />
    </button>
  );
};

export default SwiperRightButton;
