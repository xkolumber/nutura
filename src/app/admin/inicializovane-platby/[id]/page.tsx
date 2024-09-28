import AdminInitializePayment from "@/app/components/AdminSection/AdminInitializePayment";
import { GetAdminPayment } from "@/app/lib/functionsServer";
import React from "react";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const data = await GetAdminPayment(params.id);
  if (data) {
    return <AdminInitializePayment data_payment={data} />;
  }
};

export default Page;
