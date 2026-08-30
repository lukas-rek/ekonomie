"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import FactorsClassification from '@/components/zakladni-koncepty/FactorsClassification';
import MarginalProductChart from '@/components/zakladni-koncepty/MarginalProductChart';

export default function VyrobniFaktoryPage() {
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
          Lekce 04
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Výrobní faktory
        </h1>
        <div className="h-[2px] w-16 bg-orange-700"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Už víme, že k uspokojování lidských potřeb slouží statky. Většina statků (ekonomické statky) však nevzniká sama od sebe a musí být vyrobena. 
          Všechny vstupy, které jsou k této výrobě statků a služeb zapotřebí, nazýváme v ekonomii <strong>výrobní faktory</strong> (někdy také <strong>vstupy</strong> neboli <strong>inputy</strong>). 
        </p>

        <p>
          Ekonomie tradičně rozlišuje tři základní výrobní faktory: <strong>půdu</strong>, <strong>práci</strong> a <strong>kapitál</strong>.
          V moderní ekonomii se k nim však stále častěji přidává čtvrtý faktor: <strong>podnikavost</strong>.
          Každý výrobní faktor je ve vlastnictví nějakého ekonomického subjektu a za jeho poskytnutí do výrobního procesu náleží majiteli určitá odměna (důchod).
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          1. Půda (přírodní zdroje)
        </h2>
        <p>
          Pod pojmem půda (angl. <i>land</i>) v ekonomii nerozumíme pouze ornou půdu pro zemědělství. Zahrnujeme sem <strong>veškeré přírodní zdroje</strong>, které nebyly vytvořeny lidskou činností a jsou darem přírody. 
          Patří sem nerostné suroviny (uhlí, ropa, kovy), voda, vzduch, lesy, ale i samotný prostor pro stavbu továrny.
        </p>
        <p>
          Klíčovou vlastností půdy je její <strong>neobnovitelnost či omezené množství</strong> – rozlohu planety ani zásoby ropy nelze jednoduše nafouknout.
          Cenou za použití půdy, respektive důchodem plynoucím z jejího vlastnictví, je <strong>pozemková renta</strong>.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          2. Práce
        </h2>
        <p>
          Práce (angl. <i>labor</i>) představuje <strong>lidskou činnost</strong> vynaloženou při výrobě statků a poskytování služeb. 
          Zahrnuje jak fyzickou sílu (např. práce dělníka na stavbě), tak duševní úsilí (např. programování softwaru nebo lékařská diagnóza).
        </p>
        <p>
          Množství práce v ekonomice je limitováno počtem obyvatel, jejich věkovou strukturou a ochotou pracovat. Její kvalita je dána vzděláním, praxí a dovednostmi – tomuto konceptu říkáme <strong>lidský kapitál</strong>.
          Odměnou za práci je <strong>mzda</strong> (případně plat).
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          3. Kapitál
        </h2>
        <p>
          Na rozdíl od půdy a práce není kapitál (angl. <i>capital</i>) primárním zdrojem – je to <strong>statkem, který byl již dříve vyroben</strong>, aby sloužil k výrobě dalších statků (jde o statky vyššího řádu).
          Rozlišujeme dvě základní formy kapitálu:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li><strong>Reálný (fyzický) kapitál:</strong> Budovy, výrobní linky, stroje, nástroje, počítače nebo zásoby materiálu.</li>
          <li><strong>Finanční kapitál:</strong> Peníze, cenné papíry či úvěry, které slouží k nákupu fyzického kapitálu. Samy o sobě nic nevyrábějí, ale umožňují investice.</li>
        </ul>
        <p>
          Odměnou za poskytnutí kapitálu je <strong>úrok</strong> (nebo <strong>zisk</strong>). 
          Procesu, kdy se v ekonomice tvoří nový kapitál (např. stavba nové haly), říkáme <strong>investice</strong>. 
          Opotřebení kapitálu v čase se v účetnictví a ekonomii nazývá <strong>odpisy (amortizace)</strong>.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          4. Podnikavost
        </h2>
        <p>
          Mít k dispozici půdu, lidi a stroje ještě nestačí. Někdo musí tyto tři faktory vzít, zorganizovat je do fungujícího celku, přijít s nápadem a nést <strong>podnikatelské riziko</strong>. 
          Právě tuto schopnost nazýváme podnikavostí (angl. <i>entrepreneurship</i>).
        </p>
        <p>
          Podnikatel kombinuje vstupy tak, aby uspokojil potřeby zákazníků a ideálně dosáhl kladného hospodářského výsledku. 
          Odměnou za podstoupené riziko a úspěšné inovace je <strong>čistý ekonomický zisk</strong>.
        </p>

        <FactorsClassification />

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Výrobní funkce a zákon klesajících mezních výnosů
        </h2>
        <p>
          To, jakým způsobem firma kombinuje výrobní faktory k dosažení výstupu (výrobků), popisuje v ekonomii tzv. <strong>produkční (výrobní) funkce</strong>.
          Matematicky ji obvykle zapisujeme jako: 
        </p>

        <div className="p-4 bg-[#F5F2EB] border border-stone-300 rounded-lg text-center font-mono font-bold text-stone-900 text-base md:text-lg">
          Q = f(K, L, P)
        </div>

        <p>
          Kde <i>Q</i> je celkový objem produkce (Total Product), <i>K</i> představuje kapitál, <i>L</i> práci a <i>P</i> půdu.
        </p>

        <p>
          S výrobní funkcí úzce souvisí jeden z nejdůležitějších ekonomických zákonů – <strong>zákon klesajících mezních výnosů</strong>. 
          Tento zákon říká: <i>Pokud budeme zvyšovat množství jednoho výrobního faktoru (např. práce) a ostatní faktory zůstanou neměnné (např. velikost dílny a počet strojů), 
          přírůstek celkové produkce z každé další přidané jednotky (mezní produkt – MP) začne dříve či později klesat.</i>
        </p>

        <MarginalProductChart />

        <DefinitionBox title="Mezní produkt (MP)">
          Mezní produkt (Marginal Product) je dodatečný výstup, který ekonomika nebo firma vyprodukuje zapojením jedné dodatečné jednotky daného výrobního faktoru (např. jednoho dalšího zaměstnance) při nezměněném množství ostatních faktorů.
        </DefinitionBox>

        <p>
          Představte si malou pizzerii s jednou pecí. 
          Pokud v kuchyni pracuje jeden kuchař, stíhá upéct 10 pizz za hodinu. 
          Když přijmeme druhého kuchaře, mohou si práci rozdělit (jeden válí těsto, druhý sází do pece) a vyrobí 25 pizz za hodinu – <strong>mezní produkt druhého kuchaře je 15 pizz</strong> (výnosy rostou díky dělbě práce).
        </p>
        <p>
          Pokud ale přijmeme třetího, čtvrtého a pátého kuchaře, pec je stále jen jedna a prostor v kuchyni je omezený. 
          Kuchaři si začnou překážet, čekat na uvolnění stolu a jejich mezní přínos klesá (čtvrtý kuchař přidá k produkci už jen 2 pizzy za hodinu). 
          Pokud bychom přijali desátého kuchaře, celková produkce může dokonce klesnout, protože se v kuchyni ani nehnou (mezní produkt je záporný).
        </p>

        <InteractiveQuestion 
          question="Co je odměnou za výrobní faktor 'Půda'?"
          options={[
            "Mzda", 
            "Úrok", 
            "Pozemková renta", 
            "Zisk"
          ]}
          correctAnswer={2}
          explanation="Důchodem plynoucím z vlastnictví půdy a přírodních zdrojů je pozemková renta. Mzda náleží práci, úrok kapitálu a zisk podnikavosti."
        />

        <p>
          Porozumění výrobním faktorům a jejich efektivnímu kombinování je klíčem k pochopení toho, jak firmy minimalizují náklady a jak bohatnou celé národy. 
          V příští lekci se podíváme na to, jaké limity má ekonomika při výrobě statků pomocí <strong>Hranice produkčních možností (PPF)</strong>.
        </p>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/statek-vzacnost-uzitek-hodnota" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-orange-700 group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Statek, vzácnost, užitek, hodnota
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/hranice-produkcnich-moznosti" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Hranice produkčních možností
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