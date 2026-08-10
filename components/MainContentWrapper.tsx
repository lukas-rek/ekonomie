"use client"; // Tohle musí být první řádek!
import React from 'react';
import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Zde definuj stránky, kde je obsah přes celou šířku (protože tam není Sidebar)
  const isFullWidth = pathname === '/' || pathname === '/o-autorovi' || pathname === '/materialy' || pathname === '/aktualni-deni';

  // Pokud je stránka "úzká" (učebnice), přidáme lg:pl-64 (odsazení pro sidebar)
  // Flex-1 zajistí, že se obsah roztáhne a footer bude dole
  return (
    <main className={`flex-1 flex flex-col transition-all duration-300 ${isFullWidth ? '' : 'lg:pl-72'}`}>
      {children}
    </main>
  );
}