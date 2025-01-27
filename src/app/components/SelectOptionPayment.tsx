"use client";
import { useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { auth } from "../firebase/config";

interface Props {
  id: string;
  value: string;
}

const SelectOptionPayment = ({ id, value }: Props) => {
  const queryClient = useQueryClient();

  const [orderState, setOrderState] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setOrderState(newState);

    try {
      const db = getFirestore(auth.app);
      const paymentDocRef = doc(db, "nutura_platby", id);

      const paymentSnapshot = await getDoc(paymentDocRef);

      if (paymentSnapshot.exists()) {
        const paymentData = paymentSnapshot.data();
        const email = paymentData.email;
        const number_order = paymentData.number_order;

        try {
          setIsLoading(true);
          await setDoc(paymentDocRef, { state: newState }, { merge: true });
          setIsLoading(false);
          toast.success("Stav bol aktualizovaný");

          if (newState === "expedovaná") {
            const response = await fetch("/api/send-email-new-state", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                number_order: number_order,
                email: email,
              }),
            });
            if (response.ok) {
              toast.success("Email bol odoslaný");
              console.log("Data sent successfully!");
              setIsLoading(false);
            } else {
              console.error("Failed to add data");
            }
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error updating payment state:", error);
          toast.error("Error updating payment state");
        }
      } else {
        throw new Error("Payment not found");
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
    }
    await queryClient.refetchQueries({
      queryKey: ["admin_orders"],
    });
    await queryClient.refetchQueries({
      queryKey: ["admin_orders", id],
    });
  };
  const renderOptions = () => {
    const states = ["Prijatá", "Expedovaná", "Storno"];
    return states.map((state) => (
      <option key={state} value={state.toLowerCase()}>
        {state}
      </option>
    ));
  };
  return (
    <div>
      <Toaster />
      <select value={orderState} onChange={handleChange}>
        {renderOptions()}
      </select>
      {isLoading && (
        <ClipLoader
          size={20}
          color={"#000000"}
          loading={isLoading}
          className="ml-4"
        />
      )}
    </div>
  );
};

export default SelectOptionPayment;
