"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  User, 
  Gamepad2, 
  FileDown, 
  BookOpen, 
  Compass,
  ArrowDown
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] scroll-smooth">
      
      {/* HERO SEKCE */}
      <section className="max-w-4xl mx-auto pt-24 pb-16 px-6 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-xs font-bold uppercase tracking-widest mb-8">
          <BookOpen size={14} className="text-orange-700" />
          <span>Interaktivní Učebnice Ekonomie</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-6 tracking-tight leading-tight">
          Vítej v <br />
          <span className="text-orange-700 italic font-normal">(pracovní název)</span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          nějaký krátký úvodní text
        </p>

        {/* HLAVNÍ TLAČÍTKA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href="/uvod" 
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-95"
          >
            Studovat teď <ArrowDown size={16} />
          </a>
          <Link 
            href="/o-autorovi" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 rounded-lg font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-95"
          >
            O projektu <User size={16} />
          </Link>
        </div>
       
        {/* ROZCESTNÍK FUNKCÍ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
          <Link 
            href="/hry" 
            className="group p-6 bg-[#FDFCF9] rounded-xl border border-stone-300 flex items-start gap-4 hover:border-stone-500 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center text-stone-800 group-hover:bg-stone-900 group-hover:text-white transition-colors shrink-0">
              <Gamepad2 size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base mb-1">Ekonomické minihry</h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Nauč se ekonomické koncepty skrze webové minihry a interaktivní simulace</p>
            </div>
          </Link>

          <Link 
            href="/materialy" 
            className="group p-6 bg-[#FDFCF9] rounded-xl border border-stone-300 flex items-start gap-4 hover:border-stone-500 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center text-stone-800 group-hover:bg-stone-900 group-hover:text-white transition-colors shrink-0">
              <FileDown size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base mb-1">Užitečné materiály</h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">Tipy, odkazy a doplňkové pomůcky ke studiu ekonomických témat</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}