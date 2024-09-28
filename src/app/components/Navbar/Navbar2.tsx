"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import useCartStore from "../../counter/store";
import Badge from "../Badge";
import IconHamburger from "../Icons/IconHamburger";
import NavbarSet from "./NavbarSet";
import NavbarShopIcon2 from "./NavbarShopIcon2";

const Navbar2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { itemCount } = useCartStore();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNavbarCancel = () => {
    setIsExpanded(!isExpanded);
  };

  const pathname = usePathname();

  return (
    <div className="w-full m-auto bg-primary flex fixed z-[2000] top-0 justify-center border-black border-b">
      <div className="max-w-[1920px] w-full ">
        <nav
          className={`navbar2  ${pathname.startsWith("/admin") && "!hidden"} `}
        >
          <Link href="/">
            <Image
              src={"/logo_green.svg"}
              alt="logo"
              width={80}
              height={40}
              priority
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
              className="logo_padding  w-fit max-h-[5rem] xl:max-h-[8rem]"
            />
          </Link>
          <div className="navbar_second_group2 left_padding">
            <Badge text={itemCount}>
              <Link href={"/kosik"}>
                <NavbarShopIcon2 />{" "}
              </Link>
            </Badge>

            <h5
              onClick={toggleNavbar}
              className={` hidden md:block  cursor-pointer font-bold uppercase`}
            >
              Menu
            </h5>
            <div onClick={toggleNavbar} className={` md:hidden cursor-pointer`}>
              <IconHamburger />
            </div>
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
        </nav>
      </div>
    </div>
  );
};

export default Navbar2;
