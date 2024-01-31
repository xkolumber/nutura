import React from "react";
import Image from "next/image";

const ImageForPages = () => {
  return (
    <Image
      src={"/intro.jpg"}
      width={500}
      height={500}
      className="w-full h-[267px] object-cover z-50 relative hidden md:flex"
      alt="Intro produktového obrázku"
    />
  );
};

export default ImageForPages;
