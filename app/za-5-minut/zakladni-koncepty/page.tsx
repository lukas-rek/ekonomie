"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cards, Card } from "./data";
import { 
  ArrowLeft, 
  RotateCw, 
  Brain, 
  Scale, 
  Pizza, 
  Factory, 
  Users, 
  LineChart, 
  Handshake, 
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Gamepad2,
  BookOpen,
  MapPin
} from "lucide-react";

export default function ZakladniKonceptyLessonPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});
  
  // Interactive tap states
  const [singleFlipped, setSingleFlipped] = useState(false);
  const [gridFlipped, setGridFlipped] = useState<Record<number, boolean>>({});
  const [pizzaPiece, setPizzaPiece] = useState<number>(1);
  const [workerCount, setWorkerCount] = useState<number>(1);
  const [ppfPoint, setPpfPoint] = useState<"A" | "B" | "C">("B");
  const [ppfTechShift, setPpfTechShift] = useState<boolean>(false);
  const [tradeMode, setTradeMode] = useState<"no_trade" | "specialization">("no_trade");
  const [marketTab, setMarketTab] = useState<"demand" | "supply" | "equilibrium">("demand");
  const [priceLevel, setPriceLevel] = useState<"low" | "equilibrium" | "high">("equilibrium");

  const totalCards = cards.length;
  const currentCard: Card = cards[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalCards) * 100);

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setSingleFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSingleFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleMiniCard = (idx: number) => {
    setGridFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Can proceed logic
  const isAnsweredQuiz = currentCard.type === "quiz_single" && selectedAnswers[currentCard.id] !== undefined;
  const isAnsweredScenario = currentCard.type === "scenario" && scenarioAnswers[currentCard.id] !== undefined;
  const canProceed = 
    currentCard.type !== "quiz_single" && currentCard.type !== "scenario"
      ? true
      : isAnsweredQuiz || isAnsweredScenario;

  // Render icons for concept cards
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "brain":
        return <Brain className="w-10 h-10 text-stone-800" />;
      case "scale":
        return <Scale className="w-10 h-10 text-stone-800" />;
      case "pizza":
        return <Pizza className="w-10 h-10 text-stone-800" />;
      case "factory":
        return <Factory className="w-10 h-10 text-stone-800" />;
      case "users":
        return <Users className="w-10 h-10 text-stone-800" />;
      case "chart":
        return <LineChart className="w-10 h-10 text-stone-800" />;
      case "handshake":
        return <Handshake className="w-10 h-10 text-stone-800" />;
      case "market":
        return <ShoppingCart className="w-10 h-10 text-stone-800" />;
      default:
        return <Brain className="w-10 h-10 text-stone-800" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* 3D Flip Styles */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Top Bar: Progress & Exit */}
      <div className="w-full max-w-xl mx-auto mb-4">
        <div className="flex items-center justify-between gap-4 mb-2.5">
          <Link
            href="/za-5-minut/uvod"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zpět na mapu</span>
          </Link>
          <span className="text-xs font-bold tracking-wider text-stone-600">
            {currentIndex + 1} / {totalCards}
          </span>
        </div>

        {/* Progress Bar with SFLyellow */}
        <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#f9c710]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Card Viewport */}
      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[440px]"
          >
            {/* CARD TYPE 1: INTRO (s kolečkem "5 min.") */}
            {currentCard.type === "intro" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-6">
                <div className="w-20 h-20 rounded-full bg-[#f9c710] border border-stone-800/10 flex items-center justify-center font-serif font-bold text-stone-950 text-xl shadow-sm mb-6">
                  5 min.
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mb-4 leading-snug">
                  {currentCard.title}
                </h1>
                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-md">
                  {currentCard.text}
                </p>
              </div>
            )}

            {/* CARD TYPE 2: CONCEPT */}
            {currentCard.type === "concept" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
                <div className="w-18 h-18 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mb-6">
                  {renderIcon(currentCard.icon)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mb-4 leading-snug">
                  {currentCard.title}
                </h2>
                <p className="text-stone-700 text-lg sm:text-xl leading-relaxed max-w-md">
                  {currentCard.text}
                </p>
              </div>
            )}

            {/* CARD TYPE 3: FLIP (Single) */}
            {currentCard.type === "flip" && (
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <h2 className="text-xs uppercase tracking-wider text-stone-400 font-semibold text-center mb-4">
                  {currentCard.title}
                </h2>
                <div
                  onClick={() => setSingleFlipped(!singleFlipped)}
                  className="perspective-1000 h-64 w-full cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      singleFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-stone-200 hover:border-[#f9c710] bg-stone-50 p-6 flex flex-col items-center justify-center text-center transition-colors">
                      <span className="text-xs text-stone-400 font-medium flex items-center gap-1 mb-4">
                        <RotateCw className="w-3.5 h-3.5" /> Klepnutím otočíte
                      </span>
                      <h3 className="text-3xl font-bold font-serif text-stone-900">
                        {currentCard.front}
                      </h3>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-[#f9c710] bg-[#FAF7F0] p-6 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-stone-400 font-medium flex items-center gap-1 mb-3">
                        <RotateCw className="w-3.5 h-3.5" /> Zpět
                      </span>
                      <p className="text-lg text-stone-800 leading-relaxed font-medium">
                        {currentCard.back}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CARD TYPE 4: FLIP GRID (Karta 12 - 4 výrobní faktory) */}
            {currentCard.type === "flip_grid" && (
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <h2 className="text-xl font-bold font-serif text-stone-900 text-center mb-1">
                  {currentCard.title}
                </h2>
                <p className="text-xs text-stone-500 text-center mb-4">
                  {currentCard.text}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {currentCard.miniCards?.map((mc, idx) => {
                    const isF = !!gridFlipped[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleMiniCard(idx)}
                        className="perspective-1000 h-32 cursor-pointer select-none"
                      >
                        <div
                          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                            isF ? "rotate-y-180" : ""
                          }`}
                        >
                          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-stone-200 hover:border-[#f9c710] bg-stone-50 p-3 flex flex-col items-center justify-center text-center">
                            <h4 className="text-base font-bold font-serif text-stone-900 mb-1">
                              {mc.front}
                            </h4>
                            <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                              <RotateCw className="w-2.5 h-2.5" /> otočit
                            </span>
                          </div>
                          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-[#f9c710] bg-[#FAF7F0] p-3 flex items-center justify-center text-center">
                            <p className="text-[11px] leading-snug text-stone-800">
                              {mc.back}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CARD TYPE 5: QUIZ SINGLE */}
            {currentCard.type === "quiz_single" && (
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  {currentCard.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-5 leading-snug">
                  {currentCard.question}
                </h3>
                <div className="space-y-3 mb-4">
                  {currentCard.options?.map((opt, idx) => {
                    const selected = selectedAnswers[currentCard.id];
                    const hasAnswered = selected !== undefined;
                    const isSelected = selected === idx;
                    const isCorrect = currentCard.correctIndex === idx;

                    let btnStyle = "border-stone-200 hover:border-stone-300 bg-white text-stone-800";
                    if (hasAnswered) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-medium"
                          : "border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500 font-medium";
                      } else if (isCorrect) {
                        btnStyle = "border-emerald-400 bg-emerald-50/40 text-emerald-900";
                      } else {
                        btnStyle = "border-stone-200 bg-stone-50 opacity-50 text-stone-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!hasAnswered) {
                            setSelectedAnswers((prev) => ({ ...prev, [currentCard.id]: idx }));
                          }
                        }}
                        disabled={hasAnswered}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xs font-semibold text-stone-600 bg-stone-50">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm sm:text-base leading-snug">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Immediate Feedback */}
                {selectedAnswers[currentCard.id] !== undefined && currentCard.explanation && (
                  <div
                    className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                      selectedAnswers[currentCard.id] === currentCard.correctIndex
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {selectedAnswers[currentCard.id] === currentCard.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Správně!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Vysvětlení:</span>
                        </>
                      )}
                    </div>
                    <p>{currentCard.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* CARD TYPE 6: SCENARIO (Kebab a kino) */}
            {currentCard.type === "scenario" && (
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  {currentCard.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-6 leading-snug">
                  {currentCard.text}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {currentCard.options?.map((opt, idx) => {
                    const selected = scenarioAnswers[currentCard.id];
                    const isSelected = selected === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setScenarioAnswers((prev) => ({ ...prev, [currentCard.id]: idx }))}
                        className={`p-5 rounded-2xl border text-center transition-all cursor-pointer font-medium text-base ${
                          isSelected
                            ? "border-[#f9c710] bg-[#f9c710]/20 text-stone-950 ring-2 ring-[#f9c710]"
                            : "border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-800"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {scenarioAnswers[currentCard.id] !== undefined && currentCard.explanation && (
                  <div className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F0] text-sm text-stone-800 leading-relaxed">
                    <span className="font-bold text-stone-900 block mb-1">Náklad obětované příležitosti:</span>
                    {currentCard.explanation}
                  </div>
                )}
              </div>
            )}

            {/* CARD TYPE 7: INTERACTIVE TAP WIDGETS */}
            {currentCard.type === "interactive_tap" && (
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 text-center mb-1 leading-snug">
                  {currentCard.title}
                </h2>
                <p className="text-xs text-stone-500 text-center mb-5">
                  {currentCard.text}
                </p>

                {/* 1. PIZZA MARGINAL UTILITY (Lidské popisky) */}
                {currentCard.interactiveType === "pizza" && (() => {
                  const utilityValues: Record<number, { utility: number; label: string }> = {
                    1: { utility: 100, label: "Největší hlad, chutná úplně nejlíp." },
                    2: { utility: 80, label: "Pořád dobrý, hlad pomalu mizí." },
                    3: { utility: 60, label: "Už jsi docela plný." },
                    4: { utility: 40, label: "Máš dost, ale ještě kousek zvládneš." },
                    5: { utility: 20, label: "Už sotva dojídáš." },
                    6: { utility: 10, label: "Začíná ti být těžko." },
                    7: { utility: 0, label: "Tenhle kousek ti nepřinesl vůbec nic." },
                    8: { utility: -25, label: "Přejedení, už je ti regulérně špatně." },
                  };
                  const current = utilityValues[pizzaPiece];

                  return (
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <button
                            key={num}
                            onClick={() => setPizzaPiece(num)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              pizzaPiece === num
                                ? "bg-[#f9c710] text-stone-950 shadow-sm scale-110"
                                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      {/* Bar Visualization */}
                      <div className="h-16 flex items-center justify-center mb-3">
                        <div className="w-full max-w-xs bg-stone-200 h-6 rounded-full overflow-hidden relative flex items-center">
                          <motion.div
                            className={`h-full ${current.utility < 0 ? "bg-rose-500" : "bg-[#f9c710]"}`}
                            animate={{
                              width: `${Math.max(5, Math.abs(current.utility))}%`,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </div>
                      <p className={`text-sm font-semibold ${current.utility < 0 ? "text-rose-600" : "text-stone-800"}`}>
                        {current.label}
                      </p>
                    </div>
                  );
                })()}

                {/* 2. WORKERS DIMINISHING RETURNS (Bez emojis, lidské popisky) */}
                {currentCard.interactiveType === "workers" && (() => {
                  const workerData: Record<number, { total: number; delta: number; desc: string }> = {
                    1: { total: 10, delta: 10, desc: "1 pracovník: vyrobí 10 kusů." },
                    2: { total: 22, delta: 12, desc: "2 pracovníci: vyrobí 22 kusů (přínos dalších +12 kusů díky rozdělení práce)." },
                    3: { total: 30, delta: 8, desc: "3 pracovníci: vyrobí 30 kusů (přínos +8 kusů)." },
                    4: { total: 35, delta: 5, desc: "4 pracovníci: vyrobí 35 kusů (přínos +5 kusů)." },
                    5: { total: 37, delta: 2, desc: "5 pracovníků: vyrobí 37 kusů (přínos už jen +2 kusy)." },
                    6: { total: 36, delta: -1, desc: "6 pracovníků: vyrobí 36 kusů (ztráta -1 kus, v malé dílně si už jen překážejí)." },
                  };
                  const current = workerData[workerCount];

                  return (
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            onClick={() => setWorkerCount(num)}
                            className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              workerCount === num
                                ? "bg-[#f9c710] text-stone-950 shadow-sm scale-110"
                                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-4 mb-3 text-sm">
                        <div className="bg-white px-3 py-1.5 rounded-xl border border-stone-200">
                          Celková výroba: <strong className="text-stone-900">{current.total} ks</strong>
                        </div>
                        <div className={`px-3 py-1.5 rounded-xl border ${current.delta < 0 ? "bg-rose-50 border-rose-200 text-rose-700 font-bold" : "bg-amber-50 border-amber-200 text-stone-900 font-bold"}`}>
                          Mezní výnos: {current.delta > 0 ? `+${current.delta}` : current.delta}
                        </div>
                      </div>
                      <p className="text-xs text-stone-600">{current.desc}</p>
                    </div>
                  );
                })()}

                {/* 3. PPF (Hranice produkčních možností - bod leží přesně na křivce) */}
                {currentCard.interactiveType === "ppf" && (() => {
                  const points = {
                    A: { cars: 100, grain: 0, text: "Všechny zdroje v průmyslu: 100 aut, 0 tun obilí." },
                    B: { cars: 70, grain: 60, text: "Vyvážená výroba: 70 aut a 60 tun obilí." },
                    C: { cars: 0, grain: 100, text: "Všechny zdroje v zemědělství: 0 aut, 100 tun obilí." },
                  };

                  return (
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        {(["A", "B", "C"] as const).map((pt) => (
                          <button
                            key={pt}
                            onClick={() => setPpfPoint(pt)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              ppfPoint === pt
                                ? "bg-[#f9c710] text-stone-950 shadow-sm"
                                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                            }`}
                          >
                            Bod {pt}
                          </button>
                        ))}
                        <button
                          onClick={() => setPpfTechShift(!ppfTechShift)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            ppfTechShift
                              ? "bg-stone-900 text-stone-100 border-stone-900"
                              : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          Investice do technologií
                        </button>
                      </div>

                      {/* SVG Mini Curve - bod B leží přesně na eliptickém oblouku */}
                      <div className="h-28 flex items-center justify-center mb-2">
                        <svg className="w-56 h-28 overflow-visible" viewBox="0 0 200 100">
                          {/* Axes */}
                          <line x1="25" y1="90" x2="190" y2="90" stroke="#78716C" strokeWidth="1.5" />
                          <line x1="25" y1="90" x2="25" y2="10" stroke="#78716C" strokeWidth="1.5" />
                          {/* Labels */}
                          <text x="180" y="85" fontSize="9" fill="#78716C" textAnchor="end">Obilí</text>
                          <text x="30" y="18" fontSize="9" fill="#78716C">Auta</text>
                          
                          {/* Base Curve: Elliptical arc from (30,20) to (170,90) */}
                          <path d="M 30 20 A 140 70 0 0 1 170 90" fill="none" stroke="#D6D3D1" strokeWidth="2.5" />
                          
                          {/* Tech Shift Curve */}
                          {ppfTechShift && (
                            <path d="M 30 10 A 165 80 0 0 1 195 90" fill="none" stroke="#f9c710" strokeWidth="3" strokeDasharray="4 4" />
                          )}
                          
                          {/* Active points lying exactly on the curve */}
                          {ppfPoint === "A" && <circle cx="30" cy="20" r="5" fill="#f9c710" stroke="#1C1917" strokeWidth="1.5" />}
                          {ppfPoint === "B" && <circle cx="129" cy="40.5" r="5" fill="#f9c710" stroke="#1C1917" strokeWidth="1.5" />}
                          {ppfPoint === "C" && <circle cx="170" cy="90" r="5" fill="#f9c710" stroke="#1C1917" strokeWidth="1.5" />}
                        </svg>
                      </div>

                      <p className="text-xs font-semibold text-stone-800">
                        {points[ppfPoint].text}
                      </p>
                      {ppfTechShift && (
                        <p className="text-[11px] text-[#b48306] font-semibold mt-1">
                          Hospodářský růst: Nová technologie posunula celou křivku dál, vyrobíme víc obou statků.
                        </p>
                      )}
                    </div>
                  );
                })()}

                {/* 4. COMPARATIVE ADVANTAGE (Trade) */}
                {currentCard.interactiveType === "trade" && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={() => setTradeMode("no_trade")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          tradeMode === "no_trade"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Bez obchodu
                      </button>
                      <button
                        onClick={() => setTradeMode("specialization")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          tradeMode === "specialization"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Se specializací a obchodem
                      </button>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs mb-3 space-y-1.5">
                      {tradeMode === "no_trade" ? (
                        <>
                          <div className="flex justify-between text-stone-600">
                            <span>Země A (dělá obojí):</span> <strong>10 vína a 10 sýra</strong>
                          </div>
                          <div className="flex justify-between text-stone-600">
                            <span>Země B (dělá obojí):</span> <strong>5 vína a 5 sýra</strong>
                          </div>
                          <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                            <span>Celková výroba:</span> <span>15 vína a 15 sýra</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-stone-600">
                            <span>Země A (jen sýr):</span> <strong>0 vína a 30 sýra</strong>
                          </div>
                          <div className="flex justify-between text-stone-600">
                            <span>Země B (jen víno):</span> <strong>20 vína a 0 sýra</strong>
                          </div>
                          <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-[#b48306]">
                            <span>Celková výroba:</span> <span>20 vína a 30 sýra (+5 vína, +15 sýra navíc)</span>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-stone-600">
                      {tradeMode === "no_trade"
                        ? "Každá země dělá všechno sama a dohromady mají méně."
                        : "Když se každý věnuje tomu, v čem má výhodu, vydělají na tom oba."}
                    </p>
                  </div>
                )}

                {/* 5. GRAF NABÍDKY A POPTÁVKY (PROČ STOUPÁ / KLESÁ) */}
                {currentCard.interactiveType === "market_curves" && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      <button
                        onClick={() => setMarketTab("demand")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          marketTab === "demand"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Poptávka (klesá)
                      </button>
                      <button
                        onClick={() => setMarketTab("supply")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          marketTab === "supply"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Nabídka (stoupá)
                      </button>
                      <button
                        onClick={() => setMarketTab("equilibrium")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          marketTab === "equilibrium"
                            ? "bg-stone-900 text-white shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Rovnovážný bod
                      </button>
                    </div>

                    {/* SVG Marshall Cross */}
                    <div className="h-32 flex items-center justify-center mb-2">
                      <svg className="w-56 h-32 overflow-visible" viewBox="0 0 200 110">
                        {/* Axes */}
                        <line x1="25" y1="95" x2="190" y2="95" stroke="#78716C" strokeWidth="1.5" />
                        <line x1="25" y1="95" x2="25" y2="10" stroke="#78716C" strokeWidth="1.5" />
                        <text x="180" y="90" fontSize="9" fill="#78716C" textAnchor="end">Množství (Q)</text>
                        <text x="30" y="16" fontSize="9" fill="#78716C">Cena (P)</text>

                        {/* Demand curve (D) */}
                        <line 
                          x1="35" y1="25" x2="165" y2="85" 
                          stroke={marketTab === "demand" ? "#1C1917" : "#A8A29E"} 
                          strokeWidth={marketTab === "demand" ? "3" : "2"} 
                          strokeLinecap="round"
                        />
                        <text x="170" y="88" fontSize="10" fontWeight="bold" fill={marketTab === "demand" ? "#1C1917" : "#A8A29E"}>D</text>

                        {/* Supply curve (S) */}
                        <line 
                          x1="35" y1="85" x2="165" y2="25" 
                          stroke={marketTab === "supply" ? "#f9c710" : "#A8A29E"} 
                          strokeWidth={marketTab === "supply" ? "3.5" : "2"} 
                          strokeLinecap="round"
                        />
                        <text x="170" y="27" fontSize="10" fontWeight="bold" fill={marketTab === "supply" ? "#b48306" : "#A8A29E"}>S</text>

                        {/* Equilibrium Point (E) */}
                        <circle cx="100" cy="55" r={marketTab === "equilibrium" ? "6" : "4"} fill="#f9c710" stroke="#1C1917" strokeWidth="1.5" />
                        <text x="108" y="52" fontSize="9" fontWeight="bold" fill="#1C1917">E</text>
                      </svg>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs text-stone-700 min-h-[44px] flex items-center justify-center">
                      {marketTab === "demand" && (
                        <span>
                          <strong>Poptávka klesá:</strong> Čím je zboží dražší, tím méně lidí si ho koupí. Když zlevní, zájem zákazníků roste.
                        </span>
                      )}
                      {marketTab === "supply" && (
                        <span>
                          <strong>Nabídka stoupá:</strong> Čím vyšší je cena na trhu, tím víc se prodejcům vyplatí zboží vyrobit a dodat.
                        </span>
                      )}
                      {marketTab === "equilibrium" && (
                        <span>
                          <strong>Rovnovážná cena (bod E):</strong> Cena, při které chtějí zákazníci koupit přesně tolik, kolik prodejci nabízejí.
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 6. CO SE STANE PŘI JINÉ CENĚ */}
                {currentCard.interactiveType === "price" && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={() => setPriceLevel("low")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          priceLevel === "low"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Nízká cena
                      </button>
                      <button
                        onClick={() => setPriceLevel("equilibrium")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          priceLevel === "equilibrium"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Rovnovážná cena
                      </button>
                      <button
                        onClick={() => setPriceLevel("high")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          priceLevel === "high"
                            ? "bg-[#f9c710] text-stone-950 shadow-sm"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Vysoká cena
                      </button>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs mb-3">
                      {priceLevel === "low" && (
                        <div className="text-rose-700 font-medium">
                          Poptávka převyšuje nabídku. Na trhu vzniká <strong>nedostatek</strong> a tvoří se fronty.
                        </div>
                      )}
                      {priceLevel === "equilibrium" && (
                        <div className="text-emerald-700 font-medium">
                          Poptávka i nabídka jsou v rovnováze. Trh je <strong>vyčištěný</strong> a zboží plynule obíhá.
                        </div>
                      )}
                      {priceLevel === "high" && (
                        <div className="text-[#b48306] font-medium">
                          Nabídka převyšuje poptávku. Na trhu je <strong>přebytek</strong> a neprodané zboží zůstává na skladě.
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-stone-600">
                      Cenový mechanismus sám tlačí cenu zpátky k rovnováze.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CARD TYPE 8: SUMMARY END */}
            {currentCard.type === "summary_end" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
                <div className="w-18 h-18 rounded-full bg-[#f9c710] flex items-center justify-center text-stone-950 mb-5 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold font-serif text-stone-900 mb-2">
                  {currentCard.title}
                </h2>
                <p className="text-stone-600 text-base leading-relaxed mb-6 max-w-sm">
                  {currentCard.text}
                </p>
                <div className="w-full space-y-2.5 max-w-xs">
                  <Link
                    href="/hry"
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    Vyzkoušet minihry
                  </Link>
                  <Link
                    href="/zakladni-koncepty"
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#f9c710] hover:bg-[#eab308] text-stone-950 text-sm font-semibold transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Číst celou lekci v učebnici
                  </Link>
                  <Link
                    href="/za-5-minut/uvod"
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Zpět na mapu
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Nav Buttons */}
            {currentCard.type !== "summary_end" && (
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 mt-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium transition-colors ${
                    currentIndex === 0
                      ? "opacity-30 cursor-not-allowed text-stone-400 bg-stone-100"
                      : "text-stone-700 bg-white hover:bg-stone-100 cursor-pointer"
                  }`}
                >
                  Zpět
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`px-7 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    !canProceed
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                      : "bg-[#f9c710] hover:bg-[#eab308] text-stone-950 cursor-pointer hover:shadow"
                  }`}
                >
                  {currentIndex === 0 ? "Začít" : "Pokračovat"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
