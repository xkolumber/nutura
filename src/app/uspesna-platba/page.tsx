"use client";
import React, { useEffect, useState } from "react";
import ImageForPages from "../components/ImageForPages";
import Navbar2 from "../components/Navbar2";
import Link from "next/link";
import Confetti from "react-dom-confetti";

const Page = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 6000,
    stagger: 3,
    width: "19px",
    height: "10px",
    perspective: "577px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  useEffect(() => {
    setPaymentSuccess(true);
  }, []);

  return (
    <>
      <Confetti active={paymentSuccess} config={config} />
      <ImageForPages />
      <Navbar2 />

      <div className="main_section additional_padding min-h-[500px] xl:min-h-screen justify-center items-center flex flex-col">
        <h2 className="text-center">Ďakujeme za Vašu objednávku.</h2>
        <p className="mt-4 xl:text-[20px] text-center">
          Informácie o ďalšom postupe Vám boli zaslané na Váš email.
        </p>
        <Link href={"/"}>
          <button className="btn btn--secondary">Domov</button>
        </Link>
      </div>
    </>
  );
};

export default Page;
