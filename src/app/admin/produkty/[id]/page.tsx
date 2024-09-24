import ProductAdmin from "@/app/components/ProductAdmin";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import { GetAdminProductId } from "@/app/lib/functionsServer";

const Page = async ({ params }: { params: { id: string } }) => {
  const data = (await GetAdminProductId(params.id)) as ProductFirebase;

  return (
    <>
      <ProductAdmin data={data} />
    </>
  );
};

export default Page;
