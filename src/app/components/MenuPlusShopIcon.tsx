"use client";
import React, { useState } from "react";
import NavbarShopIcon from "./NavbarShopIcon";
import IconHamburger from "./IconHamburger";
import NavbarSet from "./NavbarSet";
import Link from "next/link";
import Badge from "./Badge";
import useCartStore from "../counter/store";

const MenuPlusShopIcon = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { itemCount } = useCartStore();
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleNavbarCancel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="navbar_second_group2_intro mt-10">
      <div className="order-2 md:order-1">
        <Badge text={itemCount}>
          <NavbarShopIcon />
        </Badge>
      </div>

      <h5
        onClick={toggleNavbar}
        className={` hidden md:block order-1 cursor-pointer font-bold uppercase`}
      >
        Menu
      </h5>
      <div
        onClick={toggleNavbar}
        className={`order-1 md:order-2 md:hidden cursor-pointer`}
      >
        <IconHamburger />
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

              <div className="flex flex-row gap-4 md:hidden">
                <p className="">SK</p>
                <p className="">CZ</p>
                <p className="">EN</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuPlusShopIcon;
