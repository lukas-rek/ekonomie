"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Image as ImageIcon, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import PPCChartPartialShift from "@/components/zakladni-koncepty/PPCChartPartialShift"
import PPCChart from "@/components/zakladni-koncepty/PPCChart"
import PPCChartEntireShift from "@/components/zakladni-koncepty/PPCChartEntireShift"
import PPCChartConvex from "@/components/zakladni-koncepty/PPCChartConvex"
import PPCChartLinear from "@/components/zakladni-koncepty/PPCChartLinear"
import QuizCarousel from '@/components/QuizCarousel';

export default function UvodDoEkonomie() {
  return (
    <div className="max-w-4xl mx-auto pb-20 pt-5">
      {/* Navigace zpět na rozcestník */}
      <Link 
        href="/zakladni-koncepty" 
        className="flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Zpět na kapitolu: Základní koncepty
      </Link>

      {/* HLAVIČKA PODKAPITOLY */}
      <header className="mb-5">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
          HRANICE PRODUKČNÍCH MOŽNOSTÍ A NÁKLADY OBĚTOVANÉ PŘÍLEŽITOSTI
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        <p className="italic mt-3">
            Lukáš Rek, 2026
        </p>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed text-lg">
        <p>
          V této kapitole prohloubíme naše porozumění o tom, jak vzácnost diktuje limity naší výroby a jakou cenu platíme za každé naše rozhodnutí.
        </p>
        <p className='text-3xl font-bold text-black'>
          Náklady obětované příležitosti
        </p>
        <p>
            V běžném životě si předstávíme pod nákladem obvykle nějakou pěněžní sumu, kterou musíme vna něco vydat. 
            Kdykoliv ale učiníme nějakou volbu, vzdáme se všech ostatních možností. Například pokud jdete studovat vysokou školu, vaším nákladem nebude jen školné, učebnice a podobně. 
            Může to být i mzda, kterou byste získali, kdyby jste šli místo studia pracovat nebo i užitek, který byste získali, kdybyste místo toho radši cestovali.
            Tomuto konceptu říkáme náklad obětované příležitosti. Vše co děláme má nějaký náklad obětované příležitosti, protože zároveň nemůžeme dělat něco jiného.
            Tento koncept je univerzální: státní rozpočet investovaný do zbrojení má náklady v podobě nepostavených dálnic; čas strávený spánkem má náklady v podobě nerealizované zábavy či práce.
            Platí to samozřejmě i pro výrobu. Ke znázornění nákladů obětované příležitosti ve výrobě používáme křivku produkčních možností.
        </p>
        <p className='text-3xl font-bold text-black'>
          Hranice produkčních možností
        </p>
        <p>
            Hranice neboli křivka produkčních možností (PPC - production possibility curve) je model znázorňující všechny kombinace dvou statků, které může ekonomika vyprodukovat při plném využití dostupných zdrojů.
            Předpokládáme, že ekonomika vyrábí pouze dva druhy statků, množství výrobních faktorů je fixní a technologie se nemění.
            Pojďme se podívat na model, kdy naše ekonomika vyrábí auta a počítače.

        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
        <div className="w-full">
        <PPCChart
            className="my-0" 
            xAxisLabel="Auta"
            yAxisLabel="Počítače"
            points={[
                { x: 60, y: 60, label: "A", showLines: true, xLabel:"8", yLabel:"800"}, 
                { x: 20, y: 20, label: "B", color: "gray" },   
                { x: 90, y: 90, label: "C", color: "gray" },
                { x: 80, y: 0, hidePoint: true, xLabel:"10" },   
                { x: 0, y: 80, hidePoint: true, yLabel:"1000" } 
            ]}
        />
        </div>
        <div>
            <p>
                Body na křivce (A) představují efektivní výrobu. Ekonomika využívá zdroje na maximum. Chceme-li v tomto bodě zvýšit výrobu automobilů, musíme snížit výrobu počítačů.
                Body pod křivkou představují neefektivní výrobu. Ekonomika může skrze efektivnější využití zdrojů zvýšit produkci, aniž by se musela něčeho vzdát.
                Body nad křivkou (C) představují produkci, na kterou nemá ekonomika dostatek zdrojů, a tudíž je nedosažitelná - nemůžeme vyrobit zároveň 11 aut a 1100 počítačů.
            </p>
        </div>
        </div>
        <p>
            Křivka produkčních možností se může posouvat, jak vidíme na grafech níže. 
            Když má ekonomika více zdrojů (práce nebo kapitálu) nebo dojde k technologickému pokroku, celá křivka se posune doprava a nahoru.
            Můžeme tak dosáhnout i bodů, které byly původně za křivkou. Když se produkce zvětší jen u jednoho statku (například jsme objevili lepší postup pro výrobu aut, ale ne počítačů), dojde k posunu jako na grafu vpravo.
            Jde tak o grafické vyjádření hospodářského růstu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
        <div className="w-full">
        <PPCChartEntireShift
            className="my-0" 
            xAxisLabel="Auta"
            yAxisLabel="Počítače"
            points={[
                { x: 60, y: 60, label: "A", showLines: true, xLabel:"8", yLabel:"800"}, 
                { x: 20, y: 20, label: "B", color: "gray" },   
                { x: 68, y: 67, label: "C", color: "gray" },
                { x: 80, y: 0, hidePoint: true, xLabel:"10" },   
                { x: 0, y: 80, hidePoint: true, yLabel:"1000" } 
            ]}
        />
        </div>
        <div>
            <PPCChartPartialShift
            className="my-0" 
            xAxisLabel="Auta"
            yAxisLabel="Počítače"
            points={[
                { x: 60, y: 60, label: "A", showLines: true, xLabel:"8", yLabel:"800"}, 
                { x: 80, y: 0, hidePoint: true, xLabel:"10" },   
                { x: 0, y: 80, hidePoint: true, yLabel:"1000" } 
            ]}
        />
        </div>
        </div>
        <p>
            Křivka produkčních možností v sobě skrývá i informaci o nákladech obětované příležitosti výroby daných dvou statků. Vezměme například bod A z grafů výše. 
            V tuto chvíli vyrábíme efektivně 800 počítačů a 8 aut. Pojďme si spočítat náklady obětované příležitosti, kdybychom se rozhodli plně zaměřit na výrobu jednoho nebo druhého statku.
            Pokud bychom chtěli vyrábět o 200 počítačů více, museli bychom se vzdát 8 aut. To je náš náklad obětované příležitosti. Chceme li vyrobit o 2 auta více, nákladem obětované příležitosti tohoto kroku bude 800 počítačů.
            Podle toho, kaké jsou náklady obětované příležitosti máme různé tvary křivky produkčních možností. 
        </p>
        <p>
            Klasický konkávní tvar křivky produkčních možností nastává, když výrobní faktory nejsou dokonale zaměnitelné. To je většina všech případů. V takovém případě náklady obětované přiležitosti rostou (čím více vyrábíme jednoho statku, tím více jednotek druhého statku se musíme vzdát).
            Například pokud se rozhodneme vyrábět pouze automobily, budeme muset do továren poslat i lidi, kteří jsou experti na počítače a obměnit kapitál na vhodný pro výrobu aut. Přínos k výrobě aut bude malý, ale ztráta v produkci počítačů obrovská.
        </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
        <div className="w-full">
        <PPCChartLinear
            className="my-0" 
            points={[
                { x: 40, y: 40, label: "A", showLines: true, xLabel:"5", yLabel:"5"},
                { x: 60, y: 20, label: "B", showLines: true, xLabel:"7", yLabel:"3"},
                { x: 20, y: 60, label: "C", showLines: true, xLabel:"3", yLabel:"7"}, 
                { x: 80, y: 0, hidePoint: true, xLabel:"10" },   
                { x: 0, y: 80, hidePoint: true, yLabel:"10" } 
            ]}
        />
        </div>
        <div>
            <PPCChartConvex
            className="my-0" 
            points={[
                { x: 25, y: 25, label: "A", showLines: true, xLabel:"3", yLabel:"3"}, 
                { x: 8, y: 50, label: "B", showLines: true, xLabel:"1", yLabel:"6"},
                { x: 50, y: 8, label: "C", showLines: true, xLabel:"6", yLabel:"1"},
                { x: 80, y: 0, hidePoint: true, xLabel:"10" },   
                { x: 0, y: 80, hidePoint: true, yLabel:"10" } 
            ]}
        />
        </div>
        </div>
        <p>
            Lineární tvar PPC znamená, že náklady obětované příležitosti jsou konstantní. Pro výrobu jednotky statku x se vždy musím vzdát stejného množství statku y.
            Výrobní faktory jsou dokonale zaměnitelné. Příkladem může být výroba pravých a levých bot.
            Konvexní tvar křivky je velmi vzácný. Náklady obětované příležitosti klesají. V takové ekonomice se vždy vyplatí plně specializovat.
        </p>
        <QuizCarousel>
        <InteractiveQuestion
        question="Vyrabíme statky X a Y. Při plné zaměstnanosti a efektivním využití kapitálu máme tyto možnosti výroby: 10 jednotek statku X a 1 jednotku statku Y, 8 jednotek X a 4 jednotky Y, 2 jednotky X a 9 jednotek Y. Co lze říct o nákladech obětované příležitosti výroby statku Y vyjádřených v jednotkách statku X?"
        options={["Rostou", "Klesají", "Jsou konstantní"]}
        correctAnswer={0}
        explanation='Nejdříve jsme se na výrobu 3 dalších jednotek Y vzdali 2 jednotek X (tedy jedna jednotka Y nás stála 2/3 X). Po té jsme se na výrobu 5 dalších jednotek Y vzdali 6 jednotek X (jedna jednotka Y nás stála 6/5 X, což je více než 2/3 a náklad tak vzrostl).'
        />
        <InteractiveQuestion
        question="Co to vypovídá o tvaru PPC?"
        options={["Je konkávní", "Je lineární", "Je konvexní"]}
        correctAnswer={0}
        explanation='Rostoucí náklady obětované příležitosti znamenají konkávní tvar PPC.'
        />
        </QuizCarousel>
        <p>
            V další podkapitole se podíváme na to, jak se můžeme dostat produkcí za hranici produkčních možností.
        </p>
    </article>
      {/* NAVIGACE MEZI PODKAPITOLAMI */}
     <footer className="mt-16 pt-8 border-t border-slate-100">
  <div className="grid grid-cols-2 gap-4">
    
    {/* Předchozí kapitola */}
    <div className="flex justify-start">
      <Link 
        href="/zakladni-koncepty/vyrobni-faktory" 
        className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
      >
        {/* Šipka zůstává nahoře u prvního řádku díky mt-1 */}
       
        <ArrowLeft size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all mt-1" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Předchozí</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Výrobní faktory
          </span>
        </div>
      </Link>
    </div>

    {/* Další kapitola */}
    <div className="flex justify-end">
      <Link 
        href="/zakladni-koncepty/komparativni-absolutni-vyhoda" 
        className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Další</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Komparativní a absolutní výhoda
          </span>
        </div>
        {/* Šipka vpravo */}
        <ArrowRight size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mt-1" />
      </Link>
    </div>

  </div>
</footer>
    </div>
  );
}