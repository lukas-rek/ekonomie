"use client";
import React from 'react';
import Link from 'next/link';
import { 
  LineChart, 
  ArrowUpDown, 
  Play, 
  Sparkles, 
  Gamepad2,
  Scale 
} from 'lucide-react';

const GAMES = [
  {
    id: "veznovo-dilema",
    title: "Vězňovo dilema",
    desc: "Otestuj svou strategii v iterovaném vězňově dilematu proti různým algoritmům (Tit-for-Tat, Grim Trigger a dalším).",
    icon: Scale,
    href: "/hry/veznovo-dilema",
    tag: "Teorie her"
  },
  {
    id: "trzni-principy",
    title: "Tržní principy",
    desc: "Vyzkoušej si roli trhu. Reaguj na nečekané události a posouvej křivky nabídky a poptávky.",
    icon: LineChart,
    href: "/hry/trzni-principy",
    tag: "Mikroekonomie"
  },
  {
    id: "vetsi-mensi",
    title: "Větší / Menší",
    desc: "Uhádneš, která země má vyšší HDP na obyvatele nebo vyšší státní dluh? Otestuj svůj ekonomický přehled.",
    icon: ArrowUpDown,
    href: "/hry/vetsi-mensi",
    tag: "Makroekonomie"
  }
];

export default function GamesHub() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HLAVIČKA SEKCE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
            Ekonomické minihry
          </h1>
          <p className="text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed font-sans">
            Nejlepší způsob, jak pochopit ekonomické zákonitosti, je vyzkoušet si je v praxi.
          </p>
        </div>

        {/* MŘÍŽKA HER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {GAMES.map((game) => {
            const Icon = game.icon;
            return (
              <Link 
                key={game.id} 
                href={game.href}
                className="group relative bg-[#FDFCF9] border border-stone-300 rounded-xl p-6 hover:border-[#F9C70F] hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F7F4EE] border border-stone-200 flex items-center justify-center text-stone-800 group-hover:bg-[#FEF9C3] group-hover:text-stone-950 group-hover:border-[#F9C70F] transition-colors">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-sans">
                      {game.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-stone-900 transition-colors leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {game.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-stone-900 font-sans">
                  <span>Spustit hru</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-700 group-hover:bg-[#F9C70F] group-hover:text-stone-950 group-hover:border-[#F9C70F] transition-colors">
                    <Play size={12} className="ml-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}