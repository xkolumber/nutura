import AdminPromoCodes from "@/app/components/AdminSection/AdminPromoCodes";
import { GetAdminPromoCodesNoCache } from "@/app/lib/functionsServer";

const Page = async () => {
  const data = await GetAdminPromoCodesNoCache();
  return (
    <div>
      <AdminPromoCodes promoCodes={data} />
    </div>
  );
};

export default Page;
