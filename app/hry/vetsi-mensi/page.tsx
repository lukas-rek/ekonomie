"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpDown, 
  Globe2, 
  ShoppingCart, 
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
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  /*{
    id: "ceny",
    title: "Ceny v čase",
    desc: "Vliv inflace v praxi. Stál rohlík dříve více, nebo méně?",
    icon: ShoppingCart,
    href: "/hry/vetsi-mensi/ceny-v-case",
    color: "bg-green-500",
    lightColor: "bg-green-100",
    textColor: "text-green-600"
  },*/
  {
    id: "dluh",
    title: "Státní dluh k HDP",
    desc: "Které státy hospodaří zodpovědně a které jsou zadlužené?",
    icon: Landmark,
    href: "/hry/vetsi-mensi/statni-dluh",
    color: "bg-red-500",
    lightColor: "bg-red-100",
    textColor: "text-red-600"
  }
];

export default function VetsiMensiRozcestnik() {
  return (
    <div className="min-h-screen bg-slate-100 relative flex items-center justify-center overflow-hidden py-12">
      
      {/* Dekorativní pozadí */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />


      {/* VYSKAKOVACÍ OKNO (MODAL) */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="bg-white rounded-3xl w-full shadow-2xl overflow-hidden border border-white/40">
          
          {/* Hlavička */}
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <ArrowUpDown size={20} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-black text-slate-800">Větší / Menší</h2>
          </div>

          {/* Obsah */}
          <div className="p-8">
            <h3 className="text-2xl font-black text-slate-800 mb-4">Jak se to hraje?</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Ukážeme ti jeden ekonomický údaj (například HDP na obyvatele Francie). Následně se objeví jiný stát a tvým úkolem je pouze na základě tvých znalostí a odhadu tipnout, zda má tento stát hodnotu <strong className="text-slate-800 font-black">vyšší</strong>, nebo <strong className="text-slate-800 font-black">nižší</strong>.
            </p>

            <div className="space-y-3 text-slate-600 mb-10 pl-2">
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" /> 
                Za každou správnou odpověď získáváš bod.
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" /> 
                Pokračuješ tak dlouho, dokud neuděláš chybu.
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" /> 
                Cílem je nahrát co nejdelší sérii.
              </p>
            </div>

            <hr className="border-slate-100 mb-8" />

            <h3 className="text-xl font-black text-slate-800 mb-6 text-center">
              Vyberte kategorii a začněte hrát
            </h3>
            
            {/* Tlačítka her */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GAME_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Link
                    key={mode.id}
                    href={mode.href}
                    className="group text-left bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 relative overflow-hidden flex flex-col"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${mode.lightColor} group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className={mode.textColor} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2 leading-tight">
                      {mode.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed flex-grow">
                      {mode.desc}
                    </p>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} className="text-purple-500 fill-purple-500" />
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