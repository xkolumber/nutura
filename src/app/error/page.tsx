import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="main_section additional_padding min-h-[500px] xl:min-h-screen justify-center items-center flex flex-col">
      <h2 className="text-center">Ľutujeme, zadaná stránka sa nenašla.</h2>
      <p className="text-center mt-8">
        Ak ste klikni na odkaz z Google, a zobrazila sa Vám táto stránka, je to
        z dôvodu že web má nový vzhľad a štuktúru. Pôvodné odkazy už neexistujú,
        sú nahradené novými. Obsah v Google sa bude postupne aktualizovať.
        Pokračujte kliknutím na &apos;Domov&apos; alebo &apos;Eshop&apos;.
        Ďakujeme za pochopenie.
      </p>
      <div className="flex flew-row gap-6">
        <a href="/" className="btn btn--secondary">
          Domov
        </a>
        <a href="/eshop" className="btn btn--secondary">
          Eshop
        </a>
      </div>
    </div>
  );
};

export default page;
