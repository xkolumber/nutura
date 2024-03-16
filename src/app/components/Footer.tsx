import React from "react";
import IconLogo from "./IconLogo";
import IconFacebook from "./IconFacebook";
import IconLinkedIn from "./IconLinkedIn";
import IconInstagram from "./IconInstagram";
import IconFacebookFooter from "./IconFacebookFooter";
import IconLinkedInFooter from "./IconLinkedInFooter";
import IconInstagramFooter from "./IconInstagramFooter";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row bg-[#112F11] footer main_section justify-between gap-4">
      <IconLogo />
      <div className="flex flex-col">
        <h5 className="text-primary mb-4">Kontakt</h5>
        <p className="underline">+421 444 455 322</p>
        <p className="underline">nutura@gmail.com</p>
        <div className="flex flex-row mt-4 gap-2">
          <IconFacebookFooter />
          <IconLinkedInFooter />
          <IconInstagramFooter />
        </div>
      </div>
      <div className="">
        <h5 className="mb-4">Fakturačné údaje</h5>
        <p>IČO: 802932</p>
        <p>DIČ: 802932556666</p>
      </div>
      <div className="">
        <h5 className="mb-4">Adresa</h5>
        <p>Hlavná 1, Bratislava</p>
        <p>90222</p>
      </div>
    </footer>
  );
};

export default Footer;
