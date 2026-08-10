"use client";
import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

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
    chapter: "Penize a bankovnictví",
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
  const [mascotMessage, setMascotMessage] = useState("");
  
  const [showMascot, setShowMascot] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  // ZDE PŘIDÁVÁME STAV PRO ZASOUVÁNÍ
  const [isExpanded, setIsExpanded] = useState(true);
  
  const maxReachedIndex = useRef(-1);
  const mascotTimerRef = useRef<NodeJS.Timeout | null>(null);

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
          setShowMascot(false); 
          setShowBubble(false);
        } 
        else {
          if (currentIndex > maxReachedIndex.current) {
            maxReachedIndex.current = currentIndex;
          }

          if (mascotTimerRef.current) clearTimeout(mascotTimerRef.current);

          setShowMascot(false);
          setShowBubble(false);

          setTimeout(() => {
            const currentPhrases = SUBCHAPTER_PHRASES[pathname] || [
              "Skvělá práce! Pokračuj v objevování ekonomie.",
              "Nová podkapitola, nové vědomosti! Jdeme na to."
            ];
            
            const randomPhrase = currentPhrases[Math.floor(Math.random() * currentPhrases.length)];
            setMascotMessage(randomPhrase);
            
            setShowMascot(true);
            setShowBubble(true);
            
            mascotTimerRef.current = setTimeout(() => {
              setShowBubble(false); 
              setShowMascot(false); 
            }, 4000);
          }, 150); 
        }
      }
    }

    return () => {
      if (mascotTimerRef.current) clearTimeout(mascotTimerRef.current);
    };
  }, [pathname]);

  const fireBigConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#a855f7', '#eab308', '#ec4899'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#a855f7', '#eab308', '#ec4899'] });
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star size={40} className="text-purple-600 fill-purple-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Skvělá práce!</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Právě jste úspěšně zdolali veškerou teorii z kapitoly <br/>
              <span className="font-bold text-slate-800">{currentChapName}</span>. 
              <br/><br/>
              Nyní je čas ověřit vaše znalosti.
            </p>
            <button 
              onClick={() => setShowTestModal(false)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-2"
            >
              Spustit test <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* 2. VYSKAKOVACÍ MASKOT A TEXTOVÁ BUBLINA 
      <div 
        className={`fixed right-8 z-[90] flex items-end gap-4 pointer-events-none transition-all duration-500 ease-in-out
        ${isExpanded ? 'bottom-[130px]' : 'bottom-16'}`}
      >
        <div 
          className={`mb-10 max-w-[220px] transition-opacity duration-300 ease-in-out
          ${showBubble ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border border-slate-100 rounded-br-none transition-transform duration-300 ease-out">
            <p className="font-bold text-slate-800 text-sm leading-snug">{mascotMessage}</p>
          </div>
        </div>
        
        <div 
          className={`relative w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden shrink-0 transition-transform duration-700 ease-in-out
          ${showMascot ? 'translate-y-0' : 'translate-y-[150%]'}`}
        >
           <Image 
             src="/maskot.png" 
             alt="Maskot učebnice" 
             fill 
             className="object-cover" 
           />
        </div>
      </div>
      */}
      {/* 3. PROGRESS BAR SPODEK S MOŽNOSTÍ ZASUNUTÍ */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-50 flex flex-col items-center transition-transform duration-500 ease-in-out
        ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-36px)]'}`}
      >
        
        {/* ZÁLOŽKA / TLAČÍTKO PRO VYSUNUTÍ/ZASUNUTÍ */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-[36px] bg-white border border-slate-200 border-b-0 px-6 rounded-t-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.05)] cursor-pointer"
        >
          {isExpanded ? (
            <><ChevronDown size={14} strokeWidth={3} /> Skrýt postup</>
          ) : (
            <><ChevronUp size={14} strokeWidth={3} /> Zobrazit postup</>
          )}
        </button>

        {/* SAMOTNÝ BÍLÝ PANEL */}
        <div className="w-full bg-white border-t border-slate-200 px-4 py-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative">
          <div className="max-w-4xl mx-auto flex flex-col gap-2 relative">
            
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest absolute -top-6 w-full">
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" /> Váš postup
              </span>
              <span className="translate-x-12 translate-y-6 text-green-600">{Math.round(progress)} %</span>
            </div>

            <div className="relative h-4 w-full">
              
              <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="absolute inset-0 flex pointer-events-none">
                {CURRICULUM.map((chap, chapIdx) => {
                  const chapWidth = (chap.paths.length / ALL_PATHS.length) * 100;
                  const endOfChapterIndex = ALL_PATHS.indexOf(chap.paths[chap.paths.length - 1]);
                  const isReached = currentIndex >= endOfChapterIndex;
                  
                  return (
                    <div key={chap.chapter} className="h-full flex border-r-2 border-white/60 last:border-r-0 relative" style={{ width: `${chapWidth}%` }}>
                      
                      {chap.paths.map((_, pathIdx) => (
                        <div key={pathIdx} className="h-full border-r border-white/30 last:border-r-0" style={{ width: `${100 / chap.paths.length}%` }} />
                      ))}
                      
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-white rounded-full border-2 flex items-center justify-center z-10 hidden md:flex shadow-sm transition-colors ${isReached ? 'border-green-500' : 'border-slate-300'}`}>
                        <Star size={12} className={isReached ? 'text-green-600 fill-green-600' : 'text-slate-300 fill-slate-300'} />
                        
                        <span 
                          className={`absolute left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-center w-max leading-tight transition-colors
                          ${chapIdx % 2 === 0 ? 'bottom-full mb-2' : 'top-full mt-2'}
                          ${isReached ? 'text-green-600' : 'text-slate-400'}`}
                        >
                          {chap.chapter.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i !== chap.chapter.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </span>
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