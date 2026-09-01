"use client";
import React, { useState } from 'react';
import { X, ArrowRight, LineChart } from 'lucide-react';

export default function GameModal({ isOpen, onClose, title, pages }: any) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  const currentContent = pages[currentPage];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-stone-900/60 animate-in fade-in duration-200">
      
      {/* Hlavní okno */}
      <div className="bg-[#FDFCF9] rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl border border-stone-300">
        
        {/* Horní lišta */}
        <div className="shrink-0 px-6 py-4 bg-[#F7F4EE] flex items-center justify-between rounded-t-xl border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FEF9C3] border border-[#F9C70F] rounded-lg flex items-center justify-center">
              <LineChart size={16} className="text-stone-900" />
            </div>
            <h2 className="text-lg font-serif font-bold text-stone-900">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
            aria-label="Zavřít"
          >
            <X size={18} />
          </button>
        </div>

        {/* Obsah */}
        <div className="p-6 md:p-8 overflow-y-auto grow font-sans">
          {currentContent}
        </div>

        {/* Dolní lišta */}
        <div className="shrink-0 px-6 py-4 bg-[#F7F4EE] flex items-center justify-between rounded-b-xl border-t border-stone-200">
          <div className="flex gap-1.5">
            {pages.map((_: any, i: number) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-5 bg-[#F9C70F]' : 'w-2 bg-stone-300'}`} 
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
            className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-95"
          >
            {currentPage === pages.length - 1 ? "Začít hrát" : "Další"} 
            {currentPage !== pages.length - 1 && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}