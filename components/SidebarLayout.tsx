"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // Seznam stránek, kde Sidebar nechceme
  const isFullWidthPage = 
    pathname === '/' || 
    pathname === '/o-autorovi' || 
    pathname === '/o-projektu' || 
    pathname === '/materialy' || 
    pathname?.startsWith('/hry') || 
    pathname?.startsWith('/minihry');

  if (isFullWidthPage) {
    return <main className="flex-1 flex flex-col bg-[#FBF9F5]">{children}</main>;
  }

  return (
    <div className="flex flex-1 relative bg-[#FBF9F5]">
      
      {/* --- 1. SIDEBAR (Levý panel) --- */}
      <div 
        className={`
          fixed top-16 bottom-0 left-0 z-40
          border-r border-stone-200 bg-[#F7F4EE]
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-72'} 
        `}
      >
        <Sidebar />

        {/* Tlačítko (Ouško) s šipkou */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-20 bg-white border border-stone-300 p-1 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-50 shadow-sm transition-all cursor-pointer flex items-center justify-center w-8 h-8 z-50 active:scale-95"
          title={isOpen ? "Zastrčit menu" : "Vysunout menu"}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* --- 2. OBSAH (Pravý panel) --- */}
      <main 
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out bg-[#FBF9F5]
          ${isOpen ? 'lg:pl-72' : 'pl-0'} 
        `}
      >
        {children}
      </main>

    </div>
  );
}