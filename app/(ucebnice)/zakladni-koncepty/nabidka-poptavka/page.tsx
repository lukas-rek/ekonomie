"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import ExplanationBox from "@/components/ExplanationBox";
import MarketChart from '@/components/zakladni-koncepty/MarketChart';
import InteractiveMarketChart from '@/components/zakladni-koncepty/InteractiveMarketChart';
import QuizCarousel from '@/components/QuizCarousel';

export default function NabidkaPoptavkaPage() {
  return (
    <div className="max-w-3xl mx-auto pb-20 pt-6">
      {/* Navigace zpět na rozcestník */}
      <Link 
        href="/zakladni-koncepty" 
        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors mb-8 group font-sans"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Zpět na kapitolu: Základní koncepty
      </Link>

      {/* HLAVIČKA PODKAPITOLY */}
      <header className="mb-8">
        <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-widest block mb-2">
          Lekce 07
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Nabídka, poptávka a tržní rovnováha
        </h1>
        <div className="h-[2px] w-16 bg-orange-700"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Pokud existuje v ekonomii jeden model, který zná téměř každý, je to <strong>Marshallův kříž nabídky a poptávky</strong>. 
          Představuje srdce tržního hospodářství. Ukazuje, jak se z interakce milionů kupujících a prodávajících rodí <strong>tržní cena</strong>, 
          která bez jakéhokoliv centrálního plánovače koordinuje celou společnost.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          1. Poptávka (Demand – D)
        </h2>
        <p>
          Poptávka vyjadřuje vztah mezi <strong>cenou statku (P – Price)</strong> a <strong>množstvím (Q – Quantity)</strong>, které jsou kupující ochotni a schopni za tuto cenu koupit (za jinak nezměněných podmínek – <i>ceteris paribus</i>).
        </p>

        <DefinitionBox title="Zákon klesající poptávky">
          S rostoucí cenou statku klesá poptávané množství tohoto statku (a naopak). Křivka poptávky je proto <strong>klesající</strong> (má záporný sklon).
        </DefinitionBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <MarketChart 
            title="Křivka individuální poptávky (D)"
            curves={[
              { startX: 15, startY: 85, endX: 85, endY: 15, label: "D", color: "#2563EB" }
            ]}
            points={[
              { x: 30, y: 70, label: "A", showLines: true, xLabel: "Q₁", yLabel: "P₁" },
              { x: 70, y: 30, label: "B", showLines: true, xLabel: "Q₂", yLabel: "P₂" }
            ]}
          />
          <div className="flex flex-col justify-center text-sm space-y-3 font-sans">
            <p>
              <strong>Dva důvody, proč je poptávka klesající:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
              <li>
                <strong>Důchodový efekt:</strong> Když statek zdraží, spotřebitelé se cítí reálně chudší (za svůj příjem si koupí méně jednotek).
              </li>
              <li>
                <strong>Substituční efekt:</strong> Když statek zdraží, spotřebitelé ho začnou nahrazovat jinými, relativně levnějšími statky (substituty – např. místo hovězího koupí kuřecí).
              </li>
            </ul>
          </div>
        </div>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-2">Posun po křivce vs. Posun celé křivky</h3>
        <p>
          Je kriticky důležité rozlišovat mezi <strong>změnou poptávaného množství</strong> a <strong>změnou poptávky</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
          <li>
            <strong>Posun PO křivce (z A do B):</strong> Je vyvolán <i>pouze změnou ceny samotného statku</i>. Poptávková křivka se nehýbe, pouze se posouváme do jiného bodu.
          </li>
          <li>
            <strong>Posun CELÉ křivky (z D do D'):</strong> Nastává, pokud se změní jiné faktory než cena daného statku (např. vzrostou příjmy lidí, změní se móda a preference, zdraží substitut nebo zlevní komplement).
          </li>
        </ul>

        <MarketChart 
          title="Posun poptávkové křivky (Růst poptávky)"
          curves={[
            { startX: 15, startY: 85, endX: 85, endY: 15, label: "D", color: "#A8A29E", isDashed: true },
            { startX: 35, startY: 85, endX: 95, endY: 25, label: "D'", color: "#2563EB" }
          ]}
          arrows={[
            { startX: 45, startY: 55, endX: 65, endY: 55, color: "#2563EB" }
          ]}
        />

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          2. Nabídka (Supply – S)
        </h2>
        <p>
          Nabídka vyjadřuje vztah mezi <strong>cenou statku (P)</strong> a <strong>množstvím (Q)</strong>, které jsou výrobci ochotni a schopni vyrobit a prodat.
        </p>

        <DefinitionBox title="Zákon rostoucí nabídky">
          S rostoucí cenou statku roste nabízené množství tohoto statku (a naopak). Křivka nabídky je proto <strong>rostoucí</strong> (má kladný sklon).
        </DefinitionBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <MarketChart 
            title="Křivka individuální nabídky (S)"
            curves={[
              { startX: 15, startY: 15, endX: 85, endY: 85, label: "S", color: "#DC2626" }
            ]}
            points={[
              { x: 30, y: 30, label: "A", showLines: true, xLabel: "Q₁", yLabel: "P₁" },
              { x: 70, y: 70, label: "B", showLines: true, xLabel: "Q₂", yLabel: "P₂" }
            ]}
          />
          <div className="flex flex-col justify-center text-sm space-y-3 font-sans">
            <p>
              <strong>Proč je nabídka rostoucí?</strong>
            </p>
            <p>
              Vyšší cena motivuje stávající výrobce zvýšit produkci, protože jim pokrývá rostoucí mezní náklady (viz zákon klesajících výnosů). 
              Zároveň vyšší cena láká na trh <strong>nové výrobce</strong>, pro které byla dřívější nižší cena nevýhodná.
            </p>
          </div>
        </div>

        <p>
          <strong>Co posouvá celou křivku nabídky (S)?</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li>Změna cen výrobních faktorů (zdražení energií, surovin či mezd posune S doleva).</li>
          <li>Technologický pokrok (nové vynálezy zlevňují výrobu – posun S doprava).</li>
          <li>Očekávání výrobců a vládní regulace (např. nová daň posune S doleva).</li>
          <li>Přírodní podmínky (např. sucho v zemědělství posune S doleva).</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          3. Tržní rovnováha (Equilibrium – E)
        </h2>
        <p>
          Když dáme křivku poptávky a nabídky do jednoho grafu, protnou se v jediném bodě – <strong>bodě tržní rovnováhy (E)</strong>.
        </p>

        <MarketChart 
          title="Tržní rovnováha (Marshallův kříž)"
          curves={[
            { startX: 15, startY: 85, endX: 85, endY: 15, label: "D", color: "#2563EB" },
            { startX: 15, startY: 15, endX: 85, endY: 85, label: "S", color: "#DC2626" }
          ]}
          points={[
            { x: 50, y: 50, label: "E (Rovnováha)", showLines: true, xLabel: "Q_E (Rovnovážné množství)", yLabel: "P_E (Rovnovážná cena)", color: "#1C1917" }
          ]}
        />

        <p>
          V bodě rovnováhy platí, že <strong>nabízené množství se přesně rovná poptávanému množství ($Q_D = Q_S$)</strong>. 
          Cena $P_E$ se nazývá <strong>rovnovážná cena</strong> a množství $Q_E$ <strong>rovnovážné množství</strong>. Na trhu nedochází k žádným přebytkům ani nedostatkům.
        </p>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-2">Přebytek a nedostatek na trhu</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <MarketChart 
            title="Přebytek zboží na trhu (P > P_E)"
            curves={[
              { startX: 15, startY: 85, endX: 85, endY: 15, label: "D", color: "#2563EB" },
              { startX: 15, startY: 15, endX: 85, endY: 85, label: "S", color: "#DC2626" }
            ]}
            points={[
              { x: 30, y: 70, label: "Q_D", showLines: true, yLabel: "P_Vysoká" },
              { x: 70, y: 70, label: "Q_S", showLines: true }
            ]}
            areas={[
              { points: [{x: 30, y: 70}, {x: 70, y: 70}, {x: 50, y: 50}], color: "#DC2626", opacity: 0.15 }
            ]}
          />
          <MarketChart 
            title="Nedostatek zboží na trhu (P < P_E)"
            curves={[
              { startX: 15, startY: 85, endX: 85, endY: 15, label: "D", color: "#2563EB" },
              { startX: 15, startY: 15, endX: 85, endY: 85, label: "S", color: "#DC2626" }
            ]}
            points={[
              { x: 30, y: 30, label: "Q_S", showLines: true, yLabel: "P_Nízká" },
              { x: 70, y: 30, label: "Q_D", showLines: true }
            ]}
            areas={[
              { points: [{x: 30, y: 30}, {x: 70, y: 30}, {x: 50, y: 50}], color: "#2563EB", opacity: 0.15 }
            ]}
          />
        </div>

        <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
          <li>
            <strong>Při ceně vyšší než rovnovážné ($P &gt; P_E$):</strong> Výrobci chtějí prodat hodně ($Q_S$), ale kupující mají zájem jen o málo ($Q_D$). Vzniká <strong>přebytek zboží</strong>. Výrobci musí zlevnit, aby zboží udali, čímž cena klesá zpět k $P_E$.
          </li>
          <li>
            <strong>Při ceně nižší než rovnovážné ($P &lt; P_E$):</strong> Kupující chtějí nakupovat ($Q_D$), ale výrobci za tuto cenu nabízejí málo ($Q_S$). Vzniká <strong>nedostatek zboží</strong> (fronty, prázdné regály). Kupující jsou ochotni přeplatit, což tlačí cenu nahoru zpět k $P_E$.
          </li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Interaktivní tržní simulátor
        </h2>
        <p>
          Vyzkoušejte si, jak reaguje tržní rovnováha na posuny nabídky a poptávky. Můžete uchopit křivky myší a pohybovat s nimi doprava a doleva:
        </p>

        <InteractiveMarketChart />

        <QuizCarousel>
          <InteractiveQuestion
            question="Co způsobí nárůst ceny másla na trhu s máslem?"
            options={[
              "Posun celé poptávkové křivky doleva.",
              "Posun po poptávkové křivce k menšímu poptávanému množství.",
              "Posun celé nabídkové křivky doprava."
            ]}
            correctAnswer={1}
            explanation="Změna ceny samotného statku nikdy neposouvá celou křivku – dochází pouze k posunu PO křivce k menšímu poptávanému množství."
          />
          <InteractiveQuestion
            question="Pokud je na trhu stanovena cena nižší, než je rovnovážná cena, co nastane?"
            options={[
              "Přebytek zboží a tlak na další zlevňování.",
              "Tržní rovnováha se stabilizuje.",
              "Nedostatek zboží a přirozený tlak na růst ceny."
            ]}
            correctAnswer={2}
            explanation="Při příliš nízké ceně poptávka převyšuje nabídku (vzniká nedostatek), což vede ke konkurenci mezi kupujícími a růstu ceny."
          />
        </QuizCarousel>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/komparativni-absolutni-vyhoda" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-orange-700 group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Komparativní a absolutní výhoda
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/test" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Závěr kapitoly</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Závěrečný test kapitoly
                </span>
              </div>
              <ArrowRight size={18} className="shrink-0 text-stone-400 group-hover:text-orange-700 group-hover:translate-x-1 transition-all mt-1" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}