import Link from "next/link";

import Image from "next/image";
import useCartStore from "../counter/store";
import Badge from "./Badge";
import CloseButton from "./IconCloseButton";
import NavbarShopIcon2 from "./NavbarShopIcon2";

interface Props {
  onClick?: () => void;
}

const NavbarSet = ({ onClick }: Props) => {
  const { itemCount } = useCartStore();
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
          <Link href={"/kosik"}>
            <NavbarShopIcon2 />{" "}
          </Link>
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
