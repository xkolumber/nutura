import { Metadata } from "next";
import BlogsAll from "../components/BlogComponents/BlogsAll";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Vitamíny a doplnky výživy v spreji | Nutura",
  description:
    "Objavte našu revolúciu v doplnkoch výživy! Vitamíny a minerály v praktickej sprejovej forme pre rýchlu a efektívnu absorpciu. Prečítajte si naše blogy a zistite viac o výhodách našich produktov.",

  keywords: ["Nutura", "blogy", "vitamíny"],
  openGraph: {
    title: "Vitamíny a doplnky výživy v spreji | Nutura",
    url: "https://www.nuturasprejovevitaminy.sk/blog",
    description:
      "Objavte našu revolúciu v doplnkoch výživy! Vitamíny a minerály v praktickej sprejovej forme pre rýchlu a efektívnu absorpciu. Prečítajte si naše blogy a zistite viac o výhodách našich produktov.",

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
