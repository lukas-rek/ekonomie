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
      { title: "Závěrečný test kapitoly", slug: "test" },
    ]
  },
  {
    title: "Mikroekonomie",
    slug: "mikroekonomie",
    subchapters: [
      { title: "Tržní síly a ceny", slug: "trzni-sily-a-ceny" },
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
  { 
    title: "Peníze a bankovnictví", 
    slug: "penize-a-bankovnictvi", 
    subchapters: [
      { title: "Podstata peněz, jejich funkce a vývoj", slug: "podstata-penez-funkce-a-vyvoj" },
      { title: "Bankovní systém a tvorba peněz", slug: "bankovni-system-a-tvorba-penez" },
      { title: "Trh peněz, úrok a kapitál", slug: "trh-peněz" },
      { title: "Centrální bankovnictví a monetární politika", slug: "centralni-bankovnictvi-a-monetarni-politika" },
      { title: "Měnový kurz", slug: "menovy-kurz" },
      { title: "Bitcoin, fiat a zlatý standard", slug: "bitcoin-fiat-a-zlaty-standard" },
    ] 
  },
  { 
    title: "Stručné dějiny ekonomického myšlení", 
    slug: "dejiny-ekonomickeho-mysleni", 
    subchapters: [] 
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    
    const activeChapter = CHAPTERS.find(c => pathname.startsWith(`/${c.slug}`));
    
    if (activeChapter && openSection !== activeChapter.slug) {
      setOpenSection(activeChapter.slug);
    }
  }, [pathname]);

  if (pathname && (pathname.startsWith('/hry') || pathname.startsWith('/minihry'))) {
    return null;
  }

  return (
    <aside className="h-full flex flex-col overflow-y-auto pb-10 bg-[#F7F4EE] border-r border-stone-200">
      <div className="px-3 py-4 space-y-1.5">
        
        <div className="px-3 mb-3 pb-2 border-b border-stone-200/80">
          <h3 className="text-[10px] font-black uppercase text-stone-500 tracking-[0.2em]">
            Obsah učebnice
          </h3>
        </div>

        {CHAPTERS.map((chapter) => {
          const isActive = pathname?.startsWith(`/${chapter.slug}`);

          return (
            <div key={chapter.slug} className="space-y-1">
              {/* Hlavní kapitola */}
              <div className="flex items-center group">
                <Link 
                  href={`/${chapter.slug}`}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-stone-900 border border-stone-300 shadow-sm' 
                      : 'text-stone-700 hover:bg-stone-200/60 hover:text-stone-900'
                  }`}
                >
                  {chapter.title}
                </Link>
                
                {chapter.subchapters.length > 0 && (
                  <button 
                    onClick={() => setOpenSection(openSection === chapter.slug ? null : chapter.slug)}
                    className="p-1.5 ml-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
                    aria-label={openSection === chapter.slug ? "Sbalit" : "Rozbalit"}
                  >
                    {openSection === chapter.slug ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </button>
                )}
              </div>

              {/* Podkapitoly */}
              {(openSection === chapter.slug) && chapter.subchapters.length > 0 && (
                <div className="ml-3 pl-2.5 border-l-2 border-stone-300 space-y-1 mt-1 mb-2.5">
                  {chapter.subchapters.map((sub) => {
                    const isSubActive = pathname?.includes(sub.slug.trim());
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${chapter.slug}/${sub.slug.trim()}`}
                        className={`flex items-start px-2.5 py-1.5 text-xs transition-colors group rounded-md ${
                          isSubActive 
                            ? 'text-stone-900 font-bold bg-stone-200/80' 
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                        }`}
                      >
                        <Circle 
                          size={5} 
                          className={`mr-2 mt-1.5 shrink-0 ${isSubActive ? 'fill-[#F9C70F] text-[#F9C70F]' : 'fill-stone-300 text-stone-300'}`} 
                        />
                        <span className="leading-snug">
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