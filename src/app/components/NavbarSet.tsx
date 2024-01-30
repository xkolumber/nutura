import Link from "next/link";

import Image from "next/image";
import NavbarShopIcon from "./NavbarShopIcon";

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
          className="left_section_inside w-full max-h-[23rem]"
        />
      </Link>
      <div className="navbar_second_group right_section_inside">
        <div className="order-2 md:order-1">
          <NavbarShopIcon />
        </div>

        <div className="order-1 md:order-2 cursor-pointer">
          <p onClick={onClick}>Zavrieť</p>
        </div>
      </div>
    </div>
  );
};
export default NavbarSet;
