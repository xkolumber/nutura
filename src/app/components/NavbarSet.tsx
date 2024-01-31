import Link from "next/link";

import Image from "next/image";
import NavbarShopIcon from "./NavbarShopIcon";
import NavbarShopIcon2 from "./NavbarShopIcon2";
import CloseButton from "./IconCloseButton";

interface Props {
  onClick?: () => void;
}

const NavbarSet = ({ onClick }: Props) => {
  return (
    <div className={`navbar_set`}>
      <Link href="/">
        <Image
          src={"/logo_green.svg"}
          alt="logo"
          width={80}
          height={40}
          className="left_section_inside w-full max-h-[7rem] xl:max-h-[8rem]"
        />
      </Link>
      <div className="navbar_second_group2 -mt-4">
        <div className="order-1 md:order-1">
          <NavbarShopIcon2 />
        </div>

        <div className="order-2 md:hidden" onClick={onClick}>
          <CloseButton />
        </div>

        <h5
          onClick={onClick}
          className="order-1 md:order-2 cursor-pointer font-bold uppercase hidden md:flex"
        >
          Zavrieť
        </h5>
      </div>
    </div>
  );
};
export default NavbarSet;
