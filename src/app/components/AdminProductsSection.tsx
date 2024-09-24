"use client";
import { useAuth } from "@/app/auth/Provider";
import StepBack from "@/app/components/StepBack";
import { AdminProduct } from "@/app/lib/all_interfaces";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  products: AdminProduct[];
}

const AdminProductsSection = ({ products }: Props) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  return (
    <>
      {user && (
        <>
          <div className=" ">
            <div className="flex flex-row justify-between items-center">
              <h2>Produkty</h2>
              <StepBack />
            </div>
            <Link href="/admin/produkty/novy_produkt">
              <p className="underline">Pridať nový produkt</p>
            </Link>
            {isLoadingAll ? (
              <ClipLoader size={20} color={"#32a8a0"} loading={isLoading} />
            ) : (
              <table className="admin_section_products mt-8">
                <thead>
                  <tr className="bg-tertiary">
                    <th className="text-left">Názov</th>
                    <th className="text-right md:mr-12">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
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
      )}
    </>
  );
};

export default AdminProductsSection;
