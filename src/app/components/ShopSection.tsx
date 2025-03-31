"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import useCartStore, { CartItem } from "../counter/store";
import {
  EshopBasicProductsPlusCategory,
  ProductFirebase,
} from "../lib/all_interfaces";
import {
  GetAdminProducts,
  GetAdminProductsCategory,
} from "../lib/functionsServer";
import IconArrow from "./Icons/IconArrow";
import IconLupa from "./Icons/IconLupa";
import IconMinus from "./Icons/IconMinus";
import IconPlus from "./Icons/IconPlus";
import { createSlug, formatPrice } from "../lib/functionsClient";

interface Props {
  data: ProductFirebase[];
}

const ShopSection = ({ data }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Všetky produkty");
  const [filteredData, setFilteredData] =
    useState<EshopBasicProductsPlusCategory[]>(data);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [quantity, setQuantity] = useState([1, 1, 1]);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupRef2 = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const parameter = searchParams.get("q");
  const [searchTerm, setSearchTerm] = useState(parameter || "");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart_nutura") || "[]") as CartItem[]
  );
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (filteredData) {
      setQuantity(new Array(filteredData.length).fill(1));
    }
  }, [filteredData]);

  const handleOpacity = (index: number) => {
    setHoveredIndex(index);
  };

  const handleButtonCategoryChange = async (category: string) => {
    setIsLoading(true);

    if (category != "Všetky produkty") {
      try {
        const data = await GetAdminProductsCategory(createSlug(category));

        setFilteredData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setFilteredData(data);
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (event: string) => {
    const category = event;
    setSelectedCategory(category);
    await handleButtonCategoryChange(category);
  };

  const handleCategoryChangeMobile = async (event: string) => {
    const category = event;
    setSelectedCategory(category);
    setShowFilter(false);
    setSearchTerm("");
    await handleButtonCategoryChange(category);
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

  const categories = [
    "Všetky produkty",
    "Antioxidanty",
    "Kĺby a kosti",
    "Fyzická aktivita",
    "Imunitný systém",
    "Zdravie muža",
    "Zdravie ženy",
    "Menštruácia a menopauza",
    "Spánok",
    "Deti",
    "Zrelý vek",
    "Tráviace ťažkosti a pooperačné stavy",
    "Zdravie očí a zraku",
    "Únava",
    "Srdcovo-cievny systém",
    "Omega 3 mastné kyseliny",
    "Železo",
    "Vitamín B 12",
    "Vitamín D",
    "Minerálne látky",
    "Multivitamíny",
    "Tehotenstvo a dojčenie",
    "Stres a nervozita",
  ];

  const handleShowAllItems = () => {
    setSelectedCategory("");
  };

  const handleFilter = () => {
    setShowFilter(true);
  };
  const handleSearch = () => {
    setShowSearch(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef2.current &&
        !popupRef2.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const search = (searchTerm: string) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (!lowerSearchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    setSelectedCategory("Všetky produkty");

    const filteredProducts = data.filter((product) => {
      return (
        product.kategorie.some((category) =>
          category.toLowerCase().includes(lowerSearchTerm)
        ) || product.nazov.toLowerCase().includes(lowerSearchTerm)
      );
    });

    setFilteredData(filteredProducts);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    search(e.target.value);

    const url = new URL(window.location.href);
    url.searchParams.set("q", value);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    if (check) {
      setCart(JSON.parse(localStorage.getItem("cart_nutura") || "[]"));
      setCheck(false);
    }
  }, [check]);

  return (
    <div className="">
      <Toaster />

      {selectedCategory != "Všetky produkty" && (
        <p className="md:hidden">Kategória: {selectedCategory}</p>
      )}
      {searchTerm != "" && (
        <p className="md:hidden">Vyhľadávanie: {searchTerm}</p>
      )}

      <div className="flex flex-row gap-4 md:hidden">
        <button className="btn btn--secondary" onClick={handleFilter}>
          Filter
        </button>
        <button className="btn btn--secondary" onClick={handleSearch}>
          Vyhľadávanie
        </button>
      </div>

      <div className=" flex-col md:flex-row justify-between md:mt-12 nd:items-center hidden md:flex ">
        <div className="flex-col flex  md:flex-row md:gap-8  ">
          <div className="md:min-w-[400px] rounded-[20px] border border-secondary flex flex-row justify-between  pl-8 pr-2 pt-1 pb-1 xl:w-[500px] gap-8">
            <div
              className={`flex flex-row gap-4 justify-center ${
                selectedCategory != "" && "items-center"
              }   `}
            >
              <h6
                className={`text-secondary ${
                  selectedCategory === "" && "mt-3"
                }`}
              >
                Kategórie
              </h6>
              <div
                className={`flex flex-col justify-center ${
                  selectedCategory === "" && "mt-2"
                }  `}
              >
                {selectedCategory ? (
                  <p
                    onClick={handleShowAllItems}
                    className="cursor-pointer font-semibold"
                  >
                    {selectedCategory}
                  </p>
                ) : (
                  categories.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => handleCategoryChange(item)}
                      className={`${
                        selectedCategory === item && "font-semibold"
                      } cursor-pointer hover:font-semibold`}
                    >
                      {item}
                    </p>
                  ))
                )}
              </div>
            </div>
            <div
              className={`cursor-pointer mr-2 flex justify-center  ${
                selectedCategory === "" && "mt-2"
              }`}
              onClick={handleShowAllItems}
            >
              <IconArrow whatIsClicked={selectedCategory} />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center rounded-[20px] border border-secondary shop_section pr-4  h-fit mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Vyhľadať"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <IconLupa />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 3xl:gap-16 mt-8 md:mt-24">
        {isLoading ? (
          <div className="min-h-[500px]">
            <ClipLoader size={40} color={"#000000"} loading={isLoading} />
          </div>
        ) : (
          filteredData &&
          filteredData.map((item, index) => (
            <div key={index}>
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
                  <p className=" text-black pt-4  uppercase font-semibold">
                    {item.nazov}
                  </p>
                  <p>Skladom: {item.sklad} ks</p>
                  <p>{formatPrice(item.cena)} €</p>
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
            </div>
          ))
        )}
      </div>

      {showSearch && (
        <>
          <div className="behind_card_background"></div>
          <div className="popup_message" ref={popupRef}>
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-row items-center rounded-[20px] border border-secondary shop_section pr-4  h-fit mt-4 md:mt-0">
                <input
                  type="text"
                  placeholder="Vyhľadať"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <IconLupa />
              </div>
              <button
                className="btn btn--fourthtiary"
                onClick={() => setShowSearch(false)}
              >
                Hľadať
              </button>
            </div>
          </div>
        </>
      )}

      {showFilter && (
        <>
          <div className="behind_card_background"></div>
          <div className="popup_message !max-h-none" ref={popupRef2}>
            <div className="flex flex-col justify-center items-center ">
              {categories.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handleCategoryChangeMobile(item)}
                  className={`${
                    selectedCategory === item && "font-semibold"
                  } cursor-pointer hover:font-semibold`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopSection;
