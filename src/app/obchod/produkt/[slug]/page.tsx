import ProductPage from "@/app/components/ProductPage";
import { GetAdminCertainProduct } from "@/app/lib/functionsServer";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  params: { slug: string };
};

async function GetData(slug: string) {
  const data = await GetAdminCertainProduct(slug);

  if (data) {
    return <ProductPage data={data} />;
  } else {
    redirect("/error");
  }
}

const Page = ({ params }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="own_edge_skeleton min-h-screen">
          <div className="main_section additional_padding ">
            <ClipLoader size={20} color={"#00000"} loading={true} />
          </div>
        </div>
      }
    >
      {GetData(params.slug)}
    </Suspense>
  );
};

export default Page;
