import { client } from "@/app/lib/sanity";

import ProductElement from "@/app/components/ProductElement";
import { Product } from "@/app/lib/all_interfaces";

async function getDataProduct(slug: string) {
  const query = `*[_type == "product" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = (await getDataProduct(params.slug)) as Product;

  return <ProductElement data={data} />;
};

export default Page;
