"use client";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ClipLoader } from "react-spinners";
import { EshopBasicProducts } from "../components/HomePage/HomePageProducts";
import IconCloseButtonShop from "../components/Icons/IconCloseButtonShop";
import IconMinus from "../components/Icons/IconMinus";
import IconPlus from "../components/Icons/IconPlus";
import ImageForPages from "../components/ImageForPages";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import useCartStore, { CartItem } from "../counter/store";
import { auth } from "../firebase/config";
import CheckoutContinuation from "../components/CheckoutContinuation";
import Footer from "../components/Footer";

const Page = () => {
  const [products, setProducts] = useState<EshopBasicProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeTrue, setChangeCart] = useState(false);
  const [continuee, setContinuee] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseFromCart = useCartStore((state) => state.decreaseFromCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart_nutura") || "[]") as CartItem[]
  );

  useEffect(() => {
    const fetchProductsInCart = async () => {
      let cart: CartItem[] = JSON.parse(
        localStorage.getItem("cart_nutura") || "[]"
      );

      if (!cart) return;
      setIsLoading(true);
      const db = getFirestore(auth.app);
      const produktyCollectionRef = collection(db, "produkty");

      try {
        const productsPromises = cart.map(async (cartItem) => {
          if (products.some((product) => product.id === cartItem.id)) {
            return null;
          }
          const docRef = doc(produktyCollectionRef, cartItem.id);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const productData = docSnapshot.data();
            return {
              cena: productData.cena,
              id: docSnapshot.id,
              nazov: productData.nazov,
              produkt_foto: productData.produkt_foto,
              produkt_pozadie: productData.produkt_pozadie,
              slug: productData.slug,
            };
          } else {
            console.warn(`Product with ID ${cartItem.id} does not exist.`);
            return null;
          }
        });

        const newProducts = await Promise.all(productsPromises);
        const filteredNewProducts = newProducts.filter(
          (product) => product !== null
        ) as EshopBasicProducts[];

        const updatedProducts = [...products, ...filteredNewProducts];

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsInCart();
  }, []);

  const increaseQuantity = (id: string, quantity: number) => {
    addToCart({ id, quantity });
    setChangeCart(true);
  };

  const decreaseQuantity = (id: string) => {
    decreaseFromCart(id);
    setChangeCart(true);
  };
  const clickOnTrash = (id: string) => {
    removeFromCart(id);
    setChangeCart(true);
  };

  const getAllPrice = () => {
    let price = 0;
    if (products.length > 0) {
      {
        cart.map((item) => {
          const productPrice = getPriceFirebase(item.id);
          if (productPrice !== null) {
            price += item.quantity * parseFloat(productPrice);
          }
        });
      }

      const decimalCount =
        price % 1 !== 0 ? price.toString().split(".")[1]?.length : 0;

      return decimalCount === 1
        ? price.toFixed(2) + " €"
        : price.toFixed(2) + " €";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setChangeCart(false);
    setCart(JSON.parse(localStorage.getItem("cart_nutura") || "[]"));
  }, [changeTrue]);

  const getPriceFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.cena.toString() : "";
  };

  const getBackgroundFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.produkt_pozadie : "";
  };

  const getPhotoFromFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.produkt_foto : "";
  };
  const getTitleFromFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.nazov : "";
  };

  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />

      <div className="main_section mt-16 md:mt-0">
        {!continuee ? (
          <>
            <h1>Košík</h1>
            {cart.length === 0 && <p>Váš košík je zatiaľ prázdny.</p>}
            <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-40 mt-12 md:mt-20">
              {products.length <= 0 ? (
                <div className="min-h-[200px]">
                  <ClipLoader size={40} color={"#00000"} loading={isLoading} />
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    className="flex flex-row bg-[#B6BEA7] p-2 rounded-[6px] gap-4"
                    key={index}
                  >
                    {products ? (
                      <div className="flex flex-col items-center bg-fifthtiary rounded-xl max-w-[100px] 3xl:max-w-[150px] w-full h-full justify-center relative">
                        <Image
                          src={getBackgroundFirebase(item.id)}
                          width={0}
                          height={0}
                          priority={true}
                          quality={100}
                          sizes="100vw"
                          className={`absolute w-full h-full object-cover transition-opacity z-10 ease-in `}
                          alt="Produktový obrázok"
                        />
                        <Image
                          src={getPhotoFromFirebase(item.id)}
                          width={500}
                          height={500}
                          priority={true}
                          quality={100}
                          className="w-full h-[100px]  object-contain z-[1000] "
                          alt="Produktový obrázok"
                        />
                      </div>
                    ) : (
                      <Skeleton height={100} width={100} />
                    )}
                    <div className="flex flex-col w-full justify-between">
                      <div className="flex flex-row justify-between">
                        <p className="  uppercase font-bold">
                          {products ? (
                            getTitleFromFirebase(item.id)
                          ) : (
                            <Skeleton count={1} />
                          )}
                        </p>

                        <div className="" onClick={() => clickOnTrash(item.id)}>
                          {" "}
                          <IconCloseButtonShop />
                        </div>
                      </div>

                      <div className="flex flex-col justify-between ">
                        <p className="uppercase">Počet kusov</p>
                        <div className="flex flex-row items-center gap-4 ">
                          <div
                            className="cursor-pointer"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <IconMinus />
                          </div>

                          <div className="border border-secondary  3xl:pt-1 3xl:pb-1 pl-[1.5rem] pr-[1.5rem] rounded-[32px] text-secondary">
                            {item.quantity}
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => increaseQuantity(item.id, 1)}
                          >
                            <IconPlus />
                          </div>
                        </div>
                      </div>
                      <p className="font-bold">
                        {" "}
                        {products ? (
                          getPriceFirebase(item.id)
                        ) : (
                          <Skeleton count={1} />
                        )}{" "}
                        €
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* </div> */}
            {cart.length > 0 && (
              <>
                <div className="flex flex-col bg-secondary p-8  rounded-[20px] mt-12 md:mt-20">
                  <h4 className="text-primary font-normal mb-8">
                    {getAllPrice()}
                  </h4>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <button
                      className="btn btn--secondary"
                      onClick={() => setContinuee(true)}
                    >
                      Pokračovať v objednávke
                    </button>
                    <p className="underline text-primary">
                      Vrátiť sa do nákupu
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <CheckoutContinuation products={products} cart={cart} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
