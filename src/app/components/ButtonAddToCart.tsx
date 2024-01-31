"use client";
import React from "react";
import useCartStore from "../counter/store";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  id: string;
}

const ButtonAddToCart = ({ id }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    toast.success("Pridané do košíka");
  };
  return (
    <>
      <button
        className="btn btn--secondary"
        onClick={() => handleAddToCart(id)}
      >
        Pridať do košíka
      </button>

      <Toaster />
    </>
  );
};

export default ButtonAddToCart;
