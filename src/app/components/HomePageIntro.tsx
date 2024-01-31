import Link from "next/link";
import React from "react";
import IconInstagram from "./IconInstagram";
import IconFacebook from "./IconFacebook";
import IconLinkedIn from "./IconLinkedIn";
import MenuPlusShopIcon from "./MenuPlusShopIcon";
import Image from "next/image";

const HomePageIntro = () => {
  return (
    <div className="relative z-50 flex flex-row">
      <div className="intro_image left_section_inside bottom_section_inside flex flex-col">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={80}
          height={40}
          className="w-[9rem] md:w-[11rem] pt-4 "
        />
        <div className="">
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
      </div>
      <div className="flex w-[20%] bg-primary flex-col justify-between items-center">
        {/* <div className="flex flex-col md:flex-row absolute bottom-0 right-0 right_section_inside gap-4"> */}
        <MenuPlusShopIcon />
        <div className="flex flex-col w-full md:flex-row gap-4 3xl:gap-8 justify-center items-center">
          <IconFacebook />
          <IconLinkedIn />
          <IconInstagram />
        </div>
      </div>
    </div>
  );
};

export default HomePageIntro;
