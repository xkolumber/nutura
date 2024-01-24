import Image from "next/image";
import React from "react";

const HomePageWhatIsNutura = () => {
  return (
    <div className="min-h-[50vh] xl:min-h-[90vh] flex flex-col justify-center items-center m-[1.6rem] xl:m-12 border-secondary border rounded-[20px] relative">
      <h1 className="uppercase max-w-[70%] text-center ">
        What is Nutura and what we do?
      </h1>
      <p className="text-secondary w-1/2 text-center">
        simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry&apos; s standard dummy text ever since the 1500s.
      </p>
      <button className="btn btn--secondary">Learn More</button>

      <Image
        src={"/produkt1.jpg"}
        width={500}
        height={600}
        className="what_is_nutura_image1"
        alt="Produkt obrazok"
      />

      <Image
        src={"/produkt2.jpg"}
        width={500}
        height={600}
        className="what_is_nutura_image2"
        alt="Produkt obrazok"
      />
    </div>
  );
};

export default HomePageWhatIsNutura;
