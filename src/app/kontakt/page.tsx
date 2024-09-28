import Footer from "../components/Footer";
import HomePageContactUs from "../components/HomePage/HomePageContactUs";

const page = () => {
  return (
    <div className="own_edge">
      <div className="additional_padding  ">
        <h1 className="">Kontakt</h1>
        <p className="-mb-8">
          V prípade akýchkoľvek otázok nás neváhajte kontaktovať. :)
        </p>
        <HomePageContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default page;
