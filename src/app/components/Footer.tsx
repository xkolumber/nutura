import React from "react";
import IconLogo from "./Icons/IconLogo";
import IconFacebookFooter from "./Icons/IconFacebookFooter";
import IconLinkedInFooter from "./Icons/IconLinkedInFooter";
import IconInstagramFooter from "./Icons/IconInstagramFooter";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row bg-[#112F11] footer tight_section justify-between gap-4 ">
      <IconLogo />
      <div className="flex flex-col">
        <h5 className="text-primary mb-4">Kontakt</h5>
        <a href="tel:+421444455322">
          <p className="underline">+421 444 455 322</p>
        </a>
        <a href="mailto:info@nutrasprejovevitaminy.sk?subject=Otázka">
          <p className="underline">info@nutrasprejovevitaminy.sk</p>
        </a>
        <div className="flex flex-row mt-4 gap-2">
          <Link href={"https://www.facebook.com/profile.php?id=61553215864005"}>
            <IconFacebookFooter />
          </Link>
          <Link href={"https://www.instagram.com/nuturasprejovevitaminy/"}>
            <IconInstagramFooter />
          </Link>
        </div>
      </div>
      <div className="">
        <h5 className="mb-4">Fakturačné údaje</h5>
        <p>Solumate s.r.o</p>
        <p>IČO: 52492443</p>
        <p>DIČ: 2121043177</p>
      </div>
      <div className="">
        <h5 className="mb-4">Adresa</h5>
        <p>Pod kalváriou 678/38 941 23 </p>
        <p>Andovce</p>
        <Link
          href={"/obchodne-podmienky"}
          className="text-primary underline href"
        >
          VOP + GDPR
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
