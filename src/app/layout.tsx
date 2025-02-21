import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CityProvider from "./CityContext";


export const metadata: Metadata = {
  title: "SkyCast App foe wrethear status",
  description: "created by mohammed alkaf & hasan alhddad",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="en">
      <body className={"font-playfair antialiased my-container"}>
        <Navbar />
        <CityProvider>{children}</CityProvider>
        <Footer />
      </body>
    </html>
  );
}
