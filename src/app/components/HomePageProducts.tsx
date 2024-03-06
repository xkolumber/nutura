"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/interface_product";
import { urlFor } from "../lib/sanityImageUrl";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../firebase/config";

interface EshopBasicProducts {
  cena: number;
  nazov: string;
  produkt_foto: string;
  produkt_pozadie: string;
  slug: string;
}

const HomePageProducts = () => {
  const [products, setProducts] = useState<EshopBasicProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const db = getFirestore(auth.app);
      const produktyCollectionRef = collection(db, "produkty");

      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(produktyCollectionRef);

        const allData: EshopBasicProducts[] = querySnapshot.docs.map((doc) => ({
          nazov: doc.data().nazov,
          cena: doc.data().cena,
          produkt_foto: doc.data().produkt_foto,
          produkt_pozadie: doc.data().produkt_pozadie,
          slug: doc.data().slug,
        }));

        setProducts(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);
  return (
    <>
      {isLoading ? (
        <ClipLoader size={40} color={"#174218"} loading={isLoading} />
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
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={3000}
          className="h-[300px]"
        >
          {products.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  href={`/produkt/${item.slug}`}
                  className="flex flex-col h-[300px]"
                >
                  <div className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-full justify-center relative">
                    <Image
                      src={item.produkt_pozadie}
                      width={0}
                      height={0}
                      priority={true}
                      quality={100}
                      sizes="100vw"
                      className="absolute w-full h-full object-cover opacity-40 z-10"
                      alt="Produktový obrázok"
                    />
                    <Image
                      src={item.produkt_foto}
                      width={500}
                      height={500}
                      priority={true}
                      quality={100}
                      className="w-full h-[200px]  object-contain z-[1000] "
                      alt="Produktový obrázok"
                    />
                  </div>
                  <p className=" text-black pt-4 text-center">{item.nazov}</p>
                </Link>
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
    </>
  );
};

export default HomePageProducts;
