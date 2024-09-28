import { Suspense } from "react";
import BlogComponent from "../components/BlogComponent";
import Footer from "../components/Footer";
import { getBlogs } from "../lib/functionsServer";
import { ClipLoader } from "react-spinners";

const Page = async () => {
  const data = await getBlogs();

  return (
    <div className="own_edge">
      <div className="">
        <div className="main_section additional_padding">
          <h1>BLOG</h1>
          <Suspense
            fallback={
              <div className="own_edge_skeleton min-h-screen">
                <div className="main_section additional_padding ">
                  <ClipLoader size={20} color={"#00000"} loading={true} />
                </div>
              </div>
            }
          ></Suspense>
          <BlogComponent data={data} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
