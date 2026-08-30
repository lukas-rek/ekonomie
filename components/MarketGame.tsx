"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const levels = [
  {
    id: 0,
    setup: 'S_ONLY',
    question: "Žatec zasáhlo sucho. Špatná úroda chmele se promítla do cen farmářů, kteří byli nuceni zdražit. Na grafu vidíte původní nabídku piva v hospodách. Vyznačte posunem křivky nebo bodu současný stav.",
    correctAction: 'SHIFT_S_LEFT',
    explanation: "Zdražení chmele způsobí vyšší výrobní cenu piva, což znamená snížení nabídky (při stejné ceně jsou výrobci ochotni prodat méně piva). Nabídková křivka se posune doleva.",
  },
  {
    id: 1,
    setup: 'D_ONLY',
    question: "Léto je v plném proudu a lidé tráví více času venku a mají pochopitelně žízeň. Na grafu je původní stav poptávky po pivu v kempu u Sázavy. Jak bude vypadat současný stav?",
    correctAction: 'SHIFT_D_RIGHT',
    explanation: "Sezónnost a vyšší preference spotřebitelů vedou ke zvýšení poptávky. Poptávková křivka se posune doprava.",
  },
  {
    id: 2,
    setup: 'D_ONLY',
    question: "Hostinský se rozhodl pouze pro dnešní den zdražit pivo o 10 korun. Co se stane s poptávkou/poptávaným množstvím piva?",
    correctAction: 'MOVE_POINT_UP',
    explanation: "Změna ceny samotného statku neposouvá křivku poptávky, ale způsobuje pouze posun po křivce. Zvýšení ceny sníží poptávané množství, bod se posune po křivce nahoru.",
  },
  {
    id: 3,
    setup: 'BOTH',
    question: "Moravským vinařům se zadařilo a cena vína výrazně klesla. Na grafu vidíte nabídku a poptávku po pivu. Jak se změní v téhle situaci trh s pivem?",
    correctAction: 'SHIFT_D_LEFT',
    explanation: "Víno a pivo jsou substituty. Pokles ceny vína způsobí, že část spotřebitelů přejde od piva k vínu. Poptávka po pivu klesne, křivka D se posune doleva.",
  }
];

export default function MarketGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const level = levels[currentLevel];

  const handleAction = (newAction: string) => {
    if (status === 'checked') return;
    setAction(newAction === action ? null : newAction);
  };

  const handleCheck = () => {
    if (!action) return;
    setStatus('checked');
    
    if (action === level.correctAction) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      timeoutRef.current = setTimeout(() => {
        setAction(level.correctAction);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel((prev) => (prev + 1) % levels.length);
    setAction(null);
    setStatus('idle');
    setIsCorrect(null);
  };

  let shiftS = 0;
  let shiftD = 0;
  let pointX = 150;
  let pointY = 150;

  if (action === 'SHIFT_S_LEFT') shiftS = -40;
  if (action === 'SHIFT_S_RIGHT') shiftS = 40;
  if (action === 'SHIFT_D_LEFT') shiftD = -40;
  if (action === 'SHIFT_D_RIGHT') shiftD = 40;

  if (action === 'MOVE_POINT_UP') {
    if (level.setup === 'S_ONLY') { pointX = 180; pointY = 120; }
    else if (level.setup === 'D_ONLY') { pointX = 120; pointY = 120; }
  }
  if (action === 'MOVE_POINT_DOWN') {
    if (level.setup === 'S_ONLY') { pointX = 120; pointY = 180; }
    else if (level.setup === 'D_ONLY') { pointX = 180; pointY = 180; }
  }

  if (level.setup === 'S_ONLY' && shiftS !== 0) {
    pointX = 150 + shiftS;
    pointY = 150;
  }
  if (level.setup === 'D_ONLY' && shiftD !== 0) {
    pointX = 150 + shiftD;
    pointY = 150;
  }
  
  if (level.setup === 'BOTH') {
     if (shiftD === -40) { pointX = 130; pointY = 170; }
     if (shiftD === 40) { pointX = 170; pointY = 130; }
     if (shiftS === -40) { pointX = 130; pointY = 130; }
     if (shiftS === 40) { pointX = 170; pointY = 170; }
  }

  const ActionButton = ({ label, actionType }: { label: string, actionType: string }) => {
    const isSelected = action === actionType;
    return (
      <button
        onClick={() => handleAction(actionType)}
        disabled={status === 'checked'}
        className={`px-3 py-2 rounded-lg text-xs font-bold font-sans border transition-all ${
           isSelected 
            ? 'bg-stone-900 text-white border-stone-900 shadow-sm' 
            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500 hover:bg-stone-50'
        } ${status === 'checked' && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#FDFCF9] rounded-xl shadow-sm border border-stone-300 flex flex-col md:flex-row gap-10">
      
      {/* LEVÁ ČÁST: Graf a nástroje */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-[300px] h-[300px] bg-[#F7F4EE] rounded-lg border border-stone-300 overflow-visible select-none">
           <svg width="300" height="300" className="absolute top-0 left-0">
              {/* Hlavní osy P a Q */}
              <line x1="0" y1="0" x2="0" y2="300" stroke="#1C1917" strokeWidth="2" />
              <line x1="0" y1="300" x2="300" y2="300" stroke="#1C1917" strokeWidth="2" />

              {/* Pomocné osy */}
              <line x1="0" y1="150" x2="300" y2="150" stroke="#D6D3D1" strokeDasharray="4" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#D6D3D1" strokeDasharray="4" />

              <text x="280" y="295" fontSize="13" fontWeight="bold" fill="#1C1917" fontFamily="sans-serif">Q</text>
              <text x="6" y="16" fontSize="13" fontWeight="bold" fill="#1C1917" fontFamily="sans-serif">P</text>

              {/* Původní stíny křivek */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 250 L 250 50" stroke="#D6D3D1" strokeWidth="2" strokeDasharray="6" />
              )}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 50 L 250 250" stroke="#D6D3D1" strokeWidth="2" strokeDasharray="6" />
              )}

              {/* Aktivní křivka S (Nabídka) */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <>
                  <motion.path
                    d="M 50 250 L 250 50"
                    stroke="#DC2626"
                    strokeWidth="3"
                    animate={{ translateX: shiftS }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  />
                  <motion.text x="255" y="45" fontSize="13" fill="#DC2626" fontWeight="bold" animate={{ x: 255 + shiftS }}>
                    S{shiftS !== 0 ? "'" : ""}
                  </motion.text>
                </>
              )}

              {/* Aktivní křivka D (Poptávka) */}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <>
                  <motion.path
                    d="M 50 50 L 250 250"
                    stroke="#2563EB"
                    strokeWidth="3"
                    animate={{ translateX: shiftD }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  />
                  <motion.text x="255" y="260" fontSize="13" fill="#2563EB" fontWeight="bold" animate={{ x: 255 + shiftD }}>
                    D{shiftD !== 0 ? "'" : ""}
                  </motion.text>
                </>
              )}

              {/* Interaktivní bod na grafu */}
              <motion.circle
                 r="6"
                 fill="#1C1917"
                 stroke="#FFFFFF"
                 strokeWidth="2"
                 animate={{ cx: pointX, cy: pointY }}
                 transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              />
              <motion.text
                 fontSize="13"
                 fontWeight="bold"
                 fill="#1C1917"
                 animate={{ x: pointX + 10, y: pointY - 10 }}
              >
                 {level.setup === 'BOTH' ? 'E' : 'A'}
              </motion.text>
           </svg>
        </div>

        {/* Nástroje pro pohyb */}
        <div className="mt-6 w-full max-w-[300px] flex flex-col gap-2.5">
          <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest font-sans">Nástroje grafu</p>
          
          {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
             <div className="grid grid-cols-2 gap-2">
               <ActionButton label="Posun S ←" actionType="SHIFT_S_LEFT" />
               <ActionButton label="Posun S →" actionType="SHIFT_S_RIGHT" />
             </div>
          )}
          {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
             <div className="grid grid-cols-2 gap-2">
               <ActionButton label="Posun D ←" actionType="SHIFT_D_LEFT" />
               <ActionButton label="Posun D →" actionType="SHIFT_D_RIGHT" />
             </div>
          )}
          {level.setup !== 'BOTH' && (
             <div className="grid grid-cols-2 gap-2">
               <ActionButton label="Vyšší cena (bod)" actionType="MOVE_POINT_UP" />
               <ActionButton label="Nižší cena (bod)" actionType="MOVE_POINT_DOWN" />
             </div>
          )}
        </div>
      </div>

      {/* PRAVÁ ČÁST: Otázka a Vyhodnocení */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex-grow">
          <div className="inline-block bg-stone-100 border border-stone-200 text-stone-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 font-sans">
            Situace {currentLevel + 1} z {levels.length}
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3">Analýza trhu</h2>
          <div className="bg-[#F7F4EE] p-5 rounded-lg text-stone-800 leading-relaxed border border-stone-300 font-sans text-sm shadow-xs">
            {level.question}
          </div>
        </div>

        {/* Tlačítko pro kontrolu a zpětná vazba */}
        <div className="mt-6 flex flex-col items-center min-h-[150px]">
          {status === 'idle' && (
            <button
              onClick={handleCheck}
              disabled={!action}
              className="bg-stone-900 text-white px-8 py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 mt-4"
            >
              Zkontrolovat řešení
            </button>
          )}

          {status === 'checked' && isCorrect !== null && (
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full flex flex-col items-center"
            >
              <div className={`flex items-center gap-2 font-serif font-bold text-lg mb-3 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                {isCorrect ? 'Správně!' : 'Špatně!'}
              </div>

              <div className="bg-[#FAF4EB] p-4 rounded-lg text-stone-800 text-xs leading-relaxed border border-orange-200/80 mb-5 w-full shadow-xs">
                <strong className="block text-stone-900 font-bold mb-1 font-serif text-sm">Vysvětlení:</strong>
                {level.explanation}
              </div>

              <button
                onClick={handleNext}
                className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                Další situace
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}