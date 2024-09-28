import Footer from "./components/Footer";
import HomePageAbsorption from "./components/HomePage/HomePageAbsorption";
import HomePageBenefits from "./components/HomePage/HomePageBenefits";
import HomePageContactUs from "./components/HomePage/HomePageContactUs";
import HomePageIntro from "./components/HomePage/HomePageIntro";
import HomePageOral from "./components/HomePage/HomePageOral";
import HomePageProductsServer from "./components/HomePage/HomePageproductsServer";
import HomePageWhatIsNutura from "./components/HomePage/HomePageWhatIsNutura";
import Navbar2 from "./components/Navbar/Navbar2";

const page = () => {
  return (
    <div>
      <HomePageIntro />
      <Navbar2 />
      <div className="own_edge">
        <div className="main_section w-full !pb-0 ">
          <HomePageProductsServer />
          <HomePageWhatIsNutura />
          <HomePageBenefits />
          <HomePageAbsorption />
          <HomePageOral />
          <HomePageContactUs />
          <Footer />
        </div>
      </div>

      {/* <div className="main_section"></div> */}
    </div>
  );
};

export default page;
