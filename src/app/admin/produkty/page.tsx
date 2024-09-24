import AdminProductsSection from "@/app/components/AdminProductsSection";
import { GetAdminProductsLess } from "@/app/lib/functionsServer";

const Page = async () => {
  const data = await GetAdminProductsLess();
  return (
    <div>
      <AdminProductsSection products={data} />
    </div>
  );
};

export default Page;
