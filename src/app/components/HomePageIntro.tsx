import Link from "next/link";
import React from "react";
import IconInstagram from "./IconInstagram";
import IconFacebook from "./IconFacebook";
import IconLinkedIn from "./IconLinkedIn";

const HomePageIntro = () => {
  return (
    <div className="relative">
      <div className="intro_image left_section_inside bottom_section_inside">
        <h2 className="text-primary uppercase">Sprejová techonológia -</h2>
        <h2 className="text-primary uppercase">Špičková techonológia!</h2>
        <p className="max-w-[700px] mt-4 text-primary">
          Perorálne spreje NUTURA® sú patentované systémy dodávajúce vysoké
          koncentrácie živín priamo do citlivého tkaniva úst a tým prenáša
          živiny do celého tela.
        </p>
        <Link href="/obchod">
          <button className="btn btn--primary !mt-20">SHOP</button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row absolute bottom-0 right-0 right_section_inside gap-4">
        <IconFacebook />
        <IconLinkedIn />
        <IconInstagram />
      </div>
    </div>
  );
};

export default HomePageIntro;
