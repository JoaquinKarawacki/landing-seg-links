import { Red_Hat_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Central de Proyectos · SEG Ingeniería",
  description:
    "Acceso centralizado a los sistemas, dashboards y herramientas internas desarrolladas para SEG Ingeniería.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${redHatDisplay.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
