import React from "react";
import Image from "next/image";

const ImageForPages = () => {
  return (
    <Image
      src={"/new_intro.jpg"}
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      className="w-full h-[267px] object-contain z-50 relative hidden md:flex"
      alt="Intro produktového obrázku"
    />
  );
};

export default ImageForPages;
