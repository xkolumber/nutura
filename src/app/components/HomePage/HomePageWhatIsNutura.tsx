import Image from "next/image";
import React from "react";

const HomePageWhatIsNutura = () => {
  return (
    <div className="min-h-[500px] xl:min-h-[700px] 2xl:min-h-[900px] flex flex-col justify-center p-8  xl:m-12 border-secondary border rounded-[20px] relative ">
      <div className="flex items-center justify-center">
        <h1 className="uppercase max-w-[70%] text-center ">
          10 dôvodov prečo Nutura
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-16">
          <p>
            <b>1. Vysoká absorpcia</b>, takže minimálna strata cenných zložiek
          </p>
          <p>
            <b>2. Vysoká biologická dostupnosť</b> = okamžitý príjem ogranizmom
          </p>
          <p>
            <b>3. Už žiadny príjem</b> veľkých vitamánových tabliet, alebo{" "}
            <b>kapsúl</b>
          </p>
          <p>
            <b>4. Ľahko sa prenáša a berie kamkoľvek</b> bez potreby mať vodu,
            alebo potravu
          </p>
          <p>
            <b>5. Čisté suroviny</b> bez spojív, plnív, povlakových látok, alebo
            farbív
          </p>
          <p>
            <b>6. Všetky spreje</b> sú vhodné <b>pre vegetariánov</b>
          </p>
          <p>
            <b>7. Neprechádza tráviacim traktom</b>
          </p>
          <p>
            <b>8. Kosher </b>extra <b>záruka čistoty</b>
          </p>
          <p>
            <b>9. Bezpečné a ekonomické použitie</b> s príjemnou chuťou
          </p>
          <p>
            <b>10. Neobsahujú lepok, laktózu, ani GMO</b>
          </p>
        </div>
      </div>

      <Image
        src={"/divoka_ruza_left.png"}
        width={500}
        height={500}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 30vw"
        className="what_is_nutura_image1"
        alt="Produkt obrazok"
      />
      <Image
        src={"/divoka_ruza_right2.png"}
        width={500}
        height={500}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 30vw"
        className="what_is_nutura_image2"
        alt="Produkt obrazok"
      />
    </div>
  );
};

export default HomePageWhatIsNutura;
