import React from "react";
import Image from "next/image";

const HomePageAbsorption = () => {
  return (
    <div className="tight_section relative min-h-[600px] 3xl:min-h-[900px] overflow-hidden">
      <h1 className="uppercase md:max-w-[50%]">Ako často Nuturu používať ?</h1>

      <button className="btn btn--secondary bg-none">Prečítať</button>
      <p className="md:hidden">20.3.2024</p>
      <p className="absolute left-0 bottom-0 ml-12 mb-12 hidden md:block">
        20.3.2024
      </p>

      <Image
        src={"/first_article.jpg"}
        width={500}
        height={500}
        priority={true}
        className="w-[400px] 3xl:w-[600px]  absolute -bottom-[100px] right-0 rotate-[12.5deg] rounded-3xl object-contain"
        alt="Intro produktového obrázku"
      />
    </div>
  );
};

export default HomePageAbsorption;
