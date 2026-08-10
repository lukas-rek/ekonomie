"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  // Stav: True = otevřeno, False = zavřeno
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // Seznam stránek, kde Sidebar NECHCEME (všechny dostanou 100% šířku)
  const isFullWidthPage = 
    pathname === '/' || 
    pathname === '/o-autorovi' || 
    pathname === '/o-projektu' || 
    pathname === '/materialy' || 
    pathname?.startsWith('/hry') || 
    pathname?.startsWith('/minihry');

  if (isFullWidthPage) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <div className="flex flex-1 relative">
      
      {/* --- 1. SIDEBAR (Levý panel) --- */}
      <div 
        className={`
          fixed top-16 bottom-0 left-0 z-40
          border-r border-slate-200 bg-slate-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-72'} 
        `}
      >
        <Sidebar />

        {/* Tlačítko (Ouško) s šipkou */}
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white border border-slate-200 p-1 rounded-full shadow-md text-slate-500 hover:text-blue-600 cursor-pointer flex items-center justify-center w-8 h-8 z-50"
        title={isOpen ? "Zastrčit" : "Vysunout"}
        >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* --- 2. OBSAH (Pravý panel) --- */}
      <main 
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'lg:pl-72' : 'pl-0'} 
        `}
      >
        {children}
      </main>

    </div>
  );
}