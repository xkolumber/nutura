import ProductPageServer from "@/app/components/ProductPageServer";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { stripHtmlTags } from "@/app/lib/functionsClient";
import { GetAdminCertainProduct } from "@/app/lib/functionsServer";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = (await GetAdminCertainProduct(params.slug)) as ProductFirebase;

  if (data === null) {
    return {
      title: "",
      description: "",
      openGraph: {
        title: "",
        description: "",
        images: [
          {
            url: "",
            alt: "",
          },
        ],
      },
    };
  }
  return {
    title: data.nazov,
    description: stripHtmlTags(data.popis_produkt),
    openGraph: {
      title: data.nazov,
      description: data.popis_produkt,
      images: [
        {
          url: data.produkt_foto,
          alt: data.nazov,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const Page = ({ params }: Props) => {
  return <ProductPageServer slug={params.slug} />;
};

export default Page;
