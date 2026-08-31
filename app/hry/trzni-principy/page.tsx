"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
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

  // Reálné hodnoty živého tahu (při tažení myší/prstem)
  const [dragShiftS, setDragShiftS] = useState<number | null>(null);
  const [dragShiftD, setDragShiftD] = useState<number | null>(null);
  const [dragRotS, setDragRotS] = useState<number | null>(null);
  const [dragRotD, setDragRotD] = useState<number | null>(null);
  const [dragPoint, setDragPoint] = useState<{ x: number, y: number } | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentRotS = actions.rotateS || level.initialRotateS || 'NORMAL';
  const currentRotD = actions.rotateD || level.initialRotateD || 'NORMAL';

  const hasAction = actions.shiftS !== null || actions.shiftD !== null || actions.point !== null || actions.rotateS !== null || actions.rotateD !== null;

  const clearDragStates = () => {
    setDragShiftS(null);
    setDragShiftD(null);
    setDragRotS(null);
    setDragRotD(null);
    setDragPoint(null);
  };

  const handleCheck = () => {
    if (!hasAction) return;
    setStatus('checked');
    clearDragStates();
    
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
    clearDragStates();
    setStatus('idle');
    setIsCorrect(null);
  };

  const handlePrev = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel((prev) => (prev - 1 + levels.length) % levels.length);
    setActions({ shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null });
    clearDragStates();
    setStatus('idle');
    setIsCorrect(null);
  };

  const handleJump = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLevel(index);
    setActions({ shiftS: null, shiftD: null, point: null, rotateS: null, rotateD: null });
    clearDragStates();
    setStatus('idle');
    setIsCorrect(null);
  };

  const modalPages = [
    (
      <div key="page-1" className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        <h3 className="text-xl font-serif font-bold text-stone-900">Tržní principy v praxi</h3>
        <p className="text-stone-700 text-sm leading-relaxed font-sans">
          Nyní se podíváme i na elasticitu! Tažení za kolečka na krajích křivek změní jejich sklon.
        </p>
      </div>
    )
  ];

  // --- MATEMATIKA A CÍLOVÉ POZICE GRAFU ---
  let targetShiftSVal = 0;
  let targetShiftDVal = 0;

  if (actions.shiftS === 'LEFT') targetShiftSVal = -40;
  if (actions.shiftS === 'RIGHT') targetShiftSVal = 40;
  if (actions.shiftD === 'LEFT') targetShiftDVal = -40;
  if (actions.shiftD === 'RIGHT') targetShiftDVal = 40;

  // STEEP = strmější (-25deg, táhlo vlevo), FLAT = plošší (+25deg, táhlo vpravo)
  let targetRotSVal = currentRotS === 'STEEP' ? -25 : currentRotS === 'FLAT' ? 25 : 0;
  let targetRotDVal = currentRotD === 'STEEP' ? -25 : currentRotD === 'FLAT' ? 25 : 0;

  let targetPointX = 150;
  let targetPointY = 150;

  if (level.setup === 'S_ONLY') { targetPointX = 150 + targetShiftSVal; }
  else if (level.setup === 'D_ONLY') { targetPointX = 150 + targetShiftDVal; }
  else if (level.setup === 'BOTH') {
    targetPointX = 150 + (targetShiftSVal + targetShiftDVal) / 2;
    targetPointY = 150 + (targetShiftSVal - targetShiftDVal) / 2;
  }

  if (actions.point === 'D_UP') { targetPointX -= 30; targetPointY -= 30; }
  else if (actions.point === 'D_DOWN') { targetPointX += 30; targetPointY += 30; }
  else if (actions.point === 'S_UP') { targetPointX += 30; targetPointY -= 30; }
  else if (actions.point === 'S_DOWN') { targetPointX -= 30; targetPointY += 30; }

  // --- EFEKTIVNÍ HODNOTY BĚHEM ŽIVÉHO TAHU ---
  const effectiveShiftS = dragShiftS !== null ? Math.max(-50, Math.min(50, targetShiftSVal + dragShiftS)) : targetShiftSVal;
  const effectiveShiftD = dragShiftD !== null ? Math.max(-50, Math.min(50, targetShiftDVal + dragShiftD)) : targetShiftDVal;
  const effectiveRotS = dragRotS !== null ? Math.max(-32, Math.min(32, targetRotSVal + dragRotS)) : targetRotSVal;
  const effectiveRotD = dragRotD !== null ? Math.max(-32, Math.min(32, targetRotDVal + dragRotD)) : targetRotDVal;

  let effectivePointX = targetPointX;
  let effectivePointY = targetPointY;

  // Bod začíná přesně tam, kde stojí (žádné odskakování při kliknutí) a zůstává 100% uzamčen na křivce
  if (dragPoint !== null) {
    if (level.setup === 'S_ONLY') {
      const d = (dragPoint.x - dragPoint.y) / 2;
      const baseCenter = 150 + targetShiftSVal;
      // Omezíme celkový rozsah po křivce od středu [-45, +45]
      const clampedX = Math.max(baseCenter - 45, Math.min(baseCenter + 45, targetPointX + d));
      const finalD = clampedX - baseCenter;
      effectivePointX = baseCenter + finalD;
      effectivePointY = 150 - finalD;
    } else if (level.setup === 'D_ONLY') {
      const d = (dragPoint.x + dragPoint.y) / 2;
      const baseCenter = 150 + targetShiftDVal;
      const clampedX = Math.max(baseCenter - 45, Math.min(baseCenter + 45, targetPointX + d));
      const finalD = clampedX - baseCenter;
      effectivePointX = baseCenter + finalD;
      effectivePointY = 150 + finalD;
    } else if (level.setup === 'BOTH') {
      const d = Math.max(-40, Math.min(40, (dragPoint.x + dragPoint.y) / 2));
      effectivePointX = targetPointX + d;
      effectivePointY = targetPointY + d;
    }
  } else if (dragShiftS !== null || dragShiftD !== null) {
    if (level.setup === 'S_ONLY') { effectivePointX = 150 + effectiveShiftS; }
    else if (level.setup === 'D_ONLY') { effectivePointX = 150 + effectiveShiftD; }
    else if (level.setup === 'BOTH') {
      effectivePointX = 150 + (effectiveShiftS + effectiveShiftD) / 2;
      effectivePointY = 150 + (effectiveShiftS - effectiveShiftD) / 2;
    }
  }

  // --- FYZIKÁLNÍ KONFIGURACE PRUŽIN (PŘIROZENÝ, PLYNULÝ POHYB) ---
  const smoothSpring = {
    type: "spring" as const,
    stiffness: 90,
    damping: 19,
    mass: 0.8,
  };

  const transitionShiftS = dragShiftS !== null ? { duration: 0 } : smoothSpring;
  const transitionRotS = dragRotS !== null ? { duration: 0 } : smoothSpring;
  const transitionShiftD = dragShiftD !== null ? { duration: 0 } : smoothSpring;
  const transitionRotD = dragRotD !== null ? { duration: 0 } : smoothSpring;
  const transitionPoint = dragPoint !== null ? { duration: 0 } : smoothSpring;

  // --- POINTER EVENT DRAG HANDLERS S ABSOLUTNÍM SNAPPINGEM ---
  const dragRef = useRef<{
    type: 'shiftS' | 'shiftD' | 'rotS' | 'rotD' | 'point' | null;
    startX: number;
    startY: number;
  }>({ type: null, startX: 0, startY: 0 });

  const handlePointerDown = (type: 'shiftS' | 'shiftD' | 'rotS' | 'rotD' | 'point', e: React.PointerEvent) => {
    if (status !== 'idle') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { type, startX: e.clientX, startY: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (status !== 'idle' || !dragRef.current.type) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    switch (dragRef.current.type) {
      case 'shiftS':
        setDragShiftS(dx);
        break;
      case 'shiftD':
        setDragShiftD(dx);
        break;
      case 'rotS':
        setDragRotS((dx / 80) * 25);
        break;
      case 'rotD':
        setDragRotD((dx / 80) * 25);
        break;
      case 'point':
        setDragPoint({ x: dx, y: dy });
        break;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.type) return;
    const { type } = dragRef.current;
    dragRef.current = { type: null, startX: 0, startY: 0 };

    // 1. POSUN KŘIVKY NABÍDKY S (Absolutní snapping podle finální pozice)
    if (type === 'shiftS') {
      const finalShift = effectiveShiftS;
      clearDragStates();
      if (finalShift < -18) {
        setActions(prev => ({ ...prev, shiftS: 'LEFT' }));
      } else if (finalShift > 18) {
        setActions(prev => ({ ...prev, shiftS: 'RIGHT' }));
      } else {
        setActions(prev => ({ ...prev, shiftS: null }));
      }
    } 
    // 2. POSUN KŘIVKY POPTÁVKY D (Absolutní snapping podle finální pozice)
    else if (type === 'shiftD') {
      const finalShift = effectiveShiftD;
      clearDragStates();
      if (finalShift < -18) {
        setActions(prev => ({ ...prev, shiftD: 'LEFT' }));
      } else if (finalShift > 18) {
        setActions(prev => ({ ...prev, shiftD: 'RIGHT' }));
      } else {
        setActions(prev => ({ ...prev, shiftD: null }));
      }
    } 
    // 3. ELASTICITA NABÍDKY S (Absolutní snapping podle finálního úhlu -25 / 0 / +25)
    else if (type === 'rotS') {
      const finalRot = effectiveRotS;
      clearDragStates();
      if (finalRot < -12.5) {
        setActions(prev => ({ ...prev, rotateS: 'STEEP' }));
      } else if (finalRot > 12.5) {
        setActions(prev => ({ ...prev, rotateS: 'FLAT' }));
      } else {
        setActions(prev => ({ ...prev, rotateS: 'NORMAL' }));
      }
    } 
    // 4. ELASTICITA POPTÁVKY D (Absolutní snapping podle finálního úhlu -25 / 0 / +25)
    else if (type === 'rotD') {
      const finalRot = effectiveRotD;
      clearDragStates();
      if (finalRot < -12.5) {
        setActions(prev => ({ ...prev, rotateD: 'STEEP' }));
      } else if (finalRot > 12.5) {
        setActions(prev => ({ ...prev, rotateD: 'FLAT' }));
      } else {
        setActions(prev => ({ ...prev, rotateD: 'NORMAL' }));
      }
    } 
    // 5. INTERAKTIVNÍ BOD (Absolutní snapping na křivce)
    else if (type === 'point') {
      if (level.setup === 'S_ONLY') {
        const baseCenter = 150 + targetShiftSVal;
        const deltaX = effectivePointX - baseCenter;
        clearDragStates();
        if (deltaX > 15) {
          setActions(prev => ({ ...prev, point: 'S_UP' }));
        } else if (deltaX < -15) {
          setActions(prev => ({ ...prev, point: 'S_DOWN' }));
        } else {
          setActions(prev => ({ ...prev, point: null }));
        }
      } else if (level.setup === 'D_ONLY') {
        const baseCenter = 150 + targetShiftDVal;
        const deltaX = effectivePointX - baseCenter;
        clearDragStates();
        if (deltaX < -15) {
          setActions(prev => ({ ...prev, point: 'D_UP' }));
        } else if (deltaX > 15) {
          setActions(prev => ({ ...prev, point: 'D_DOWN' }));
        } else {
          setActions(prev => ({ ...prev, point: null }));
        }
      } else if (level.setup === 'BOTH') {
        const deltaX = effectivePointX - 150;
        clearDragStates();
        if (deltaX < -18) setActions(prev => ({ ...prev, shiftD: 'LEFT' }));
        else if (deltaX > 18) setActions(prev => ({ ...prev, shiftD: 'RIGHT' }));
      } else {
        clearDragStates();
      }
    }
  };

  let pointLabel = level.setup === 'BOTH' ? 'E' : 'A';
  if (level.setup === 'BOTH' && actions.point !== null) { pointLabel = 'A'; }

  let hintText = "";
  if (isElasticityLevel) {
    hintText = "Chyťte a přetáhněte konce křivek pro změnu sklonu (elasticity)";
  } else {
    hintText = `Chyťte a přetáhněte ${level.setup === 'BOTH' ? 'křivky nebo rovnou bod E' : 'křivku nebo bod A'}`;
  }

  return (
    <div className="w-full bg-[#FBF9F5] py-2 md:py-4 px-3 sm:px-6 font-sans text-stone-800">
      <div className="max-w-5xl mx-auto">
        
        {/* NAVIGACE A HLAVIČKA */}
        <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <Link 
              href="/hry" 
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors group font-sans"
            >
              <ArrowLeft size={14} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
              Zpět na minihry
            </Link>
            <span className="text-stone-300">•</span>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Tržní principy
            </h1>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-[#FDFCF9] rounded-xl shadow-sm border border-stone-300 flex flex-col md:flex-row gap-8 md:gap-10">
          <GameModal isOpen={showModal} onClose={() => setShowModal(false)} title="Tržní principy" pages={modalPages} />
          
          {/* LEVÝ SLOUPEC (Graf a tlačítka) */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            
            {/* Šipka Předchozí - Vlevo nahoře */}
            <div className="w-full max-w-[300px] flex justify-start mb-3">
              <button 
                type="button"
                onClick={handlePrev} 
                className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 font-sans font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <ArrowLeft size={16} /> Předchozí
              </button>
            </div>

        <div className="flex items-center gap-2 text-xs font-sans text-stone-600 px-4 py-2 rounded-lg mb-6 w-[300px] justify-center text-center bg-[#F7F4EE] border border-stone-200">
          <span className="leading-tight">{hintText}</span>
        </div>

        <div className="relative w-[300px] h-[300px] bg-[#F7F4EE] rounded-lg border border-stone-300 overflow-visible select-none touch-none">
           <svg width="300" height="300" className="absolute top-0 left-0 overflow-visible">
              {/* Hlavní osy grafu P a Q */}
              <line x1="0" y1="0" x2="0" y2="300" stroke="#1C1917" strokeWidth="2" />
              <line x1="0" y1="300" x2="300" y2="300" stroke="#1C1917" strokeWidth="2" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#D6D3D1" strokeDasharray="4" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#D6D3D1" strokeDasharray="4" />
              <text x="280" y="295" fontSize="13" fontWeight="bold" fill="#1C1917" fontFamily="sans-serif">Q</text>
              <text x="5" y="15" fontSize="13" fontWeight="bold" fill="#1C1917" fontFamily="sans-serif">P</text>

              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 250 L 250 50" stroke="#D6D3D1" strokeWidth="2" strokeDasharray="6" />
              )}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <path d="M 50 50 L 250 250" stroke="#D6D3D1" strokeWidth="2" strokeDasharray="6" />
              )}
              
              {!isElasticityLevel && (
                <>
                  <circle cx="150" cy="150" r="6" fill="#D6D3D1" />
                  <text x="162" y="138" fontSize="13" fontWeight="bold" fill="#78716C" fontFamily="serif">{level.setup === 'BOTH' ? 'E' : 'A'}</text>
                </>
              )}

              {/* Aktivní S */}
              {(level.setup === 'S_ONLY' || level.setup === 'BOTH') && (
                <motion.g 
                  animate={{ x: effectiveShiftS }} 
                  transition={transitionShiftS}
                >
                  <motion.g 
                    style={{ transformOrigin: "150px 150px", originX: "150px", originY: "150px" }} 
                    animate={{ rotate: effectiveRotS }} 
                    transition={transitionRotS}
                  >
                    {/* Křivka S */}
                    <g
                      onPointerDown={(e) => !isElasticityLevel && handlePointerDown('shiftS', e)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className={status === 'idle' && !isElasticityLevel ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                    >
                      <path d="M 50 250 L 250 50" stroke="transparent" strokeWidth="28" pointerEvents="stroke" />
                      <path d="M 50 250 L 250 50" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                      <text x="260" y="45" fontSize="13" fill="#DC2626" fontWeight="bold" fontFamily="sans-serif">S{actions.shiftS ? "'" : ""}</text>
                    </g>

                    {/* Táhlo elasticity pro S na přesném konci (250, 50) */}
                    {isElasticityLevel && (
                      <g
                        onPointerDown={(e) => handlePointerDown('rotS', e)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        className={status === 'idle' ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                        transform="translate(250, 50)"
                      >
                        <circle cx="0" cy="0" r="14" fill="transparent" pointerEvents="all" />
                        <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#DC2626" strokeWidth="2" className="shadow-xs" />
                        <path d="M -4 0 L -2 -2.5 M -4 0 L -2 2.5 M -4 0 L 4 0 M 4 0 L 2 -2.5 M 4 0 L 2 2.5" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    )}
                  </motion.g>
                </motion.g>
              )}

              {/* Aktivní D */}
              {(level.setup === 'D_ONLY' || level.setup === 'BOTH') && (
                <motion.g 
                  animate={{ x: effectiveShiftD }} 
                  transition={transitionShiftD}
                >
                  <motion.g 
                    style={{ transformOrigin: "150px 150px", originX: "150px", originY: "150px" }} 
                    animate={{ rotate: effectiveRotD }} 
                    transition={transitionRotD}
                  >
                    {/* Křivka D */}
                    <g
                      onPointerDown={(e) => !isElasticityLevel && handlePointerDown('shiftD', e)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className={status === 'idle' && !isElasticityLevel ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                    >
                      <path d="M 50 50 L 250 250" stroke="transparent" strokeWidth="28" pointerEvents="stroke" />
                      <path d="M 50 50 L 250 250" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                      <text x="255" y="260" fontSize="13" fill="#2563EB" fontWeight="bold" fontFamily="sans-serif">D{actions.shiftD ? "'" : ""}</text>
                    </g>

                    {/* Táhlo elasticity pro D na přesném konci (50, 50) */}
                    {isElasticityLevel && (
                      <g
                        onPointerDown={(e) => handlePointerDown('rotD', e)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        className={status === 'idle' ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                        transform="translate(50, 50)"
                      >
                        <circle cx="0" cy="0" r="14" fill="transparent" pointerEvents="all" />
                        <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#2563EB" strokeWidth="2" className="shadow-xs" />
                        <path d="M -4 0 L -2 -2.5 M -4 0 L -2 2.5 M -4 0 L 4 0 M 4 0 L 2 -2.5 M 4 0 L 2 2.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    )}
                  </motion.g>
                </motion.g>
              )}

              {/* Interaktivní bod (Skrytý u úkolů na elasticitu, uzamčený přímo na křivce) */}
              {!isElasticityLevel && (
                <motion.g 
                  animate={{ x: effectivePointX, y: effectivePointY }} 
                  transition={transitionPoint}
                >
                   <g
                     onPointerDown={(e) => handlePointerDown('point', e)}
                     onPointerMove={handlePointerMove}
                     onPointerUp={handlePointerUp}
                     onPointerCancel={handlePointerUp}
                     className={status === 'idle' ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                   >
                     <circle cx="0" cy="0" r="28" fill="transparent" pointerEvents="all" />
                     <circle cx="0" cy="0" r="7" fill="#1C1917" stroke="#ffffff" strokeWidth="2" />
                     <text x="14" y="-14" fontSize="13" fontWeight="bold" fill="#1C1917" fontFamily="serif">{pointLabel}</text>
                   </g>
                </motion.g>
              )}
           </svg>
        </div>

        {/* Tlačítka pro rychlé přeskočení kategorií */}
        <div className="mt-auto pt-10 flex flex-wrap gap-2.5 justify-start w-full">
          <button
            onClick={() => handleJump(0)}
            className={`px-3.5 py-2 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all border shadow-xs ${
              !isElasticityLevel
                ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-500 hover:bg-stone-50'
            }`}
          >
            Determinanty nabídky a poptávky
          </button>
          <button
            onClick={() => handleJump(15)}
            className={`px-3.5 py-2 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all border shadow-xs ${
              isElasticityLevel
                ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-500 hover:bg-stone-50'
            }`}
          >
            Elasticita
          </button>
        </div>

      </div>

      {/* PRAVÝ SLOUPEC (Otázka a vyhodnocení) */}
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

        <div className="mt-8 flex flex-col items-center min-h-[160px]">
          {status === 'idle' && (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!hasAction}
              className="bg-stone-900 text-white px-8 py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 mt-4"
            >
              Zkontrolovat řešení
            </button>
          )}

          {status === 'checked' && isCorrect !== null && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
              <div className={`flex items-center gap-2 font-serif font-bold text-lg mb-3 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                {isCorrect ? 'Správně!' : 'Špatně!'}
              </div>
              <div className="bg-[#FAF4EB] p-4 rounded-lg text-stone-800 text-xs leading-relaxed border border-orange-200/80 mb-5 w-full shadow-xs">
                <strong className="block text-stone-900 font-bold mb-1 font-serif text-sm">Vysvětlení:</strong>
                {level.explanation}
              </div>
              <button 
                type="button"
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
  </div>
</div>
  );
}