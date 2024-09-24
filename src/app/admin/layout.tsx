"use client";
import React from "react";
import AdminHeader from "../components/AdminSection/AdminHeader";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../auth/Provider";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col w-[350px] bg-tertiary items-center ">
        <div className="sticky top-0">
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
            width={0}
            height={0}
            sizes="100vw"
            className="w-[100px] h-[100px] 2xl:w-[144px] 2xl:h-[144px] rounded-full "
          />

          <Link href={"/admin"}>
            <h5 className="text-secondary mt-8">Admin</h5>
          </Link>
          <div className="flex flex-col mt-16 gap-4">
            <Link href={"/admin"}>
              <h6
                className={`text-secondary ${
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
          <button
            onClick={handleLogout}
            className="text-black !font-semibold cursor-pointer btn btn--secondary !mt-[30rem] !mb-8 "
          >
            Odhlásiť sa
          </button>
        </div>
      </div>
      <div className=" w-full">
        <div className="main_section">{children}</div>
      </div>
    </div>
  );
}
