import { Arimo } from "next/font/google";
import { AuthContextProvider } from "./auth/Provider";
import GoogleAnalyticsScript from "./components/GoogleAnalyticsScript";
import HydrationZustand from "./components/HydrationZustand";
import ImageForPages from "./components/ImageForPages";
import Navbar2 from "./components/Navbar/Navbar2";
import "./globals.css";
import { CSPostHogProvider } from "./posthog/Provider";

const inter = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Nutura | Sprejové vitamíny",
  description: "Generated by create next app",
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
        <AuthContextProvider>
          <CSPostHogProvider>
            <HydrationZustand>
              <ImageForPages />
              <Navbar2 />
              {children}
            </HydrationZustand>
          </CSPostHogProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
