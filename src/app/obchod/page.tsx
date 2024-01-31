import Image from "next/image";
import ShopSection from "../components/ShopSection";
import Navbar2 from "../components/Navbar2";
import Navbar from "../components/Navbar";
import ImageForPages from "../components/ImageForPages";

const page = () => {
  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />

      <ShopSection />
    </>
  );
};

export default page;
