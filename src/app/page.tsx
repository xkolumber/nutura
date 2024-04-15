import Footer from "./components/Footer";
import HomePageAbsorption from "./components/HomePage/HomePageAbsorption";
import HomePageBenefits from "./components/HomePage/HomePageBenefits";
import HomePageContactUs from "./components/HomePage/HomePageContactUs";
import HomePageIntro from "./components/HomePage/HomePageIntro";
import HomePageOral from "./components/HomePage/HomePageOral";
import HomePageProducts from "./components/HomePage/HomePageProducts";
import HomePageWhatIsNutura from "./components/HomePage/HomePageWhatIsNutura";
import Navbar2 from "./components/Navbar2";

const page = async () => {
  return (
    <div>
      <HomePageIntro />
      <Navbar2 />
      <div className="main_section">
        <HomePageProducts />
      </div>

      <HomePageWhatIsNutura />
      <HomePageBenefits />
      <HomePageAbsorption />
      <div className="main_section">
        <HomePageOral />
      </div>
      <HomePageContactUs />
      <Footer />
    </div>
  );
};

export default page;
