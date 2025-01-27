"use client";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import useCartStore, { CartItem } from "../../counter/store";
import IconMinus from "../Icons/IconMinus";
import IconPlus from "../Icons/IconPlus";
import { SwiperNavButtons } from "../Swiper/SwiperNavButtons";

interface Props {
  data: ProductFirebase[];
}

const HomePageProducts = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const [quantity, setQuantity] = useState(new Array(data.length).fill(1));
  const addToCart = useCartStore((state) => state.addToCart);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart_nutura") || "[]") as CartItem[]
  );
  const [check, setCheck] = useState(false);

  const handleOpacity = (index: number) => {
    setHoveredIndex(index);
  };

  const increaseQuantity = (index: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = newQuantity[index] + 1;
      return newQuantity;
    });
  };

  const decreaseQuantity = (index: number) => {
    if (quantity[index] > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = [...prevQuantity];
        newQuantity[index] = newQuantity[index] - 1;
        return newQuantity;
      });
    }
  };

  const handleAddToCart = (id: string, quantity: number, stock: number) => {
    const findItem = cart.find((item) => item.id === id);
    if (findItem) {
      if (findItem?.quantity + quantity > stock) {
        toast.error(
          "Tovar momentálne nie je na sklade. Pracujeme na jeho doskladnení. Ďakujeme za pochopenie :)",
          {
            duration: 6000,
          }
        );
        return;
      }
      setCheck(true);
      addToCart({ id, quantity });
      toast.success("Pridané do košíka");
    } else {
      if (quantity > stock) {
        toast.error(
          "Tovar momentálne nie je na sklade. Pracujeme na jeho doskladnení. Ďakujeme za pochopenie :)",
          {
            duration: 6000,
          }
        );
        return;
      }
      setCheck(true);
      addToCart({ id, quantity });
      toast.success("Pridané do košíka");
    }
  };

  useEffect(() => {
    if (check) {
      setCart(JSON.parse(localStorage.getItem("cart_nutura") || "[]"));
      setCheck(false);
    }
  }, [check]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[300px]">
          <ClipLoader size={40} color={"#000000"} loading={isLoading} />
        </div>
      ) : (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 55,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 55,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 55,
            },
          }}
          freeMode={true}
          loop={true}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  href={`/obchod/produkt/${item.slug}`}
                  className="flex flex-col "
                >
                  <div
                    className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-full justify-center relative min-h-[300px] xl:min-h-[400px] 2xl:min-h-[400px] 3xl:min-h-[500px]"
                    onMouseEnter={() => handleOpacity(index)}
                    onMouseLeave={() => handleOpacity(-1)}
                  >
                    <Image
                      src={item.produkt_pozadie}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 70vw, (max-width: 1200px) 20vw, 30vw"
                      priority={true}
                      quality={100}
                      className={`absolute w-full h-full object-cover transition-opacity ${
                        hoveredIndex === index ? "opacity-100" : "opacity-40"
                      } z-10 ease-in `}
                      alt="Produktový obrázok"
                    />
                    <Image
                      src={item.produkt_foto}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 70vw, (max-width: 1200px) 20vw, 30vw"
                      priority={true}
                      quality={100}
                      className="w-full h-[200px] xl:h-[300px] 3xl:h-[400px] object-contain z-[1000] "
                      alt="Produktový obrázok"
                    />
                  </div>{" "}
                </Link>
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="flex flex-col w-full 2xl:w-[80%] 2xl:mt-4">
                    <p className=" text-black pt-4  uppercase font-bold">
                      {item.nazov}
                    </p>
                    <p>Skladom: {item.sklad} ks</p>
                    <p>{item.cena},00 €</p>

                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-4 xl:gap-6">
                        <p className="uppercase font-medium text-[10px] xl:text-[12px]">
                          Počet kusov
                        </p>
                        <div className="flex flex-row items-center gap-4  ">
                          <div
                            className="cursor-pointer"
                            onClick={() => decreaseQuantity(index)}
                          >
                            <IconMinus />
                          </div>

                          <div className="border border-secondary  3xl:pt-1 3xl:pb-1 pl-[1.5rem] pr-[1.5rem] rounded-[32px] text-secondary">
                            {quantity[index]}
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => increaseQuantity(index)}
                          >
                            <IconPlus />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn--fourthtiary"
                        onClick={() =>
                          handleAddToCart(item.id, quantity[index], item.sklad)
                        }
                      >
                        Kúpiť
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          <SwiperNavButtons />
        </Swiper>
      )}

      <Toaster />
    </>
  );
};

export default HomePageProducts;
