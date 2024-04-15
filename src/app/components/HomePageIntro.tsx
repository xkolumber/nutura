import Link from "next/link";
import React from "react";
import IconInstagram from "./Icons/IconInstagram";
import IconFacebook from "./Icons/IconFacebook";
import IconLinkedIn from "./Icons/IconLinkedIn";
import MenuPlusShopIcon from "./MenuPlusShopIcon";
import Image from "next/image";
import BackgroundVideo from "./BackgroundVideo";

const HomePageIntro = () => {
  return (
    <div className="z-[10000] flex flex-row overflow-hidden relative min-h-[700px] xl:min-h-screen">
      <div className="w-[80%] flex relative">
        <BackgroundVideo
          videoSource="https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/uvodne_video%2Fnutura_slowly.mp4?alt=media&token=7ed9137d-4cf6-4e72-b9de-0fdec56498af"
          placeholderImage="/placeholder.png"
        />
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={80}
          height={40}
          className="w-[9rem] md:w-[11rem] pt-4 absolute top-0 left-0 left_section_inside_margin "
        />
        <div className="absolute bottom-0 left_section_inside_margin pb-12">
          <h2 className="text-primary uppercase mb-2">
            Sprejová techonológia -
          </h2>
          <h2 className="text-primary uppercase">Špičková techonológia!</h2>
          <p className="max-w-[700px] mt-4 text-primary xl:mt-12">
            Perorálne spreje NUTURA® sú patentované systémy dodávajúce vysoké
            koncentrácie živín priamo do citlivého tkaniva úst a tým prenáša
            živiny do celého tela.
          </p>
          <Link href="/obchod">
            <button className="btn btn--primary xl:!mt-10 2xl:!mt-20 3xl:!text-[18px]">
              SHOP
            </button>
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
