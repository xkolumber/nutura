"use client";

import { useEffect, useState } from "react";

import NavbarHamburger from "./NavbarHamburger";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";
import { Elsie_Swash_Caps } from "next/font/google";
import Image from "next/image";
import NavbarSet from "./NavbarSet";
import NavbarShopIcon from "./NavbarShopIcon";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [whiteColor, setWhiteColor] = useState("");

  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNavbarCancel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`navbar `}>
      <Link href="/">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={80}
          height={40}
          className="left_section_inside w-full max-h-[23rem]"
        />
      </Link>
      <div className="navbar_second_group right_section_inside">
        <NavbarShopIcon />

        <div className="">
          <p onClick={toggleNavbar}>Menu</p>
          {/* <NavbarHamburger onClick={toggleNavbar} /> */}
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
                <Link href="/o_mykorhize" onClick={toggleNavbar}>
                  <h2>Ako to funguje</h2>
                </Link>
                <Link href="/o_nas" onClick={toggleNavbar}>
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

export default Navbar;
