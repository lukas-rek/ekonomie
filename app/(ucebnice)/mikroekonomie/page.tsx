"use client";
import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Award, 
  ArrowRight,
  ChevronRight,
  Activity,
  User,
  Factory,
  BarChart2,
  Gamepad2,
  Axis3d,
  Landmark,
  Store
} from 'lucide-react';

// Seznam podkapitol mikroekonomie na základě schválené osnovy
const SUBCHAPTERS = [
  {
    title: "Tržní síly a ceny",
    slug: "trzni-sily-a-ceny",
    desc: "Síly nabídky a poptávky a jak ceny fungují jako informační signál o vzácnosti a koordinují miliony lidí.",
    icon: <Axis3d className="text-blue-500" />,
    time: "10 min"
  },
  {
    title: "Elasticita",
    slug: "elasticita",
    desc: "Měření citlivosti spotřebitelů a výrobců na změny cen a příjmů v krátkém i dlouhém období.",
    icon: <Activity className="text-indigo-600"/>,
    time: "12 min"
  },
  {
    title: "Chování spotřebitele",
    slug: "chovani-spotrebitele",
    desc: "Užitek, indiferenční analýza a psychologie lidské volby při omezeném rozpočtu.",
    icon: <User className="text-pink-500" />,
    time: "15 min"
  },
  {
    title: "Chování výrobce",
    slug: "chovani-vyrobce",
    desc: "Produkční funkce, mezní produkt a klíčové rozlišení nákladů v krátkém a dlouhém období.",
    icon: <Factory className="text-amber-500" />,
    time: "15 min"
  },
  {
    title: "Tržní struktury",
    slug: "trzni-struktury",
    desc: "Srovnání dokonalé konkurence s monopolem, oligopolem a monopolistickou konkurencí z hlediska efektivnosti.",
    icon: <BarChart2 className="text-red-600" />,
    time: "15 min"
  },
  {
    title: "Základy teorie her",
    slug: "teorie-her",
    desc: "Strategické rozhodování firem, vězňovo dilema a hledání Nashovy rovnováhy.",
    icon: <Gamepad2 className="text-green-500" />,
    time: "10 min"
  },
  {
    title: "Trh výrobních faktorů",
    slug: "faktory-a-selhani",
    desc: "Jak se určují mzdy, nájemné a zisky.",
    icon: <Store className="text-teal-600" />,
    time: "12 min"
  },
    {
    title: "Tržní selhání a státní zásahy",
    slug: "trzni-selhani",
    desc: "Kdy trhy mohou selhávat a jaké jsou argumenty pro a proti státním zásahům do ekonomiky?",
    icon: <Landmark className="text-teal-600" />,
    time: "12 min"
  },
  {
    title: "Záveřečný test kapitoly",
    slug: "test",
    desc: "Prověřte své pochopení mechanismů rozhodování tržních aktérů a získejte odznak kapitoly.",
    icon: <Award className="text-indigo-500" />,
    time: "15 min"
  }
];

export default function MikroekonomieHub() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* HERO SEKCE */}
      <div className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-blue-700 text-xs font-black uppercase tracking-widest mb-4">
          <span className="relative flex h-2 w-2">
            <span className=" absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Kapitola 2
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Mikroekonomie: <br />
          
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          Prozkoumejte, jak se rozhodují jednotliví lidé a firmy, jak reagují na pobídky a jak se pod vlivem konkurence formují tržní struktury reálného světa.
        </p>
      </div>

      {/* GRID PODKAPITOL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SUBCHAPTERS.map((sub, idx) => (
          <Link 
            key={sub.slug} 
            href={`/mikroekonomie/${sub.slug}`}
            className="group relative flex flex-col bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-2"
          >
            {/* Číslo kapitoly v pozadí */}
            <span className="absolute top-6 right-8 text-6xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              0{idx + 1}
            </span>

            {/* Ikona */}
            <div className="mb-6 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              {React.cloneElement(sub.icon as React.ReactElement, {})}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {sub.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {sub.desc}
              </p>
            </div>

            {/* Footer karty */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Doba studia: {sub.time}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <ChevronRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SPODNÍ MOTIVAČNÍ PANEL */}
      <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Chcete pochopit chování trhu?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Doporučujeme  postupovat popořadě. Každá podkapitola staví na znalostech té předchozí.
          </p>
          <Link 
            href="/mikroekonomie/trzni-sily-a-ceny"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all hover:shadow-lg active:scale-95"
          >
            Spustit kapitolu mikroekonomie <ArrowRight size={20} />
          </Link>
        </div>
        {/* Dekorativní prvek v pozadí */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}