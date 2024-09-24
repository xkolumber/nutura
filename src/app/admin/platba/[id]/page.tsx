"use client";
// import { FireBasePayment } from "@/app/lib/interface_firebase_payment";
import { useEffect, useState } from "react";

// import FileUpload from "@/app/components/FileUpload";
// import SelectOptionPayment from "@/app/components/SelectOptionPayment";
import { auth } from "@/app/firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

import AdminHeader from "@/app/components/AdminHeader";
import StepBack from "@/app/components/StepBack";
import { FireBasePayment } from "@/app/lib/all_interfaces";
import SelectOptionPayment from "@/app/components/SelectOptionPayment";

const Page = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data_payment, setDataPayment] = useState<FireBasePayment>();

  useEffect(() => {
    const fetchPayment = async () => {
      const db = getFirestore(auth.app);
      const paymentDocRef = doc(db, "nutura_platby", params.id);

      try {
        setIsLoading(true);
        const paymentSnapshot = await getDoc(paymentDocRef);

        if (paymentSnapshot.exists()) {
          const paymentData = paymentSnapshot.data() as FireBasePayment;
          setDataPayment(paymentData);
        } else {
          throw new Error("Payment not found");
        }
      } catch (error) {
        console.error("Error fetching payment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [params.id]);

  const getDate = (time: string) => {
    const createdAtDate = new Date(time);

    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1;
    const year = createdAtDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  const getTime = (time: string) => {
    const createdAtDate = new Date(time);
    const hour = createdAtDate.getHours().toString().padStart(2, "0");
    const minute = createdAtDate.getMinutes().toString().padStart(2, "0");
    const second = createdAtDate.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hour}:${minute}:${second}`;
    return formattedTime;
  };

  return (
    <>
      <div className=" ">
        {isLoading && (
          <ClipLoader size={20} color={"#32a8a0"} loading={isLoading} />
        )}

        {data_payment && (
          <>
            <div className="flex flex-row justify-between items-center">
              <h2>Detail objednávky</h2>
              <StepBack />
            </div>

            <br />
            <h5>Osobné údaje</h5>
            <p>id: {params.id}</p>
            <p>Meno a Priezvisko: {data_payment.name}</p>
            <p>Email: {data_payment.email}</p>
            <p>Telefónné číslo: {data_payment.telephone_number}</p>
            <br />

            <h5>Poznámka</h5>
            <p>{data_payment.note}</p>
            <br />

            <h5>Dodacie údaje</h5>
            <p>{data_payment.city}</p>
            <p>{data_payment.street}</p>
            <p>{data_payment.psc}</p>
            <p>{data_payment.country}</p>
            <br />

            <h5>Fakturačné údaje</h5>
            <p>{data_payment.invoice_name}</p>
            <p>{data_payment.invoice_city}</p>
            <p>{data_payment.invoice_street}</p>
            <p>{data_payment.invoice_psc}</p>
            <p>{data_payment.invoice_country}</p>
            <p>Názov spoločnosti: {data_payment.invoice_company}</p>
            <p>IČO:{data_payment.invoice_ico}</p>
            <p>DIČ:{data_payment.invoice_dic}</p>
            <p>IČ: DPH{data_payment.invoice_icdph}</p>
            <br />

            <h5>Čas objednávky</h5>
            <p>Dátum: {getDate(data_payment.createdAt)}</p>
            <p>Čas: {getTime(data_payment.createdAt)}</p>
            <br />

            <h5>Typ objednávky</h5>
            <p>{data_payment.type_payment}</p>
            <br />

            <h5>Objednané produkty</h5>
            {data_payment.products.map((product, index) => (
              <div key={index} className="flex flex-row">
                <p>{product.product_name} - </p>
                <p>{product.quantity} ks - </p>
                <p> {product.price} €</p>
              </div>
            ))}
            <br />
            <h5>Cena: {data_payment.price}€</h5>
            <br />
            <h5>Stav objednávky</h5>
            <SelectOptionPayment id={params.id} value={data_payment.state} />
            <br />

            {/* <div className="flex flex-row items-center gap-4 ">
              <h5>Faktúra</h5>
              {data_payment.invoice_link && (
                <Link
                  href={data_payment.invoice_link}
                  className="underline text-[14px]"
                >
                  Link na stiahnutie
                </Link>
              )}
            </div> */}
            {/* <FileUpload id={params.id} /> */}
          </>
        )}
      </div>
    </>
  );
};

export default Page;
