"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  User, 
  GraduationCap, 
  Map,
  ChevronRight,
  MousePointerClick,
  BookOpen
} from 'lucide-react';

const ROADMAP = [
  { title: "Základní ekonomické koncepty", slug: "zakladni-koncepty", color: "bg-blue-500" },
  { title: "Mikroekonomie", slug: "mikroekonomie", color: "bg-indigo-500" },
  { title: "Makroekonomie", slug: "makroekonomie", color: "bg-violet-500" },
  { title: "Peníze a bankovnictví", slug: "penize-a-bankovnictvi", color: "bg-purple-500" },
  { title: "Dějiny ekonomického myšlení", slug: "dejiny-ekonomie", color: "bg-pink-500" },
  { title: "Investice a podnikání", slug: "investice-a-podnikani", color: "bg-rose-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">

      {/* --- PŘIDANÁ HLAVIČKA --- */}
      <section className="px-6 pt-24 pb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
          <BookOpen size={32} className="text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Učebnice ekonomie
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Interaktivní učebnice, která tě provede světem ekonomie od základních pojmů až po složité finanční systémy. 
          Vyber si kapitolu a začni objevovat.
        </p>
      </section>

      {/* --- ROADMAPA --- */}
      <section id="roadmap" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-slate-200"></div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
            <Map size={18} /> Výuková cesta
          </h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAP.map((step, idx) => (
            <Link 
              key={step.slug} 
              href={`/${step.slug}`}
              className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                  {idx + 1}
                </div>
                <div className="text-slate-200 group-hover:text-blue-100 transition-colors">
                  <MousePointerClick size={32} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              
              <div className="mt-6 flex items-center text-xs font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Otevřít kapitolu <ChevronRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}