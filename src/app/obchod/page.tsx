import Image from "next/image";
import ShopSection from "../components/ShopSection";

const page = () => {
  return (
    <>
      <Image
        src={"/intro.jpg"}
        width={500}
        height={500}
        className="w-full h-[267px] object-cover"
        alt="Intro produktového obrázku"
      />

      <ShopSection />
    </>
  );
};

export default page;
