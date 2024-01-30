import HomePageAbsorption from "./components/HomePageAbsorption";
import HomePageBenefits from "./components/HomePageBenefits";
import HomePageIntro from "./components/HomePageIntro";
import HomePageOral from "./components/HomePageOral";
import HomePageProducts from "./components/HomePageProducts";
import HomePageWhatIsNutura from "./components/HomePageWhatIsNutura";

const page = async () => {
  return (
    <div>
      <HomePageIntro />
      <div className="main_section">
        <HomePageProducts />
      </div>
      <HomePageWhatIsNutura />
      <HomePageBenefits />
      <HomePageAbsorption />
      <div className="main_section">
        <HomePageOral />
      </div>
    </div>
  );
};

export default page;
