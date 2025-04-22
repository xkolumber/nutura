import React from "react";
import Image from "next/image";

const HomePageOral = () => {
  return (
    <div className="section_space">
      <h1 className="uppercase mt-8 md:mt-12 md:max-w-[70%] xl:max-w-[60%] ">
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
          src={
            "https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/web%2Fpozadie_info.svg?alt=media&token=57258fc7-620e-4918-87f5-224c3cc24f5b"
          }
          width={500}
          height={500}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 70vw"
          className="w-full max-w-[1200px] h-full object-cover hidden md:flex"
          alt="Intro produktového obrázku"
          priority
        />
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/web%2Fpozadie_info_m.svg?alt=media&token=aa584ec8-c395-4bf7-ac50-7a7e51859bf8"
          }
          width={500}
          height={500}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 50vw"
          className="w-full max-w-[1200px] h-full object-cover md:hidden"
          alt="Intro produktového obrázku"
          priority
        />
      </div>
    </div>
  );
};

export default HomePageOral;
