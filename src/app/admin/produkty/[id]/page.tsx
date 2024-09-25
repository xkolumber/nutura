import ProductAdmin from "@/app/components/ProductAdmin";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { GetAdminProductIdNoCache } from "@/app/lib/functionsServer";

const Page = async ({ params }: { params: { id: string } }) => {
  const data = (await GetAdminProductIdNoCache(params.id)) as ProductFirebase;

  return (
    <>
      <ProductAdmin data={data} />
    </>
  );
};

export default Page;
