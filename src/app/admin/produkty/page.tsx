import AdminProductsSection from "@/app/components/AdminSection/AdminProductsSection";
import { GetAdminProductsLessNoCache } from "@/app/lib/functionsServer";

const Page = async () => {
  const data = await GetAdminProductsLessNoCache();
  return (
    <div>
      <AdminProductsSection products={data} />
    </div>
  );
};

export default Page;
