import { Arimo } from "next/font/google";
import { AuthContextProvider } from "./auth/Provider";
import GoogleAnalyticsScript from "./components/GoogleAnalyticsScript";
import HydrationZustand from "./components/HydrationZustand";
import ImageForPages from "./components/ImageForPages";
import Navbar2 from "./components/Navbar/Navbar2";
import "./globals.css";
import { CSPostHogProvider } from "./posthog/Provider";
import Provider from "./util/Provider";

const inter = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Nutura | Sprejové vitamíny",
  description:
    "Objavte našu revolúciu v doplnkoch výživy! Vitamíny a minerály v praktickej sprejovej forme pre rýchlu a efektívnu absorpciu.",
  keywords: [
    "Nutura",
    "e-shop",
    "vitamíny v spreji",
    "doplnky výživy",
    "zdravie a wellness",
    "rýchla absorpcia",
    "praktické vitamíny",
    "minerály v spreji",
    "nákup vitamínov online",
  ],
  openGraph: {
    title: "Vitamíny a doplnky výživy v spreji | Nutura",
    url: "https://www.nuturasprejovevitaminy.sk/blog",
    description:
      "Objavte našu revolúciu v doplnkoch výživy! Vitamíny a minerály v praktickej sprejovej forme pre rýchlu a efektívnu absorpciu.",

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <GoogleAnalyticsScript />
        <meta
          name="google-site-verification"
          content="H2smjgi46T35B0EW2_vQTSMnEq-6vgFpTGJVz04i2yg"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <AuthContextProvider>
            <CSPostHogProvider>
              <HydrationZustand>
                <ImageForPages />
                <Navbar2 />
                {children}
              </HydrationZustand>
            </CSPostHogProvider>
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}
