"use client";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../../lib/all_interfaces";
import { urlFor } from "../../lib/sanityImageUrl";
import { getFormatedDate } from "../../lib/functionsClient";

interface Props {
  data: Blog[];
}

const BlogComponent = ({ data }: Props) => {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-8 gap-[32px] ">
        {data.map((article, index) => (
          <Link
            className=" border-black border rounded-2xl hover:scale-[1.02] duration-200"
            key={index}
            href={`/blog/${article.slug.current}`}
          >
            <Image
              src={urlFor(article.photo1).url()}
              width={500}
              height={500}
              priority={true}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 30vw"
              className="w-full h-[267px] 2xl:h-[400px] 3xl:h-[500px] object-cover rounded-t-2xl"
              alt="Intro produktového obrázku"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
            />

            <div className="p-4">
              <h5>{article.title}</h5>
              <p>{getFormatedDate(article._createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
