import React from "react";
import Navbar from "../components/Navbar";
import ImageForPages from "../components/ImageForPages";
import Navbar2 from "../components/Navbar2";
import HomePageContactUs from "../components/HomePage/HomePageContactUs";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />
      <div className="mt-44 md:mt-16  ">
        <HomePageContactUs />
      </div>
      <Footer />
    </>
  );
};

export default page;
