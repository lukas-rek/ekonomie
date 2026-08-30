"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpDown, 
  Globe2, 
  Landmark, 
  Play,
  ArrowLeft
} from 'lucide-react';

const GAME_MODES = [
  {
    id: "hdp",
    title: "HDP na obyvatele",
    desc: "Porovnejte bohatství různých zemí. Kde se mají lépe?",
    icon: Globe2,
    href: "/hry/vetsi-mensi/hdp-na-obyvatele",
  },
  {
    id: "dluh",
    title: "Státní dluh k HDP",
    desc: "Které státy hospodaří zodpovědně a které jsou zadlužené?",
    icon: Landmark,
    href: "/hry/vetsi-mensi/statni-dluh",
  }
];

export default function VetsiMensiRozcestnik() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center py-12 px-4">
      
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Navigace zpět */}
        <Link 
          href="/hry" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors mb-6 group font-sans"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Zpět na minihry
        </Link>

        {/* HLAVNÍ KARTA */}
        <div className="bg-[#FDFCF9] rounded-xl shadow-sm overflow-hidden border border-stone-300">
          
          {/* Hlavička */}
          <div className="bg-[#F7F4EE] border-b border-stone-200 px-8 py-5 flex items-center gap-3">
            <div className="w-9 h-9 bg-stone-200/80 border border-stone-300 rounded-lg flex items-center justify-center">
              <ArrowUpDown size={18} className="text-stone-800" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">Větší / Menší</h2>
          </div>

          {/* Obsah */}
          <div className="p-8">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">Jak se to hraje?</h3>
            <p className="text-stone-700 leading-relaxed mb-6 text-sm font-sans">
              Ukážeme ti jeden ekonomický údaj (například HDP na obyvatele Francie). Následně se objeví jiný stát a tvým úkolem je pouze na základě tvých znalostí a odhadu tipnout, zda má tento stát hodnotu <strong className="text-stone-900 font-bold">vyšší</strong>, nebo <strong className="text-stone-900 font-bold">nižší</strong>.
            </p>

            <div className="space-y-2.5 text-stone-700 mb-8 pl-1 text-xs font-sans">
              <p className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-700 shrink-0" /> 
                Za každou správnou odpověď získáváš bod.
              </p>
              <p className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-700 shrink-0" /> 
                Pokračuješ tak dlouho, dokud neuděláš chybu.
              </p>
              <p className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-700 shrink-0" /> 
                Cílem je nahrát co nejdelší sérii.
              </p>
            </div>

            <hr className="border-stone-200 mb-6" />

            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 mb-4 text-center font-sans">
              Vyberte kategorii a začněte hrát
            </h3>
            
            {/* Tlačítka her */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GAME_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Link
                    key={mode.id}
                    href={mode.href}
                    className="group text-left bg-white border border-stone-300 rounded-xl p-5 hover:border-stone-500 hover:shadow-sm transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#F7F4EE] border border-stone-200 flex items-center justify-center mb-3 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                        <Icon size={20} className="text-stone-800 group-hover:text-white" />
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
                        {mode.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-sans">
                        {mode.desc}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 group-hover:text-stone-900 font-sans">
                      <span>Hrát</span>
                      <Play size={12} className="ml-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}