import React from "react";
import Navbar from "../components/Navbar";
import ImageForPages from "../components/ImageForPages";
import Navbar2 from "../components/Navbar2";
import HomePageContactUs from "../components/HomePageContactUs";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />
      <HomePageContactUs />
      <Footer />
    </>
  );
};

export default page;
