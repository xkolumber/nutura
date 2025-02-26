"use client";
import React from "react";
import { ProductFirebase } from "../lib/all_interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAdminCertainProduct } from "../lib/functionsServer";
import ProductPage from "./ProductPage";
import { ClipLoader } from "react-spinners";

interface Props {
  slug: string;
}

const ProductPageServer = ({ slug }: Props) => {
  const queryClient = useQueryClient();

  const cachedElements =
    queryClient.getQueryData<ProductFirebase[]>(["products"]) || [];
  const cachedElement = cachedElements.find((object) => object.slug === slug);
  const directCachedElement = queryClient.getQueryData<ProductFirebase>([
    "products",
    slug,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    error,
    isLoading,
  } = useQuery<ProductFirebase | null>({
    queryKey: ["products", slug],
    queryFn: async () => await GetAdminCertainProduct(slug),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !initialElementData,
  });
  return (
    <div>
      {data && <ProductPage data={data} />}
      {isLoading && (
        <div className="own_edge">
          <div className="main_section mt-16 md:mt-0">
            <ClipLoader size={20} color={"#00000"} loading={true} />
          </div>
        </div>
      )}
      {error && (
        <div className="own_edge">
          <div className="main_section mt-16 md:mt-0">
            <p>Chyba pri načítaní dát.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPageServer;
