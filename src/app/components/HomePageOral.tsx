import React from "react";
import Image from "next/image";

const HomePageOral = () => {
  return (
    <div>
      <h1 className="uppercase mt-8 md:mt-12 md:max-w-[70%] xl:max-w-[60%]">
        Ako funguje perorálne vstrebávanie
      </h1>
      <p className="md:max-w-[50%]">
        Ústne spreje NUTURA® majú netoxickú aerosólovú sprejovú pumpu (bez
        hnacích plynov), ktorá umožňuje vstrebávanie najčistejšej formy
        vitamínov, minerálov, bylín a iných výživových doplnkov v tekutej forme
        priamo do tela.
      </p>
      <br />
      <p className="md:max-w-[50%]">
        Pri nastriekaní do úst sa mikroguličky alebo kvapôčky okamžite absorbujú
        do tkaniva cez kapiláry, ktoré sú umiestnené v ústach blízko povrchu
        sliznice. Tento proces umožňuje rýchle a efektívne vstrebávanie živín v
        priebehu niekoľkých sekúnd.
      </p>
      <div className="flex justfy-center w-full justify-center items-center mt-8 md:mt-16">
        <Image
          src={"/explenation.svg"}
          width={500}
          height={500}
          className="w-full max-w-[1200px] h-full object-cover"
          alt="Intro produktového obrázku"
        />
      </div>
    </div>
  );
};

export default HomePageOral;
