"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarSet from "./NavbarSet";
import NavbarShopIcon from "./NavbarShopIcon";
import IconHamburger from "./IconHamburger";
import NavbarShopIcon2 from "./NavbarShopIcon2";

const Navbar2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [whiteColor, setWhiteColor] = useState("");

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNavbarCancel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`navbar2 `}>
      <Link href="/">
        <Image
          src={"/logo_green.svg"}
          alt="logo"
          width={80}
          height={40}
          className="left_section_inside w-full max-h-[23rem]"
        />
      </Link>
      <div className="navbar_second_group2 right_section_inside">
        <NavbarShopIcon2 />

        <p
          onClick={toggleNavbar}
          className={` hidden md:block  cursor-pointer font-bold uppercase`}
        >
          Menu
        </p>
        <div onClick={toggleNavbar} className={` md:hidden cursor-pointer`}>
          <IconHamburger />
        </div>
      </div>
      {isExpanded && (
        <>
          <div className={`expanded-navbar ${whiteColor}`}>
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
                <Link href="/eshop" onClick={toggleNavbar}>
                  <h2>Kontakt</h2>
                </Link>
              </div>

              <div className="flex flex-row gap-4 md:hidden">
                <p className="">SK</p>
                <p className="">CZ</p>
                <p className="">EN</p>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar2;
