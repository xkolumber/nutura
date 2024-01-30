import React from "react";
import Image from "next/image";
import HomePageAbsorption from "../components/HomePageAbsorption";
import HomePageOral from "../components/HomePageOral";

const page = () => {
  const benefits = [
    {
      title: "Dostupnosť",
      description:
        "Aktívne zložky našich sprejových výživových doplnkov sú úplne rozpustené v rozprašovacom roztoku a sú okamžite využiteľné pre organizmus.",
    },
    {
      title: "Prehlásenie",
      description:
        "Používame len tie najkvalitnejšie certifikované suroviny. Všetky naše produkty sú zostavené odborníkmi na výživu podľa najnovších vedeckých poznatkov.",
    },
    {
      title: "Výhodnosť",
      description:
        "Naše spreje sa ľahko nosia v taške alebo vo vrecku. Sú ideálne na cestovanie a dokonca sú povolené na transport leteckou dopravou. Môžu sa užívať bez konzumácie jedál a nápojov.",
    },
    {
      title: "Spoľahlivosť",
      description:
        "Všetky naše produkty sú vyrábané v súlade s kontrolovanými postupmi GMP a v súlade s americkým FDA, holandskými a EU predpismi.",
    },
    {
      title: "Trvanlivosť",
      description:
        "Každé balenie vystačí na 30 dní (8 sprejových dávok denne). Každá sprejová dávka poskytuje presne stanovené množstvo prispôsobené produktu a Vašim potrebám.",
    },
  ];
  return (
    <>
      <Image
        src={"/intro.jpg"}
        width={500}
        height={500}
        className="w-full h-[267px] object-cover"
        alt="Intro produktového obrázku"
      />
      <div className="main_section">
        <h1>SPREJOVÉ VITAMÍNY – ROZDIEL MEDZI PRÍJMOM A VSTREBÁVANÍM!</h1>
        <div className="flex w-full  justify-center">
          <p className="xl:max-w-[600px] mt-24 mb-40">
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
            "Perorálne vstrebávanie je najrýchlejší, najefektívnejší a
            najpohodlnejší spôsob, ako získať dennú dávku vitamínov, minerálov a
            iných doplnkov výživy."
          </p>
        </div>
        <Image
          src={"/how_works.jpg"}
          width={500}
          height={500}
          className="w-full h-full object-cover"
          alt="Intro produktového obrázku"
        />
        <h1 className="uppercase text-left mt-8 xl:mt-40">Výhody</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-8 xl:gap-8 2xl:gap-20">
          {benefits.map((benefit, index) => (
            <div className="flex flex-col  mb-8" key={index}>
              <Image
                src={"/plus.svg"}
                width={50}
                height={50}
                className="w-20 h-20 object-cover"
                alt="Intro produktového obrázku"
              />
              <h5 className="text-secondary max-w-[167px]  uppercase mt-4">
                {benefit.title}
              </h5>
              <p className="2xl:text-[16px]">{benefit.description}</p>
            </div>
          ))}
        </div>
        <HomePageOral />
      </div>
      <HomePageAbsorption />
    </>
  );
};

export default page;
