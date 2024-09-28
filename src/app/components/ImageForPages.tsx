"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import NavbarShopIcon from "./Navbar/NavbarShopIcon";
import useCartStore from "../counter/store";
import { usePathname } from "next/navigation";
import IconHamburger from "./Icons/IconHamburger";
import NavbarSet from "./Navbar/NavbarSet";
import BackgroundVideoNavbar from "./BackgroundVideoNavbar";

const ImageForPages = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { itemCount } = useCartStore();

  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNavbarCancel = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`image_for_pages justify-center items-center w-full  ${
        (pathname === "/" || pathname.startsWith("/admin")) && "hidden"
      }`}
    >
      <div className="">
        <BackgroundVideoNavbar
          videoSource="https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/uvodne_video%2Fnutura_slowly.mp4?alt=media&token=7ed9137d-4cf6-4e72-b9de-0fdec56498af"
          placeholderImage="/placeholder_intro.jpg"
        />
        <nav
          className={`relavite own_edge w-full !flex-row flex !justify-between absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
        >
          <Link href="/" className="w-fit">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={80}
              height={40}
              priority
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
              className="w-fit max-h-[5rem] hidden md:block  xl:max-h-[8rem]   "
            />
          </Link>
          <div className="hidden md:flex navbar_second_group2 ">
            <div className="order-2 md:order-1">
              <Badge text={itemCount}>
                <Link href={"/kosik"}>
                  <NavbarShopIcon />{" "}
                </Link>
              </Badge>
            </div>

            <h5
              onClick={toggleNavbar}
              className={`${
                pathname === "/" ? "" : "!text-primary"
              } hidden md:block order-1 cursor-pointer font-bold uppercase`}
            >
              Menu
            </h5>
            <div
              onClick={toggleNavbar}
              className={`${
                pathname === "/" ? "" : "!text-primary"
              }order-1 md:order-2 md:hidden cursor-pointer`}
            >
              <IconHamburger />
            </div>
          </div>
        </nav>
      </div>
      {isExpanded && (
        <>
          <div className={`expanded-navbar  relative overflow-hidden`}>
            <Image
              src={"/pomaranc.png"}
              alt="logo"
              width={500}
              height={500}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 50vw"
              priority
              className="absolute bottom-0 md:bottom-[-90px] right-5 md:right-[-40px] opacity-50 rotate-[118deg] w-[40%]"
            />
            <div className="own_edge">
              <NavbarSet onClick={toggleNavbarCancel} />
              <div className="main_section  flex flex-col md:flex-row md:gap-48 2xl:gap-80 justify-between">
                <div className="flex flex-col justify-between md:gap-12">
                  <Link href="/obchod" onClick={toggleNavbar}>
                    <h2 className="hover-underline-animation ">Obchod</h2>
                  </Link>
                  <Link href="/ako-to-funguje" onClick={toggleNavbar}>
                    <h2>Ako to funguje</h2>
                  </Link>
                  <Link href="/blog" onClick={toggleNavbar}>
                    <h2>Blog</h2>
                  </Link>
                  <Link href="/kontakt" onClick={toggleNavbar}>
                    <h2>Kontakt</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageForPages;
