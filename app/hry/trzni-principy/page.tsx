"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MousePointer2, ArrowLeft } from 'lucide-react';
import GameModal from '@/components/GameModalTrzniPrincipy';

const levels = [
  // --- ÚLOHY S POSUNY KŘIVEK A BODŮ (1 - 15) ---
  {
    id: 0,
    setup: 'S_ONLY',
    question: "Žatec zasáhlo sucho. Špatná úroda chmele se promítla do cen farmářů, kteří byli nuceni zdražit. Na grafu vidíte původní nabídku piva v hospodách. Vyznačte posunem křivky nebo bodu současný stav.",
    correctAction: { shiftS: 'LEFT', shiftD: null, point: null, rotateS: null, rotateD: null },
    explanation: "Zdražení chmele způsobí vyšší výrobní cenu piva, což znamená snížení nabídky. Nabídková křivka se posune doleva.",
  },
  {
    id: 1,
    setup: 'D_ONLY',
    question: "Léto je v plném proudu a lidé tráví více času venku a mají pochopitelně žízeň. Na grafu je původní stav poptávky po pivu v kempu u Sázavy. Jak bude vypadat současný stav?",
    correctAction: { shiftS: null, shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Sezónnost a vyšší preference spotřebitelů vedou ke zvýšení poptávky. Poptávková křivka se posune doprava.",
  },
  {
    id: 2,
    setup: 'D_ONLY',
    question: "Hostinský se rozhodl pouze pro dnešní den zdražit pivo o 10 korun. Co se stane s poptávkou/poptávaným množstvím piva?",
    correctAction: { shiftS: null, shiftD: null, point: 'D_UP', rotateS: null, rotateD: null },
    explanation: "Změna ceny samotného statku neposouvá křivku poptávky, ale způsobuje pouze posun po křivce nahoru doleva.",
  },
  {
    id: 3,
    setup: 'BOTH',
    question: "Moravským vinařům se zadařilo a cena vína výrazně klesla. Jak se změní trh s pivem?",
    correctAction: { shiftS: null, shiftD: 'LEFT', point: null, rotateS: null, rotateD: null },
    explanation: "Víno a pivo jsou substituty. Pokles ceny vína sníží poptávku po pivu, křivka D se posune doleva.",
  },
  {
    id: 4,
    setup: 'BOTH',
    question: "Díky nové technologii se podařilo výrazně zlevnit a zrychlit výrobu solárních panelů. Jak se trh přizpůsobí?",
    correctAction: { shiftS: 'RIGHT', shiftD: null, point: null, rotateS: null, rotateD: null },
    explanation: "Levnější technologie a efektivnější výroba posouvá nabídku doprava.",
  },
  {
    id: 5,
    setup: 'S_ONLY',
    question: "Výrobce tenisek se rozhodl plošně zdražit svůj oblíbený model o 500 Kč. Jak se změní graf nabídky?",
    correctAction: { shiftS: null, shiftD: null, point: 'S_UP', rotateS: null, rotateD: null },
    explanation: "Zvýšení ceny samotného produktu znamená posun bodu po nabídkové křivce doprava nahoru.",
  },
  {
    id: 6,
    setup: 'D_ONLY',
    question: "Pekař se rozhodl, že rohlíky dnes ráno zlevní ze 3 Kč na 2 Kč. Co se stane s poptávkou po rohlících?",
    correctAction: { shiftS: null, shiftD: null, point: 'D_DOWN', rotateS: null, rotateD: null },
    explanation: "Zlevnění samotného statku znamená posun bodu po existující křivce dolů doprava.",
  },
  {
    id: 7,
    setup: 'S_ONLY',
    question: "Automobilky dostaly zprávu, že cena oceli na světových trzích klesla o 20 %. Co to znamená pro výrobce?",
    correctAction: { shiftS: 'RIGHT', shiftD: null, point: null, rotateS: null, rotateD: null },
    explanation: "Zlevnění klíčového vstupu znamená pro výrobce snížení nákladů. Nabídka se posouvá doprava.",
  },
  {
    id: 8,
    setup: 'BOTH',
    question: "Výrobce herních konzolí oznámil, že zlevňuje všechny své modely o 30 %. Na grafu vidíte trh s videohrami na tyto konzole.",
    correctAction: { shiftS: null, shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Konzole a hry jsou komplementy. Levnější konzole zvýší poptávku po hrách (posun D doprava).",
  },
  {
    id: 9,
    setup: 'BOTH',
    question: "Vyšla studie, že každodenní konzumace jablek prodlužuje život. Jak se trh změní?",
    correctAction: { shiftS: null, shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Pozitivní vědecké poznatky mění preference. Poptávka se posouvá doprava.",
  },
  {
    id: 10,
    setup: 'BOTH',
    question: "Začalo se hrát s novou karbonovou pálkou, což vyvolalo nadšení. Zároveň ale došlo k výpadku karbonových vláken. Jak se změní trh s těmito pálkami?",
    correctAction: { shiftS: 'LEFT', shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Nadšení poptávku zvyšuje (posun doprava). Výpadek materiálu nabídku snižuje (posun doleva).",
  },
  {
    id: 11,
    setup: 'BOTH',
    question: "Lidé hromadně míří do Švédska. Letecké společnosti otevírají nové spoje. Jak se změní trh s letenkami?",
    correctAction: { shiftS: 'RIGHT', shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Roste poptávka po cestování (D doprava) a společnosti zvyšují kapacity (S doprava).",
  },
  {
    id: 12,
    setup: 'BOTH',
    question: "Lékaři varovali před červeným masem. Stát zároveň zavedl dražší emisní kontroly pro chovatele. Jak se změní trh?",
    correctAction: { shiftS: 'LEFT', shiftD: 'LEFT', point: null, rotateS: null, rotateD: null },
    explanation: "Poptávka klesá kvůli zdraví (D doleva). Nabídka klesá kvůli regulacím (S doleva).",
  },
  {
    id: 13,
    setup: 'BOTH',
    question: "Přijeli noví studenti. Nezkolaudovaly se ale nové byty a staré se stáhly k rekonstrukci. Trh s nájemním bydlením?",
    correctAction: { shiftS: 'LEFT', shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Studenti zvyšují poptávku (D doprava). Stahování domů snižuje nabídku (S doleva).",
  },
  {
    id: 14,
    setup: 'BOTH',
    question: "Kampaň propaguje školní svačiny z ovoce. Jarní mrazíky ale spálily úrodu jablek. Jak se změní trh s jablky?",
    correctAction: { shiftS: 'LEFT', shiftD: 'RIGHT', point: null, rotateS: null, rotateD: null },
    explanation: "Kampaň zvyšuje poptávku (D doprava). Mrazíky omezují nabídku (S doleva).",
  },
  
  // --- ÚLOHY S ELASTICITOU ---
  {
    id: 100,
    setup: 'D_ONLY',
    question: "Představte si trh s inzulínem pro diabetiky. Zákazníci tento lék nutně potřebují ke svému přežití a nemají za něj žádnou adekvátní náhradu. Jak bude vypadat křivka poptávky po tomto léku z hlediska elasticity?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: 'STEEP' },
    explanation: "Jelikož pacienti lék nutně potřebují a nemá substituty, budou ho kupovat i při výrazném zvýšení ceny. Poptávka je tedy neelastická (strmá).",
  },
  {
    id: 101,
    setup: 'S_ONLY',
    question: "Poptávka po bydlení v centru neustále roste. Jak vypadá nabídka těchto bytů, vzhledem k tomu, že prostor v historické zástavbě je striktně omezen a nová výstavba je plošně zakázána?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: 'STEEP', rotateD: null },
    explanation: "Nabídku nelze zvýšit kvůli prostorovým a právním omezením. Je tedy dokonale nebo velmi neelastická (strmá).",
  },
  {
    id: 102,
    setup: 'D_ONLY',
    question: "V jedné ulici jsou vedle sebe tři různé pekárny. Jedna z nich se rozhodne mírně zdražit své obyčejné rohlíky. Zákazníci přitom vnímají rohlíky ze všech tří pekáren jako naprosto identické. Jaká je poptávka po rohlících v oné první zdražující pekárně?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: 'FLAT' },
    explanation: "Vzhledem k přítomnosti dokonalých substitutů povede jakékoli zdražení k odlivu zákazníků jinam. Poptávka je vysoce elastická (plochá).",
  },
  {
    id: 103,
    setup: 'S_ONLY',
    question: "Vydavatelství prodává přes internet digitální verze knih a může vytvořit neomezené množství digitálních kopií. Jak bude vypadat nabídka co se elasticity týče?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: 'FLAT', rotateD: null },
    explanation: "Vytvoření další kopie nic nestojí a nemá žádná kapacitní omezení. Nabídka je dokonale nebo velmi elastická (plochá).",
  },
  {
    id: 104,
    setup: 'D_ONLY',
    initialRotateD: 'STEEP',
    question: "Cena elektřiny pro domácnosti skokově vzrostla na dvojnásobek. Výchozí křivka zachycuje poptávku v prvním měsíci po zdražení (krátké období). Jak se poptávka změní v dlouhém období (např. po třech letech), kdy mají lidé čas se přizpůsobit?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: 'FLAT' },
    explanation: "V dlouhém období se spotřebitelé přizpůsobí (zateplí dům, koupí úsporné spotřebiče). Poptávka se stává citlivější na cenu a elastičtější (plošší).",
  },
  {
    id: 105,
    setup: 'D_ONLY',
    initialRotateD: 'STEEP',
    question: "Farmaceutická firma vynalezla lék na rakovinu a byla jediná na trhu s tímto lékem. Za nějaký čas však přišly i další firmy s podobným lékem. Jak se změní poptávková křivka po léku první firmy?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: 'FLAT' },
    explanation: "Jakmile se na trhu objeví substituty (léky konkurence), spotřebitelé mají možnost volby. Poptávka po původním léku se stane elastičtější (plošší).",
  },
  {
    id: 106,
    setup: 'S_ONLY',
    initialRotateS: 'FLAT',
    question: "Továrna jela dlouhou dobu jen na 50 % kapacity (výchozí stav). Nyní ale získala obří zakázku, která sama vyžaduje zbylých 50 % kapacity, a celá továrna je naplněna. Jak se změní její křivka nabídky pro další dodatečné objednávky?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: 'STEEP', rotateD: null },
    explanation: "Jakmile je kapacita plně využita, není možné na případný růst ceny reagovat rychlým zvýšením výroby. Nabídka se stává neelastickou (strmou).",
  },
  {
    id: 107,
    setup: 'D_ONLY',
    initialRotateD: 'FLAT',
    question: "Nová značka mobilních telefonů vstoupila na trh. Vidíte graf původní poptávky. Po letech si značka vybuduje silnou základnu fanoušků, kteří jsou zvyklí na její operační systém. Jak se změní křivka její poptávky?",
    correctAction: { shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: 'STEEP' },
    explanation: "Loajalita ke značce a uzamčení v ekosystému snižuje citlivost na cenu. Lidé budou telefon kupovat i při růstu ceny, poptávka se stává neelastickou (strmější).",
  }
];

export default function MarketGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const level = levels[currentLevel];
  
  const isElasticityLevel = level.id >= 100;
  
  const [actions, setActions] = useState<{ 
    shiftS: string | null, shiftD: string | null, point: string | null,
    rotateS: string | null, rotateD: string | null
  }>({
    shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null
  });
  
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentRotS = actions.rotateS || level.initialRotateS || 'NORMAL';
  const currentRotD = actions.rotateD || level.initialRotateD || 'NORMAL';

  const hasAction = actions.shiftS !== null || actions.shiftD !== null || actions.point !== null || actions.rotateS !== null || actions.rotateD !== null;

  const handleCheck = () => {
    if (!hasAction) return;
    setStatus('checked');
    
    const isCorrectS = actions.shiftS === (level.correctAction.shiftS || null);
    const isCorrectD = actions.shiftD === (level.correctAction.shiftD || null);
    const isCorrectP = actions.point === (level.correctAction.point || null);
    
    const targetRotS = level.correctAction.rotateS || 'NORMAL';
    const targetRotD = level.correctAction.rotateD || 'NORMAL';
    const isCorrectRotS = currentRotS === targetRotS;
    const isCorrectRotD = currentRotD === targetRotD;
    
    if (isCorrectS && isCorrectD && isCorrectP && isCorrectRotS && isCorrectRotD) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      timeoutRef.current = setTimeout(() => {
        setActions({
            shiftS: level.correctAction.shiftS || null,
            shiftD: level.correctAction.shiftD || null,
            point: level.correctAction.point || null,
            rotateS: level.correctAction.rotateS || null,
            rotateD: level.correctAction.rotateD || null
        });
      }, 1500);
    }
  };

  const handleNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel((prev) => (prev + 1) % levels.length);
    setActions({ shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null });
    setStatus('idle');
    setIsCorrect(null);
  };

  const handlePrev = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel((prev) => (prev - 1 + levels.length) % levels.length);
    setActions({ shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null });
    setStatus('idle');
    setIsCorrect(null);
  };

  const handleJump = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel(index);
    setActions({ shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null });
    setStatus('idle');
    setIsCorrect(null);
  };

  const modalPages = [
    (
      <div key="page-1" className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        <h3 className="text-2xl font-black text-slate-800">Tržní principy v praxi</h3>
        <p className="text-slate-600 text-lg leading-relaxed">
          Nyní se podíváme i na elasticitu! Tažení za kolečka na krajích křivek změní jejich sklon.
        </p>
      </div>
    )
  ];

  // --- MATEMATIKA A POZICE GRAFU ---
  let shiftSVal = 0;
  let shiftDVal = 0;

  if (actions.shiftS === 'LEFT') shiftSVal = -40;
  if (actions.shiftS === 'RIGHT') shiftSVal = 40;
  if (actions.shiftD === 'LEFT') shiftDVal = -40;
  if (actions.shiftD === 'RIGHT') shiftDVal = 40;

  let rotSVal = currentRotS === 'STEEP' ? -25 : currentRotS === 'FLAT' ? 25 : 0;
  let rotDVal = currentRotD === 'STEEP' ? 25 : currentRotD === 'FLAT' ? -25 : 0;

  let pointX = 150;
  let pointY = 150;

  if (level.setup === 'S_ONLY') { pointX = 150 + shiftSVal; }
  else if (level.setup === 'D_ONLY') { pointX = 150 + shiftDVal; }
  else if (level.setup === 'BOTH') {
    pointX = 150 + (shiftSVal + shiftDVal) / 2;
    pointY = 150 + (shiftSVal - shiftDVal) / 2;
  }

  if (actions.point === 'D_UP') { pointX -= 30; pointY -= 30; }
  else if (actions.point === 'D_DOWN') { pointX += 30; pointY += 30; }
  else if (actions.point === 'S_UP') { pointX += 30; pointY -= 30; }
  else if (actions.point === 'S_DOWN') { pointX -= 30; pointY += 30; }

  let pointLabel = level.setup === 'BOTH' ? 'E' : 'A';
  if (level.setup === 'BOTH' && actions.point !== null) { pointLabel = 'A'; }

  let hintText = "";
  if (isElasticityLevel) {
    hintText = "Chyťte a přetáhněte konce křivek pro změnu sklonu (elasticity)";
  } else {
    hintText = `Chyťte a přetáhněte ${level.setup === 'BOTH' ? 'křivky nebo rovnou bod E' : 'křivku nebo bod A'}`;
  }

  return (
    <div className="my-16 max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-10">
      <GameModal isOpen={showModal} onClose={() => setShowModal(false)} title="Tržní principy" pages={modalPages} />
      
      {/* LEVÝ SLOUPEC (Graf a tlačítka) */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        
        {/* Šipka Předchozí - Vlevo nahoře */}
        <div className="w-full max-w-[300px] flex justify-start mb-3">
          <button 
            onClick={handlePrev} 
            className="flex items-center gap-1.5 text-slate-400 hover:text-orange-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Předchozí
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-black px-4 py-2 rounded-lg mb-6 w-[300px] justify-center">

          <span className="text-center leading-tight">{hintText}</span>
        </div>

        <div className="relative w-[300px] h-[300px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-visible select-none touch-none">
           <svg width="300" height="300" className="absolute top-0 left-0 overflow-visible">
              {/* Hlavní osy grafu P a Q */}
              <line x1="0" y1="0" x2="0" y2="300" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="300" x2="300" y2="300" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#e2e8f0" strokeDasharray="4" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#e2e8f0" strokeDasharray="4" />
              <text x="280" y="295" fontSize="14" fontWeight="bold" fill="#1e293b">Q</text>
              <text x="5" y="15" fontSize="14" fontWeight="bold" fill="#1e293b">P</text>

              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 250 L 250 50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6" />
              )}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 50 L 250 250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6" />
              )}
              
              {!isElasticityLevel && (
                <>
                  <circle cx="150" cy="150" r="6" fill="#cbd5e1" />
                  <text x="162" y="138" fontSize="14" fontWeight="bold" fill="#94a3b8">{level.setup === 'BOTH' ? 'E' : 'A'}</text>
                </>
              )}

              {/* Aktivní S (Změněno na červenou #ef4444) */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <motion.g animate={{ x: shiftSVal }} transition={{ type: 'spring', stiffness: 120, damping: 15 }}>
                  <motion.g style={{ originX: "150px", originY: "150px" }} animate={{ rotate: rotSVal }} transition={{ type: 'spring', stiffness: 120, damping: 15 }}>
                    <motion.g
                      drag={status === 'idle' ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, info) => {
                         if (actions.shiftS === 'LEFT' && info.offset.x > 20) setActions(prev => ({ ...prev, shiftS: null }));
                         else if (actions.shiftS === 'RIGHT' && info.offset.x < -20) setActions(prev => ({ ...prev, shiftS: null }));
                         else if (actions.shiftS !== 'LEFT' && actions.shiftS !== 'RIGHT') {
                           if (info.offset.x < -20) setActions(prev => ({ ...prev, shiftS: 'LEFT' }));
                           else if (info.offset.x > 20) setActions(prev => ({ ...prev, shiftS: 'RIGHT' }));
                         }
                      }}
                      style={{ cursor: status === 'idle' ? 'grab' : 'default' }}
                      whileDrag={{ cursor: 'grabbing' }}
                    >
                      <path d="M 50 250 L 250 50" stroke="transparent" strokeWidth="20" />
                      <path d="M 50 250 L 250 50" stroke="#ef4444" strokeWidth="3" />
                      <text x="255" y="45" fontSize="14" fill="#ef4444" fontWeight="bold">S{actions.shiftS ? "'" : ""}</text>
                    </motion.g>

                    {isElasticityLevel && (
                      <motion.g
                        drag={status === 'idle' ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                           const dx = info.offset.x;
                           if (currentRotS === 'STEEP' && dx > 15) setActions(prev => ({...prev, rotateS: 'NORMAL'}));
                           else if (currentRotS === 'NORMAL' && dx > 15) setActions(prev => ({...prev, rotateS: 'FLAT'}));
                           else if (currentRotS === 'FLAT' && dx < -15) setActions(prev => ({...prev, rotateS: 'NORMAL'}));
                           else if (currentRotS === 'NORMAL' && dx < -15) setActions(prev => ({...prev, rotateS: 'STEEP'}));
                        }}
                        style={{ cursor: status === 'idle' ? 'ew-resize' : 'default' }}
                      >
                        <circle cx="240" cy="60" r="14" fill="#fff" stroke="#ef4444" strokeWidth="2" />
                        <text x="233" y="64" fontSize="12" fill="#ef4444" fontWeight="bold">↔</text>
                      </motion.g>
                    )}
                  </motion.g>
                </motion.g>
              )}

              {/* Aktivní D (Zůstává modrá #3b82f6) */}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <motion.g animate={{ x: shiftDVal }} transition={{ type: 'spring', stiffness: 120, damping: 15 }}>
                  <motion.g style={{ originX: "150px", originY: "150px" }} animate={{ rotate: rotDVal }} transition={{ type: 'spring', stiffness: 120, damping: 15 }}>
                    <motion.g
                      drag={status === 'idle' ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, info) => {
                         if (actions.shiftD === 'LEFT' && info.offset.x > 20) setActions(prev => ({ ...prev, shiftD: null }));
                         else if (actions.shiftD === 'RIGHT' && info.offset.x < -20) setActions(prev => ({ ...prev, shiftD: null }));
                         else if (actions.shiftD !== 'LEFT' && actions.shiftD !== 'RIGHT') {
                           if (info.offset.x < -20) setActions(prev => ({ ...prev, shiftD: 'LEFT' }));
                           else if (info.offset.x > 20) setActions(prev => ({ ...prev, shiftD: 'RIGHT' }));
                         }
                      }}
                      style={{ cursor: status === 'idle' ? 'grab' : 'default' }}
                      whileDrag={{ cursor: 'grabbing' }}
                    >
                      <path d="M 50 50 L 250 250" stroke="transparent" strokeWidth="20" />
                      <path d="M 50 50 L 250 250" stroke="#3b82f6" strokeWidth="3" />
                      <text x="255" y="260" fontSize="14" fill="#3b82f6" fontWeight="bold">D{actions.shiftD ? "'" : ""}</text>
                    </motion.g>

                    {isElasticityLevel && (
                      <motion.g
                        drag={status === 'idle' ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                           const dx = info.offset.x;
                           if (currentRotD === 'STEEP' && dx < -15) setActions(prev => ({...prev, rotateD: 'NORMAL'}));
                           else if (currentRotD === 'NORMAL' && dx < -15) setActions(prev => ({...prev, rotateD: 'FLAT'}));
                           else if (currentRotD === 'FLAT' && dx > 15) setActions(prev => ({...prev, rotateD: 'NORMAL'}));
                           else if (currentRotD === 'NORMAL' && dx > 15) setActions(prev => ({...prev, rotateD: 'STEEP'}));
                        }}
                        style={{ cursor: status === 'idle' ? 'ew-resize' : 'default' }}
                      >
                        <circle cx="60" cy="60" r="14" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                        <text x="53" y="64" fontSize="12" fill="#3b82f6" fontWeight="bold">↔</text>
                      </motion.g>
                    )}
                  </motion.g>
                </motion.g>
              )}

              {/* Interaktivní bod (Skrytý u úkolů na elasticitu) */}
              {!isElasticityLevel && (
                <motion.g animate={{ x: pointX, y: pointY }} transition={{ type: 'spring', stiffness: 120, damping: 15 }}>
                   <motion.g
                     drag={status === 'idle'} 
                     dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                     dragElastic={0.2}
                     onDragEnd={(e, info) => {
                       const dx = info.offset.x;
                       const dy = info.offset.y;
                       if (actions.point === 'D_UP' && dx > 15 && dy > 15) { setActions(prev => ({...prev, point: null})); return; }
                       if (actions.point === 'D_DOWN' && dx < -15 && dy < -15) { setActions(prev => ({...prev, point: null})); return; }
                       if (actions.point === 'S_UP' && dx < -15 && dy > 15) { setActions(prev => ({...prev, point: null})); return; }
                       if (actions.point === 'S_DOWN' && dx > 15 && dy < -15) { setActions(prev => ({...prev, point: null})); return; }
  
                       if (level.setup !== 'S_ONLY' && dx < -15 && dy < -15) setActions(prev => ({...prev, point: 'D_UP'}));
                       else if (level.setup !== 'S_ONLY' && dx > 15 && dy > 15) setActions(prev => ({...prev, point: 'D_DOWN'}));
                       else if (level.setup !== 'D_ONLY' && dx > 15 && dy < -15) setActions(prev => ({...prev, point: 'S_UP'}));
                       else if (level.setup !== 'D_ONLY' && dx < -15 && dy > 15) setActions(prev => ({...prev, point: 'S_DOWN'}));
                     }}
                     style={{ cursor: status === 'idle' ? 'grab' : 'default' }}
                     whileDrag={{ cursor: 'grabbing' }}
                   >
                     <circle cx="0" cy="0" r="7" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
                     <circle cx="0" cy="0" r="35" fill="transparent" /> 
                     <text x="14" y="-14" fontSize="14" fontWeight="bold" fill="#1e293b">{pointLabel}</text>
                   </motion.g>
                </motion.g>
              )}
           </svg>
        </div>

        {/* Tlačítka pro rychlé přeskočení kategorií */}
        <div className="mt-auto pt-12 flex flex-wrap gap-3 justify-start w-full">
          <button
            onClick={() => handleJump(0)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
              !isElasticityLevel
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-white border-orange-500 text-orange-500 hover:bg-orange-50'
            }`}
          >
            Determinanty nabídky a poptávky
          </button>
          <button
            onClick={() => handleJump(15)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
              isElasticityLevel
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-white border-orange-500 text-orange-500 hover:bg-orange-50'
            }`}
          >
            Elasticita
          </button>
        </div>

      </div>

      {/* PRAVÝ SLOUPEC (Otázka a vyhodnocení) */}
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

        <div className="mt-8 flex flex-col items-center min-h-[160px]">
          {status === 'idle' && (
            <button
              onClick={handleCheck}
              disabled={!hasAction}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all mt-4"
            >
              Zkontrolovat řešení
            </button>
          )}

          {status === 'checked' && isCorrect !== null && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
              <div className={`flex items-center gap-2 font-bold text-xl mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                {isCorrect ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                {isCorrect ? 'Správně!' : 'Špatně!'}
              </div>
              <div className="bg-orange-50 p-5 rounded-xl text-orange-950 text-sm border border-orange-200 mb-6 w-full shadow-sm">
                <strong className="block text-orange-900 font-bold mb-1">Vysvětlení:</strong>
                {level.explanation}
              </div>
              <button onClick={handleNext} className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 hover:shadow-md transition-all">
                Další situace
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}