import HomePageBenefits from "./components/HomePageBenefits";
import HomePageIntro from "./components/HomePageIntro";
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
    </div>
  );
};

export default page;
