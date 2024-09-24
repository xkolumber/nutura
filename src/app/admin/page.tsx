import DatabaseSection from "../components/DatabaseSection";
import { GetPayments } from "../lib/functionsServer";

const Page = async () => {
  const data = await GetPayments();
  return (
    <>
      <DatabaseSection data={data} />
    </>
  );
};

export default Page;
