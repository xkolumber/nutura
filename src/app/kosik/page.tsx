"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageForPages from "../components/ImageForPages";
import Navbar2 from "../components/Navbar2";
import Image from "next/image";
import { Product } from "../lib/interface_product";
import { ClipLoader } from "react-spinners";
import { urlFor } from "../lib/sanityImageUrl";

const Page = () => {
  let cart: Record<string, number> = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-data-shopping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: Object.keys(cart),
          }),
        });

        const product = await response.json();

        setData(product);

        if (response.ok) {
          setIsLoading(false);
        } else {
          console.error("failed");
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />

      <div className="main_section mt-32 md:mt-0">
        <h2>Košík</h2>
        <div className="w-full justify-center flex">
          {data.length <= 0 && (
            <ClipLoader size={40} color={"#174218"} loading={isLoading} />
          )}

          {data.length > 0 && (
            <>
              <div className="flex flex-row justify-between w-full max-w-screen-lg">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-secondary">
                      <th className="text-left uppercase">
                        <h5>Obrázok</h5>
                      </th>
                      <th className="text-left uppercase">
                        <h5>Produkt</h5>
                      </th>
                      <th className="uppercase text-left">
                        <h5> Cena </h5>
                      </th>
                      <th className="uppercase text-left">
                        <h5> Počet </h5>
                      </th>
                      <th className="uppercase text-left">
                        <h5>Medzisúčet</h5>
                      </th>
                    </tr>

                    {data.map((item, index) => (
                      <tr key={index} className="border-b border-secondary ">
                        <td className="">
                          {" "}
                          <Image
                            src={urlFor(item.photo).url()}
                            width={50}
                            height={50}
                            className="w-30 h-30 object-cover"
                            alt="Intro produktového obrázku"
                          />
                        </td>
                        <td className="border-l border-secondary pl-4">
                          {item.title}
                        </td>
                        <td className="border-l border-secondary pl-4">
                          {item.price}
                        </td>
                        <td className="border-l border-secondary pl-4">
                          {" "}
                          {cart[item._id]}
                        </td>
                        <td className="border-l border-secondary pl-4">
                          {parseInt(item.price) * cart[item._id]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
