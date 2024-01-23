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
        <NavbarShopIcon />

        <div className="">
          <p onClick={onClick}>Zavrieť</p>
        </div>
      </div>
    </div>
  );
};
export default NavbarSet;
