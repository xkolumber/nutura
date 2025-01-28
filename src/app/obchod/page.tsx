import { Metadata } from "next";
import Footer from "../components/Footer";
import ShopSectionData from "../components/ShopSectionData";

export const metadata: Metadata = {
  title: "E-shop s vitamínmi a doplnkami výživy v spreji",
  description:
    "Objavte našu exkluzívnu ponuku vitamínov a doplnkov výživy v praktickej sprejovej forme. Rýchla absorpcia, maximálna výživa a jednoduché používanie. Nakupujte teraz a doprajte svojmu telu to najlepšie!",

  keywords: ["Nutura", "vitamíny", "doplnky výživy"],
  openGraph: {
    title: "E-shop s vitamínmi a doplnkami výživy v spreji",
    url: "https://www.nuturasprejovevitaminy.sk/obchod",
    description:
      "Objavte našu exkluzívnu ponuku vitamínov a doplnkov výživy v praktickej sprejovej forme. Rýchla absorpcia, maximálna výživa a jednoduché používanie. Nakupujte teraz a doprajte svojmu telu to najlepšie!",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/produkty%2Fhow--works.webp?alt=media&token=8d9d5e8e-2b60-4845-8fca-a64de3ecdc01",
        alt: "Nutura",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const page = () => {
  return (
    <div className="own_edge ">
      <div className="main_section additional_padding  min-h-[600px]">
        <h1 className="uppercase">Obchod</h1>
        <ShopSectionData />
      </div>
      <Footer />
    </div>
  );
};

export default page;
