"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

// Definice dat vyčtených z Excelu
const levels = [
  {
    id: 0,
    setup: 'S_ONLY', // Zobrazí pouze S a bod A
    question: "Žatec zasáhlo sucho. Špatná úroda chmele se promítla do cen farmářů, kteří byli nuceni zdražit. Na grafu vidíte původní nabídku piva v hospodách. Vyznačte posunem křivky nebo bodu současný stav.",
    correctAction: 'SHIFT_S_LEFT',
    explanation: "Zdražení chmele způsobí vyšší výrobní cenu piva, což znamená snížení nabídky (při stejné ceně jsou výrobci ochotni prodat méně piva). Nabídková křivka se posune doleva.",
  },
  {
    id: 1,
    setup: 'D_ONLY', // Zobrazí pouze D a bod A
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
    setup: 'BOTH', // Zobrazí S, D a bod E
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

  // Obsluha kliknutí na ovládací tlačítka
  const handleAction = (newAction: string) => {
    if (status === 'checked') return; // Zamezí změnám po odkliknutí kontroly
    setAction(newAction === action ? null : newAction);
  };

  const handleCheck = () => {
    if (!action) return;
    setStatus('checked');
    
    if (action === level.correctAction) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      // Při špatném zodpovězení se za 1.5s křivka posune na správné řešení
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

  // --- MATEMATIKA A POZICE GRAFU ---
  // Výchozí hodnoty: střed grafu je 150, 150
  let shiftS = 0;
  let shiftD = 0;
  let pointX = 150;
  let pointY = 150;

  if (action === 'SHIFT_S_LEFT') shiftS = -40;
  if (action === 'SHIFT_S_RIGHT') shiftS = 40;
  if (action === 'SHIFT_D_LEFT') shiftD = -40;
  if (action === 'SHIFT_D_RIGHT') shiftD = 40;

  // Posun bodu po křivce (změna ceny)
  if (action === 'MOVE_POINT_UP') { // Vyšší cena
    if (level.setup === 'S_ONLY') { pointX = 180; pointY = 120; }
    else if (level.setup === 'D_ONLY') { pointX = 120; pointY = 120; }
  }
  if (action === 'MOVE_POINT_DOWN') { // Nižší cena
    if (level.setup === 'S_ONLY') { pointX = 120; pointY = 180; }
    else if (level.setup === 'D_ONLY') { pointX = 180; pointY = 180; }
  }

  // Udržení bodu na křivce, pokud se křivka celá posune horizontálně
  if (level.setup === 'S_ONLY' && shiftS !== 0) {
    pointX = 150 + shiftS;
    pointY = 150;
  }
  if (level.setup === 'D_ONLY' && shiftD !== 0) {
    pointX = 150 + shiftD;
    pointY = 150;
  }
  
  // Výpočet nového průsečíku (E) při pohybu jedné z křivek
  if (level.setup === 'BOTH') {
     if (shiftD === -40) { pointX = 130; pointY = 170; }
     if (shiftD === 40) { pointX = 170; pointY = 130; }
     if (shiftS === -40) { pointX = 130; pointY = 130; }
     if (shiftS === 40) { pointX = 170; pointY = 170; }
  }

  // Pomocná komponenta pro čistší zápis tlačítek
  const ActionButton = ({ label, actionType }: { label: string, actionType: string }) => {
    const isSelected = action === actionType;
    return (
      <button
        onClick={() => handleAction(actionType)}
        disabled={status === 'checked'}
        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
           isSelected 
            ? 'bg-blue-600 text-white border-blue-600' 
            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
        } ${status === 'checked' && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-10">
      
      {/* LEVÁ ČÁST: Minimalistický graf a ovládání */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-[300px] h-[300px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-visible select-none">
           <svg width="300" height="300" className="absolute top-0 left-0">
              {/* Hlavní osy P a Q */}
              <line x1="0" y1="0" x2="0" y2="300" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="300" x2="300" y2="300" stroke="#1e293b" strokeWidth="2" />

              {/* Pomocné osy */}
              <line x1="0" y1="150" x2="300" y2="150" stroke="#e2e8f0" strokeDasharray="4" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#e2e8f0" strokeDasharray="4" />

              <text x="280" y="295" fontSize="14" fontWeight="bold" fill="#1e293b">Q</text>
              <text x="5" y="15" fontSize="14" fontWeight="bold" fill="#1e293b">P</text>

              {/* Původní stíny křivek */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 250 L 250 50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6" />
              )}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 50 L 250 250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6" />
              )}

              {/* Aktivní křivka S (Nabídka) */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <>
                  <motion.path
                    d="M 50 250 L 250 50"
                    stroke="#f97316" // Oranžová pro nabídku
                    strokeWidth="3"
                    animate={{ translateX: shiftS }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  />
                  <motion.text x="255" y="45" fontSize="14" fill="#f97316" fontWeight="bold" animate={{ x: 255 + shiftS }}>
                    S{shiftS !== 0 ? "'" : ""}
                  </motion.text>
                </>
              )}

              {/* Aktivní křivka D (Poptávka) */}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <>
                  <motion.path
                    d="M 50 50 L 250 250"
                    stroke="#3b82f6" // Modrá pro poptávku
                    strokeWidth="3"
                    animate={{ translateX: shiftD }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  />
                  <motion.text x="255" y="260" fontSize="14" fill="#3b82f6" fontWeight="bold" animate={{ x: 255 + shiftD }}>
                    D{shiftD !== 0 ? "'" : ""}
                  </motion.text>
                </>
              )}

              {/* Interaktivní bod na grafu */}
              <motion.circle
                 r="6"
                 fill="#1e293b"
                 animate={{ cx: pointX, cy: pointY }}
                 transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              />
              <motion.text
                 fontSize="14"
                 fontWeight="bold"
                 fill="#1e293b"
                 animate={{ x: pointX + 12, y: pointY - 12 }}
              >
                 {level.setup === 'BOTH' ? 'E' : 'A'}
              </motion.text>
           </svg>
        </div>

        {/* Nástroje pro pohyb */}
        <div className="mt-8 w-full max-w-[300px] flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nástroje grafu</p>
          
          {/* Tady můžeš v budoucnu přidávat další tlačítka (např. pro elasticitu) */}
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
          <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
            Situace {currentLevel + 1} z {levels.length}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Analýza trhu</h2>
          <div className="bg-slate-50 p-5 rounded-xl text-slate-700 leading-relaxed border border-slate-200 shadow-sm">
            {level.question}
          </div>
        </div>

        {/* Tlačítko pro kontrolu a zpětná vazba (Zobrazuje se uprostřed dole ve sloupci s textem) */}
        <div className="mt-8 flex flex-col items-center min-h-[160px]">
          {status === 'idle' && (
            <button
              onClick={handleCheck}
              disabled={!action}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 hover:shadow-md disabled:opacity-40 transition-all mt-4"
            >
              Zkontrolovat řešení
            </button>
          )}

          {status === 'checked' && isCorrect !== null && (
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full flex flex-col items-center"
            >
              <div className={`flex items-center gap-2 font-bold text-xl mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                {isCorrect ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                {isCorrect ? 'Správně!' : 'Špatně!'}
              </div>

              <div className="bg-blue-50 p-5 rounded-xl text-blue-950 text-sm border border-blue-200 mb-6 w-full shadow-sm">
                <strong className="block text-blue-900 font-bold mb-1">Vysvětlení:</strong>
                {level.explanation}
              </div>

              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-md transition-all"
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