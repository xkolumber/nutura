import React from "react";
import IconLogo from "./Icons/IconLogo";
import IconFacebookFooter from "./Icons/IconFacebookFooter";
import IconLinkedInFooter from "./Icons/IconLinkedInFooter";
import IconInstagramFooter from "./Icons/IconInstagramFooter";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row bg-[#112F11] footer tight_section justify-between gap-10 md:gap-4 ">
      <div className="flex flex-col">
        <IconLogo />
      </div>

      <div className="flex flex-col">
        <h5 className="text-primary mb-2">Kontakt</h5>
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
        <h5 className="mb-2">Fakturačné údaje</h5>
        <p>Enmery s.r.o.</p>
        <p>IČO: 52492443</p>
        <p>DIČ: 2121043177</p>
      </div>

      <div className="">
        <h5 className="mb-2">Adresa</h5>
        <p>Hviezdoslavova 1781/22, 953 01 </p>
        <p>Zlaté Moravce</p>
        <Link
          href={"/obchodne-podmienky"}
          className="text-primary underline href"
        >
          VOP + GDPR
        </Link>

        <div className="flex flex-row gap-4 mt-4  scale-90 2xl:scale-100">
          <Image
            src={"/comgate.svg"}
            alt="comgate logo"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 30px"
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
          <Image
            src={"/mastercard.svg"}
            alt="comgate logo"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 30px"
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
          <Image
            src={"/visa.svg"}
            alt="comgate logo"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 30px"
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
          <Image
            src={"/apple-pay-white.svg"}
            alt="comgate logo"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 30px"
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
          <Image
            src={"/google-pay-test.svg"}
            alt="comgate logo"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 30px"
            width={40}
            height={40}
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
