import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Marine World of Texas - New & Used Boats, Service, and Parts in Whitehouse, TX",
  description:
    "Marine World of Texas in Whitehouse, TX, featuring new & used Boats for sale, parts, and service near Jacksonville, Longview, Dallas, and Fort Worth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoCondensed.variable} ${inter.variable}`}
    >
      <body
        style={{
          backgroundColor: "#0B1325",
          color: "#fff",
          fontFamily: "'Roboto Condensed', sans-serif",
          margin: 0,
          padding: 0,
          paddingTop: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
