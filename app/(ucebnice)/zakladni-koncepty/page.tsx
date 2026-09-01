"use client";
import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ChevronRight, 
  ArrowRight, 
  HelpCircle, 
  Award,
  TrendingUp,
  Layers,
  Scale,
  Percent,
  Compass
} from 'lucide-react';

const SUBCHAPTERS = [
  {
    title: "Úvod do ekonomie",
    slug: "uvod-ekonomie",
    desc: "Co je ekonomie, čím se zabývá a proč se jí vyplatí rozumět? Rozdíl mezi mikro a makro ekonomií.",
    time: "5 min"
  },
  {
    title: "Metodologie a ekonomické modely",
    slug: "metodologie",
    desc: "Jak ekonomové zkoumají svět? Principy ceteris paribus, homo economicus, pozitivní vs. normativní přístup.",
    time: "7 min"
  },
  {
    title: "Statek, vzácnost, užitek a hodnota",
    slug: "statek-vzacnost-uzitek-hodnota",
    desc: "Základní stavební kameny ekonomie. Proč je diamant dražší než voda a jak funguje mezní užitek.",
    time: "10 min"
  },
  {
    title: "Výrobní faktory",
    slug: "vyrobni-faktory",
    desc: "Půda, práce, kapitál a podnikavost. Produkční funkce a zákon klesajících mezních výnosů.",
    time: "8 min"
  },
  {
    title: "Hranice produkčních možností (PPF)",
    slug: "hranice-produkcnich-moznosti",
    desc: "Náklady obětované příležitosti, efektivita výroby a co způsobuje hospodářský růst.",
    time: "10 min"
  },
  {
    title: "Komparativní a absolutní výhoda",
    slug: "komparativni-absolutni-vyhoda",
    desc: "Proč se vyplatí specializace a mezinárodní obchod i těm, kteří jsou ve všem horší.",
    time: "10 min"
  },
  {
    title: "Nabídka, poptávka a tržní rovnováha",
    slug: "nabidka-poptavka",
    desc: "Marshallův kříž v praxi. Jak vzniká tržní cena a jak reaguje na přebytky a nedostatky.",
    time: "12 min"
  },
  {
    title: "Závěrečný test kapitoly",
    slug: "test",
    desc: "Prověřte své znalosti z celé 1. kapitoly v interaktivním testu.",
    time: "10 min"
  }
];

export default function ZakladniKonceptyHub() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* HERO SEKCE */}
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-xs font-bold uppercase tracking-widest mb-4">
          <span>Kapitola I</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
          Základní ekonomické koncepty
        </h1>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl leading-relaxed font-sans">
          Pochopte základy této společenské vědy. Prozkoumejte koncepty, na kterých stojí náš svět: od vzácnosti a užitku až po nabídku, poptávku a tržní rovnováhu.   
        </p>
      </div>

      {/* GRID PODKAPITOL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SUBCHAPTERS.map((sub, idx) => (
          <Link 
            key={sub.slug} 
            href={`/zakladni-koncepty/${sub.slug}`}
            className="group relative flex flex-col bg-[#FDFCF9] border border-stone-300 rounded-xl p-6 hover:border-[#F9C70F] hover:shadow-sm transition-all duration-200"
          >
            {/* Header karty */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[#F7F4EE] border border-stone-300 rounded-md flex items-center justify-center text-stone-800 text-xs font-mono font-bold group-hover:border-[#F9C70F] group-hover:bg-[#FEF9C3] transition-colors">
                0{idx + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                {sub.time}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-base font-serif font-bold text-stone-900 mb-2 group-hover:text-stone-900 transition-colors leading-snug">
                {sub.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-4 font-sans">
                {sub.desc}
              </p>
            </div>

            {/* Footer karty */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-200 text-xs text-stone-500 font-sans">
              <span className="font-bold uppercase tracking-wider text-[10px] group-hover:text-stone-900 transition-colors">
                Otevřít téma
              </span>
              <ChevronRight size={14} className="text-stone-400 group-hover:text-[#F9C70F] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* SPODNÍ PANEL */}
      <div className="mt-14 p-8 bg-[#1C1917] rounded-xl text-center text-white border border-stone-800 shadow-sm">
        <h2 className="text-2xl font-serif font-bold mb-3">Jste připraveni začít?</h2>
        <p className="text-stone-400 mb-6 max-w-lg mx-auto text-sm font-sans leading-relaxed">
          Doporučujeme postupovat popořadě. Každá podkapitola staví na znalostech té předchozí.
        </p>
        <Link 
          href="/zakladni-koncepty/uvod-ekonomie"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 rounded-lg font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95"
        >
          Spustit první lekci <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}