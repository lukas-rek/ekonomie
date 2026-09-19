"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';

const SUBCHAPTERS = [
  {
    title: "Tržní síly a ceny",
    slug: "trzni-sily-a-ceny",
    desc: "Prozkoumejte interakci nabídky a poptávky, cenový mechanismus a vznik tržní rovnováhy.",
    time: "xx min"
  },
  {
    title: "Elasticita",
    slug: "elasticita",
    desc: "Cenová, důchodová a křížová elasticita. Jak citlivě reagují kupující a prodávající na změny cen.",
    time: "xx min"
  },
  {
    title: "Chování spotřebitele",
    slug: "chovani-spotrebitele",
    desc: "Užitek, indiferenční analýza, rozpočtové omezení a hledání optima spotřebitele.",
    time: "xx min"
  },
  {
    title: "Chování firmy",
    slug: "chovani-firmy",
    desc: "Produkční funkce, explicitní a implicitní náklady, výnosy a maximalizace zisku.",
    time: "xx min"
  },
  {
    title: "Tržní struktury",
    slug: "trzni-struktury",
    desc: "Dokonalá konkurence, monopol, oligopol a monopolistická konkurence v praxi.",
    time: "xx min"
  },
  {
    title: "Základy teorie her",
    slug: "teorie-her",
    desc: "Vězňovo dilema, Nashova rovnováha a strategické rozhodování v situacích vzájemné závislosti.",
    time: "xx min"
  },
  {
    title: "Trh výrobních faktorů",
    slug: "trh-vyrobnich-faktoru",
    desc: "Poptávka po práci, mzdová sazba, kapitálový trh, úrok a pozemková renta.",
    time: "xx min"
  },
  {
    title: "Tržní selhání a zásahy státu",
    slug: "trzni-selhani",
    desc: "Externality, veřejné statky, asymetrie informací a dopady státních regulací.",
    time: "xx min"
  },
  {
    title: "Závěrečný test kapitoly",
    slug: "test",
    desc: "Prověřte své pochopení mechanismů rozhodování tržních aktérů a získejte odznak kapitoly.",
    time: "xx min"
  }
];

export default function MikroekonomieHub() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* HERO SEKCE */}
      <div className="mb-12 text-center md:text-left">
        <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-3">
          Kapitola II
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
          Mikroekonomie
        </h1>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl leading-relaxed font-sans">
          Prozkoumejte, jak se rozhodují jednotliví lidé a firmy, jak reagují na pobídky a jak se pod vlivem konkurence formují tržní struktury reálného světa.
        </p>
      </div>

      {/* GRID PODKAPITOL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SUBCHAPTERS.map((sub, idx) => (
          <Link 
            key={sub.slug} 
            href={`/mikroekonomie/${sub.slug}`}
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
        <h2 className="text-2xl font-serif font-bold mb-3">Jste připraveni pokračovat?</h2>
        <p className="text-stone-400 mb-6 max-w-lg mx-auto text-sm font-sans leading-relaxed">
          Doporučujeme postupovat popořadě od tržních sil přes elasticitu až po tržní selhání.
        </p>
        <Link 
          href="/mikroekonomie/trzni-sily-a-ceny"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 rounded-lg font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95"
        >
          Spustit první lekci <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}