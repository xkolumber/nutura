"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "../auth/Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col w-[350px] bg-tertiary items-center ">
        <div className="sticky top-0 flex justify-between flex-col min-h-screen">
          <div className="">
            <Image
              src={"/logo_green.svg"}
              alt="logo"
              width={80}
              height={40}
              className=" w-full h-16 2xl:h-20 mt-8 mb-8"
            />
            <Image
              src={"/first_article.jpg"}
              quality={100}
              priority={true}
              alt="Alena Klicova - fotka"
              width={150}
              height={150}
              className="w-[100px] h-[100px] 2xl:w-[144px] 2xl:h-[144px] rounded-full "
            />

            <Link href={"/admin"}>
              <h5 className="text-secondary mt-8 text-center">Admin</h5>
            </Link>
            <div className="flex flex-col mt-16 gap-4">
              <Link href={"/admin"}>
                <h6
                  className={`text-secondary  ${
                    pathname === "/admin" && "!font-bold underline"
                  }`}
                >
                  Platby
                </h6>
              </Link>
              <Link href="/admin/zlavove_kody">
                <h6
                  className={`text-secondary ${
                    pathname.startsWith("/admin/zlavove_kody") &&
                    "!font-bold underline"
                  }`}
                >
                  Zľavové kódy
                </h6>
              </Link>
              <Link href={"/admin/produkty"}>
                <h6
                  className={`text-secondary ${
                    pathname.startsWith("/admin/produkty") &&
                    "!font-bold underline"
                  }`}
                >
                  Produkty
                </h6>
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-black !font-semibold cursor-pointer btn btn--secondary  !mb-8 "
          >
            Odhlásiť sa
          </button>
        </div>
      </div>
      <div className=" w-full own_edge !justify-start !m-[inherit]">
        <div className="main_section">{children}</div>
      </div>
    </div>
  );
}
