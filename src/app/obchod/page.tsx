import ShopSection from "../components/ShopSection";
import Navbar2 from "../components/Navbar/Navbar2";
import Navbar from "../components/Navbar/Navbar";
import ImageForPages from "../components/ImageForPages";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <ImageForPages />
      <Navbar2 />

      <ShopSection />
      <Footer />
    </>
  );
};

export default page;
