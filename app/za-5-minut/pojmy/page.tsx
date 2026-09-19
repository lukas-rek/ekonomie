"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, RotateCw, Search } from "lucide-react";

interface Flashcard {
  id: string;
  term: string;
  enTerm?: string;
  chapter: "Základní koncepty" | "Mikroekonomie" | "Makroekonomie";
  chapterSlug: "zakladni-koncepty" | "mikroekonomie" | "makroekonomie";
  definition: string;
}

const ALL_FLASHCARDS: Flashcard[] = [
  // --- ZÁKLADNÍ KONCEPTY ---
  {
    id: "vzacnost",
    term: "Vzácnost",
    enTerm: "Scarcity",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Lidé chtějí spoustu věcí, ale čas, peníze i suroviny máme omezené. Proto si musíme pořád vybírat, čemu dáme přednost a co oželíme.",
  },
  {
    id: "naklady-prilezitosti",
    term: "Náklady obětované příležitosti",
    enTerm: "Opportunity Cost",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Když si něco vybereš, vzdáváš se toho druhého nejlepšího, co jsi mohl udělat. Skutečnou cenou tvé volby je právě to, o co jsi tím přišel.",
  },
  {
    id: "ceteris-paribus",
    term: "Ceteris paribus",
    enTerm: "All other things being equal",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Latinsky to znamená za jinak stejných podmínek. Pomáhá zkoumat vliv jedné věci, třeba zdražení, přičemž předstíráme, že se všechno ostatní kolem vůbec nezměnilo.",
  },
  {
    id: "homo-economicus",
    term: "Homo economicus",
    enTerm: "Economic Human",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Zjednodušený model člověka, který se vždycky rozhoduje s chladnou hlavou. Zvažuje své přínosy i náklady a snaží se z každé situace vytěžit maximum.",
  },
  {
    id: "mezni-uzitek",
    term: "Mezní užitek (MU)",
    enTerm: "Marginal Utility",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Radost nebo užitek z každého dalšího kousku, který spotřebuješ. První doušek vody ti v horku zachrání život, desátá sklenice už ti ale nedá skoro nic.",
  },
  {
    id: "ppf",
    term: "Hranice produkčních možností (PPF)",
    enTerm: "Production Possibility Frontier",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Křivka, která ukazuje, kolik toho dokáže společnost maximálně vyrobit, když zapojí všechny své lidi, stroje i suroviny. Pokud chce vyrábět víc jednoho zboží, musí ubrat na druhém.",
  },
  {
    id: "pobidky",
    term: "Ekonomické pobídky",
    enTerm: "Incentives",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Všechno, co tě motivuje změnit chování. Může to být sleva, vyšší plat, ale i pokuta nebo zdražení. Jakmile se změní podmínky, lidé se jim přizpůsobí.",
  },
  {
    id: "komparativni-vyhoda",
    term: "Komparativní výhoda",
    enTerm: "Comparative Advantage",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Když dokážeš něco vyrobit s menší obětí než ostatní, vyplatí se ti dělat právě to. I kdyby byl někdo lepší ve všem, pořád má smysl se rozdělit o práci a obchodovat.",
  },
  {
    id: "vyrobni-faktory",
    term: "Výrobní faktory",
    enTerm: "Factors of Production",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Čtyři věci, bez kterých nic nevyrobíš. Potřebuješ přírodní zdroje, lidskou práci, stroje a nářadí, a někoho s nápadem a odvahou to celé zorganizovat.",
  },
  {
    id: "statky",
    term: "Volný vs. vzácný statek",
    enTerm: "Free vs. Economic Good",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Vzduchu k dýchání je kolem nás dost, takže je volný a zadarmo. Většina věcí je ale vzácná, protože na jejich výrobu padne čas, práce i materiál.",
  },
  {
    id: "pozitivni-normativni",
    term: "Pozitivní vs. normativní ekonomie",
    enTerm: "Positive vs. Normative Economics",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Pozitivní ekonomie popisuje fakta a to, jak věci opravdu fungují. Normativní ekonomie říká, jak by věci fungovat měly, a opírá se o osobní názory či hodnoty.",
  },
  {
    id: "klesajici-vynosy",
    term: "Zákon klesajících mezních výnosů",
    enTerm: "Law of Diminishing Returns",
    chapter: "Základní koncepty",
    chapterSlug: "zakladni-koncepty",
    definition: "Když do jedné malé kuchyně pošleš dalšího kuchaře, jídlo půjde rychleji. Když jich tam ale pošleš deset, začnou si překážet a výroba začne váznout.",
  },

  // --- MIKROEKONOMIE ---
  {
    id: "elasticita",
    term: "Cenová elasticita poptávky",
    enTerm: "Price Elasticity of Demand",
    chapter: "Mikroekonomie",
    chapterSlug: "mikroekonomie",
    definition: "Ukazuje, jak citlivě lidé reagují na zdražení. U léků lidé nakupují dál i po zdražení, u dovolených při růstu ceny okamžitě hledají levnější alternativu.",
  },
  

  // --- MAKROEKONOMIE ---
  {
    id: "hdp",
    term: "Hrubý domácí produkt (HDP)",
    enTerm: "Gross Domestic Product (GDP)",
    chapter: "Makroekonomie",
    chapterSlug: "makroekonomie",
    definition: "Celková peněžní hodnota všeho nového zboží a služeb, které se v zemi vyrobí za jeden rok. Používá se jako hlavní ukazatel síly a růstu hospodářství.",
  },
  
];

type ChapterFilter = "all" | "zakladni-koncepty" | "mikroekonomie" | "makroekonomie";

function PojmyContent() {
  const searchParams = useSearchParams();
  const initialKapitola = searchParams.get("kapitola");

  const [selectedChapter, setSelectedChapter] = useState<ChapterFilter>("all");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"terms" | "definitions">("terms");

  // Sync with URL query parameter when coming from mindmap or direct link
  useEffect(() => {
    if (initialKapitola === "zakladni-koncepty") {
      setSelectedChapter("zakladni-koncepty");
    } else if (initialKapitola === "mikroekonomie") {
      setSelectedChapter("mikroekonomie");
    } else if (initialKapitola === "makroekonomie") {
      setSelectedChapter("makroekonomie");
    } else {
      setSelectedChapter("all");
    }
  }, [initialKapitola]);

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flipAll = (state: boolean) => {
    const updated: Record<string, boolean> = {};
    ALL_FLASHCARDS.forEach((card) => {
      updated[card.id] = state;
    });
    setFlippedCards(updated);
    setActiveMode(state ? "definitions" : "terms");
  };

  const filteredCards = ALL_FLASHCARDS.filter((card) => {
    const matchesChapter =
      selectedChapter === "all" || card.chapterSlug === selectedChapter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      card.term.toLowerCase().includes(query) ||
      (card.enTerm && card.enTerm.toLowerCase().includes(query)) ||
      card.definition.toLowerCase().includes(query);
    return matchesChapter && matchesSearch;
  });

  const chapters: { label: string; slug: ChapterFilter }[] = [
    { label: "Vše", slug: "all" },
    { label: "Základní koncepty", slug: "zakladni-koncepty" },
    { label: "Mikroekonomie", slug: "mikroekonomie" },
    { label: "Makroekonomie", slug: "makroekonomie" },
  ];

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
        {/* Top Navigation */}
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
            Ekonomické pojmy
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Otáčecí kartičky s klíčovými pojmy a jejich vysvětlením. Můžeš procházet všechny pojmy najednou, nebo filtrovat podle jednotlivých kapitol.
          </p>
        </div>

        {/* Controls: Search, Chapter Filter Tabs, Mode Toggles */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat pojem nebo definici..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c710]/40 focus:border-[#f9c710] transition-all text-stone-900 placeholder:text-stone-400"
              />
            </div>

            {/* Chapter Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full lg:w-auto">
              {chapters.map((ch) => {
                const isActive = selectedChapter === ch.slug;
                return (
                  <button
                    key={ch.slug}
                    type="button"
                    onClick={() => setSelectedChapter(ch.slug)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#f9c710] text-stone-950 shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                    }`}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>

            {/* Mode Toggles: Pojmy / Definice */}
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
                        <div className="flex items-center justify-between mb-4">
                          {/* Tag kapitoly */}
                          <span className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
                            {card.chapter}
                          </span>
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

                    {/* Back of Card (Definice) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-stone-200 bg-[#FAF7F0] p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
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

                      <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-400">
                        <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                          {card.chapter}
                        </span>
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
              Chceš si znalosti vyzkoušet v praxi?
            </h4>
            <p className="text-sm text-stone-600">
              Spusť si 5 minutovou interaktivní lekci se scénářem a rychlými kvízy.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/za-5-minut/uvod"
              className="px-5 py-2.5 rounded-xl bg-[#f9c710] hover:bg-[#eab308] text-stone-950 font-semibold text-sm transition-colors shadow-sm cursor-pointer"
            >
              5 minutová lekce
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PojmyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F5] p-10 text-center text-stone-400">Načítání pojmů...</div>}>
      <PojmyContent />
    </Suspense>
  );
}
