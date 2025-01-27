import AdminPaymentId from "@/app/components/AdminSection/AdminPaymentId";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  return (
    <div>
      <AdminPaymentId id={params.id} />
    </div>
  );
};

export default Page;
