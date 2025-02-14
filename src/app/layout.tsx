import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SkyCast App foe wrethear status",
  description: "created by mohammed alkaf & hasanalhddad",
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
        <div className="mt-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
