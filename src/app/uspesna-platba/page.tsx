"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useCartStore from "../counter/store";

const Page = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const [id, setId] = useState("");
  const [refId, setRefId] = useState("");

  const FetchParams = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
      const idFromParams = searchParams.get("id");
      const refIdFromParams = searchParams.get("refId");

      if (idFromParams && refIdFromParams) {
        setId(idFromParams);
        setRefId(refIdFromParams);
      }
    }, [searchParams]);

    return null;
  };

  const checkPayment = async () => {
    const response = await fetch("/api/comgate-check-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: id,
        refId: refId,
      }),
    });

    if (response.status === 200) {
      return "success";
    } else {
      return "fail";
    }
  };

  useEffect(() => {
    const doFinalStuff = async () => {
      clearCart();
      if (id !== "" && refId !== "") {
        await checkPayment();
      }
    };
    doFinalStuff();
  }, [id, refId]);

  return (
    <div className="main_section additional_padding min-h-[500px] xl:min-h-screen justify-center items-center flex flex-col">
      <h2 className="text-center">Ďakujeme za Vašu objednávku.</h2>
      <p className="mt-4 xl:text-[20px]">
        Informácie o ďalšom postupe Vám boli zaslané na Váš email.
      </p>
      <Link href={"/"}>
        <button className="btn btn--secondary">Domov</button>
      </Link>
      <Suspense fallback={<div></div>}>
        <FetchParams />
      </Suspense>
    </div>
  );
};

export default Page;
