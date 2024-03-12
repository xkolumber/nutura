import ProductPage from "@/app/components/ProductPage";
import React from "react";

type Props = {
  params: { slug: string };
};

const page = ({ params }: Props) => {
  return <ProductPage slug={params.slug} />;
};

export default page;
