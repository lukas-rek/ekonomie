"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  RotateCw, 
  Search
} from "lucide-react";

interface Flashcard {
  id: string;
  term: string;
  enTerm?: string;
  definition: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: "vzacnost",
    term: "Vzácnost",
    enTerm: "Scarcity",
    definition: "Stav, kdy jsou lidské potřeby a touhy v podstatě neomezené, zatímco dostupné zdroje (čas, suroviny, práce) jsou konečné. Vzácnost je ústředním problémem ekonomie a nutí nás neustále volit mezi alternativami.",
  },
  {
    id: "naklady-prilezitosti",
    term: "Náklady obětované příležitosti",
    enTerm: "Opportunity Cost",
    definition: "Hodnota nejlepší alternativní volby, které se musíte vzdát, když se rozhodnete pro určitou akci. Nejde nutně o peněžní výdaj, ale o obětovaný užitek z druhé nejlepší možné varianty.",
  },
  {
    id: "ceteris-paribus",
    term: "Ceteris paribus",
    enTerm: "All other things being equal",
    definition: "Latinský metodický princip znamenající „za jinak stejných podmínek“. Umožňuje izolovat a zkoumat vliv jedné konkrétní proměnné (např. nárůstu ceny) s předpokladem, že všechny ostatní faktory zůstávají neměnné.",
  },
  {
    id: "homo-economicus",
    term: "Homo economicus",
    enTerm: "Economic Human",
    definition: "Teoretický model racionálního člověka, který jedná cílevědomě ve vlastním zájmu, vyhodnocuje dostupné informace, porovnává přínosy s náklady a usiluje o maximalizaci svého osobního užitku či zisku.",
  },
  {
    id: "mezni-uzitek",
    term: "Mezní užitek (MU)",
    enTerm: "Marginal Utility",
    definition: "Dodatečné uspokojení či prospěch, který spotřebitel získá spotřebou jedné další jednotky daného statku. Podle zákona klesajícího mezního užitku každá další jednotka přináší menší uspokojení než ta předchozí.",
  },
  {
    id: "ppf",
    term: "Hranice produkčních možností (PPF)",
    enTerm: "Production Possibility Frontier",
    definition: "Grafický model znázorňující všechny maximálně dosažitelné kombinace dvou statků, které ekonomika dokáže vyrobit při plném a efektivním využití všech dostupných zdrojů a existující technologie.",
  },
  {
    id: "pobidky",
    term: "Ekonomické pobídky",
    enTerm: "Incentives",
    definition: "Odměny, sankce nebo signály (jako změna cen, dotace, pokuty), které mění relativní náklady a výnosy a tím motivují lidi upravit své jednání. Racionální aktéři na pobídky přirozeně reagují.",
  },
  {
    id: "komparativni-vyhoda",
    term: "Komparativní výhoda",
    enTerm: "Comparative Advantage",
    definition: "Schopnost jednotlivce nebo země vyrábět určitý statek s relativně nižšími náklady obětované příležitosti než ostatní. Je hlavním ekonomickým argumentem pro specializaci a vzájemný dobrovolný obchod.",
  },
  {
    id: "vyrobni-faktory",
    term: "Výrobní faktory",
    enTerm: "Factors of Production",
    definition: "Čtyři základní vstupy nezbytné k produkci statků a služeb: půda (přírodní zdroje), práce (lidská činnost a čas), kapitál (stroje, nástroje, budovy) a podnikavost (schopnost inovovat a nést riziko).",
  },
  {
    id: "statky",
    term: "Volný vs. vzácný statek",
    enTerm: "Free vs. Economic Good",
    definition: "Volný statek existuje v takovém množství, že je volně dostupný bez nutnosti vynaložit úsilí (např. vzduch). Vzácný (ekonomický) statek je omezený a k jeho získání či výrobě je nutné obětovat vzácné zdroje.",
  },
  {
    id: "pozitivni-normativni",
    term: "Pozitivní vs. normativní ekonomie",
    enTerm: "Positive vs. Normative Economics",
    definition: "Pozitivní ekonomie popisuje svět takový, jaký objektivně je, a formuluje ověřitelná tvrzení. Normativní ekonomie obsahuje hodnotové soudy a doporučení o tom, jaký by svět měl být.",
  },
  {
    id: "klesajici-vynosy",
    term: "Zákon klesajících mezních výnosů",
    enTerm: "Law of Diminishing Returns",
    definition: "Ekonomický princip říkající, že pokud postupně přidáváme variabilní vstup (např. počet pracovníků) k fixnímu množství ostatních vstupů (např. jedna dílna), dodatečný přírůstek produkce od určitého bodu začne klesat.",
  },
];

export default function PojmyPage() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"terms" | "definitions">("terms");

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flipAll = (state: boolean) => {
    const updated: Record<string, boolean> = {};
    FLASHCARDS.forEach((card) => {
      updated[card.id] = state;
    });
    setFlippedCards(updated);
    setActiveMode(state ? "definitions" : "terms");
  };

  const filteredCards = FLASHCARDS.filter((card) => {
    const query = searchQuery.toLowerCase();
    return (
      card.term.toLowerCase().includes(query) ||
      (card.enTerm && card.enTerm.toLowerCase().includes(query)) ||
      card.definition.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20 pt-6 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-6xl mx-auto">
        {/* Top Navigation: Zpět na mindmapu */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/za-5-minut/uvod"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Zpět na mindmapu (Za 5 minut)</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-stone-900 mb-3">
            Pojmy ze základních konceptů
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Klikněte na libovolnou kartičku pro její otočení. Zopakujte si klíčové ekonomické pojmy a jejich přesné definice.
          </p>
        </div>

        {/* Controls: Search, Filter (Vše), Mode Toggles (Pojmy / Definice) */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat pojem nebo definici..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c710]/40 focus:border-[#f9c710] transition-all text-stone-900 placeholder:text-stone-400"
              />
            </div>

            {/* Category Filter: Jen Vše (ve žluté SFLyellow) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#f9c710] text-stone-950 shadow-sm cursor-default"
              >
                Vše
              </button>
            </div>

            {/* Pojmy / Definice Toggle (s aktivním žlutým vybarvením) */}
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => flipAll(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === "terms"
                    ? "bg-[#f9c710] text-stone-950 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Pojmy
              </button>
              <button
                type="button"
                onClick={() => flipAll(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMode === "definitions"
                    ? "bg-[#f9c710] text-stone-950 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Definice
              </button>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-base">Žádný pojem neodpovídá vašemu vyhledávání.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => {
              const isFlipped = !!flippedCards[card.id];

              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className="perspective-1000 h-64 cursor-pointer group select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleCard(card.id);
                    }
                  }}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of Card (Pojem) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#f9c710] transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-end mb-4">
                          <span className="text-xs text-stone-400 font-medium flex items-center gap-1 group-hover:text-stone-700 transition-colors">
                            <RotateCw className="w-3 h-3 transition-transform group-hover:rotate-45" />
                            Otočit
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold font-serif text-stone-900 tracking-tight mb-1">
                          {card.term}
                        </h3>
                        {card.enTerm && (
                          <p className="text-xs font-medium text-stone-400 italic">
                            {card.enTerm}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-stone-100 text-right text-xs text-stone-400">
                        <span>Klikněte pro definici →</span>
                      </div>
                    </div>

                    {/* Back of Card (Definice - bez žlutého pozadí, jen text v tmavším odstínu žluté) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-stone-200 bg-[#FAF7F0] p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          {/* Pojem bez pozadí, v tmavším odstínu žluté dle zadání */}
                          <span className="text-sm font-serif font-bold text-[#b48306] tracking-tight">
                            {card.term}
                          </span>
                          <span className="text-xs text-stone-400 flex items-center gap-1">
                            <RotateCw className="w-3 h-3" />
                            Zpět
                          </span>
                        </div>

                        <p className="text-sm sm:text-base leading-relaxed text-stone-800 font-normal">
                          {card.definition}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-200/60 text-right text-xs text-stone-400">
                        <span>← Klikněte pro návrat</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold font-serif text-stone-900 mb-1">
              Cítíte se v pojmech jistí?
            </h4>
            <p className="text-sm text-stone-600">
              Otestujte své porozumění v 5minutové interaktivní lekci se scénářem nákladů příležitosti.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/za-5-minut/zakladni-koncepty"
              className="px-5 py-2.5 rounded-xl bg-[#f9c710] hover:bg-[#eab308] text-stone-950 font-semibold text-sm transition-colors shadow-sm cursor-pointer"
            >
              Spustit 5minutovou lekci
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
