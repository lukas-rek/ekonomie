"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import PPCChart from '@/components/zakladni-koncepty/PPCChart';
import PPCChartLinear from '@/components/zakladni-koncepty/PPCChartLinear';
import PPCChartConvex from '@/components/zakladni-koncepty/PPCChartConvex';
import PPCChartEntireShift from '@/components/zakladni-koncepty/PPCChartEntireShift';
import PPCChartPartialShift from '@/components/zakladni-koncepty/PPCChartPartialShift';
import QuizCarousel from '@/components/QuizCarousel';

export default function HraniceProdukcnichMoznostiPage() {
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
        <span className="text-xs font-mono font-bold text-[#F9C70F] uppercase tracking-widest block mb-2">
          Lekce 05
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Hranice produkčních možností a náklady obětované příležitosti
        </h1>
        <div className="h-[2px] w-16 bg-[#F9C70F]"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Už víme, že vzácnost zdrojů nutí jednotlivce i celé společnosti neustále volit. 
          Nemůžeme mít všechno. Každé rozhodnutí něco vyrobit nebo spotřebovat zároveň znamená, že se musíme vzdát něčeho jiného. 
          V této podkapitole se podíváme na to, jak ekonomie tuto volbu měří pomocí <strong>nákladů obětované příležitosti</strong> a jak ji graficky znázorňuje pomocí <strong>hranice produkčních možností (PPF)</strong>.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          Náklady obětované příležitosti
        </h2>
        <p>
          Když se rozhodujeme, kolik nás co stojí, obvykle myslíme na peníze. V ekonomii je však koncept nákladů mnohem širší. 
          <strong>Náklady obětované příležitosti (Opportunity Cost)</strong> představují hodnotu <i>druhé nejlepší alternativy</i>, které jsme se museli vzdát v důsledku našeho rozhodnutí.
        </p>

        <DefinitionBox title="Náklady obětované příležitosti (Opportunity Cost)">
          Jsou to užitky nebo výnosy z nejvýhodnější alternativní volby, kterou jsme museli obětovat, abychom mohli uskutečnit zvolenou aktivitu.
        </DefinitionBox>

        <p>
          Představte si, že máte v pátek večer volný čas a rozhodujete se mezi třemi možnostmi: 
        </p>
        <ol className="list-decimal pl-6 space-y-1 marker:text-stone-400">
          <li>Jít na brigádu a vydělat 600 Kč (vaše 1. volba).</li>
          <li>Jít s přáteli do kina (vaše 2. volba).</li>
          <li>Zůstat doma a číst si knihu (vaše 3. volba).</li>
        </ol>
        <p>
          Pokud se rozhodnete jít na brigádu, vaším nákladem obětované příležitosti <strong>není</strong> čtení knihy ani součet všech ostatních možností. 
          Je to právě a pouze <strong>zážitek z kina s přáteli</strong>, protože to byla vaše druhá nejlepší alternativa, kterou jste kvůli práci obětovali.
        </p>
        <p>
          Stejně tak náklady na studium na vysoké škole nejsou jen školné, koleje a učebnice. 
          Obrovskou část nákladů tvoří <strong>ušlá mzda</strong>, kterou byste vydělali, kdybyste místo sezení na přednáškách pracovali na plný úvazek.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Hranice produkčních možností (PPF)
        </h2>
        <p>
          Koncept vzácnosti, volby a alternativních nákladů na úrovni celé ekonomiky skvěle ilustruje model <strong>Hranice produkčních možností</strong> (z anglického <i>Production Possibility Frontier</i> – <strong>PPF</strong>).
        </p>
        <p>
          Představme si zjednodušenou ekonomiku, která má fixní množství výrobních faktorů (lidí, strojů, půdy) a technologií a vyrábí pouze dva statky: <strong>Statky X</strong> (např. traktory) a <strong>Statky Y</strong> (např. pšenici).
        </p>

        <PPCChart 
          title="Křivka hranice produkčních možností (PPF)"
          xAxisLabel="Statek X (např. traktory)"
          yAxisLabel="Statek Y (např. pšenice)"
          points={[
            { x: 30, y: 70, label: "A (efektivní)", showLines: true, color: "#15803D" },
            { x: 65, y: 35, label: "B (efektivní)", showLines: true, color: "#15803D" },
            { x: 25, y: 25, label: "C (neefektivní)", showLines: true, color: "#EAB308" },
            { x: 70, y: 70, label: "D (nedosažitelný)", showLines: true, color: "#DC2626" },
          ]}
        />

        <p>
          Křivka PPF znázorňuje <strong>všechny maximálně dosažitelné kombinace</strong> produkce dvou statků, které může ekonomika vyrobit při plném a efektivním využití všech dostupných zdrojů a technologií.
        </p>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-2">Body na grafu a jejich význam:</h3>
        <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
          <li>
            <strong>Body přímo na křivce (A, B):</strong> Představují <strong>efektivní výrobu</strong>. Ekonomika využívá všechny své zdroje naplno. Pokud chceme vyrobit více statku X, <i>musíme</i> se vzdát části produkce statku Y.
          </li>
          <li>
            <strong>Bod pod křivkou (C):</strong> Představuje <strong>neefektivní výrobu</strong>. Zdroje v ekonomice jsou nevyužité (např. vysoká nezaměstnanost, stojící továrny) nebo jsou využívány špatně. Ekonomika může vyrobit více obou statků, aniž by musela volit kompromis.
          </li>
          <li>
            <strong>Bod nad křivkou (D):</strong> Je za současného stavu <strong>nedosažitelný</strong>. Ekonomika jednoduše nemá dostatek výrobních faktorů ani tak pokročilou technologii, aby této kombinace dosáhla.
          </li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Tvar křivky PPF: Proč je prohnutá?
        </h2>
        <p>
          Křivka PPF může mít teoreticky lineární (rovný) tvar, ale v reálném světě je téměř vždy <strong>konkávní</strong> (vyklenutá směrem od počátku). 
          Důvodem je <strong>zákon rostoucích alternativních nákladů</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <PPCChartLinear 
            title="Lineární PPF (konstantní náklady)"
            points={[{ x: 40, y: 40, showLines: true }]}
          />
          <PPCChartConvex 
            title="Konkávní PPF (rostoucí náklady)"
            points={[{ x: 40, y: 25, showLines: true }]}
          />
        </div>

        <p>
          Výrobní faktory totiž nejsou dokonale přizpůsobivé pro výrobu všech statků. Některá půda je skvělá na pěstování pšenice, ale nevhodná na stavbu továrny na traktory. Někteří lidé jsou skvělí zemědělci, ale špatní strojaři.
        </p>
        <p>
          Když se rozhodneme vyrábět více traktorů, nejprve do továren převedeme lidi a suroviny, které se na výrobu traktorů hodí nejlépe. Pšenice ubude jen málo. 
          Čím více traktorů však chceme, tím více musíme zapojovat i lidi a pole, kteří jsou v průmyslu neefektivní – <strong>obětujeme stále větší a větší množství pšenice za každý další vyrobený traktor</strong>.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Posuny křivky PPF: Hospodářský růst
        </h2>
        <p>
          Hranice produkčních možností není v čase neměnná. Pokud dojde ke změně množství zdrojů nebo technologickému pokroku, celá křivka se posune.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <PPCChartEntireShift 
            title="Všeobecný posun PPF (Růst obou odvětví)"
          />
          <PPCChartPartialShift 
            title="Asymetrický posun PPF (Inovace ve statku X)"
          />
        </div>

        <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
          <li>
            <strong>Posun celé křivky doprava/nahoru (Hospodářský růst):</strong> Způsobený objevem nových přírodních zdrojů, přílivem pracovní síly, investicemi do nového kapitálu nebo celkovým vědecko-technickým pokrokem. Dříve nedosažitelné body se stávají dosažitelnými.
          </li>
          <li>
            <strong>Asymetrický posun:</strong> Pokud se objeví nový vynález pouze v jednom odvětví (např. automatizovaná montáž traktorů), posune se hranice pouze na ose statku X.
          </li>
          <li>
            <strong>Posun doleva/dolů:</strong> Může nastat v důsledku válek, přírodních katastrof, epidemií nebo vyčerpání neobnovitelných zdrojů.
          </li>
        </ul>

        <QuizCarousel>
          <InteractiveQuestion
            question="Co vyjadřují náklady obětované příležitosti?"
            options={[
              "Celkovou peněžní částku vynaloženou na danou činnost.",
              "Hodnotu druhé nejlepší alternativy, které jsme se museli vzdát.",
              "Ztrátu způsobenou špatným rozhodnutím firmy."
            ]}
            correctAnswer={1}
            explanation="Náklady obětované příležitosti měří užitek z nejlepší obětované alternativy, kterou jsme neuskutečnili."
          />
          <InteractiveQuestion
            question="Co znamená, pokud se ekonomika nachází v bodě POD křivkou PPF?"
            options={[
              "Ekonomika vyrábí efektivně a naplno.",
              "Takový bod je za současných podmínek nedosažitelný.",
              "V ekonomice jsou nevyužité zdroje (např. nezaměstnanost) a vyrábí neefektivně."
            ]}
            correctAnswer={2}
            explanation="Bod uvnitř/pod křivkou značí neefektivitu – zdroje nejsou využity na 100 % své kapacity."
          />
        </QuizCarousel>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/vyrobni-faktory" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-[#F9C70F] group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Výrobní faktory
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/komparativni-absolutni-vyhoda" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Komparativní a absolutní výhoda
                </span>
              </div>
              <ArrowRight size={18} className="shrink-0 text-stone-400 group-hover:text-[#F9C70F] group-hover:translate-x-1 transition-all mt-1" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}