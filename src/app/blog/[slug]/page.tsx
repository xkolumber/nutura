import { Blog } from "@/app/lib/interface_blog";
import { client } from "@/app/lib/sanity";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";

async function getDataBlog(slug: string) {
  const query = `*[_type == "blog" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data_article = (await getDataBlog(params.slug)) as Blog;

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => {
        if (value && value.asset && value.asset._ref) {
          return (
            <Image
              src={urlFor(value).url()}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              quality={100}
              className=""
            />
          );
        }
        return null;
      },
    },
  };
  return (
    <>
      <Image
        src={"/intro.jpg"}
        width={500}
        height={500}
        priority={true}
        className="w-full h-[267px] object-cover"
        alt="Intro produktového obrázku"
      />

      <div className="main_section">
        <h1>{data_article.title}</h1>
        <div className="flex w-full  justify-center">
          <div className="xl:max-w-[600px]">
            <PortableText
              value={data_article.content}
              components={PortableTextComponent}
            />
          </div>
        </div>
        <Image
          src={urlFor(data_article.photo1).url()}
          width={500}
          height={500}
          className="w-full object-cover mt-4 mb-4 md:mt-12 md:mb-12 rounded-3xl"
          alt="Intro produktového obrázku"
        />
        <div className="flex w-full  justify-center">
          <div className="xl:max-w-[600px]">
            <PortableText
              value={data_article.content2}
              components={PortableTextComponent}
            />
          </div>
        </div>

        {data_article.photo2 && (
          <Image
            src={urlFor(data_article.photo2).url()}
            width={500}
            height={500}
            className="w-full object-cover mt-4 mb-4 md:mt-12 md:mb-12 rounded-3xl"
            alt="Intro produktového obrázku"
          />
        )}

        {data_article.content3 && (
          <div className="flex w-full  justify-center">
            <div className="xl:max-w-[600px]">
              <PortableText
                value={data_article.content3}
                components={PortableTextComponent}
              />
            </div>
          </div>
        )}
        <h1 className="mt-4 md:mt-12">Podobné články</h1>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default Page;
