"use client";
import { useAuth } from "@/app/auth/Provider";
import AdminHeader from "@/app/components/AdminHeader";
import StepBack from "@/app/components/StepBack";
import { auth } from "@/app/firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export interface AdminProduct {
  id: string;
  nazov: string;
  slug: string;
}

const Page = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const [products, setProducts] = useState<AdminProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(auth.app);
      const paymentCollectionRef = collection(db, "produkty");

      try {
        setIsLoadingAll(true);
        const paymentSnapshot = await getDocs(paymentCollectionRef);

        const productss: AdminProduct[] = [];
        paymentSnapshot.forEach((doc) => {
          const promoData = doc.data() as AdminProduct;
          const promoId = doc.id;
          const promoWithId: AdminProduct = { ...promoData, id: promoId };
          productss.push(promoWithId);
        });

        if (productss.length > 0) {
          setProducts(productss);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      } finally {
        setIsLoadingAll(false);
      }
    };

    fetchProducts();
  }, []);

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
                        <Link href={`/admin/produkty/${product.slug} `}>
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

export default Page;
