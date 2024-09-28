import Link from "next/link";

import Image from "next/image";
import useCartStore from "../../counter/store";
import Badge from "../Badge";
import CloseButton from "../Icons/IconCloseButton";
import NavbarShopIcon2 from "./NavbarShopIcon2";

interface Props {
  onClick?: () => void;
}

const NavbarSet = ({ onClick }: Props) => {
  const { itemCount } = useCartStore();
  return (
    <div className="own_edge top-0 right-0 left-0 absolute">
      <div className="navbar_set">
        <Link href="/" className="w-fit">
          <Image
            src={"/logo_green.svg"}
            alt="logo"
            width={80}
            height={40}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
            className=" w-fit max-h-[5rem] xl:max-h-[8rem]"
          />
        </Link>
        <div className="navbar_second_group2 ">
          <div className="order-1 md:order-1">
            <Badge text={itemCount}>
              <Link href={"/kosik"}>
                <NavbarShopIcon2 />{" "}
              </Link>
            </Badge>
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
    </div>
  );
};
export default NavbarSet;
