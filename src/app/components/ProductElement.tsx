"use client";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useCartStore from "../counter/store";
import { Product } from "../lib/interface_product";
import { urlFor } from "../lib/sanityImageUrl";
import ImageForPages from "./ImageForPages";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";

interface Props {
  data: Product;
}

const ProductElement = ({ data }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (id: string, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(id);
    }
    toast.success("Pridané do košíka");
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />
      <Toaster />

      <div className="main_section mt-32 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2>{data.title}</h2>
            <p className="w-full md:w-3/4">
              Your Gateway to Enhanced Well-being! Discover a world of health
              transformation with our innovative range of natural health sprays.
              We believe in making wellness accessible and enjoyable for
              everyone.
            </p>
            <h5>Objem</h5>
            <p>{data.volume} ml</p>
            <h5>Počet kusov</h5>
            <div className="flex flex-row items-center gap-4">
              <button onClick={decreaseQuantity}>
                <IconMinus />
              </button>
              <div className="border border-secondary pt-2 pb-2 pl-8 pr-8 rounded-3xl bg-primary text-secondary">
                {quantity}
              </div>
              <button onClick={increaseQuantity}>
                <IconPlus />
              </button>
            </div>
            <button
              className="btn btn--secondary"
              onClick={() => handleAddToCart(data._id, quantity)}
            >
              Pridať do košíka
            </button>
          </div>
          <div className="h-[500px] w-full md:w-1/2 flex items-center justify-center ">
            <Image
              src={urlFor(data.photo).url()}
              width={500}
              height={500}
              className=" object-contain rounded-2xl"
              alt="Intro produktového obrázku"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="product_more_info">
            <h2>Zloženie</h2>
            <p>{data.composition}</p>
            <h2>Skladovanie</h2>
            <p>{data.storage}</p>
            <h2>Odporúčané dávkovanie</h2>
            <p>{data.recommended}</p>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-secondary">
                  <th className="text-left uppercase">
                    <h5>Obsah aktívnych látok</h5>
                  </th>
                  <th className="uppercase text-left">
                    <h5>{data.number_of_injections} vstrekov </h5>
                  </th>
                </tr>
                {data.nutrition.map((item, index) => (
                  <tr key={index} className="border-b border-secondary ">
                    <td className="w-1/2 md:w-3/4 pt-[6px] pb-[6px]">
                      {item.nutrient}
                    </td>
                    <td className="border-l border-secondary pl-4">
                      {" "}
                      {item.value}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Upozornenie</h2>
            <p>
              Tento výživový doplnok sa nesmie používať ako náhrada pestrej
              stravy a nie je určený pre deti. O užívaní v priebehu tehotenstva
              a dojčenia sa poraďte so svojím lekárom. Tento produkt nie je
              určený ako prevencia alebo liek na niektoré ochorenia.
            </p>
            <h2>Ostatné informácie</h2>
            <p>Minimálna trvanlivosť do: viď obal.,</p>
            <p>
              Distribútor: SOUL MATE s.r.o., Pod kalváriou 38, 941 23 Andovce,
              Slovensko.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductElement;
