"use client";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { GetAdminProductsOrder } from "@/app/lib/functionsServer";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import HomePageProducts from "./HomePageProducts";

const HomePageProductsServer = () => {
  const { data, error, isLoading } = useQuery<ProductFirebase[]>({
    queryKey: ["products"],
    queryFn: () => GetAdminProductsOrder(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {data && <HomePageProducts data={data} />}
      {isLoading && (
        <div className="main_section !pt-0 min-h-[400px]">
          <ClipLoader size={20} color={"#00000"} loading={true} />
        </div>
      )}
      {error && (
        <div className="main_section">
          <p>Chyba pri načítaní dát.</p>
        </div>
      )}
    </>
  );
};

export default HomePageProductsServer;
