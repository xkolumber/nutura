import { Blog } from "@/app/lib/all_interfaces";
import { getDataBlog } from "@/app/lib/functionsServer";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

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
      <div className="main_section mt-16 md:mt-0">
        <h1>{data_article.title}</h1>
        <div className="flex w-full  justify-center">
          <div className="xl:max-w-[600px] mt-8 md:mt-24">
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
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
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
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

export default Page;
