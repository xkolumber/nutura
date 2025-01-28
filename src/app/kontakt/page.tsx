import { Metadata } from "next";
import Footer from "../components/Footer";
import HomePageContactUs from "../components/HomePage/HomePageContactUs";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Neváhajte nás kontaktovať. Sme tu pre vás!",

  keywords: ["Nutura", "Kontakt", "Sprejové vitamíny", "Podpora", "Otázky"],
  openGraph: {
    title: "Kontakt",
    description: "Neváhajte nás kontaktovať. Sme tu pre vás!",
    url: "https://www.nuturasprejovevitaminy.sk/kontakt",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/produkty%2FbagOfFood-848x445.jpg?alt=media&token=9543dbc2-019e-4776-a1dc-9892edc71a60",
        alt: "Nutura",
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
