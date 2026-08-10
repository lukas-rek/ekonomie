"use client";
import React, { useState } from 'react';
import { Box, CheckCircle, RotateCcw, Info, HelpCircle } from 'lucide-react';

// Definice statků a jejich správného zařazení
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
  const [placedItems, setPlacedItems] = useState<Record<number, string>>({}); // id -> název kategorie
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
    <div className="my-10 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-md">
      {/* Horní lišta - Přepínač */}
      <div className="p-4 bg-white border-b flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="font-black uppercase tracking-widest text-slate-500 text-sm flex items-center gap-2">
          <Box size={18} className="text-blue-500" /> Cvičení: Třídění statků
        </h3>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => {setMode('scarcity'); resetGame();}}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'scarcity' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Dle vzácnosti
          </button>
          <button 
            onClick={() => {setMode('ownership'); resetGame();}}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'ownership' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Dle vylučitelnosti a rivality
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Drop zóny (Kategorie) */}
        <div className={`grid gap-4 mb-8 ${mode === 'scarcity' ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {categories.map(cat => (
            <div 
              key={cat}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = Number(e.dataTransfer.getData("itemId"));
                handleDrop(id, cat);
              }}
              className="min-h-[150px] bg-white border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors hover:border-blue-300"
            >
              <span className="text-xs font-black uppercase text-slate-400 mb-2">{cat}</span>
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
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm border ${
                          isCorrect ? 'bg-green-100 border-green-500 text-green-700' :
                          isWrong ? 'bg-red-100 border-red-500 text-red-700' :
                          'bg-blue-50 border-blue-100 text-blue-700'
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-inner">
          <p className="text-xs text-slate-400 mb-4 font-bold uppercase text-center italic">
            Přetáhněte kartičky do boxů výše:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {GOODS_POOL.map(item => (
              !placedItems[item.id] && (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("itemId", item.id.toString())}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold cursor-grab active:cursor-grabbing hover:bg-slate-700 transition-colors shadow-md"
                >
                  {item.name}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Ovládací tlačítka */}
        <div className="mt-8 flex justify-center gap-4">
          <button 
            onClick={() => setShowResults(true)}
            disabled={Object.keys(placedItems).length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 disabled:opacity-30 transition-all shadow-lg"
          >
            <CheckCircle size={18} /> Zkontrolovat
          </button>
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-600 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-300 transition-all"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}