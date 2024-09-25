import { GetAdminProducts } from "@/app/lib/functionsServer";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import HomePageProducts from "./HomePageProducts";

async function GetData() {
  const data = await GetAdminProducts();

  if (data) {
    return <HomePageProducts data={data} />;
  }
  return <HomePageProducts data={[]} />;
}

const HomePageProductsServer = () => {
  return (
    <Suspense
      fallback={
        <div className="main_section additional_padding">
          <ClipLoader size={20} color={"#00000"} loading={true} />
        </div>
      }
    >
      <GetData />
    </Suspense>
  );
};

export default HomePageProductsServer;
