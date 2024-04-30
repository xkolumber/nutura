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
    <div className="image_for_pages">
      <nav className={`relavite  w-full flex justify-between h-full`}>
        <BackgroundVideoNavbar
          videoSource="https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/uvodne_video%2Fnutura_slowly.mp4?alt=media&token=7ed9137d-4cf6-4e72-b9de-0fdec56498af"
          placeholderImage="/placeholder_intro.jpg"
        />
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={80}
            height={40}
            className="w-[9rem] md:w-[11rem] pt-4 absolute top-0 left-0 left_section_inside_margin "
          />
        </Link>
        <div className="navbar_second_group2 absolute right-0 pt-12 ">
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
        {isExpanded && (
          <>
            <div className={`expanded-navbar relative overflow-hidden`}>
              <Image
                src={"/pomaranc.png"}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute bottom-[-90px] right-[-40px] opacity-50 rotate-[118deg] w-[40%]"
              />
              <NavbarSet onClick={toggleNavbarCancel} />
              <div className="main_section flex flex-col md:flex-row md:gap-48 2xl:gap-80 justify-between">
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
          </>
        )}
      </nav>
    </div>
  );
};

export default ImageForPages;
