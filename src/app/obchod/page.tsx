import { Suspense } from "react";
import Footer from "../components/Footer";
import ShopSection from "../components/ShopSection";
import { GetAdminProducts } from "../lib/functionsServer";
import { ClipLoader } from "react-spinners";

const page = async () => {
  const data = await GetAdminProducts();
  return (
    <div className="own_edge ">
      <div className="main_section additional_padding  min-h-[600px]">
        <h1 className="uppercase">Obchod</h1>
        <Suspense
          fallback={
            <div className=" min-h-screen">
              <ClipLoader size={20} color={"#00000"} loading={true} />
            </div>
          }
        >
          <ShopSection data={data} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default page;
