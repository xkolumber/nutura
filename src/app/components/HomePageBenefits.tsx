import React from "react";
import Image from "next/image";

const HomePageBenefits = () => {
  const benefits = [
    {
      title: "Vhodné pre vegetariánov",
      src_photo: "/svg_vegan.svg",
    },
    {
      title: "Bez lepku",
      src_photo: "/svg_lepok.svg",
    },
    {
      title: "Bez GMO",
      src_photo: "/svg_no_gmo.svg",
    },
    {
      title: "Netestované na zvieratách",
      src_photo: "/svg_no_animal.svg",
    },
    {
      title: "Bez laktózy",
      src_photo: "/svg_no_lactoze.svg",
    },
  ];
  return (
    <div className="main_section">
      <h2 className="uppercase text-center md:text-left">Benefity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-8">
        {benefits.map((benefit, index) => (
          <div
            className="flex flex-col justify-center items-center mb-8"
            key={index}
          >
            <Image
              src={benefit.src_photo}
              width={500}
              height={500}
              className="benefit_image "
              alt="Produktový obrázok"
            />
            <h5 className="text-secondary max-w-[167px] text-center uppercase mt-4">
              {benefit.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageBenefits;
