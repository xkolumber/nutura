import AdminInitializePayments from "@/app/components/AdminInitializePayments ";
import { GetPaymentsInitialize } from "@/app/lib/functionsServer";
import React from "react";

const page = async () => {
  const data = await GetPaymentsInitialize();
  return (
    <div>
      <AdminInitializePayments data={data} />
    </div>
  );
};

export default page;
