"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Image as ImageIcon, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import PPCAdvantages from "@/components/zakladni-koncepty/PPCAdvantages"
import PPCAdvantages2 from "@/components/zakladni-koncepty/PPCAdvantages2"
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
          KOMPARATIVNÍ A ABSOLUTNÍ VÝHODA
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        {/* <p className="italic mt-3">
            Lukáš Rek, 2026
        </p> */}
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed text-lg">
        <p>
          V minulé podkapitole jsme si řekli, že nemůžeme vyrábět za hranicí našich produkčních možností. Co když ale cesta je? A jak je možné, že i když jsem ve výrobě všech statků horší než soused, stále je pro nás výhodné se o výrobu dělit a obschodovat?
          Na tyto otázky nám pomůže odpovědět teorie komparativní a absolutní výhody. Ta je klíčem k pochopení toho, proč je dělba práce a specializace motorem růstu našeho bohatství.
        </p>
        <p>
          Představme si dva pekaře, Adama a Blanku, kteří mohou produkovat dva druhy statků: rohlíky a chleby. Podívejme se na tabulku níže, která nám říká, kolik jsou oba schopní vyprodukovat rohlíků a chlebů za stejných podmínek.

        </p>
  <div className="space-y-4">
    <div className="overflow-hidden border border-slate-200 rounded-xl">
       <table className="w-full text-left border-collapse">
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500"></th>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Rohlíky</th>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Chleby</th>

      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="bg-slate-50 border-b border-slate-200">
        <td className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Adam</td>
        <td className="p-4 text-sm text-slate-700 font-bold">15</td>
        <td className="p-4 text-sm text-slate-700 font-bold">5</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
      <td className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Blanka</td>
        <td className="p-4 text-sm text-slate-700 font-bold">10</td>
        <td className="p-4 text-sm text-slate-700 font-bold">10</td>
      </tr>
    </tbody>
  </table>
    </div>
  </div>
  <p>
    <strong>Absolutní výhodu</strong> v produkci daného druhu statku má ten výrobce, který spotřebuje méně vstupů na výrobu stejného druhu statku, případně se stejným množství vstupů vyprodukuje větší množství.
    V tabulce výše vidíme, že Adam vyprodukuje více rohlíků než Blanka, tedy má v jejich produkci absolutní výhodu. Stejně tak Blanka má absolutní výhodu v produkci chleba.
  </p>
  <p>
  <strong>Komparativní výhoda </strong>se narozdíl od absolutní výhody neodvíjí od produktivity, ale od nákladů obětované příležitosti.
  Pojďme si spočítat náklady obětované příležitosti výroby jednoho rohlíku vyjádřené v chlebech u obou pekařů. Adam se musí vzdát 1/3 chleba, aby vyrobil jeden rohlík. To je jeho náklad obětované příležitosti. Blanka se musí vzdát celého 1 chleba pro výrobu rohlíků. 
  Její náklad obětované příležitosti je tedy vyšší než Adamův. Komparativní výhodu má vždy ten s menšími náklady obětované příležitosti.
  Asi nás nepřekvapí, že Blanka bude mít v tomto případě zase komparativní výhodu ve výrobě chleba, zatímco Adam ve výrobě rohlíků. Komparativní výhoda nám pomáhá rozhodnout, kdo by se měl specializovat na co pro maximalizaci produkce. Pojďme se nyní podívat na novou tabulku níže.
  </p>
  <div className="space-y-4">
    <div className="overflow-hidden border border-slate-200 rounded-xl">
       <table className="w-full text-left border-collapse">
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500"></th>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Rohlíky</th>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Chleby</th>

      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="bg-slate-50 border-b border-slate-200">
        <td className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Adam</td>
        <td className="p-4 text-sm text-slate-700 font-bold">20</td>
        <td className="p-4 text-sm text-slate-700 font-bold">15</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
      <td className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Blanka</td>
        <td className="p-4 text-sm text-slate-700 font-bold">10</td>
        <td className="p-4 text-sm text-slate-700 font-bold">10</td>
      </tr>
    </tbody>
  </table>
    </div>
  </div>
  <p>
    Vidíme, že Adam má nyní absolutní výhodu jak v produkci rohlíků tak v produkci chleba. Měl by se tedy na Blanku „vykašlat“ a péct rohlíky i chleby sám?
    Pojďme se na to podívat skrze komparativní výhodu. Pro Adama je náklad obětované příležitosti výroby jednoho rohlíku 15/20 neboli 3/4 chleba. Pro Blanku je to stále 1 chléb. Adam má komparativní výhodu ve výrobě rohlíků. A co výroba chleba? 
    Adam se musí vzdát 20/15 tedy 4/3 rohlíku na výrobu chleba. Blanka ale pouze 1 rohlíku. Blanka má tedy komparativní výhodu ve výrobě chleba, ačkoliv ho dokáže za stejných podmínek vyrobit méně než Adam.
    Zatímco jeden subjekt může mít absolutní výhodu ve všech činnostech, je matematicky nemožné, aby měl komparativní výhodu ve všech činnostech.
  </p>
  <p>
     Ekonomický princip říká: Celková produkce ekonomiky vzroste, pokud se každý subjekt specializuje na činnost, v níž má komparativní výhodu.
     Směna (obchod) pak umožňuje oběma stranám spotřebovávat kombinace statků, které leží vně jejich individuálních hranic produkčních možností. Pojďme si to ilustrovat graficky.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
        <div className="w-full">
        <PPCAdvantages
            className="my-0" 
            xAxisLabel="Rohlíky"
            yAxisLabel="Chleby"
            points={[
                { x: 48, y: 24, label: "A", color: "grey", showLines: true, xLabel:"12", yLabel:"6"}, 
                { x: 28, y: 12, label: "B", color: "gray", showLines: true, xLabel:"7", yLabel:"3" },   
                { x: 80, y: 0, hidePoint: true, xLabel:"20" },   
                { x: 0, y: 60, hidePoint: true, yLabel:"15" } 
            ]}
        />
        </div>
        <div>
            <p>
                Zde jsou křivky produkčních možností Adama (modrá) a Blanky (zelená) a dva vybrané body kombinace statků, které mohou vyrobit. 
                Co se ale stane, kdyby se oba specializovali a následně spolu provedli směnu? Podívejme se na křivky níže. 
            </p>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
        <div className="w-full">
        <PPCAdvantages2
            className="my-0" 
            xAxisLabel="Rohlíky"
            yAxisLabel="Chleby"
            points={[
                { x: 40, y: 32, label: "A", color: "grey", showLines: true, xLabel:"10", yLabel:"8"}, 
                { x: 40, y: 8, label: "B", color: "gray", showLines: true, xLabel:"10", yLabel:"2" },   
                { x: 80, y: 0, hidePoint: true, xLabel:"20" },   
                { x: 0, y: 60, hidePoint: true, yLabel:"15" } 
            ]}
        />
        </div>
        <div>
            <p>
                Adam se specializoval na rohlíky a vyrobil jich 20, Blanka se specializovala na chleby a vyrobila jich 10. Poté spolu směnily rohlíky za chleby.
                SAby byla směna pro oba výhodná, směnný kurz chleba ku rohlíku se musí pohybovat mezi náklady obětované příležitosti výroby chleba obou dvou (tedy mezi 3/4 a 1). 
                Uvažujme tedy směnný kurz 0.8 rohlíků : 1 chleba. Adam vyměnil svých 10 rohlíků za 8 Blančiných chlebů. Výsledkem směny jsou nové body A a B. 
                Vidíme, že oba dva se díky spolupráci dostali za svou křivku produkčních možností.
            </p>
        </div>
        </div>
        <p>
          Koncept komparativní výhody tak vysvětluje, proč je výhodná specializace a dělba práce mezi jednotlivci, skupinami (firmami) i mezi zeměmi. Objasňuje nám, proč je globalizace, která umožňuje snadnější dělbu práce v rámci celého světa, spojena s ekonomickým růstem.

        </p>
    </article>
      {/* NAVIGACE MEZI PODKAPITOLAMI */}
     <footer className="mt-16 pt-8 border-t border-slate-100">
  <div className="grid grid-cols-2 gap-4">
    
    {/* Předchozí kapitola */}
    <div className="flex justify-start">
      <Link 
        href="/zakladni-koncepty/hranice-produkcnich-moznosti" 
        className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
      >
        {/* Šipka zůstává nahoře u prvního řádku díky mt-1 */}
       
        <ArrowLeft size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all mt-1" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Předchozí</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Hranice produkčních možností a náklady obětované příležitosti
          </span>
        </div>
      </Link>
    </div>

    {/* Další kapitola */}
    <div className="flex justify-end">
      <Link 
        href="/zakladni-koncepty/nabidka-poptavka" 
        className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Další</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Nabídka, poptávka a tržní rovnováha
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