import { Product } from "@/app/lib/interface_product";
import { client } from "@/app/lib/sanity";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImageUrl";
import Navbar from "@/app/components/Navbar";
import Navbar2 from "@/app/components/Navbar2";
import ImageForPages from "@/app/components/ImageForPages";

async function getDataProduct(slug: string) {
  const query = `*[_type == "product" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data_article = (await getDataProduct(params.slug)) as Product;
  return (
    <>
      <Navbar />
      <ImageForPages />
      <Navbar2 />

      <div className="main_section mt-32 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2>{data_article.title}</h2>
            <p className="w-full md:w-3/4">
              Your Gateway to Enhanced Well-being! Discover a world of health
              transformation with our innovative range of natural health sprays.
              We believe in making wellness accessible and enjoyable for
              everyone.
            </p>
            <h5>Objem</h5>
            <p>{data_article.volume} ml</p>
            <h5>Počet kusov</h5>
            <button className="btn btn--secondary">Kúpiť</button>
          </div>
          <div className="h-[500px] w-full md:w-1/2 flex items-center justify-center ">
            <Image
              src={urlFor(data_article.photo).url()}
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
            <p>{data_article.composition}</p>
            <h2>Skladovanie</h2>
            <p>{data_article.storage}</p>
            <h2>Odporúčané dávkovanie</h2>
            <p>{data_article.recommended}</p>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-secondary">
                  <th className="text-left uppercase">
                    <h5>Obsah aktívnych látok</h5>
                  </th>
                  <th className="uppercase text-left">
                    <h5>{data_article.number_of_injections} vstrekov </h5>
                  </th>
                </tr>
                {data_article.nutrition.map((item, index) => (
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

export default Page;
