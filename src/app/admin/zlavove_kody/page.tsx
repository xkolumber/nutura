"use client";
import { useAuth } from "@/app/auth/Provider";
import AdminHeader from "@/app/components/AdminHeader";
import StepBack from "@/app/components/StepBack";
import { auth } from "@/app/firebase/config";
import { PromoCode } from "@/app/lib/all_interfaces";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      const db = getFirestore(auth.app);
      const paymentCollectionRef = collection(db, "zlavove_kody");

      try {
        setIsLoadingAll(true);
        const paymentSnapshot = await getDocs(paymentCollectionRef);

        const paymentData: PromoCode[] = [];
        paymentSnapshot.forEach((doc) => {
          const promoData = doc.data() as PromoCode;
          const promoId = doc.id;
          const promoWithId: PromoCode = { ...promoData, id: promoId };
          paymentData.push(promoWithId);
        });

        if (paymentData.length > 0) {
          setPromoCodes(paymentData);
        } else {
          setPromoCodes([]);
        }
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      } finally {
        setIsLoadingAll(false);
      }
    };

    fetchPromoCodes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const db = getFirestore(auth.app);
      const promoDocRef = doc(db, "zlavove_kody", id);
      await deleteDoc(promoDocRef);
      console.log("Promo code deleted successfully.");
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting promo code:", error);
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    try {
      setIsLoading(true);
      const db = getFirestore(auth.app);
      const zlavoveKodyRef = doc(db, "zlavove_kody", data.kod);

      await setDoc(zlavoveKodyRef, {
        kod: data.kod,
        zlava: data.zlava,
      });
      console.log("Data added successfully to Firestore");
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding data to Firestore:", error);
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="main_section ">
        {user && (
          <>
            <div className="flex flex-row justify-between items-center">
              <h2>Zľavové kódy</h2>
              <StepBack />
            </div>

            {isLoadingAll ? (
              <ClipLoader size={20} color={"#32a8a0"} loading={isLoading} />
            ) : (
              <>
                <table className="admin_section_promo_codes mt-8">
                  <thead>
                    <tr className="bg-tertiary">
                      <th>Kód</th>
                      <th>Zľava v %</th>
                      <th>Odstrániť</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo, index) => (
                      <tr key={index}>
                        <td className="text-center  flex items-center justify-center">
                          {promo.kod}
                        </td>
                        <td className="text-center flex items-center justify-center">
                          {promo.zlava}
                        </td>

                        <td className="flex justify-center">
                          <button
                            className="btn btn--secondary"
                            onClick={() => handleDelete(promo.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <ClipLoader
                                size={20}
                                color={"#32a8a0"}
                                loading={true}
                              />
                            ) : (
                              "Odstrániť"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <h5 className="mt-24 text-black mb-4">Pridať zľavový kód</h5>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[300px] flex flex-col gap-4"
            >
              <div className="flex flex-row items-center justify-between">
                <p>Kód</p>
                <input type="text" className="" {...register("kod")} required />
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Zľava v %</p>
                <input
                  type="text"
                  className=""
                  {...register("zlava")}
                  required
                />
              </div>
              <button
                className="btn btn--secondary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={20} color={"#32a8a0"} loading={true} />
                ) : (
                  "Pridať"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
