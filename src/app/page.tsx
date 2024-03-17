import HomePageAbsorption from "./components/HomePageAbsorption";
import HomePageBenefits from "./components/HomePageBenefits";
import HomePageContactUs from "./components/HomePageContactUs";
import HomePageIntro from "./components/HomePageIntro";
import HomePageOral from "./components/HomePageOral";
import HomePageProducts from "./components/HomePageProducts";
import HomePageWhatIsNutura from "./components/HomePageWhatIsNutura";
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
    </div>
  );
};

export default page;
