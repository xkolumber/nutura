import Footer from "@/app/components/Footer";
import StepBack from "@/app/components/StepBack";
import { Blog } from "@/app/lib/all_interfaces";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface Props {
  data_article: Blog;
}

const BlogPageSlugClient = ({ data_article }: Props) => {
  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => {
        if (value && value.asset && value.asset._ref) {
          return (
            <Image
              src={urlFor(value).url()}
              alt="image"
              width={700}
              height={700}
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 70vw"
              quality={100}
              className=""
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
            />
          );
        }
        return null;
      },
    },
  };
  return (
    <div className="own_edge">
      <div className="main_section mt-16 md:mt-0">
        <StepBack />
        <h1 className="text-center">{data_article.title}</h1>
        <div className="flex w-full  justify-center">
          <div className="xl:max-w-[600px] 2xl:max-w-[700px] mt-8 md:mt-24">
            <PortableText
              value={data_article.content}
              components={PortableTextComponent}
            />
          </div>
        </div>
        <Image
          src={urlFor(data_article.photo1).url()}
          width={900}
          height={900}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 80vw"
          quality={100}
          className="w-full object-cover mt-4 mb-4 md:mt-12 md:mb-12 rounded-3xl max-h-[900px]"
          alt="Intro produktového obrázku"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
        />
        <div className="flex w-full  justify-center">
          <div className="xl:max-w-[600px] 2xl:max-w-[700px]">
            <PortableText
              value={data_article.content2}
              components={PortableTextComponent}
            />
          </div>
        </div>

        {data_article.photo2 && (
          <Image
            src={urlFor(data_article.photo2).url()}
            width={900}
            height={900}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 80vw"
            quality={100}
            className="w-full object-cover mt-4 mb-4 md:mt-12 md:mb-12 rounded-3xl max-h-[900px]"
            alt="Intro produktového obrázku"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEklEQVR4nGP48OHDf2TMQLoAABc0PPGQ/86sAAAAAElFTkSuQmCC"
          />
        )}

        {data_article.content3 && (
          <div className="flex w-full  justify-center">
            <div className="xl:max-w-[600px] 2xl:max-w-[700px]">
              <PortableText
                value={data_article.content3}
                components={PortableTextComponent}
              />
            </div>
          </div>
        )}
        {/* <h1 className="mt-4 md:mt-12">Podobné články</h1> */}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPageSlugClient;
