"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import useCartStore, { CartItem } from "../counter/store";
import { ProductFirebase, ShopSectionProduct } from "../lib/all_interfaces";
import { GetAdminProductsCategories } from "../lib/functionsServer";
import Footer from "./Footer";
import IconMinus from "./Icons/IconMinus";
import IconPlus from "./Icons/IconPlus";
import ProductsWithCategories from "./ProductsWithCategories";
import StepBack from "./StepBack";

interface Props {
  data: ProductFirebase;
}

const ProductPage = ({ data }: Props) => {
  const [dataWithCategory, setDataWithCategory] = useState<
    ShopSectionProduct[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<string[]>(data.kategorie);
  const addToCart = useCartStore((state) => state.addToCart);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart_nutura") || "[]") as CartItem[]
  );
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchDataBasedOnCategory = async () => {
      try {
        setIsLoading(true);

        const data = await GetAdminProductsCategories(categories);

        setDataWithCategory(data);
      } catch (error) {
        redirect("/error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataBasedOnCategory();
  }, [data]);

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

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
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
      <Toaster />
      <div className="own_edge">
        <div className="main_section mt-24 md:mt-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <StepBack />
              <h2>{data.nazov}</h2>
              <p className="w-full md:w-[80%] mt-2 md:mt-4 xl:mt-8">
                {data.popis_produkt}
              </p>
              <div className="flex flex-row gap-4 pt-8 items-center">
                {" "}
                <p className=" underline font-medium">Skladom:</p>
                <p>{data.sklad} ks</p>
              </div>

              <div className="flex flex-row gap-8 mt-8 xl:mt-12">
                <div className="flex flex-col ">
                  {" "}
                  <h5>Cena</h5>
                  <p className="text-[18px] xl:text-[24px] 3xl:text-[34px]">
                    {data.cena + "€ / ks"}{" "}
                  </p>
                </div>
                <div className="flex flex-col">
                  {" "}
                  <h5>Objem</h5>
                  <p className="text-[18px] xl:text-[24px] 3xl:text-[34px]">
                    {data.objem} ml
                  </p>
                </div>
              </div>

              <h5 className="mt-4">Počet kusov</h5>
              <div className="flex flex-row items-center gap-4 mt-2">
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
                className="btn btn--secondary !mb-16 md:!mb-0"
                onClick={() => handleAddToCart(data?.id, quantity, data.sklad)}
              >
                Pridať do košíka
              </button>
            </div>

            <div className="flex flex-col md:w-1/2">
              <div className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-[400px] 2xl:h-[600px] 3xl:h-[700px] justify-center relative">
                <Image
                  src={data.produkt_pozadie}
                  width={700}
                  height={700}
                  priority={true}
                  quality={100}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 40vw"
                  className={`absolute w-full h-full object-cover transition-opacity rounded-xl  z-10 ease-in `}
                  alt="Produktový obrázok"
                />
                <Image
                  src={data.produkt_foto}
                  width={500}
                  height={500}
                  priority={true}
                  quality={100}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 40vw"
                  className="w-full  h-[300px] xl:h-[400px] 2xl:h-[450px]  object-contain z-[100] "
                  alt="Produktový obrázok"
                />
              </div>
              <p className="text-center mt-2">{data.nazov}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="product_more_info mt-12 md:mt-24 xl:mt-32">
              <h2>Zloženie</h2>
              <p>{data.zlozenie}</p>
              <table className="w-full mt-12">
                <tbody>
                  <tr className="border-b border-secondary">
                    <th className="text-left uppercase">
                      <h5>Obsah aktívnych látok</h5>
                    </th>
                    <th className="uppercase text-left">
                      <h5>{data && data.pocet_vstrekov} vstrekov</h5>
                    </th>
                  </tr>
                  {data?.nutricna_informacia.map((item, index) => (
                    <tr key={index} className="border-b border-secondary ">
                      <td className="w-1/2 md:w-3/4 pt-[6px] pb-[6px]">
                        {item.nutrient}
                      </td>
                      <td className="border-l border-secondary pl-4">
                        {" "}
                        {item.hodnota}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p>* % odporúčanej dennej dávky</p>
              <p>** Doporučená denná dávka nie je stanovená</p>
              <h2 className="mt-12 xl:mt-24">Skladovanie</h2>
              <p>
                Sladujte pri izbovej teplote. Skladujte mimo dosahu malých detí.
                Chráňte pred priamym slnečným žiarením.
              </p>
              <h2 className="mt-12 xl:mt-24">Odporúčané dávkovanie</h2>
              <p>{data && data.odporucane_davkovanie}</p>

              <h2 className="mt-12 xl:mt-24">Upozornenie</h2>
              <p>{data && data.upozornenie}</p>
              <h2 className="mt-12 xl:mt-24">Ostatné informácie</h2>
              <p>Minimálna trvanlivosť do: viď obal.,</p>
              <p>
                Distribútor: SOUL MATE s.r.o., Pod kalváriou 38, 941 23 Andovce,
                Slovensko.
              </p>
            </div>
          </div>

          {dataWithCategory.length > 0 && (
            <div className="mt-8 md:mt-32 xl:mt-40">
              <ProductsWithCategories products={dataWithCategory} />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
