// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/UI/Navbar";
import Footer from "./components/UI/Footer";
import CityProvider from "./components/GlobalStates/CityContext";

export const metadata: Metadata = {
  title: "SkyCast - Weather Forecast",
  description:
    "Real-time weather updates created by Mohammed Alkaf & Hasan Alhddad",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-playfair flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
        <CityProvider>
          <Navbar />
          <main className="justify-items-center flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </CityProvider>
      </body>
    </html>
  );
}
