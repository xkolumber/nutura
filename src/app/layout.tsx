import Navbar from "./components/Navbar";
import "./globals.css";
import { Arimo } from "next/font/google";

const inter = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
