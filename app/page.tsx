"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  User, 
  GraduationCap, 
  Map,
  ChevronRight,
  Lightbulb,
  MousePointerClick,
  FileDown,
  Globe2,
  ArrowDown,
  Gamepad2
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
    // scroll-smooth zajistí plynulý posun při kliknutí na kotvu #roadmap
    <div className="min-h-screen bg-white scroll-smooth">
      
      {/* HERO SEKCE */}
      <section className="max-w-5xl mx-auto pt-24 pb-12 px-6 text-center">

        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
          Vítej v <br />
          <span className="text-blue-600">(pracovní název)</span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-10">
          nějaký krátký úvodní text
        </p>

        {/* HLAVNÍ TLAČÍTKA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href="/uvod" 
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
          >
            Studovat teď <ArrowDown size={20} />
          </a>
          <Link 
            href="/o-autorovi" 
            className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
          >
            O projektu <User size={20} />
          </Link>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Link href="/hry" className="group p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4 hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Gamepad2 size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Ekonomické minihry</h4>
              <p className="text-xs text-slate-500">Nauč se ekonomické koncepty skrze webové minihry</p>
            </div>
          </Link>
          <Link href="/materialy" className="group p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4 hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileDown size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Užitečné materiály</h4>
              <p className="text-xs text-slate-500">Tipy, odkazy a pomůcky ke studiu</p>
            </div>
          </Link>
          
        </div>
      </section>

    </div>
  );
}