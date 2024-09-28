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
              <div className="min-h-[600px]">
                {" "}
                <ClipLoader size={20} color={"#32a8a0"} loading={true} />
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
