"use client";
import StepBack from "@/app/components/StepBack";
import { AdminProduct } from "@/app/lib/all_interfaces";
import { GetAdminProductsLessNoCache } from "@/app/lib/functionsServer";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

const AdminProductsSection = () => {
  const { data, error, isLoading } = useQuery<AdminProduct[]>({
    queryKey: ["admin_products"],
    queryFn: () => GetAdminProductsLessNoCache(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className=" ">
        <div className="flex flex-row justify-between items-center">
          <h2>Produkty</h2>
          <StepBack />
        </div>
        <Link href="/admin/produkty/novy_produkt">
          <p className="underline">Pridať nový produkt</p>
        </Link>
        {isLoading && (
          <ClipLoader size={20} color={"#000000"} loading={isLoading} />
        )}
        {error && <p>Chyba pri načítaní dát.</p>}
        {data && (
          <table className="admin_section_products mt-8">
            <thead>
              <tr className="bg-tertiary">
                <th className="text-left">Názov</th>
                <th className="text-right md:mr-12">Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td className="text-left flex items-center">
                    {product.nazov}
                  </td>
                  <td className="flex justify-end">
                    <Link href={`/admin/produkty/${product.id} `}>
                      <button className="btn btn--secondary">Info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminProductsSection;
