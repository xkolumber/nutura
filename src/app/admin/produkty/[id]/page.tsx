"use client";
import ProductAdmin from "@/app/components/ProductAdmin";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { GetAdminProductIdNoCache } from "@/app/lib/functionsServer";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useQuery<ProductFirebase | undefined>({
    queryKey: ["admin_products", params.id],
    queryFn: () => GetAdminProductIdNoCache(params.id),
  });

  return (
    <>
      {error && <p>Chyba pri načítaní dát.</p>}
      {isLoading && (
        <ClipLoader size={20} color={"#000000"} loading={isLoading} />
      )}
      {data && <ProductAdmin data={data} />}
    </>
  );
};

export default Page;
