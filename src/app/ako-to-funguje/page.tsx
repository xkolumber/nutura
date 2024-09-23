import React from "react";
import Image from "next/image";
import HomePageAbsorption from "../components/HomePage/HomePageAbsorption";
import HomePageOral from "../components/HomePage/HomePageOral";
import ImageForPages from "../components/ImageForPages";
import Navbar2 from "../components/Navbar/Navbar2";
import Navbar from "../components/Navbar/Navbar";
import IconDostupnost from "../components/Icons/IconDostupnost";
import IconPrehlasenie from "../components/Icons/IconPrehlasenie";
import IconVyhodnost from "../components/Icons/IconVyhodnost";
import IconSpolahlivost from "../components/Icons/IconSpolahlivost";
import IconTrvanlivost from "../components/Icons/IconTrvanlivost";
import Footer from "../components/Footer";

const page = () => {
  const benefits = [
    {
      icon: <IconDostupnost />,
      title: "Dostupnosť",
      description:
        "Aktívne zložky našich sprejových výživových doplnkov sú úplne rozpustené v rozprašovacom roztoku a sú okamžite využiteľné pre organizmus.",
    },
    {
      icon: <IconPrehlasenie />,
      title: "Prehlásenie",
      description:
        "Používame len tie najkvalitnejšie certifikované suroviny. Všetky naše produkty sú zostavené odborníkmi na výživu podľa najnovších vedeckých poznatkov.",
    },
    {
      icon: <IconVyhodnost />,
      title: "Výhodnosť",
      description:
        "Naše spreje sa ľahko nosia v taške alebo vo vrecku. Sú ideálne na cestovanie a dokonca sú povolené na transport leteckou dopravou. Môžu sa užívať bez konzumácie jedál a nápojov.",
    },
    {
      icon: <IconSpolahlivost />,
      title: "Spoľahlivosť",
      description:
        "Všetky naše produkty sú vyrábané v súlade s kontrolovanými postupmi GMP a v súlade s americkým FDA, holandskými a EU predpismi.",
    },
    {
      icon: <IconTrvanlivost />,
      title: "Trvanlivosť",
      description:
        "Každé balenie vystačí na 30 dní (8 sprejových dávok denne). Každá sprejová dávka poskytuje presne stanovené množstvo prispôsobené produktu a Vašim potrebám.",
    },
  ];
  return (
    <>
      <div className="main_section mt-16 md:mt-0">
        <h1>SPREJOVÉ VITAMÍNY – ROZDIEL MEDZI PRÍJMOM A VSTREBÁVANÍM!</h1>
        <div className="flex w-full  justify-center">
          <p className="xl:max-w-[600px] mt-12 md:mt-24">
            Milióny z nás po celé roky užívajú tablety pre doplnenie svojich
            výživových potrieb. Tým sme si vytvorili rituál, kedy tablety
            prehltneme s pohárom vody, pričom v ústach zostáva kriedová chuť, v
            žalúdku pocit ťažoby, alebo sa nám tablety dokonca „zaseknú“ v
            pažeráku. <br />
            <br />
            Bez ohľadu na veľkosť alebo tvar, či už ide o gélové kapsuly alebo
            poťahované tablety, pre mnohých je to záťaž a neľahká úloha. <br />
            <br />
            Zamyslite sa nad tým, koľko ľudí poznáte, ktorí neužívajú vitamíny
            len preto, že nemôžu alebo neradi prehĺtajú tablety. Je tu revolučný
            spôsob, ako užívať vitamíny, minerály a ďalšie výživové doplnky –
            prostredníctvom perorálneho vstrebávania! <br />
            <br />
            &quot;Perorálne vstrebávanie je najrýchlejší, najefektívnejší a
            najpohodlnejší spôsob, ako získať dennú dávku vitamínov, minerálov a
            iných doplnkov výživy.&quot;
          </p>
        </div>
        <Image
          src={"/how--works.jpg"}
          width={1000}
          height={1000}
          quality={100}
          className="w-full h-full object-cover rounded-[20px] mt-12 md:mt-20  mb-12 md:mb-20"
          alt="Intro produktového obrázku"
        />
        <h1 className="uppercase text-left mt-8 xl:mt-40">Výhody</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-8 xl:gap-8 2xl:gap-20">
          {benefits.map((benefit, index) => (
            <div className="flex flex-col  mb-8" key={index}>
              <div className="circle_icon">{benefit.icon}</div>

              <h5 className="text-secondary max-w-[167px]  uppercase mt-4">
                {benefit.title}
              </h5>
              <p className="2xl:text-[16px]">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 xl:mt-[15rem] 3xl:mt-[20rem]">
          <HomePageOral />
        </div>
      </div>

      <div className="mb-12 xl:mb-16">
        <HomePageAbsorption />
      </div>

      <Footer />
    </>
  );
};

export default page;
