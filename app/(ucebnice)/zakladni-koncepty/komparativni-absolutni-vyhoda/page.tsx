"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import ExplanationBox from "@/components/ExplanationBox";
import PPCAdvantages from '@/components/zakladni-koncepty/PPCAdvantages';
import PPCAdvantages2 from '@/components/zakladni-koncepty/PPCAdvantages2';
import QuizCarousel from '@/components/QuizCarousel';

export default function KomparativniAbsolutniVyhodaPage() {
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
          Lekce 06
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Komparativní a absolutní výhoda
        </h1>
        <div className="h-[2px] w-16 bg-[#F9C70F]"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Proč státy obchodují mezi sebou? Proč si každý člověk nevyrábí vlastní oblečení, nepěstuje si vlastní jídlo a nestaví vlastní dům? 
          Odpověď leží v principech <strong>dělby práce, specializace a komparativní výhody</strong>. 
          V této podkapitole pochopíte jeden z největších objevů ekonomické vědy, který dokazuje, že <strong>dobrovolný obchod je výhodný pro obě strany</strong> – a to i v případě, že je jeden z partnerů ve všem výrazně lepší než ten druhý.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          Specializace a dělba práce
        </h2>
        <p>
          Už <strong>Adam Smith</strong> ve svém díle <i>Bohatství národů</i> (1776) popsal obrovskou sílu dělby práce na slavném příkladu výroby špendlíků: 
          Jeden dělník, který by dělal všechny operace sám (tahání drátu, rovnání, stříhání, broušení hrotu, nasazování hlavičky), by za den vyrobil stěží 20 špendlíků. 
          Když se však výroba rozdělila na 18 samostatných operací mezi 10 specializovaných pracovníků, dokázali společně vyrobit <strong>48 000 špendlíků denně</strong>!
        </p>
        <p>
          Díky specializaci se lidé i celé státy zaměřují na to, co umí nejlépe, čímž roste celková produktivita a bohatství společnosti.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          1. Absolutní výhoda (Adam Smith)
        </h2>
        <p>
          Teorii <strong>absolutní výhody</strong> představil Adam Smith jako argument pro svobodný mezinárodní obchod.
        </p>

        <DefinitionBox title="Absolutní výhoda">
          Země (nebo jednotlivec) má absolutní výhodu ve výrobě statku, pokud ho dokáže vyrobit s <strong>menším množstvím vstupů</strong> (např. za méně času, s menšími náklady či menším počtem pracovníků) než jiný subjekt.
        </DefinitionBox>

        <p>
          Představme si dvě země – <strong>Česko</strong> a <strong>Kolumbii</strong>. Obě mají k dispozici stejné množství práce (např. 1 pracovní den) a mohou vyrábět buď <strong>Pivo</strong>, nebo <strong>Kávu</strong>.
        </p>

        {/* Tabulka pro absolutní výhodu */}
        <div className="overflow-hidden border border-stone-300 rounded-xl bg-[#FDFCF9] shadow-xs my-6">
          <table className="w-full text-left border-collapse font-sans">
            <thead className="bg-[#F7F4EE] border-b border-stone-300">
              <tr>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Země</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Produkce Piva (hl / den)</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Produkce Kávy (pytle / den)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Česko</td>
                <td className="p-3 text-stone-900 font-bold">10 hl <span className="text-xs text-emerald-700 font-normal">(absolutní výhoda)</span></td>
                <td className="p-3 text-stone-700">2 pytle</td>
              </tr>
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Kolumbie</td>
                <td className="p-3 text-stone-700">3 hl</td>
                <td className="p-3 text-stone-900 font-bold">8 pytlů <span className="text-xs text-emerald-700 font-normal">(absolutní výhoda)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Z tabulky je zřejmé:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li><strong>Česko má absolutní výhodu v pivu:</strong> za den vyrobí 10 hl oproti 3 hl v Kolumbii.</li>
          <li><strong>Kolumbie má absolutní výhodu v kávě:</strong> za den vyprodukuje 8 pytlů oproti 2 pytlům v Česku.</li>
        </ul>
        <p>
          Řešení je intuitivní: Česko se bude plně specializovat na pivo, Kolumbie na kávu a následně si statky mezi sebou vymění. Obě země na tom budou lépe.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          2. Komparativní výhoda (David Ricardo)
        </h2>
        <p>
          Co se ale stane, pokud má jedna země absolutní výhodu <strong>v úplně všem</strong>? Má taková země důvod s někým slabším obchodovat? 
          A má slabší země vůbec co nabídnout?
        </p>
        <p>
          Na tuto otázku odpověděl britský ekonom <strong>David Ricardo</strong> v roce 1817 svou revoluční teorií <strong>komparativní výhody</strong>.
        </p>

        <DefinitionBox title="Komparativní výhoda">
          Země má komparativní výhodu ve výrobě statku, pokud ho dokáže vyrobit s <strong>nižšími náklady obětované příležitosti</strong> než jiná země (musí se vzdát menšího množství jiného statku).
        </DefinitionBox>

        <p>
          Představme si novou situaci mezi <strong>Německem</strong> a <strong>Portugalskem</strong> při výrobě <strong>Automobilů</strong> a <strong>Vína</strong> za 1 rok:
        </p>

        {/* Tabulka pro komparativní výhodu */}
        <div className="overflow-hidden border border-stone-300 rounded-xl bg-[#FDFCF9] shadow-xs my-6">
          <table className="w-full text-left border-collapse font-sans">
            <thead className="bg-[#F7F4EE] border-b border-stone-300">
              <tr>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Země</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Automobily (ks)</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Víno (tisíce litrů)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Německo</td>
                <td className="p-3 text-stone-900 font-bold">100 ks <span className="text-xs text-emerald-700 font-normal">(abs. výhoda)</span></td>
                <td className="p-3 text-stone-900 font-bold">120 tis. l <span className="text-xs text-emerald-700 font-normal">(abs. výhoda)</span></td>
              </tr>
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Portugalsko</td>
                <td className="p-3 text-stone-700">20 ks</td>
                <td className="p-3 text-stone-700">60 tis. l</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Všimněte si: <strong>Německo má absolutní výhodu v obou statcích</strong>. Vyrobí více aut i více vína než Portugalsko. 
          Vyplatí se Německu s Portugalskem vůbec obchodovat? <strong>Ano!</strong> Musíme se totiž podívat na <i>náklady obětované příležitosti</i>.
        </p>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-2">Výpočet nákladů obětované příležitosti:</h3>
        
        {/* Tabulka nákladů obětované příležitosti */}
        <div className="overflow-hidden border border-stone-300 rounded-xl bg-[#FDFCF9] shadow-xs my-6">
          <table className="w-full text-left border-collapse font-sans">
            <thead className="bg-[#F7F4EE] border-b border-stone-300">
              <tr>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Země</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Náklad na 1 automobil (kolik vína obětuje?)</th>
                <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Náklad na 1 tis. l vína (kolik aut obětuje?)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Německo</td>
                <td className="p-3 text-stone-900 font-bold">1,2 tis. l vína <span className="text-xs text-emerald-700 font-normal">(120 / 100)</span></td>
                <td className="p-3 text-stone-700">0,83 auta (100 / 120)</td>
              </tr>
              <tr className="hover:bg-stone-100/50 transition-colors">
                <td className="p-3 font-serif font-bold text-stone-900">Portugalsko</td>
                <td className="p-3 text-stone-700">3 tis. l vína (60 / 20)</td>
                <td className="p-3 text-stone-900 font-bold">0,33 auta <span className="text-xs text-emerald-700 font-normal">(20 / 60)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ExplanationBox title="Kdo má komparativní výhodu?">
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>V automobilech má komparativní výhodu Německo:</strong> Na výrobu 1 auta se musí vzdát pouze 1,2 tis. l vína (zatímco Portugalsko by muselo obětovat 3 tis. l).</li>
            <li><strong>Ve víně má komparativní výhodu Portugalsko:</strong> Na výrobu 1 tis. l vína se vzdá pouze 0,33 auta (zatímco Německo by muselo obětovat 0,83 auta).</li>
          </ul>
        </ExplanationBox>

        <p>
          <strong>Závěr:</strong> Německo se bude specializovat na auta, Portugalsko na víno. 
          Pokud Německo vymění 1 auto za např. 2 tisíce litrů vína, získají obě země: Německo dostane více vína, než kdyby si ho vyrobilo samo (2 &gt; 1,2), a Portugalsko koupí auto levněji, než za kolik by ho vyrobilo samo (obětuje jen 2 tis. l vína místo 3 tis. l).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <PPCAdvantages 
            title="PPF před obchodem"
            xAxisLabel="Auta"
            yAxisLabel="Víno"
          />
          <PPCAdvantages2 
            title="Možnosti po zapojení do obchodu"
            xAxisLabel="Auta"
            yAxisLabel="Víno"
          />
        </div>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Shrnutí a přínos mezinárodního obchodu
        </h2>
        <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
          <li><strong>Absolutní výhoda</strong> porovnává produktivitu (kdo vyrobí více s danými zdroji).</li>
          <li><strong>Komparativní výhoda</strong> porovnává náklady obětované příležitosti (kdo obětuje méně jiných statků).</li>
          <li>Země může mít absolutní nevýhodu ve všem, ale <strong>vždy bude mít v něčem komparativní výhodu</strong>.</li>
          <li>Díky mezinárodnímu obchodu mohou všechny zúčastněné země <strong>spotřebovávat za hranicí svých vlastních produkčních možností (PPF)</strong>.</li>
        </ul>

        <QuizCarousel>
          <InteractiveQuestion
            question="Co je podmínkou pro to, aby měl subjekt komparativní výhodu v dané činnosti?"
            options={[
              "Dokáže daný statek vyrobit s nejnižšími náklady obětované příležitosti.",
              "Dokáže vyrobit absolutně největší množství daného statku.",
              "Vlastní nejmodernější technologie na trhu."
            ]}
            correctAnswer={0}
            explanation="Komparativní výhoda je založena výhradně na nejnižších nákladech obětované příležitosti, nikoli na absolutním objemu produkce."
          />
          <InteractiveQuestion
            question="Špičkový právník píše na klávesnici 2x rychleji než jeho sekretářka. Měl by si psát smlouvy sám?"
            options={[
              "Ano, protože má absolutní výhodu v psaní.",
              "Ne, protože jeho náklady obětované příležitosti (ušlý právní honorář) jsou mnohem vyšší než mzda sekretářky.",
              "Ano, ušetří tím peníze za zaměstnance."
            ]}
            correctAnswer={1}
            explanation="Právník má sice absolutní výhodu v psaní, ale sekretářka má v psaní komparativní výhodu, protože obětuje mnohem méně hodnotnou práci než právník."
          />
        </QuizCarousel>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/hranice-produkcnich-moznosti" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-[#F9C70F] group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Hranice produkčních možností
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/nabidka-poptavka" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Nabídka, poptávka a tržní rovnováha
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