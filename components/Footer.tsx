import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-stone-400 py-10 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-stone-100 font-serif font-bold text-xl mb-3 tracking-tight">
            PRACOVNÍ NÁZEV<span className="text-orange-500 font-sans text-xs ml-1 font-bold">.CZ</span>
          </h4>
          <p className="text-sm leading-relaxed max-w-sm text-stone-400 font-sans">
            Interaktivní vzdělávací portál a učebnice moderní ekonomie.
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans">
        <div>
          © 2026 PRACOVNÍ NÁZEV. Všechna práva vyhrazena.
        </div>
        <div className="mt-2 sm:mt-0 italic font-serif text-stone-400">
          Učební a metodický materiál
        </div>
      </div>
    </footer>
  );
}