"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Image as ImageIcon, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import ExplanationBox from "@/components/ExplanationBox";
import FactorsClassification from "@/components/zakladni-koncepty/FactorsClassification"
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import MarginalProductChart from "@/components/zakladni-koncepty/MarginalProductChart"

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
          VÝROBNÍ FAKTORY
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        {/* <p className="italic mt-3">
            Lukáš Rek, 2026
        </p> */}
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed text-lg">
        <p>
          Aby mohl vzniknout jakýkoliv ekonomický statek, musí dojít k procesu výroby, v keterém se nějaké vstupy mění na výstupy.
          Vstupy výrobního procesu nazýváme <strong>výrobní faktory</strong>. 
          Klasická teorie rozlišuje tři výrobní faktory: <strong>půda, práce, kapitál</strong>, ke kterým se v moderní ekonomii přidává ještě čtvrtý: <strong>podnikavost</strong>.
          Pojďme si je nyní rozebrat.
        </p>
        <p>
            <strong>Půda (angl. land, značíme „A“)</strong> se někdy také skrývá pod pojmem <strong>přírodní zdroje</strong>. Jde o primární faktor výroby, který není výsledkem předchozí lidské činnosti.
            Nejedná se tedy pouze o půdu ve smyslu pozemků, ale zahrnujeme do ní i nerostné suroviny, vodu či energie.
        </p>
        <p>
            <strong>Práce (angl. labour, značíme „L“)</strong> je rovněž primárním výrobním faktorem. Jde o lidskou činnost s nějakým účelem, při níž je využíváno fyzických a duševních schopností člověka. 
            Někdy mluvíme o tzv. lidském kapitálu (kvalifikace, praxe, skills jednotlivce) jako o součásti tohoto faktoru produkce. Můžeme se však setkat s řazením lidského kapitálu do čtvrtého faktoru, tedy nehmotného kapitálu.
        </p>
        <p>
            <strong>Kapitál (angl. capital značíme K)</strong> je sekundárním, neboli odvozeným výrobním faktorem. Jsou to statky, které byly vyrobeny proto, aby sloužily k další výrobě.
            V běžné řeči kapitálem označujeme i peníze nebo cenné papíry. Ty v ekonomii často oddělujeme jako tzv. finanční kapitál. Finanční kapitál není výrobním prostředkem a kapitálem v tomto slova smyslu. 
            Kapitálem jako výrobním faktorem se stane až při investici do hmatatelných prostředků - někdy pro přesnost fyzického kapitálu.
        </p>
        <p>Zvláštním případem kapitálu je lidský kapitál, tedy souhrn znalostí, dovedností a zkušeností, které člověk získává vzděláním a praxí a které zvyšují jeho produktivitu. Na rozdíl od fyzického kapitálu (stroje, budovy) je lidský kapitál neoddělitelně spjatý s konkrétním člověkem. Investice do lidského kapitálu (studium, kurzy, praxe) fungují podobně jako investice do fyzického kapitálu. Dnes se něčeho vzdáme (času, peněz, mzdy z práce, kterou bychom mohli dělat místo studia) výměnou za vyšší produktivitu a příjem v budoucnu.</p>
        <p>
            <strong>Nehmotný kapitál</strong> nebo <strong>podnikavost (angl. entrepreneurship, značíme T)</strong> je čtvrtým výrobním faktorem, který moderní ekonomie přidává ke třem tradičním.
            Tento výrobní faktor přináši schopnost kombinace předchozích výrobních faktorů, inovace a nese riziko. Zařadíme sem tedy know-how podniku na výrobu nebo schopnosti řízení podniku.
        </p>
        <ExplanationBox title="Práce nebo podnikavost?">
                    Někdy nelze zcela jednoznačně určit, co je práce a co je již podnikavost. Schopnost zkombinovat výrobní faktory, přinést inovace, know-how a podobně lze totiž vnímat i jako součást lidského kapitálu, který tradičně řadíme do práce. Lze jej však brát i jako základ podnikavosti. Z praktických důvodů se podnikavost jako výrobní faktor proto často vynechává.
        </ExplanationBox>

        <FactorsClassification></FactorsClassification>
        <p>
            Výrobními faktory se v různých kontextech více zabývá kapitola <a href="/app/mikroekonomie" className= "italic text-blue-600">Mikroekonomie</a>. Zde si pojďme ještě vysvětlit jeden důležitý koncept výroby související s výrobními faktory.
            Jedná se o <strong>zákon klesajícího mezního produktu (klesajících výnosů)</strong>. V předchozí podkapitole jsme hovořili o zákonu klesajícího mezního produktu. Princip tohoto zákona je velmi podobný.
            Říká nám, že při postupném přidávání jednotek jednoho výrobního faktoru se ceteris paribus přírustky celkové produkce budou nejprve zvyšovat, později ale bude přírustek zpomalovat, stagnovat a v určitém bodě začne klesat. 
            <Latex> {String.raw`platí tak: $MPF=\frac{\Delta Q}{\Delta F}$`}</Latex>, kde F je množství výrobního faktoru, Q je celková produkce a MPF je mezní produkt výrobního faktoru.
            Nejčastěji se pracuje s MPL (mezní produkt práce), kde se jednotkou práce rozumí počet zaměstnanců nebo pracovních hodin nebo s MPK (mezním produktem kapitálu). S MPA se setkáte především v zemědělství, MPT se příliš často nepoužívá.
            Zákon klesajících výnosů si můžeme představit na příkladu kavárny. Budeme přidávat jednotky práce a ostatní podmínky zůstanou nezměněné. 
            Když budeme mít jednoho zaměstnance, zvládne vyprodukovat za hodinu třeba 20 káv. Když mu přidáme druhého, zvládnou spolu 40, protože si mohou práci lépe rozdělit - jeden bude kávu vařit, druhý bude přidávat mléko. Když přidáme třetího, produkce se opět o něco zvětší - může třeba umývat nádobí.
            Když však budeme takto postupovat, postupně si zaměstnanci začnou vzájemě překážet a produkce začne stagnovat a klesat. Nezapomeňte, že množství kapitálu se nemění. Stále tedy pracujeme s jedním kávovarem, mlékem atd.
            </p><p>Na rozdíl od zákona klesajícího mezního užitku, počítáme u tohoto zákona s tím, že se mezní produkt zvětšuje, a až později začne klesat. Křivka je proto na začátku konvexní.
        </p>
        <MarginalProductChart></MarginalProductChart>
        <p>
            To je vše ze základního seznámení s výrobními faktory. V příští podkapitole se podíváme na hranici produkčních možností a koncept nákladů obětované příležitosti. 
        </p>
      </article>

{/* NAVIGACE MEZI PODKAPITOLAMI */}
     <footer className="mt-16 pt-8 border-t border-slate-100">
  <div className="grid grid-cols-2 gap-4">
    
    {/* Předchozí kapitola */}
    <div className="flex justify-start">
      <Link 
        href="/zakladni-koncepty/statek-vzacnost-uzitek-hodnota" 
        className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
      >
        <ArrowLeft size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all mt-1" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Předchozí</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Statek, vzácnost, užitek, hodnota
          </span>
        </div>
      </Link>
    </div>

    {/* Další kapitola */}
    <div className="flex justify-end">
      <Link 
        href="/zakladni-koncepty/hranice-produkcnich-moznosti" 
        className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Další</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Hranice produkčních možností a náklady obětované příležitosti
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