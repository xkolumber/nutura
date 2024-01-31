"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarSet from "./NavbarSet";
import NavbarShopIcon from "./NavbarShopIcon";
import IconHamburger from "./IconHamburger";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const pathname = usePathname();

  console.log(pathname);

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
          className="left_section_inside w-full max-h-[7rem] xl:max-h-[8rem]"
        />
      </Link>
      <div className="navbar_second_group2">
        <div className="order-2 md:order-1">
          <NavbarShopIcon />
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
          <div className={`expanded-navbar`}>
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
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
