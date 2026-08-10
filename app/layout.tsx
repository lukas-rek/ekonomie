import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarLayout from "@/components/SidebarLayout"; 
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "Pracovní název",
  description: "Interaktivní učebnice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} font-sans bg-white text-slate-900 flex flex-col min-h-screen antialiased`}>
        
        <Navbar />

        {/* pt-16 aby to nebylo pod navbarem */}
        <div className="pt-16 flex flex-1 flex-col">
          
          {/* Všechno zabalíme do SidebarLayout */}
          <SidebarLayout>
            {children}
          </SidebarLayout>

        </div>

        <div className="relative z-50 bg-white">
           <Footer />
        </div>
        
      </body>
    </html>
  );
}