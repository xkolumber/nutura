import AdminPromoCodes from "@/app/components/AdminPromoCodes";
import { GetAdminPromoCodes } from "@/app/lib/functionsServer";
import React from "react";

const Page = async () => {
  const data = await GetAdminPromoCodes();
  return (
    <div>
      <AdminPromoCodes promoCodes={data} />
    </div>
  );
};

export default Page;
