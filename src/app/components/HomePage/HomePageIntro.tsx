import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "../BackgroundVideo";
import IconFacebook from "../Icons/IconFacebook";
import IconInstagram from "../Icons/IconInstagram";
import MenuPlusShopIcon from "../MenuPlusShopIcon";

const HomePageIntro = () => {
  return (
    <div className="z-[9000] flex flex-row overflow-hidden relative min-h-[700px] xl:min-h-screen">
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
          className="w-fit max-h-[5rem]  xl:max-h-[8rem] absolute top-0 left-0 logo_padding "
        />

        <div className="absolute bottom-0 own_edge !pb-12 2xl:!pb-24">
          <h2 className="text-primary uppercase mb-2">
            Sprejová technológia -
          </h2>
          <h2 className="text-primary uppercase">Špičková technológia!</h2>
          <p className="max-w-[700px] mt-4 text-primary xl:mt-12 3xl:text-[22px]">
            Perorálne spreje NUTURA® sú patentované systémy dodávajúce vysoké
            koncentrácie živín priamo do citlivého tkaniva úst a tým prenášajúce
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
        <div className="flex flex-col w-full md:flex-row gap-4 3xl:gap-8 justify-center items-center md:mb-2">
          <Link href={"https://www.facebook.com/profile.php?id=61553215864005"}>
            <IconFacebook />
          </Link>
          <Link href={"https://www.instagram.com/nuturasprejovevitaminy/"}>
            <IconInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageIntro;
