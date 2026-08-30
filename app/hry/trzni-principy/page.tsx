"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import MarketGame from '@/components/MarketGame';
import GameModal from '@/components/GameModalTrzniPrincipy';

export default function TrzniPrincipyGamePage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const helpPages = [
    <div key="1" className="space-y-4">
      <h3 className="text-xl font-serif font-bold text-stone-900">Vítej na trhu s pivem!</h3>
      <p className="text-stone-700 leading-relaxed font-sans text-sm">
        V této minihře si v praxi vyzkoušíš, jak nabídka a poptávka reagují na různé nečekané události v reálném světě (např. sucho, změna počasí, zdražení jiných nápojů).
      </p>
      <div className="p-4 bg-[#F7F4EE] rounded-lg border border-stone-300 font-sans text-xs text-stone-800">
        Tvým úkolem je přečíst si zadanou situaci a pomocí tlačítek u grafu <strong>posunout správnou křivku nebo bod</strong> do nového stavu.
      </div>
    </div>,
    <div key="2" className="space-y-4">
      <h3 className="text-xl font-serif font-bold text-stone-900">Důležité pravidlo grafu</h3>
      <div className="space-y-3 text-stone-700 text-sm font-sans">
        <p>
          <strong>1. Posun celé křivky:</strong> Nastává tehdy, když se změní vnější podmínky (počasí, technologie, preference, cena jiného zboží).
        </p>
        <p>
          <strong>2. Posun pouze bodu po křivce:</strong> Nastává pouze tehdy, když hospodský <i>sám od sebe změní cenu samotného piva</i>.
        </p>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HORNÍ LIŠTA */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <Link 
            href="/hry" 
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors group font-sans"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Zpět na minihry
          </Link>

          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-50 transition-all font-sans shadow-xs active:scale-95"
          >
            <HelpCircle size={15} /> Jak hrát
          </button>
        </div>

        {/* SAMOTNÁ HRA */}
        <MarketGame />

        {/* NÁPOVĚDNÍ MODAL */}
        <GameModal 
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          title="Tržní principy – Nápověda"
          pages={helpPages}
        />

      </div>
    </div>
  );
}