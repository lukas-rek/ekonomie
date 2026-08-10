"use client";
import React, { useState } from 'react';
import { X, ArrowRight, LineChart } from 'lucide-react';

export default function GameModal({ isOpen, onClose, title, pages }: any) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  const currentContent = pages[currentPage];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Hlavní okno - přidáno flex-col a max-h-[90vh] pro ochranu před přetečením */}
      <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-white/20">
        
        {/* Horní lišta (fixní) */}
        <div className="shrink-0 px-8 py-6 bg-slate-50 flex items-center justify-between rounded-t-[2rem] border-b border-slate-100">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <LineChart size={20} className="text-orange-600" />
          </div>
          <h2 className="text-xl font-black text-slate-800 translate-x-[-170px]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Obsah (scrollovací, pokud je moc dlouhý) */}
        <div className="p-8 overflow-y-auto grow custom-scrollbar">
          {currentContent}
        </div>

        {/* Dolní lišta se šipkami (fixní) */}
        <div className="shrink-0 px-8 py-6 bg-slate-50 flex items-center justify-between rounded-b-[2rem] border-t border-slate-100">
          <div className="flex gap-2">
            {pages.map((_: any, i: number) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-orange-600' : 'w-2 bg-slate-300'}`} 
              />
            ))}
          </div>
          
          <button 
            onClick={() => {
              if (currentPage === pages.length - 1) {
                onClose();
              } else {
                setCurrentPage(prev => prev + 1);
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
          >
            {currentPage === pages.length - 1 ? "Začít hrát" : "Další"} 
            {currentPage !== pages.length - 1 && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}