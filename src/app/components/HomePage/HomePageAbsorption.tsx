import React from "react";
import Image from "next/image";
import { getLatestBlog } from "@/app/lib/functionsServer";
import { Blog } from "@/app/lib/all_interfaces";
import { urlFor } from "@/app/lib/sanityImageUrl";
import Link from "next/link";
import { getFormatedDate } from "@/app/lib/functionsClient";

const HomePageAbsorption = async () => {
  const data = (await getLatestBlog()) as Blog;

  return (
    <div className="tight_section relative min-h-[560px] 2xl:min-h-[700px] 3xl:min-h-[900px] overflow-hidden bg-[#B6BEA7] section_space">
      <h1 className="uppercase max-w-[80%] ">{data.title}</h1>

      <Link
        className="btn btn--secondary bg-none "
        href={`/blog/${data.slug.current}`}
      >
        Prečítať
      </Link>
      <p className="md:hidden">{data._createdAt}</p>
      <p className="absolute left-0 bottom-0 ml-12 mb-12 hidden md:block">
        {getFormatedDate(data._createdAt)}
      </p>

      <Image
        src={urlFor(data.photo1).url()}
        width={500}
        height={500}
        priority={true}
        sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 40vw"
        className="w-[400px] xl:w-[500px] 2xl:w-[600px]  absolute -bottom-[100px] right-0 rotate-[12.5deg] rounded-3xl object-contain"
        alt="Intro produktového obrázku"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
      />
    </div>
  );
};

export default HomePageAbsorption;
