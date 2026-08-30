"use client";
import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ChevronDown, ChevronUp, Award } from 'lucide-react';

const SHOW_MASCOT = false;
const CURRICULUM = [
  {
    chapter: "Základní koncepty",
    paths: [
      "/zakladni-koncepty/uvod-ekonomie",
      "/zakladni-koncepty/metodologie",
      "/zakladni-koncepty/statek-vzacnost-uzitek-hodnota",
      "/zakladni-koncepty/vyrobni-faktory",
      "/zakladni-koncepty/hranice-produkcnich-moznosti",
      "/zakladni-koncepty/komparativni-absolutni-vyhoda",
      "/zakladni-koncepty/nabidka-poptavka",
      "/zakladni-koncepty/test"
    ]
  },
  {
    chapter: "Mikroekonomie",
    paths: [
      "/mikroekonomie/trzni-sily-a-ceny",
      "/mikroekonomie/elasticita-trhu",
      "/mikroekonomie/chovani-spotrebitele",
      "/mikroekonomie/chovani-vyrobce",
      "/mikroekonomie/trzni-struktury",
      "/mikroekonomie/teorie-her",
      "/mikroekonomie/faktory-a-selhani",
      "/mikroekonomie/test"
    ]
  },
  {
    chapter: "Makroekonomie",
    paths: [
      "/makroekonomie/ukazatele-ekonomiky",
      "/makroekonomie/agregatni-poptavka-a-nabidka",
      "/makroekonomie/hospodarsky-rust-a-cyklus",
      "/makroekonomie/nezamestnanost",
      "/makroekonomie/inflace",
      "/makroekonomie/fiskalni-politika",
      "/makroekonomie/test"
    ]
  },
  {
    chapter: "Peníze a bankovnictví",
    paths: [
      "/penize-a-bankovnictvi/podstata-penez-funkce-a-vyvoj",
      "/penize-a-bankovnictvi/bankovni-system-a-tvorba-penez",
      "/penize-a-bankovnictvi/trh-penez-urok-a-kapital",
      "/penize-a-bankovnictvi/centralni-bankovnictvi-a-monetarni-politika",
      "/penize-a-bankovnictvi/menovy-kurz",
      "/penize-a-bankovnictvi/bitcoin-fiat-a-zlaty-standard",
      "/penize-a-bankovnictvi/test"
    ]
  },
  {
    chapter: "Stručné dějiny\nekonomického myšlení",
    paths: [
      "/dejiny-ekonomickeho-mysleni/uvod",
      "/dejiny-ekonomickeho-mysleni/klasicke-teorie",
      "/dejiny-ekonomickeho-mysleni/keysianstvi",
      "/dejiny-ekonomickeho-mysleni/neklasicka-mikroekonomie"
    ]
  }
];

const ALL_PATHS = CURRICULUM.flatMap(c => c.paths);

const SUBCHAPTER_PHRASES: Record<string, string[]> = {
  "/zakladni-koncepty/uvod-ekonomie": [
    "Vítej v učebnici! Pojďme odhalit tajemství trhu.",
    "První krok do světa ekonomického myšlení!",
    "Začínáme! Tady položíme základy všeho."
  ],
  "/zakladni-koncepty/metodologie": [
    "Metodologie! Naučíš se myslet jako skutečný ekonom.",
    "Modely nejsou realita, ale pomáhají nám ji pochopit.",
    "Pozor na záměnu korelace a kauzality!"
  ],
  "/zakladni-koncepty/statek-vzacnost-uzitek-hodnota": [
    "Zdroje jsou omezené, ale naše touhy nekonečné!",
    "Užitek je čistě subjektivní záležitost.",
    "Vzácnost vládne světu – pamatuj na to!"
  ],
  "/zakladni-koncepty/vyrobni-faktory": [
    "Práce, půda, kapitál... Svatá trojice ekonomie!",
    "Lidský kapitál je tvoje největší bohatství.",
    "Bez výrobních faktorů nevyrobíme ani rohlík."
  ],
  "/zakladni-koncepty/hranice-produkcnich-moznosti": [
    "Křivka PPF ti ukáže realitu našich technologických limitů.",
    "Posun nad křivku? Jedině s lepším strojem nebo nápadem!",
    "Každá volba na křivce PPF něco stojí."
  ],
  "/zakladni-koncepty/komparativni-absolutni-vyhoda": [
    "David Ricardo měl pravdu: specializace zachraňuje bohatství!",
    "Obchod není válka. Správný obchod pomáhá oběma stranám.",
    "Najdi svou komparativní výhodu a v té se zdokonaluj!"
  ],
  "/zakladni-koncepty/nabidka-poptavka": [
    "A je to tady! Legendární Marshallův tržní kříž.",
    "Poptávka klesá, nabídka roste... Kde se potkají?",
    "Neviditelná ruka trhu právě začíná úřadovat!"
  ],
  "/mikroekonomie/trzni-sily-a-ceny": [
    "Ceny jsou Hayekovy informační majáky!",
    "Žádný centrální plánovač nespočítá to, co tržní cena.",
    "Cenový systém koordinuje miliony lidí bez příkazů."
  ],
  "/mikroekonomie/elasticita-trhu": [
    "Jak moc zákazníci prásknou dveřmi při zdražení? To měří elasticita!",
    "Závislí na inzulínu cenu neřeší – poptávka je dokonale nepružná.",
    "Elasticita ti řekne, jestli ti zdražení zvýší celkové příjmy."
  ],
  "/mikroekonomie/chovani-spotrebitele": [
    "Indiferenční křivky ti ukážou preference tvého vnitřního já.",
    "Rozpočtové omezení – krutá linie, přes kterou tě peněženka nepustí.",
    "Maximalizujeme užitek, dokud nám stačí koruny!"
  ],
  "/mikroekonomie/chovani-vyrobce": [
    "Mezní produkt dřív nebo později klesne, s tím nic neuděláš.",
    "Krátké vs. dlouhé období – fixní náklady v LR neexistují!",
    "Zlaté pravidlo firmy: Mezní příjmy se musí rovnat mezním nákladům."
  ],
  "/mikroekonomie/trzni-struktury": [
    "Dokonalá konkurence je krásná teorie, ale reálný svět je plný oligopolů.",
    "Monopol určuje cenu, ale stále naráží na poptávku spotřebitelů.",
    "Diferenciace produktu – proč věříme, že jedna značka je lepší než druhá?"
  ],
  "/mikroekonomie/teorie-her": [
    "Vězňovo dilema ukazuje, proč je těžké si důvěřovat.",
    "Hledáme Nashovu rovnováhu. Bod, ze kterého nikdo nechce uhnout.",
    "Strategické myšlení zapnuto na maximum!"
  ],
  "/mikroekonomie/faktory-a-selhani": [
    "Když trh nevidí kouř z továrny – vítej v kapitole o externalitách.",
    "Veřejné statky: Každý je chce, ale nikdo za ně nechce platit.",
    "Asymetrie informací aneb proč je těžké koupit ojeté auto bez rizika."
  ]
};

export default function TextbookProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  
  const [showTestModal, setShowTestModal] = useState(false);
  const [currentChapName, setCurrentChapName] = useState("");
  
  const [isExpanded, setIsExpanded] = useState(true);
  
  const maxReachedIndex = useRef(-1);

  useEffect(() => {
    const currentIndex = ALL_PATHS.indexOf(pathname);
    
    if (currentIndex !== -1) {
      const currentProgress = ((currentIndex + 1) / ALL_PATHS.length) * 100;
      setProgress(currentProgress);

      const currentChapter = CURRICULUM.find(c => c.paths.includes(pathname));

      if (currentChapter) {
        const isTestPage = currentChapter.paths[currentChapter.paths.length - 1] === pathname;

        if (isTestPage) {
          if (currentIndex > maxReachedIndex.current) {
            maxReachedIndex.current = currentIndex;
            setCurrentChapName(currentChapter.chapter.replace('\n', ' '));
            setShowTestModal(true);
            fireBigConfetti();
          }
        } else {
          if (currentIndex > maxReachedIndex.current) {
            maxReachedIndex.current = currentIndex;
          }
        }
      }
    }
  }, [pathname]);

  const fireBigConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#C2410C', '#292524', '#D97706'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#C2410C', '#292524', '#D97706'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  if (!ALL_PATHS.includes(pathname)) return null;
  const currentIndex = ALL_PATHS.indexOf(pathname);

  return (
    <>
      {/* 1. POPUP PŘED TESTEM */}
      {showTestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 p-4">
          <div className="bg-[#FDFCF9] rounded-xl p-8 max-w-md w-full shadow-xl border border-stone-300 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-stone-100 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-5 text-stone-800">
              <Award size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Výborně!</h2>
            <p className="text-stone-600 mb-6 text-sm leading-relaxed font-sans">
              Úspěšně jste prošli celou teorii z kapitoly <br/>
              <span className="font-bold text-stone-900 font-serif text-base">{currentChapName}</span>. 
              <br/><br/>
              Nyní je čas ověřit vaše znalosti v závěrečném testu.
            </p>
            <button 
              onClick={() => setShowTestModal(false)}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              Spustit test <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 2. PROGRESS BAR SPODEK */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-40 flex flex-col items-center transition-transform duration-300 ease-in-out
        ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-32px)]'}`}
      >
        
        {/* ZÁLOŽKA PRO VYSUNUTÍ/ZASUNUTÍ */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-[32px] bg-[#F7F4EE] border border-stone-300 border-b-0 px-5 rounded-t-lg text-[10px] font-black uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          {isExpanded ? (
            <><ChevronDown size={14} /> Skrýt postup</>
          ) : (
            <><ChevronUp size={14} /> Zobrazit postup</>
          )}
        </button>

        {/* SAMOTNÝ PANEL */}
        <div className="w-full bg-[#FDFCF9] border-t border-stone-300 px-6 py-6 shadow-sm relative">
          <div className="max-w-4xl mx-auto flex flex-col gap-2 relative">
            
            <div className="flex justify-between items-center text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 w-full font-sans">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-700" /> Průběh učebnicí
              </span>
              <span className="text-stone-900 font-bold">{Math.round(progress)} % hotovo</span>
            </div>

            <div className="relative h-3 w-full">
              
              <div className="absolute inset-0 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
                <div 
                  className="absolute top-0 left-0 h-full bg-stone-800 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="absolute inset-0 flex pointer-events-none">
                {CURRICULUM.map((chap, chapIdx) => {
                  const chapWidth = (chap.paths.length / ALL_PATHS.length) * 100;
                  const endOfChapterIndex = ALL_PATHS.indexOf(chap.paths[chap.paths.length - 1]);
                  const isReached = currentIndex >= endOfChapterIndex;
                  
                  return (
                    <div key={chap.chapter} className="h-full flex border-r border-stone-300 last:border-r-0 relative" style={{ width: `${chapWidth}%` }}>
                      
                      {chap.paths.map((_, pathIdx) => (
                        <div key={pathIdx} className="h-full border-r border-stone-300/40 last:border-r-0" style={{ width: `${100 / chap.paths.length}%` }} />
                      ))}
                      
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white rounded-full border flex items-center justify-center z-10 hidden md:flex shadow-xs transition-colors ${isReached ? 'border-emerald-700 text-emerald-700' : 'border-stone-400 text-stone-400'}`}>
                        <Star size={10} className={isReached ? 'fill-emerald-700' : 'fill-stone-200'} />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}