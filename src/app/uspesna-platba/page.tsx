"use client";
import {
  collection,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import Footer from "../components/Footer";
import { auth } from "../firebase/config";

const Page = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const IncreaseLastNumberOrder = async () => {
    try {
      const db = getFirestore(auth.app);
      const numberCollectionRef = collection(db, "cislo_poslednej_objednavky");

      const querySnapshot = await getDocs(numberCollectionRef);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { cislo_objednavky: increment(1) });
      } else {
        throw new Error("Number document not found");
      }
    } catch (error) {
      console.error("Error fetching order number:", error);
      throw error;
    }
  };

  localStorage.removeItem("cart2");
  const savedCustomerData = sessionStorage.getItem("customerData");
  const number_order = sessionStorage.getItem("number_order");

  const sentEmailsentData = async (parsedCustomerData: JSON) => {
    await IncreaseLastNumberOrder();
    const date_time = new Date().getTime();

    try {
      const response = await fetch("/api/email-after-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: parsedCustomerData,
          number_order: number_order,
        }),
      });

      if (response.ok) {
        localStorage.removeItem("cart2");
        console.log("Email sent successfully!");

        try {
          const response = await fetch("/api/firebase-send-payment-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: parsedCustomerData,
              date_time: date_time,
              number_order: number_order,
            }),
          });
          if (response.ok) {
            // localStorage.removeItem("cart2");
            console.log("Data sent successfully!");
            sessionStorage.removeItem("customerData");
            sessionStorage.removeItem("number_order");
          } else {
            console.error("Failed to add data");
          }
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 6000,
    stagger: 3,
    width: "19px",
    height: "10px",
    perspective: "577px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  useEffect(() => {
    setPaymentSuccess(true);
    if (savedCustomerData) {
      const parsedCustomerData = JSON.parse(savedCustomerData);

      sentEmailsentData(parsedCustomerData);
    } else {
      console.log("neexistuje");
    }
  }, []);

  return (
    <>
      <Confetti active={paymentSuccess} config={config} />

      <div className="main_section additional_padding min-h-[500px] xl:min-h-screen justify-center items-center flex flex-col">
        <h2 className="text-center">Ďakujeme za Vašu objednávku.</h2>
        <p className="mt-4 xl:text-[20px] text-center">
          Informácie o ďalšom postupe Vám boli zaslané na Váš email.
        </p>
        <Link href={"/"}>
          <button className="btn btn--secondary">Domov</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Page;
