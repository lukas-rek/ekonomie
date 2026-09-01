"use client";
import React, { useState } from 'react';
import { Box, CheckCircle, RotateCcw } from 'lucide-react';

const GOODS_POOL = [
  { id: 1, name: "Mořská voda", scarcity: "Volné", ownership: "Veřejné" },
  { id: 2, name: "Šálek kávy", scarcity: "Ekonomické", ownership: "Soukromé" },
  { id: 3, name: "Vzduch", scarcity: "Volné", ownership: "Veřejné" },
  { id: 4, name: "Pouliční osvětlení", scarcity: "Ekonomické", ownership: "Veřejné" },
  { id: 5, name: "Osobní automobil", scarcity: "Ekonomické", ownership: "Soukromé" },
  { id: 6, name: "Dálnice s mýtem", scarcity: "Ekonomické", ownership: "Smíšené" }, 
  { id: 7, name: "Pitná voda (kohoutková)", scarcity: "Ekonomické", ownership: "Soukromé" },
  { id: 8, name: "Hromadná doprava", scarcity: "Ekonomické", ownership: "Smíšené" },
  { id: 9, name: "Masáž", scarcity: "Ekonomické", ownership: "Soukromé" },
  { id: 10, name: "Rádiové vysílání", scarcity: "Ekonomické", ownership: "Veřejné" },
];

type Mode = 'scarcity' | 'ownership';

export default function GoodsClassification() {
  const [mode, setMode] = useState<Mode>('scarcity');
  const [placedItems, setPlacedItems] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const categories = mode === 'scarcity' 
    ? ["Volné", "Ekonomické"] 
    : ["Soukromé", "Veřejné", "Smíšené"];

  const handleDrop = (itemId: number, category: string) => {
    setPlacedItems(prev => ({ ...prev, [itemId]: category }));
    setShowResults(false);
  };

  const resetGame = () => {
    setPlacedItems({});
    setShowResults(false);
  };

  return (
    <div className="my-8 bg-[#FDFCF9] border border-stone-300 rounded-xl overflow-hidden shadow-sm">
      {/* Horní lišta - Přepínač */}
      <div className="p-4 bg-[#F7F4EE] border-b border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="font-serif font-bold tracking-tight text-stone-900 text-base flex items-center gap-2">
          <Box size={16} className="text-stone-900" /> Cvičení: Třídění statků
        </h3>
        <div className="flex bg-stone-200/60 p-1 rounded-lg border border-stone-300">
          <button 
            onClick={() => {setMode('scarcity'); resetGame();}}
            className={`px-3 py-1 text-xs font-bold font-sans rounded-md transition-all uppercase tracking-wider ${mode === 'scarcity' ? 'bg-white text-stone-900 border border-stone-300 shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Dle vzácnosti
          </button>
          <button 
            onClick={() => {setMode('ownership'); resetGame();}}
            className={`px-3 py-1 text-xs font-bold font-sans rounded-md transition-all uppercase tracking-wider ${mode === 'ownership' ? 'bg-white text-stone-900 border border-stone-300 shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Dle vylučitelnosti a rivality
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Drop zóny (Kategorie) */}
        <div className={`grid gap-4 mb-6 ${mode === 'scarcity' ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {categories.map(cat => (
            <div 
              key={cat}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = Number(e.dataTransfer.getData("itemId"));
                handleDrop(id, cat);
              }}
              className="min-h-[140px] bg-white border-2 border-dashed border-stone-300 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors hover:border-stone-500"
            >
              <span className="text-[11px] font-black uppercase text-stone-500 tracking-wider font-sans mb-1">{cat}</span>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(placedItems)
                  .filter(([_, category]) => category === cat)
                  .map(([id, _]) => {
                    const item = GOODS_POOL.find(g => g.id === Number(id));
                    const isCorrect = showResults && item?.[mode] === cat;
                    const isWrong = showResults && item?.[mode] !== cat;
                    return (
                      <div 
                        key={id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium shadow-xs border ${
                          isCorrect ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold' :
                          isWrong ? 'bg-rose-50 border-rose-600 text-rose-800' :
                          'bg-[#F7F4EE] border-stone-300 text-stone-800'
                        }`}
                      >
                        {item?.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Pool kartiček k rozřazení */}
        <div className="bg-[#F7F4EE] p-5 rounded-xl border border-stone-300">
          <p className="text-xs text-stone-500 mb-3 font-bold uppercase tracking-wider text-center font-sans">
            Přetáhněte položky do boxů výše:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {GOODS_POOL.map(item => (
              !placedItems[item.id] && (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("itemId", item.id.toString())}
                  className="px-3.5 py-1.5 bg-[#1C1917] text-white rounded-lg text-xs font-sans font-bold cursor-grab active:cursor-grabbing hover:bg-stone-800 shadow-sm transition-all active:scale-95"
                >
                  {item.name}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Ovládací tlačítka */}
        <div className="mt-6 flex justify-center gap-3">
          <button 
            onClick={() => setShowResults(true)}
            disabled={Object.keys(placedItems).length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 shadow-sm disabled:opacity-40 transition-all active:scale-95"
          >
            <CheckCircle size={15} /> Zkontrolovat
          </button>
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-stone-700 border border-stone-300 rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-100 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}