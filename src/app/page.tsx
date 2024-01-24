import React from "react";
import Image from "next/image";
import HomePageIntro from "./components/HomePageIntro";
import HomePageProducts from "./components/HomePageProducts";
import HomePageWhatIsNutura from "./components/HomePageWhatIsNutura";

const page = () => {
  return (
    <div>
      <HomePageIntro />
      <div className="main_section">
        <HomePageProducts />
      </div>
      <HomePageWhatIsNutura />
      <p>fsdfkl</p>
      <p>fsdfkl</p>
      <p>fsdfkl</p>
      <p>fsdfkl</p>
    </div>
  );
};

export default page;
