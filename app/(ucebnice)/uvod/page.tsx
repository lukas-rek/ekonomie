"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Compass,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const ROADMAP = [
  { title: "Základní ekonomické koncepty", slug: "zakladni-koncepty", num: "I" },
  { title: "Mikroekonomie", slug: "mikroekonomie", num: "II" },
  { title: "Makroekonomie", slug: "makroekonomie", num: "III" },
  { title: "Peníze a bankovnictví", slug: "penize-a-bankovnictvi", num: "IV" },
  { title: "Dějiny ekonomického myšlení", slug: "dejiny-ekonomie", num: "V" },
  //{ title: "Investice a podnikání", slug: "investice-a-podnikani", num: "VI" },
];

export default function UvodPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] py-12">

      {/* HLAVIČKA */}
      <section className="text-center mb-12">

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
          Učebnice ekonomie
        </h1>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Interaktivní učebnice, která tě provede světem ekonomie od základních pojmů po složitější koncepty.
          Vyber si kapitolu a začni!
        </p>
      </section>

      {/* ROADMAPA */}
      <section id="roadmap" className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-stone-300"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-stone-500 flex items-center gap-2 font-sans">
            <Compass size={16} /> 
          </h2>
          <div className="h-px flex-1 bg-stone-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROADMAP.map((step, idx) => (
            <Link 
              key={step.slug} 
              href={`/${step.slug}`}
              className="group relative bg-[#FDFCF9] border border-stone-300 p-6 rounded-xl hover:border-[#F9C70F] hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-md bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 font-serif font-bold text-sm shadow-xs group-hover:border-[#F9C70F] group-hover:bg-[#FEF9C3] transition-colors">
                    {step.num}
                  </div>
                  <span className="text-xs font-mono text-stone-400">Kapitola {idx + 1}</span>
                </div>
                
                <h3 className="text-base font-serif font-bold text-stone-900 leading-snug group-hover:text-stone-900 transition-colors">
                  {step.title}
                </h3>
              </div>
              
              <div className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 group-hover:text-stone-900 transition-all font-sans">
                <span>Otevřít kapitolu</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 group-hover:text-[#F9C70F] transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}