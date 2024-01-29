import React from "react";
import Image from "next/image";
import HomePageIntro from "./components/HomePageIntro";
import HomePageProducts from "./components/HomePageProducts";
import HomePageWhatIsNutura from "./components/HomePageWhatIsNutura";
import HomePageBenefits from "./components/HomePageBenefits";
import { client } from "./lib/sanity";
import { Product } from "./lib/interface_product";

async function getProducts() {
  const query = `*[_type == "product"]`;
  const data = await client.fetch(query);
  return data;
}

const page = async () => {
  const data_products = (await getProducts()) as Product[];
  return (
    <div>
      <HomePageIntro />
      <div className="main_section">
        <HomePageProducts products={data_products} />
      </div>
      <HomePageWhatIsNutura />
      <HomePageBenefits />
      <p>fsdfkl</p>
      <p>fsdfkl</p>
      <p>fsdfkl</p>
      <p>fsdfkl</p>
    </div>
  );
};

export default page;
