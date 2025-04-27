"use client";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { ProductFirebase } from "../lib/all_interfaces";
import { GetAdminProductsOrder } from "../lib/functionsServer";
import ShopSection from "./ShopSection";

const ShopSectionData = () => {
  const { data, error, isLoading } = useQuery<ProductFirebase[]>({
    queryKey: ["products"],
    queryFn: () => GetAdminProductsOrder(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {data && <ShopSection data={data} />}
      {isLoading && (
        <div className="min-h-screen">
          <ClipLoader size={20} color={"#00000"} loading={true} />
        </div>
      )}
      {error && (
        <div className="main_section additional_padding">
          <p>Chyba pri načítaní dát.</p>
        </div>
      )}
    </div>
  );
};

export default ShopSectionData;
