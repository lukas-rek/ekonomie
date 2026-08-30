import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarLayout from "@/components/SidebarLayout"; 
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Ekonomie Přehledně | Interaktivní Učebnice",
  description: "Moderní interaktivní učebnice ekonomie s grafy, příklady a cvičeními.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`scroll-smooth ${newsreader.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-[#FBF9F5] text-stone-800 flex flex-col min-h-screen antialiased selection:bg-stone-200 selection:text-stone-900">
        
        <Navbar />

        {/* pt-16 aby obsah nebyl pod navbarem */}
        <div className="pt-16 flex flex-1 flex-col bg-[#FBF9F5]">
          <SidebarLayout>
            {children}
          </SidebarLayout>
        </div>

        <div className="relative z-40 bg-stone-900 border-t border-stone-800">
           <Footer />
        </div>
        
      </body>
    </html>
  );
}