"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Handshake,
  Swords,
  User,
  RotateCcw,
  Trophy,
  HelpCircle,
  Info,
  Flame,
  Play,
  Scale,
  History as HistoryIcon,
  X,
  Shuffle,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

// --- TYPY A DEFINICE STRATEGIÍ ---

export type Move = 'C' | 'D'; // C = Cooperate (Spolupracovat), D = Defect (Zradit)

export type ConcreteBotStrategyId =
  | 'tit-for-tat'
  | 'friedman'
  | 'always-defect'
  | 'always-cooperate'
  | 'tit-for-two-tats'
  | 'joss';

export type BotStrategyId = 'mystery' | ConcreteBotStrategyId;

export interface BotStrategyInfo {
  id: BotStrategyId;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  tag: string;
  tagColor: string;
}

export const CONCRETE_BOT_IDS: ConcreteBotStrategyId[] = [
  'tit-for-tat',
  'friedman',
  'always-defect',
  'always-cooperate',
  'tit-for-two-tats',
  'joss'
];

export const BOT_STRATEGIES: Record<BotStrategyId, BotStrategyInfo> = {
  'mystery': {
    id: 'mystery',
    name: 'Náhodný / Tajný bot',
    subtitle: 'MYSTERY BOT',
    description: 'Hra náhodně vylosuje jednoho ze 6 botů z Axelrodova turnaje. Skutečnou identitu a logiku soupeře se dozvíte až po skončení hry.',
    icon: Shuffle,
    tag: 'Překvapení',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  'tit-for-tat': {
    id: 'tit-for-tat',
    name: 'Opláceč',
    subtitle: 'TIT-FOR-TAT',
    description: 'Začne spoluprací a v každém dalším kole přesně zkopíruje poslední tah hráče.',
    icon: Handshake,
    tag: 'Férový',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  'friedman': {
    id: 'friedman',
    name: 'Nelítostný mstitel',
    subtitle: 'FRIEDMAN',
    description: 'Kooperuje do chvíle, než ji hráč poprvé podrazí. Od toho momentu už nikdy neodpustí a až do konce hry volí pouze zradu.',
    icon: Flame,
    tag: 'Nemilosrdný',
    tagColor: 'bg-[#FEF9C3] text-stone-900 border-[#F9C70F]'
  },
  'always-defect': {
    id: 'always-defect',
    name: 'Věčný zrádce',
    subtitle: 'ALWAYS DEFECT',
    description: 'V každém kole bez výjimky volí podraz. Skvěle prověří, jak rychle hráč pochopí, že s tímto botem nemá smysl kooperovat.',
    icon: Swords,
    tag: 'Agresivní',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  'always-cooperate': {
    id: 'always-cooperate',
    name: 'Věčný kamarád',
    subtitle: 'ALWAYS COOPERATE',
    description: 'V každém kole bez výjimky spolupracuje. Slouží k otestování, zda hráč odolá pokušení botovu důvěru maximálně vyždímat ve svůj prospěch.',
    icon: Heart,
    tag: 'Mírumilovný',
    tagColor: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  'tit-for-two-tats': {
    id: 'tit-for-two-tats',
    name: 'Odpouštějící opláceč',
    subtitle: 'TIT-FOR-TWO-TATS',
    description: 'Zradí pouze tehdy, pokud ji hráč podrazí ve dvou kolech bezprostředně po sobě.',
    icon: Shield,
    tag: 'Velkorysý',
    tagColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  'joss': {
    id: 'joss',
    name: 'Zákeřný opláceč',
    subtitle: 'JOSS',
    description: 'V základu funguje stejně jako Tit for Tat (kopíruje hráče), ale zhruba v 10 % případů se z ničeho nic zachová sobecky a nečekaně hráče podrazí, aby maximalizovala zisk.',
    icon: Zap,
    tag: 'Záludný',
    tagColor: 'bg-purple-100 text-purple-800 border-purple-300'
  }
};

export type GameLengthId = 'short' | 'medium' | 'long';

export interface GameLengthInfo {
  id: GameLengthId;
  label: string;
  baseline: number;
  description: string;
}

export const GAME_LENGTHS: Record<GameLengthId, GameLengthInfo> = {
  short: {
    id: 'short',
    label: 'Krátká hra',
    baseline: 10,
    description: 'Minimálně 10 kol, poté 20% šance na konec'
  },
  medium: {
    id: 'medium',
    label: 'Střední hra',
    baseline: 20,
    description: 'Minimálně 20 kol, poté 20% šance na konec'
  },
  long: {
    id: 'long',
    label: 'Dlouhá hra',
    baseline: 30,
    description: 'Minimálně 30 kol, poté 20% šance na konec'
  }
};

export interface RoundRecord {
  round: number;
  playerMove: Move;
  botMove: Move;
  playerScoreGained: number;
  botScoreGained: number;
  playerTotalScore: number;
  botTotalScore: number;
  quadrant: 'CC' | 'CD' | 'DC' | 'DD';
}

// Výplatní matice:
export function calculatePayoff(playerMove: Move, botMove: Move): {
  playerScore: number;
  botScore: number;
  quadrant: 'CC' | 'CD' | 'DC' | 'DD';
} {
  if (playerMove === 'C' && botMove === 'C') {
    return { playerScore: 3, botScore: 3, quadrant: 'CC' };
  } else if (playerMove === 'C' && botMove === 'D') {
    return { playerScore: 0, botScore: 5, quadrant: 'CD' };
  } else if (playerMove === 'D' && botMove === 'C') {
    return { playerScore: 5, botScore: 0, quadrant: 'DC' };
  } else {
    return { playerScore: 1, botScore: 1, quadrant: 'DD' };
  }
}

// Výpočet tahu bota podle zvolené strategie
export function getBotMove(strategy: ConcreteBotStrategyId, history: RoundRecord[]): Move {
  // 1. Opláceč (Tit-for-tat)
  if (strategy === 'tit-for-tat') {
    if (history.length === 0) return 'C';
    return history[history.length - 1].playerMove;
  }

  // 2. Nelítostný mstitel (Friedman)
  if (strategy === 'friedman') {
    const hasPlayerEverDefected = history.some((r) => r.playerMove === 'D');
    return hasPlayerEverDefected ? 'D' : 'C';
  }

  // 3. Věčný zrádce (Always defect)
  if (strategy === 'always-defect') {
    return 'D';
  }

  // 4. Věčný kamarád (Always cooperate)
  if (strategy === 'always-cooperate') {
    return 'C';
  }

  // 5. Odpouštějící opláceč (Tit-for-two-tats)
  if (strategy === 'tit-for-two-tats') {
    if (history.length < 2) return 'C';
    const last1 = history[history.length - 1].playerMove;
    const last2 = history[history.length - 2].playerMove;
    return (last1 === 'D' && last2 === 'D') ? 'D' : 'C';
  }

  // 6. Zákeřný opláceč (Joss)
  if (strategy === 'joss') {
    let baseMove: Move = 'C';
    if (history.length > 0) {
      baseMove = history[history.length - 1].playerMove;
    }
    if (baseMove === 'C') {
      return Math.random() < 0.10 ? 'D' : 'C';
    }
    return 'D';
  }

  return 'C';
}

export default function PrisonersDilemmaGame() {
  // Výchozí bot nastaven na 'mystery'
  const [selectedStrategy, setSelectedStrategy] = useState<BotStrategyId>('mystery');
  const [effectiveStrategy, setEffectiveStrategy] = useState<ConcreteBotStrategyId>('tit-for-tat');
  const [isMysteryBot, setIsMysteryBot] = useState<boolean>(false);
  const [selectedLength, setSelectedLength] = useState<GameLengthId>('short');
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'evaluating' | 'gameover'>('setup');

  const [currentRound, setCurrentRound] = useState<number>(1);
  const [playerTotalScore, setPlayerTotalScore] = useState<number>(0);
  const [botTotalScore, setBotTotalScore] = useState<number>(0);
  const [history, setHistory] = useState<RoundRecord[]>([]);

  const [activeQuadrant, setActiveQuadrant] = useState<'CC' | 'CD' | 'DC' | 'DD' | null>(null);
  const [lastRoundResult, setLastRoundResult] = useState<RoundRecord | null>(null);
  const [showTheoryModal, setShowTheoryModal] = useState<boolean>(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<BotStrategyId | null>(null);

  const historyScrollContainerRef = useRef<HTMLDivElement>(null);

  // Posun historie POUZE uvnitř interního kontejneru
  useEffect(() => {
    if (historyScrollContainerRef.current) {
      historyScrollContainerRef.current.scrollTop = historyScrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Skutečně náhodný výběr bota ze všech 6 dostupných strategií
  const pickRandomBot = (): ConcreteBotStrategyId => {
    const randomIndex = Math.floor(Math.random() * CONCRETE_BOT_IDS.length);
    return CONCRETE_BOT_IDS[randomIndex];
  };

  // Spuštění nové hry
  const handleStartGame = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    let actual: ConcreteBotStrategyId;
    if (selectedStrategy === 'mystery') {
      actual = pickRandomBot();
      setIsMysteryBot(true);
    } else {
      actual = selectedStrategy;
      setIsMysteryBot(false);
    }

    setEffectiveStrategy(actual);
    setHistory([]);
    setPlayerTotalScore(0);
    setBotTotalScore(0);
    setCurrentRound(1);
    setActiveQuadrant(null);
    setLastRoundResult(null);
    setGameState('playing');
  };

  // Návrat do nastavení
  const handleResetToSetup = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setGameState('setup');
    setHistory([]);
    setPlayerTotalScore(0);
    setBotTotalScore(0);
    setCurrentRound(1);
    setActiveQuadrant(null);
    setLastRoundResult(null);
  };

  // Zahrání tahu hráče
  const handlePlayerMove = (playerMove: Move, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (gameState !== 'playing') return;

    setGameState('evaluating');

    // Tah bota
    const botMove = getBotMove(effectiveStrategy, history);
    const { playerScore, botScore, quadrant } = calculatePayoff(playerMove, botMove);

    const newPlayerTotal = playerTotalScore + playerScore;
    const newBotTotal = botTotalScore + botScore;

    const newRecord: RoundRecord = {
      round: currentRound,
      playerMove,
      botMove,
      playerScoreGained: playerScore,
      botScoreGained: botScore,
      playerTotalScore: newPlayerTotal,
      botTotalScore: newBotTotal,
      quadrant
    };

    setActiveQuadrant(quadrant);
    setLastRoundResult(newRecord);
    setPlayerTotalScore(newPlayerTotal);
    setBotTotalScore(newBotTotal);
    setHistory((prev) => [...prev, newRecord]);

    // Zvýraznění kvadrantu na 1 sekundu a stochastický konec (žádné konfety)
    setTimeout(() => {
      const baseline = GAME_LENGTHS[selectedLength].baseline;
      let shouldEnd = false;

      if (currentRound >= baseline) {
        const roll = Math.random();
        if (roll < 0.20) {
          shouldEnd = true;
        }
      }

      if (shouldEnd) {
        setGameState('gameover');
      } else {
        setCurrentRound((prev) => prev + 1);
        setGameState('playing');
      }
    }, 1000);
  };

  // Display info bota
  const displayBotInfo = isMysteryBot && gameState !== 'gameover'
    ? BOT_STRATEGIES['mystery']
    : BOT_STRATEGIES[effectiveStrategy];
  const DisplayBotIcon = displayBotInfo.icon;

  // Statistika kooperace
  const totalRounds = history.length;
  const playerCoopCount = history.filter((r) => r.playerMove === 'C').length;
  const botCoopCount = history.filter((r) => r.botMove === 'C').length;
  const playerCoopPercent = totalRounds > 0 ? Math.round((playerCoopCount / totalRounds) * 100) : 0;
  const botCoopPercent = totalRounds > 0 ? Math.round((botCoopCount / totalRounds) * 100) : 0;

  return (
    <div className="w-full bg-[#FBF9F5] py-2 md:py-4 px-3 sm:px-6 font-sans text-stone-800 selection:bg-stone-200">
      <div className="max-w-5xl mx-auto flex flex-col justify-start">
        
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
              Vězňovo dilema
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-[#F9C70F] text-stone-700 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
              title="Vysvětlení teorie a stochastického konce"
            >
              <HelpCircle size={14} className="text-[#F9C70F]" />
              <span className="hidden sm:inline">Pravidla & Teorie</span>
            </button>
            {gameState !== 'setup' && (
              <button
                type="button"
                onClick={handleResetToSetup}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                title="Změnit strategii nebo nastavení"
              >
                <RotateCcw size={13} />
                <span>Nová hra</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REŽIM 1: ÚVODNÍ NASTAVENÍ STRATEGIE A DÉLKY */}
        {/* ========================================================================= */}
        {gameState === 'setup' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            {/* KROK 1: VÝBĚR STRATEGIE */}
            <div className="bg-[#FDFCF9] rounded-xl border border-stone-300 p-4 md:p-5 shadow-xs relative">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F9C70F] block">Krok 1 ze 2</span>
                  <h2 className="text-base md:text-lg font-serif font-bold text-stone-900">
                    Zvolte soupeře (Bota)
                  </h2>
                </div>
                <span className="text-xs text-stone-500 font-sans hidden sm:inline">
                  Najeďte na <strong className="text-stone-700">ⓘ</strong> pro vysvětlení strategie
                </span>
              </div>

              {/* 1. ŘÁDEK: SAMOTNÝ NÁHODNÝ BOT (DEFAULT) */}
              <div className="mb-2.5 relative">
                {(() => {
                  const mysteryItem = BOT_STRATEGIES['mystery'];
                  const MysteryIcon = mysteryItem.icon;
                  const isSelected = selectedStrategy === 'mystery';
                  const isTooltipOpen = hoveredTooltip === 'mystery';

                  return (
                    <div className="relative">
                      <div
                        onClick={() => setSelectedStrategy('mystery')}
                        className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-stone-900 ring-2 ring-stone-900/10 shadow-xs'
                            : 'bg-[#F7F4EE]/60 border-stone-200/90 hover:border-stone-400 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-1">
                          <div className={`w-8 h-8 rounded-md shrink-0 flex items-center justify-center border ${
                            isSelected ? 'bg-stone-900 text-white border-stone-900' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}>
                            <MysteryIcon size={17} />
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-xs md:text-sm text-stone-900 leading-tight">
                                {mysteryItem.name}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-stone-500">
                                {mysteryItem.subtitle}
                              </span>
                              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
                                Doporučeno
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500 truncate mt-0.5">
                              Hra náhodně vylosuje jednoho ze 6 botů níže — odhalení proběhne až na konci
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onMouseEnter={() => setHoveredTooltip('mystery')}
                            onMouseLeave={() => setHoveredTooltip(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredTooltip(isTooltipOpen ? null : 'mystery');
                            }}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                            title="Zobrazit detail"
                          >
                            <Info size={14} />
                          </button>

                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#F9C70F] bg-[#F9C70F]' : 'border-stone-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                      </div>

                      {/* Tooltip pro Mystery */}
                      <AnimatePresence>
                        {isTooltipOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            onMouseEnter={() => setHoveredTooltip('mystery')}
                            onMouseLeave={() => setHoveredTooltip(null)}
                            className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-stone-900 text-stone-100 p-3 rounded-lg shadow-xl border border-stone-700 text-xs font-sans pointer-events-auto"
                          >
                            <div className="flex items-center justify-between mb-1 pb-1 border-b border-stone-800">
                              <span className="font-serif font-bold text-white text-xs">{mysteryItem.name} • {mysteryItem.subtitle}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${mysteryItem.tagColor}`}>
                                {mysteryItem.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-300 leading-relaxed">
                              {mysteryItem.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>

              {/* 2. ŘÁDEK: 6 BOTŮ V GRIDU PO TŘECH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 relative">
                {CONCRETE_BOT_IDS.map((stratId) => {
                  const item = BOT_STRATEGIES[stratId];
                  const IconComponent = item.icon;
                  const isSelected = selectedStrategy === stratId;
                  const isTooltipOpen = hoveredTooltip === stratId;

                  return (
                    <div key={stratId} className="relative">
                      <div
                        onClick={() => setSelectedStrategy(stratId)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-stone-900 ring-2 ring-stone-900/10 shadow-xs'
                            : 'bg-[#F7F4EE]/60 border-stone-200/90 hover:border-stone-400 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-1">
                          <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center border ${
                            isSelected ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-100 text-stone-800 border-stone-200'
                          }`}>
                            <IconComponent size={15} />
                          </div>
                          <div className="truncate">
                            <div className="font-serif font-bold text-xs md:text-sm text-stone-900 truncate leading-tight">
                              {item.name}
                            </div>
                            <div className="text-[10px] font-mono font-bold text-stone-500 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {/* Pravá část: Info ikonka + stav výběru */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onMouseEnter={() => setHoveredTooltip(stratId)}
                            onMouseLeave={() => setHoveredTooltip(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredTooltip(isTooltipOpen ? null : stratId);
                            }}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                            title="Zobrazit detail strategie"
                          >
                            <Info size={13} />
                          </button>

                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#F9C70F] bg-[#F9C70F]' : 'border-stone-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                      </div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {isTooltipOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            onMouseEnter={() => setHoveredTooltip(stratId)}
                            onMouseLeave={() => setHoveredTooltip(null)}
                            className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-stone-900 text-stone-100 p-3 rounded-lg shadow-xl border border-stone-700 text-xs font-sans pointer-events-auto"
                          >
                            <div className="flex items-center justify-between mb-1 pb-1 border-b border-stone-800">
                              <span className="font-serif font-bold text-white text-xs">{item.name} • {item.subtitle}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${item.tagColor}`}>
                                {item.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-300 leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KROK 2: DÉLKA HRY & BODŮ */}
            <div className="bg-[#FDFCF9] rounded-xl border border-stone-300 p-4 md:p-5 shadow-xs">
              <div className="mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F9C70F] block">Krok 2 ze 2</span>
                <h2 className="text-base md:text-lg font-serif font-bold text-stone-900">
                  Délka hry (Stochastický konec)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                {(Object.keys(GAME_LENGTHS) as GameLengthId[]).map((lenId) => {
                  const len = GAME_LENGTHS[lenId];
                  const isSelected = selectedLength === lenId;

                  return (
                    <button
                      key={lenId}
                      type="button"
                      onClick={() => setSelectedLength(lenId)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-white border-stone-900 ring-2 ring-stone-900/10 shadow-xs'
                          : 'bg-[#F7F4EE]/60 border-stone-200 hover:border-[#F9C70F] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-serif font-bold text-xs md:text-sm text-stone-900">{len.label}</span>
                        <span className="text-[10px] font-mono font-bold text-[#F9C70F]">min. {len.baseline} kol</span>
                      </div>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        {len.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Kompaktní shrnutí výplatní matice */}
              <div className="p-2.5 bg-[#F7F4EE] rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px] mb-3">
                <div className="flex items-center gap-1 font-bold text-stone-700">
                  <Scale size={13} className="text-stone-800" /> Body:
                </div>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800 font-mono">
                  Oba C: <strong className="text-emerald-700">3, 3</strong>
                </span>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800 font-mono">
                  Oba D: <strong className="text-stone-700">1, 1</strong>
                </span>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800 font-mono">
                  Vy D, Bot C: <strong className="text-stone-900">5, 0</strong>
                </span>
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800 font-mono">
                  Vy C, Bot D: <strong className="text-rose-700">0, 5</strong>
                </span>
              </div>

              {/* TLAČÍTKO START */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-widest shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Spustit hru</span>
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* REŽIM 2: AKTIVNÍ HRA (FIT NA OBRAZOVKU BEZ SCROLLOVÁNÍ) */}
        {/* ========================================================================= */}
        {gameState !== 'setup' && (
          <div className="space-y-3">
            
            {/* HORNÍ LIŠTA: SKÓRE & KOLO */}
            <div className="bg-[#FDFCF9] rounded-xl border border-stone-300 p-2.5 md:p-3 shadow-xs">
              <div className="grid grid-cols-12 gap-2 items-center">
                
                {/* HRÁČ KARTA */}
                <div className="col-span-5 bg-white p-2.5 rounded-lg flex items-center justify-between border border-stone-300 shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded bg-[#FEF9C3] border border-[#F9C70F] flex items-center justify-center text-stone-950 shrink-0">
                      <User size={16} />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold leading-tight">
                        Vy (Hráč)
                      </div>
                      <div className="text-[10px] text-stone-600 truncate">
                        {lastRoundResult ? (
                          <span className={lastRoundResult.playerMove === 'C' ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                            {lastRoundResult.playerMove === 'C' ? 'Spolupráce' : 'Zrada'} (+{lastRoundResult.playerScoreGained})
                          </span>
                        ) : (
                          'Čeká na tah'
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-1">
                    <span className="text-2xl font-serif font-bold text-stone-900 leading-none">
                      {playerTotalScore}
                    </span>
                    <span className="text-[9px] font-mono text-stone-400 block uppercase">b.</span>
                  </div>
                </div>

                {/* STŘED: INFORMACE O KOLE */}
                <div className="col-span-2 text-center py-0.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F7F4EE] border border-stone-300 text-stone-800 text-[11px] font-bold font-mono uppercase">
                    Kolo {currentRound}
                  </div>
                  <p className="text-[9px] text-stone-500 font-sans mt-0.5 truncate">
                    {GAME_LENGTHS[selectedLength].label}
                  </p>
                </div>

                {/* SOUPEŘ BOT KARTA */}
                <div className="col-span-5 bg-white p-2.5 rounded-lg flex items-center justify-between border border-stone-300 shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded bg-[#F7F4EE] border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
                      <DisplayBotIcon size={16} />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold leading-tight truncate">
                        {displayBotInfo.name}
                      </div>
                      <div className="text-[10px] text-stone-600 truncate">
                        {lastRoundResult ? (
                          <span className={lastRoundResult.botMove === 'C' ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                            {lastRoundResult.botMove === 'C' ? 'Spolupráce' : 'Zrada'} (+{lastRoundResult.botScoreGained})
                          </span>
                        ) : (
                          'Algoritmus'
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-1">
                    <span className="text-2xl font-serif font-bold text-stone-900 leading-none">
                      {botTotalScore}
                    </span>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">b.</span>
                  </div>
                </div>

              </div>
            </div>

            {/* HLAVNÍ HRACÍ PLOCHA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              
              {/* LEVÁ ČÁST: 2x2 MATICE & TLAČÍTKA */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                
                {/* 2x2 VÝPLATNÍ MATICE */}
                <div className="bg-[#FDFCF9] rounded-xl border border-stone-300 p-3 md:p-3.5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-bold text-xs md:text-sm text-stone-900">
                      Výplatní matice kola
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 font-semibold uppercase">
                      (Vy, Bot)
                    </span>
                  </div>

                  <div className="relative">
                    {/* Popisky sloupců (Bot) */}
                    <div className="grid grid-cols-12 mb-1 text-center text-[10px] font-bold uppercase tracking-wider text-stone-600">
                      <div className="col-span-4 text-left font-serif normal-case italic text-stone-400 self-end pl-1">
                        Vy \ Bot
                      </div>
                      <div className="col-span-4 bg-stone-100 py-1 rounded-t border-t border-x border-stone-200 text-stone-800 font-mono">
                        Bot: Spolupráce (C)
                      </div>
                      <div className="col-span-4 bg-stone-100 py-1 rounded-t border-t border-x border-stone-200 text-stone-800 font-mono">
                        Bot: Zrada (D)
                      </div>
                    </div>

                    {/* Řádek 1: Hráč Spolupracuje */}
                    <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                      <div className="col-span-4 bg-stone-100 p-1.5 rounded-l border border-stone-200 flex flex-col justify-center text-left">
                        <span className="text-[11px] font-bold text-stone-900">Spolupracovat</span>
                        <span className="text-[9px] text-stone-500">Volba (C)</span>
                      </div>

                      {/* Quadrant CC */}
                      <motion.div
                        animate={{
                          scale: activeQuadrant === 'CC' ? 1.03 : 1,
                          backgroundColor: activeQuadrant === 'CC' ? '#DCFCE7' : '#FFFFFF',
                          borderColor: activeQuadrant === 'CC' ? '#16A34A' : '#E7E5E4'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`col-span-4 p-2 rounded border-2 flex flex-col justify-center items-center text-center relative ${
                          activeQuadrant === 'CC' ? 'shadow-xs ring-2 ring-emerald-500/30' : ''
                        }`}
                      >
                        <span className="text-base md:text-lg font-serif font-bold text-emerald-700 leading-tight">3, 3</span>
                        <span className="text-[9px] text-stone-500 font-medium">Oba C</span>
                      </motion.div>

                      {/* Quadrant CD */}
                      <motion.div
                        animate={{
                          scale: activeQuadrant === 'CD' ? 1.03 : 1,
                          backgroundColor: activeQuadrant === 'CD' ? '#FFE4E6' : '#FFFFFF',
                          borderColor: activeQuadrant === 'CD' ? '#E11D48' : '#E7E5E4'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`col-span-4 p-2 rounded border-2 flex flex-col justify-center items-center text-center relative ${
                          activeQuadrant === 'CD' ? 'shadow-xs ring-2 ring-rose-500/30' : ''
                        }`}
                      >
                        <span className="text-base md:text-lg font-serif font-bold text-rose-700 leading-tight">0, 5</span>
                        <span className="text-[9px] text-stone-500 font-medium">Vy C, Bot D</span>
                      </motion.div>
                    </div>

                    {/* Řádek 2: Hráč Zradí */}
                    <div className="grid grid-cols-12 gap-1.5">
                      <div className="col-span-4 bg-stone-100 p-1.5 rounded-l border border-stone-200 flex flex-col justify-center text-left">
                        <span className="text-[11px] font-bold text-stone-900">Zradit</span>
                        <span className="text-[9px] text-stone-500">Volba (D)</span>
                      </div>

                      {/* Quadrant DC */}
                      <motion.div
                        animate={{
                          scale: activeQuadrant === 'DC' ? 1.03 : 1,
                          backgroundColor: activeQuadrant === 'DC' ? '#FEF9C3' : '#FFFFFF',
                          borderColor: activeQuadrant === 'DC' ? '#F9C70F' : '#E7E5E4'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`col-span-4 p-2 rounded border-2 flex flex-col justify-center items-center text-center relative ${
                          activeQuadrant === 'DC' ? 'shadow-xs ring-2 ring-[#F9C70F]/50' : ''
                        }`}
                      >
                        <span className="text-base md:text-lg font-serif font-bold text-stone-900 leading-tight">5, 0</span>
                        <span className="text-[9px] text-stone-500 font-medium">Vy D, Bot C</span>
                      </motion.div>

                      {/* Quadrant DD */}
                      <motion.div
                        animate={{
                          scale: activeQuadrant === 'DD' ? 1.03 : 1,
                          backgroundColor: activeQuadrant === 'DD' ? '#F5F5F4' : '#FFFFFF',
                          borderColor: activeQuadrant === 'DD' ? '#78716C' : '#E7E5E4'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`col-span-4 p-2 rounded border-2 flex flex-col justify-center items-center text-center relative ${
                          activeQuadrant === 'DD' ? 'shadow-xs ring-2 ring-stone-900/10' : ''
                        }`}
                      >
                        <span className="text-base md:text-lg font-serif font-bold text-stone-900 leading-tight">1, 1</span>
                        <span className="text-[9px] text-stone-500 font-medium">Vy D, Bot D</span>
                      </motion.div>
                    </div>

                  </div>
                </div>

                {/* VÝBĚR AKCE: VELKÁ TLAČÍTKA SPOLUPRACOVAT / ZRADIT */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {/* Cooperate */}
                  <button
                    type="button"
                    disabled={gameState === 'evaluating'}
                    onClick={(e) => handlePlayerMove('C', e)}
                    className="group flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs active:scale-[0.98]"
                  >
                    <Handshake size={18} className="text-emerald-700 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <span className="font-serif font-bold text-sm block leading-none">Spolupracovat</span>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">Volba (C)</span>
                    </div>
                  </button>

                  {/* Defect */}
                  <button
                    type="button"
                    disabled={gameState === 'evaluating'}
                    onClick={(e) => handlePlayerMove('D', e)}
                    className="group flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-rose-600 bg-white hover:bg-rose-50 text-rose-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs active:scale-[0.98]"
                  >
                    <Swords size={18} className="text-rose-700 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <span className="font-serif font-bold text-sm block leading-none">Zradit</span>
                      <span className="text-[10px] font-mono text-rose-700 font-semibold">Volba (D)</span>
                    </div>
                  </button>
                </div>

                {/* Stav vyhodnocení */}
                {gameState === 'evaluating' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center text-[11px] font-mono text-stone-600 flex items-center justify-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9C70F] animate-pulse" />
                    Vyhodnocuji tah kola {currentRound}...
                  </motion.div>
                )}

              </div>

              {/* PRAVÁ ČÁST: HISTORIE KOL */}
              <div className="lg:col-span-5 flex flex-col h-full min-h-[290px]">
                <div className="bg-[#FDFCF9] rounded-xl border border-stone-300 p-3 md:p-3.5 shadow-xs flex flex-col h-full">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2">
                    <div className="flex items-center gap-1.5">
                      <HistoryIcon size={14} className="text-stone-700" />
                      <h3 className="font-serif font-bold text-xs md:text-sm text-stone-900">
                        Historie kol
                      </h3>
                    </div>
                    <div className="text-[10px] font-mono text-stone-600 flex items-center gap-2">
                      <span>Kooperace:</span>
                      <span className="font-bold text-stone-900">Vy {playerCoopPercent}%</span>
                      <span>/</span>
                      <span className="font-bold text-stone-900">Bot {botCoopPercent}%</span>
                    </div>
                  </div>

                  {/* Seznam kol */}
                  <div
                    ref={historyScrollContainerRef}
                    className="flex-1 overflow-y-auto max-h-[230px] pr-1 space-y-1.5"
                  >
                    {history.length === 0 ? (
                      <div className="h-32 flex flex-col items-center justify-center text-center text-stone-400 p-2">
                        <Scale size={20} className="mb-1 text-stone-300" />
                        <p className="text-[11px] font-sans">Zatím neproběhlo žádné kolo.</p>
                      </div>
                    ) : (
                      history.map((record) => {
                        const isPlayerC = record.playerMove === 'C';
                        const isBotC = record.botMove === 'C';

                        return (
                          <div
                            key={record.round}
                            className="p-1.5 px-2 bg-white rounded border border-stone-200 text-[11px] flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-mono font-bold flex items-center justify-center text-[10px]">
                                {record.round}
                              </span>
                              
                              <div className="flex items-center gap-1 font-mono text-[10px]">
                                <span className={`px-1.5 py-0.2 rounded font-bold ${
                                  isPlayerC ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  Vy: {isPlayerC ? 'C' : 'D'} (+{record.playerScoreGained})
                                </span>
                                <span className="text-stone-300">/</span>
                                <span className={`px-1.5 py-0.2 rounded font-bold ${
                                  isBotC ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  Bot: {isBotC ? 'C' : 'D'} (+{record.botScoreGained})
                                </span>
                              </div>
                            </div>

                            <div className="font-mono text-[10px] text-stone-500">
                              <strong className="text-stone-800">{record.playerTotalScore}</strong> : {record.botTotalScore}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* GAME OVER MODAL OVERLAY */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {gameState === 'gameover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs"
            >
              <motion.div
                initial={{ scale: 0.92, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 15 }}
                className="bg-[#FDFCF9] text-stone-900 rounded-2xl p-6 md:p-7 border border-stone-300 shadow-2xl max-w-md w-full text-center relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4EE] border border-stone-300 text-stone-700 text-xs font-bold uppercase tracking-widest mb-3">
                  <Trophy size={14} className="text-[#F9C70F]" /> Konec po {totalRounds} kolech
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-3">
                  {playerTotalScore > botTotalScore && 'Zvítězili jste nad botem'}
                  {playerTotalScore === botTotalScore && 'Vyrovnaná partie – remíza'}
                  {playerTotalScore < botTotalScore && 'Soupeř získal více bodů'}
                </h2>

                <div className="my-4 p-3.5 bg-[#F7F4EE] rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-500 mb-1 font-mono uppercase tracking-wider">Konečné skóre</div>
                  <div className="text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-3">
                    <span className="text-[#F9C70F]">{playerTotalScore}</span>
                    <span className="text-stone-400 text-xl font-sans">:</span>
                    <span className="text-stone-800">{botTotalScore}</span>
                  </div>
                  
                  {/* Odhalení tajemného bota */}
                  {isMysteryBot && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200 text-xs text-stone-700">
                      <span className="text-stone-900 font-bold block mb-0.5">Odhalení soupeře:</span>
                      Hrál proti vám <strong className="text-stone-900">{BOT_STRATEGIES[effectiveStrategy].name}</strong> • {BOT_STRATEGIES[effectiveStrategy].subtitle}.
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5 justify-center mt-5">
                  <button
                    type="button"
                    onClick={(e) => handleStartGame(e)}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#F9C70F] hover:bg-[#EAB308] text-stone-950 px-5 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95 border border-amber-300"
                  >
                    <RotateCcw size={14} />
                    <span>Hrát znovu</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleResetToSetup(e)}
                    className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 px-5 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-widest border border-stone-300 transition-all active:scale-95"
                  >
                    <span>Změnit bota</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MODÁLNÍ OKNO S TEORIÍ */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showTheoryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
              onClick={() => setShowTheoryModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FDFCF9] rounded-2xl border border-stone-300 max-w-2xl w-full p-5 md:p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FEF9C3] border border-[#F9C70F] flex items-center justify-center text-stone-950">
                      <Scale size={16} />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Vězňovo dilema a teorie her
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTheoryModal(false)}
                    className="text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3 text-xs text-stone-700 overflow-y-auto pr-1 leading-relaxed">
                  <div className="bg-[#FEFCE8] p-3 rounded-lg border border-[#F9C70F]/60">
                    <h4 className="font-serif font-bold text-stone-900 text-xs mb-1 flex items-center gap-1">
                      <Info size={13} className="text-stone-900" /> Jednorázové vs. Opakované dilema
                    </h4>
                    <p>
                      V jednorázové hře je <strong className="text-stone-900">zrada dominantní strategií</strong>. Výsledná Nashova rovnováha (1, 1) je však Paretovsky neefektivní — oba by získali více (3, 3) při vzájemné důvěře. V opakované hře naopak vzniká prostor pro trestání zrady a odměňování spolupráce.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-xs mb-1">
                      Proč stochastický konec (nejistý horizont)?
                    </h4>
                    <p>
                      Kdyby hráči věděli, že hra končí v kole N, nastane jev <strong className="text-stone-900">zpětná indukce (backward induction)</strong>: v posledním kole zradí oba (už nehrozí odveta), což způsobí zradu i v předposledním kole a zhroucení důvěry od 1. kola. Náhodný konec s 20% šancí udržuje <em>stín budoucnosti</em> a umožňuje kooperaci.
                    </p>
                  </div>

                  <div className="border-t border-stone-200 pt-2">
                    <h4 className="font-serif font-bold text-stone-900 text-xs mb-1">
                      Strategie Tit-for-Tat (Půjčka za oplátku)
                    </h4>
                    <p>
                      Robert Axelrod v turnajích strategií prokázal, že nejúspěšnější jsou strategie:
                      (1) <em>Milé</em> (nezradí první), (2) <em>Schopné odvety</em> (okamžitě potrestají zradu), (3) <em>Odpouštějící</em> (po nápravě spolupracují) a (4) <em>Čitelné</em>.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowTheoryModal(false)}
                    className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Zavřít
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
