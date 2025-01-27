import BlogsAll from "../components/BlogComponents/BlogsAll";
import Footer from "../components/Footer";

const Page = () => {
  return (
    <div className="own_edge">
      <div className="">
        <div className="main_section additional_padding">
          <h1>BLOG</h1>
          <BlogsAll />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
