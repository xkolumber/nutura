import ProductPageServer from "@/app/components/ProductPageServer";

type Props = {
  params: { slug: string };
};

const Page = ({ params }: Props) => {
  return <ProductPageServer slug={params.slug} />;
};

export default Page;
