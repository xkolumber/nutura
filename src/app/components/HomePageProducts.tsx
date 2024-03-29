"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCartStore from "../counter/store";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";

export interface EshopBasicProducts {
  cena: number;
  id: string;
  nazov: string;
  produkt_foto: string;
  produkt_pozadie: string;
  slug: string;
}

const HomePageProducts = () => {
  const [products, setProducts] = useState<EshopBasicProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const [quantity, setQuantity] = useState([1, 1, 1]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fetch-all-products");

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (products) {
      setQuantity(new Array(products.length).fill(1));
    }
  }, [products]);

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

  const handleAddToCart = (id: string, quantity: number) => {
    addToCart({ id, quantity });
    toast.success("Pridané do košíka");
  };

  return (
    <>
      {isLoading ? (
        <div className="">
          <ClipLoader size={40} color={"#174218"} loading={isLoading} />
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
          modules={[Autoplay]}
          loop={true}
          speed={3000}
        >
          {products.map((item, index) => {
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
                      width={0}
                      height={0}
                      priority={true}
                      quality={100}
                      sizes="100vw"
                      className={`absolute w-full h-full object-cover transition-opacity ${
                        hoveredIndex === index ? "opacity-100" : "opacity-40"
                      } z-10 ease-in `}
                      alt="Produktový obrázok"
                    />
                    <Image
                      src={item.produkt_foto}
                      width={500}
                      height={500}
                      priority={true}
                      quality={100}
                      className="w-full h-[150px] object-contain z-[1000] "
                      alt="Produktový obrázok"
                    />
                  </div>{" "}
                </Link>
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="flex flex-col w-full">
                    <p className=" text-black pt-4  uppercase font-semibold">
                      {item.nazov}
                    </p>
                    <p>{item.cena} €</p>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-4 md:gap-6">
                        <p className="uppercase font-medium">Počet kusov</p>
                        <div className="flex flex-row items-center gap-4  ">
                          <div
                            className="cursor-pointer"
                            onClick={() => decreaseQuantity(index)}
                          >
                            <IconMinus />
                          </div>

                          <div className="border border-secondary pt-2 pb-2 pl-8 pr-8 rounded-[32px] text-secondary">
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
                          handleAddToCart(item.id, quantity[index])
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
        </Swiper>
      )}
      <div className="flex justify-center">
        <Link href={"/obchod"}>
          <button className="btn btn--secondary !mt-16 xl:!mt-32">
            Všetky produkty
          </button>
        </Link>
      </div>
      <Toaster />
    </>
  );
};

export default HomePageProducts;
