"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    question: "Co je hlavním předmětem zkoumání ekonomie?",
    options: [
      "Jak vydělat co nejvíce peněz na burze cenných papírů.",
      "Jak lidé a společnost rozhodují o alokaci vzácných zdrojů k uspokojení potřeb.",
      "Jak centrální banka tiskne peníze a stát vybírá daně.",
      "Pouze účetnictví velkých nadnárodních korporací."
    ],
    correct: 1,
    explanation: "Ekonomie je společenská věda o lidském jednání a rozhodování v podmínkách vzácnosti zdrojů."
  },
  {
    id: 2,
    question: "Co znamená předpoklad 'ceteris paribus'?",
    options: [
      "Člověk se vždy chová zcela racionálně.",
      "Cena zboží se rovná jeho meznímu užitku.",
      "Za jinak nezměněných podmínek (všechny ostatní proměnné zůstávají konstantní).",
      "Trh vždy směřuje k okamžité rovnováze."
    ],
    correct: 2,
    explanation: "Ceteris paribus umožňuje ekonomům zkoumat vliv jedné proměnné na druhou s tím, že ostatní vlivy jsou zafixovány."
  },
  {
    id: 3,
    question: "Které tvrzení je příkladem NORMATIVNÍ ekonomie?",
    options: [
      "Míra inflace v minulém roce dosáhla 2,5 %.",
      "Zvýšení minimální mzdy může zvýšit nezaměstnanost mladých lidí.",
      "Vláda by měla zavést daň na slazené nápoje, aby chránila zdraví občanů.",
      "S růstem ceny klesá poptávané množství daného statku."
    ],
    correct: 2,
    explanation: "Normativní ekonomie obsahuje hodnotové soudy ('měla by') a doporučení, nikoli pouhý objektivní popis faktů ('co je')."
  },
  {
    id: 4,
    question: "Který z následujících statků je typickým ČISTÝM VEŘEJNÝM STATKEM?",
    options: [
      "Dálnice s mýtnou bránou.",
      "Obrana státu (armáda) a veřejné osvětlení.",
      "Šálek kávy v kavárně.",
      "Osobní automobil."
    ],
    correct: 1,
    explanation: "Veřejné statky jsou nevylučitelné ze spotřeby a nerivalitní (spotřeba jedné osoby neomezuje spotřebu ostatních)."
  },
  {
    id: 5,
    question: "Co říká zákon klesajícího mezního užitku (MU)?",
    options: [
      "S každou další spotřebovanou jednotkou statku celkový užitek klesá k nule.",
      "Dodatečné uspokojení z každé další spotřebované jednotky statku postupně klesá.",
      "Cena zboží na trhu s časem vždy klesá.",
      "Mezní užitek je u všech lidí na světě naprosto stejný."
    ],
    correct: 1,
    explanation: "Zákon klesajícího mezního užitku vysvětluje, proč je pro nás např. první sklenice vody na poušti cennější než ta desátá."
  },
  {
    id: 6,
    question: "Co je odměnou (důchodem) za poskytnutí výrobního faktoru KAPITÁL?",
    options: [
      "Mzda",
      "Pozemková renta",
      "Úrok (nebo zisk)",
      "Dividenda z půdy"
    ],
    correct: 2,
    explanation: "Práci náleží mzda, půdě pozemková renta, kapitálu úrok a podnikavosti zisk."
  },
  {
    id: 7,
    question: "Pokud se ekonomika nachází v bodě UVNITŘ (pod) křivkou PPF, znamená to, že:",
    options: [
      "Využívá všechny dostupné technologie a zdroje na 100 %.",
      "Dosahuje kombinace, která je za současných podmínek nemožná.",
      "Vyrábí neefektivně – má nevyužité výrobní kapacity nebo nezaměstnanost.",
      "Obchoduje s jinými státy na základě komparativní výhody."
    ],
    correct: 2,
    explanation: "Body uvnitř křivky PPF značí neefektivitu a plýtvání zdroji. Efektivní body leží přímo na křivce."
  },
  {
    id: 8,
    question: "Kdy má země KOMPARATIVNÍ výhodu ve výrobě piva?",
    options: [
      "Pokud vyrobí absolutně nejvíce hektolitrů piva na světě.",
      "Pokud má nižší náklady obětované příležitosti na výrobu piva než ostatní země.",
      "Pokud má nejnižší platy v pivovarech.",
      "Pokud pivo vůbec nedováží ze zahraničí."
    ],
    correct: 1,
    explanation: "Komparativní výhoda je založena výhradně na nižších alternativních nákladech (obětování menšího množství jiných statků)."
  },
  {
    id: 9,
    question: "Co se stane na trhu s kávou, pokud prudce vzroste cena ČAJE (substitutu kávy)?",
    options: [
      "Poptávka po kávě klesne (křivka D se posune doleva).",
      "Poptávka po kávě vzroste (křivka D se posune doprava).",
      "Nabídka kávy se posune doprava.",
      "Dojde pouze k posunu po nabídkové křivce kávy dolů."
    ],
    correct: 1,
    explanation: "Při zdražení čaje lidé přejdou k relativně levnější kávě – poptávka po kávě vzroste a posune se doprava."
  },
  {
    id: 10,
    question: "Pokud stát stanoví maximální cenu chleba hluboko POD rovnovážnou tržní cenou, jaký bude důsledek?",
    options: [
      "Vznikne přebytek chleba na trhu a pekaři ho nebudou mít komu prodat.",
      "Trh dosáhne dokonalé rovnováhy bez zásahu.",
      "Vznikne nedostatek chleba (fronty, černý trh), protože poptávané množství převýší nabízené.",
      "Pekaři začnou péct více chleba, aby ztrátu dohnali."
    ],
    correct: 2,
    explanation: "Při uměle nízké ceně chtějí lidé kupovat hodně, ale pekařům se nevyplatí péct – poptávka převýší nabídku a vznikne nedostatek."
  }
];

export default function ZakladniKonceptyTest() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const currentQ = QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleConfirmAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCurrentStep('results');
      triggerConfetti();
    }
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsAnswerSubmitted(false);
    setCurrentStep('quiz');
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C2410C', '#292524', '#D97706']
    });
  };

  return (
    <div className="max-w-3xl mx-auto pb-24 pt-6">
      {/* Navigace zpět */}
      <Link 
        href="/zakladni-koncepty" 
        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors mb-8 group font-sans"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Zpět na přehled kapitoly
      </Link>

      {/* --- 1. ÚVODNÍ OBRAZOVKA TESTU --- */}
      {currentStep === 'intro' && (
        <div className="bg-[#FDFCF9] border border-stone-300 rounded-xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-stone-100 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-700">
            <Award size={32} />
          </div>

          <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-widest block mb-2">
            Závěrečné ověření
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
            Závěrečný test: Základní koncepty
          </h1>
          
          <p className="text-stone-600 text-base max-w-xl mx-auto leading-relaxed mb-8 font-sans">
            Vyzkoušejte si své znalosti ze všech 7 podkapitol. Test obsahuje 10 otázek pokrývajících teorii vzácnosti, výrobních faktorů, PPF, komparativní výhody a nabídky s poptávkou.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left font-sans">
            <div className="bg-[#F7F4EE] p-4 rounded-lg border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Počet otázek</span>
              <span className="text-xl font-bold text-stone-900">10 úkolů</span>
            </div>
            <div className="bg-[#F7F4EE] p-4 rounded-lg border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Doporučený čas</span>
              <span className="text-xl font-bold text-stone-900">8–10 min</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep('quiz')}
            className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-sm active:scale-95 inline-flex items-center gap-2"
          >
            Spustit test <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* --- 2. PRŮBĚH TESTU --- */}
      {currentStep === 'quiz' && (
        <div>
          {/* Horní progress lišta */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 font-sans">
              <span>Otázka {currentQuestionIdx + 1} z {QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestionIdx + 1) / QUESTIONS.length) * 100)} % hotovo</span>
            </div>
            <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-700 transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Karta otázky */}
          <div className="bg-[#FDFCF9] border border-stone-300 rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mb-6 leading-snug">
              {currentQ.question}
            </h2>

            {/* Seznam možností */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                const isCorrect = optIdx === currentQ.correct;

                let btnStyle = "border-stone-300 bg-white hover:border-stone-500 hover:bg-stone-50 text-stone-800";

                if (isSelected && !isAnswerSubmitted) {
                  btnStyle = "border-stone-900 bg-stone-100 text-stone-900 font-bold ring-1 ring-stone-900";
                }

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-700/40";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "border-rose-700 bg-rose-50 text-rose-950 font-medium";
                  } else {
                    btnStyle = "border-stone-200 bg-stone-50 text-stone-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-lg border transition-all text-sm flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span className="leading-relaxed font-sans">{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-rose-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Vysvětlení po odevzdání */}
            {isAnswerSubmitted && (
              <div className="p-4 bg-[#F5F2EB] border border-stone-300 rounded-lg text-sm text-stone-800 leading-relaxed mb-6">
                <strong className="font-serif font-bold text-stone-900 block mb-1">
                  {selectedAnswers[currentQuestionIdx] === currentQ.correct ? "Výborně, správná odpověď!" : "Bohužel, toto není správně."}
                </strong>
                {currentQ.explanation}
              </div>
            )}

            {/* Ovládací tlačítko */}
            <div className="flex justify-end pt-4 border-t border-stone-200">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedAnswers[currentQuestionIdx] === undefined}
                  className="px-6 py-2.5 bg-stone-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                >
                  Potvrdit odpověď
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-orange-700 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-orange-800 transition-all shadow-sm active:scale-95 flex items-center gap-2"
                >
                  {currentQuestionIdx < QUESTIONS.length - 1 ? "Další otázka" : "Zobrazit výsledky"} <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- 3. VÝSLEDKY TESTU --- */}
      {currentStep === 'results' && (
        <div className="bg-[#FDFCF9] border border-stone-300 rounded-xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-stone-100 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900">
            <Award size={32} />
          </div>

          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Test dokončen!</h2>
          <p className="text-stone-600 text-sm mb-6 font-sans">
            Zde je vaše celkové vyhodnocení z kapitoly Základní ekonomické koncepty:
          </p>

          <div className="inline-block bg-[#F7F4EE] border border-stone-300 rounded-xl px-8 py-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1 font-sans">Vaše skóre</span>
            <div className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
              {calculateScore()} <span className="text-2xl text-stone-400">/ {QUESTIONS.length}</span>
            </div>
            <span className="text-xs font-bold text-stone-600 mt-2 block font-sans">
              Úspěšnost: {Math.round((calculateScore() / QUESTIONS.length) * 100)} %
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-stone-300 text-stone-800 font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-stone-50 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw size={15} /> Zkusit test znovu
            </button>
            <Link
              href="/mikroekonomie"
              className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              Pokračovat na Mikroekonomii <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}