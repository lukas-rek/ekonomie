"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Circle } from 'lucide-react';

const CHAPTERS = [
  {
    title: "Základní ekonomické koncepty",
    slug: "zakladni-koncepty",
    subchapters: [
      { title: "Úvod do ekonomie", slug: "uvod-ekonomie" },
      { title: "Metodologie a ekonomické modely", slug: "metodologie" },
      { title: "Statek, vzácnost, užitek hodnota", slug: "statek-vzacnost-uzitek-hodnota" },
      { title: "Výrobní faktory", slug: "vyrobni-faktory" },
      { title: "Hranice produkčních možnosti a náklady obětované příležitosti", slug: "hranice-produkcnich-moznosti" },
      { title: "Komparativní a absolutní výhoda", slug: "komparativni-absolutni-vyhoda" },
      { title: "Nabídka, poptávka a tržní rovnováha", slug: "nabidka-poptavka" },
    ]
  },
  {
    title: "Mikroekonomie",
    slug: "mikroekonomie",
    subchapters: [
      { title: "Tržní síly a ceny", slug: "trzni-sily-a-ceny " },
      { title: "Elasticita", slug: "elasticita" },
      { title: "Chování spotřebitele", slug: "chovani-spotrebitele" },
      { title: "Chování firmy", slug: "chovani-firmy" },
      { title: "Tržní struktury", slug: "trzni-struktury" },
      { title: "Základy teorie her", slug: "teorie-her" },
      { title: "Trh výrobních faktorů", slug: "trh-vyrobnich-faktoru" },
      { title: "Tržní selhání a státní zásahy", slug: "trzni-selhani" },
    ]
  },
  {
    title: "Makroekonomie",
    slug: "makroekonomie",
    subchapters: [
      { title: "Ukazatele ekonomiky", slug: "ukazatele-ekonomiky" },
      { title: "Agregátní poptávka a nabídka", slug: "agregatni-poptavka-a-nabidka" },
      { title: "Hospodářský růst a hospodářský cyklus", slug: "hospodarsky-rust-a-cyklus" },
      { title: "Nezaměstnanost", slug: "nezamestnanost" },
      { title: "Inflace", slug: "inflace" },
      { title: "Fiskální politika, rozpočet a státní dluh", slug: "fiskalni-politika" },
    ]
  },
  { title: "Peníze a bankovnictví", slug: "penize-a-bankovnictvi", subchapters: [
      { title: "Podstata peněz, jejich funkce a vývoj", slug: "podstata-penez-funkce-a-vyvoj" },
      { title: "Bankovní systém a tvorba peněz", slug: "bankovni-system-a-tvorba-penez" },
      { title: "Trh peněz, úrok a kapitál", slug: "trh-peněz" },
      { title: "Centrální bankovnictví a monetární politika", slug: "centralni-bankovnictvi-a-monetarni-politika" },
      { title: "Měnový kurz", slug: "menovy-kurz" },
      { title: "Bitcoin, fiat a zlatý standard", slug: "bitcoin-fiat-a-zlaty-standard" },
  ] },
  { title: "Stručné dějiny ekonomického myšlení", slug: "dejiny-ekonomickeho-mysleni", subchapters: [] },

];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Efekt: Pokud uživatel přijde přímo na podstránku, automaticky otevřeme sekci v menu
  useEffect(() => {
    if (!pathname) return;
    
    const activeChapter = CHAPTERS.find(c => pathname.startsWith(`/${c.slug}`));
    
    if (activeChapter && openSection !== activeChapter.slug) {
      setOpenSection(activeChapter.slug);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // SKRYTÍ SIDEBARU: Pokud jsme v sekci her nebo miniher, Sidebar nevrátí nic (null)
  // Je důležité, že toto je až po zavolání všech hooků (useState a useEffect)
  if (pathname && (pathname.startsWith('/hry') || pathname.startsWith('/minihry'))) {
    return null;
  }

  return (
    <aside className="h-full flex flex-col overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-slate-200">
    
    <div className="px-3 py-2 space-y-1">
      
      <h3 className="px-3 text-xs font-black uppercase text-slate-400 tracking-widest mb-2 mt-0 pt-2">
        Obsah učebnice
      </h3>

        {CHAPTERS.map((chapter) => {
          // Zjistíme, jestli jsme v této kapitole (pro zvýraznění)
          const isActive = pathname?.startsWith(`/${chapter.slug}`);

          return (
            <div key={chapter.slug} className="space-y-1">
              {/* Hlavní kapitola */}
              <div className="flex items-center group">
                <Link 
                  href={`/${chapter.slug}`}
                  className={`flex-1 px-3 py-2 text-sm font-bold rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                      : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                  }`}
                >
                  {chapter.title}
                </Link>
                
                {chapter.subchapters.length > 0 && (
                  <button 
                    onClick={() => setOpenSection(openSection === chapter.slug ? null : chapter.slug)}
                    className="p-1.5 ml-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-200/50 transition-colors"
                  >
                    {openSection === chapter.slug ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                )}
              </div>

              {/* Podkapitoly */}
              {(openSection === chapter.slug) && chapter.subchapters.length > 0 && (
                <div className="ml-4 pl-3 border-l-2 border-slate-200 space-y-1 mt-1 mb-3">
                  {chapter.subchapters.map((sub) => {
                    const isSubActive = pathname?.includes(sub.slug);
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${chapter.slug}/${sub.slug}`}
                        className={`flex items-start px-3 py-1.5 text-xs transition-colors group rounded-md ${
                          isSubActive ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <Circle size={6} className={`mr-2 mt-1 shrink-0 ${isSubActive ? 'fill-blue-600 text-blue-600' : 'text-slate-300'}`} />
                        <span className="leading-relaxed">
                            {sub.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}