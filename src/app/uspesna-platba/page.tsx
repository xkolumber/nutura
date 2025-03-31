"use client";

import Link from "next/link";
import { useEffect } from "react";
import useCartStore from "../counter/store";

const Page = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="main_section additional_padding min-h-[500px] xl:min-h-screen justify-center items-center flex flex-col">
      <h2 className="text-center">Ďakujeme za Vašu objednávku.</h2>
      <p className="mt-4 xl:text-[20px] text-center">
        Informácie o ďalšom postupe Vám boli zaslané na Váš email.
      </p>
      <Link href={"/"}>
        <button className="btn btn--secondary">Domov</button>
      </Link>
    </div>
  );
};

export default Page;
