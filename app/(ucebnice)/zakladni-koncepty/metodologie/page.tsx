"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from '@/components/Image';
import ChecklistTable from '@/components/ChecklistTable';

export default function MetodologiePage() {
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
          Lekce 02
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Metodologie a ekonomické modely
        </h1>
        <div className="h-[2px] w-16 bg-orange-700"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Ekonomie se pohybuje na hraně mezi exaktní vědou a humanitním oborem. Ekonomové jsou jako vědci: pozorují svět, vytváří teorie a ty se následně snaží ověřit.
          Ekonom však nemůže zavřít celou zemi nebo celý svět do zkumavky, aby své teorie mohl ověřit. Musí tak používat specifické nástroje.
          Kdybychom chtěli popsat třeba ekonomiku Česka v její úplnosti, museli bychom sledovat každou jednu transakci miliónů lidí a jejich okolnosti. To je pochopitelně nemožné.
          Ekonomové proto používají značnou míru abstrakce a tvoří takzvané <strong>modely</strong>.
          Model záměrně zjednodušuje realitu, zanedbává či úplně vynechává některé detaily a stanovuje si generalizované předpoklady. To pak umožňuje vidět klíčové vztahy.
        </p>

        <p>
          Naprostá většina ekonomických modelů pracuje se dvěma základními předpoklady. Tím prvním je <strong>„ceteris paribus“</strong>, neboli „za nezměněných podmínek.“
          Při zkoumání vztahu nějakých veličin musíme předpokládat, že vše ostatní zůstává neměnné. 
          Například pokud cena jablek vzroste, lidé jich koupí méně, ale jen tehdy, pokud se zároveň nezmění jejich příjem nebo cena hrušek.
          V realitě se ale stává, že některé veličiny se mění zároveň. Když se třeba změní ceny jablek, může se zároveň změnit i cena hrušek a závěry vyplývající z našeho modelu nemusí platit.
          Proto můžete často slyšet, že ekonomové se často neshodují například na tom, čím je způsobena inflace a podobně.
          Druhým předpokladem, se kterým ekonomové často pracují je <strong>homo economicus</strong>. Jde o konstrukt racionálního ekonomického aktéra, který vždy maximalizuje svůj užitek. 
          Tento předpoklad často kritizuje obor behaviorální ekonomie, která koncept homo economicus zavrhuje. 
          Model homo economicus ale zůstává užitečným výchozím bodem, protože nám dává jasný standard, od kterého se můžeme odrazit.
        </p>

        <Image
          width={400}
          height={400}
          align="left"
          className="max-w-md"
          src="/img/Ekonomický oběh.png"
          alt="Diagram ekonomického oběhu"
          caption="Diagram ekonomického oběhu: toky statků, služeb a peněz mezi domácnostmi a firmami"
        />

        <p>
          Prvním modelem, který si zde představíme je ekonomický oběh. Jde o model proudění prostředků (peněz, statků) v ekonomice. 
          Figurují v něm dva typy hráčů: firmy a domácnosti. Vnitřní okruh reprezentuje proud fyzických věcí a služeb a vnější okruh reprezentuje peněžní toky. 
          Pracuje s tím, že příjem jednoho je výdajem někoho jiného a není v něm zahrnut stát a zahraniční obchod.
          Během studia ekonomie se budete setkávat s mnoha dalšími modely a vždy je důležité si uvědomovat kontext jejich použití.
        </p>
        
        <div className="clear-both"></div>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-4">Pozitivní a normativní ekonomie</h3>
        <p>
          V ekonomii musíme také oddělovat dva přístupy: <strong>pozitivní a normativní ekonomii</strong>. 
          Pozitivní ekonomie se snaží objektivně popisovat a vysvětlovat náš svět a jak funguje ekonomika. Zkoumá „co je“. Normativní ekonomie přináší soudy a doporučení.
          Zkoumá „jak by to mělo být“. Ekonomové tak vystupují ve dvou rolích: v pozitivní ekonomii jako vědci a v normativní jako tvůrci ekonomických politik. 
        </p>

        <ChecklistTable
          title="Pozitivní nebo normativní tvrzení?"
          options={[
            { id: 'poz', label: 'Pozitivní' },
            { id: 'norm', label: 'Normativní' }
          ]}
          questions={[
            { text: "Nezaměstnanost je 3,5 %.", correct: "poz" },
            { text: "Vláda by měla snížit daně pro rychlejší růst HDP.", correct: "norm" },
            { text: "Průměrná mzda vzrostla o 4000 kč.", correct: "poz" },
            { text: "Pro maximalizaci zisku by měly firmy zvyšovat mzdy pomaleji než než jim roste zisk.", correct: "norm" },
          ]}
        />

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-4">Metodologické směry</h3>
        <p>
          Existuje více metodologických směrů, které se používají ke zkoumání našeho světa.
          <strong> Apriorismus</strong> je založený na <strong>dedukci</strong>. Vychází z nezpochybnitelných tvrzení (axiomů), ze kterých se logickým postupem odvozují další zákony.
          Statistiky nemohou teorii vyvrátit. Pokud data nesouhlasí s logicky odvozenou teorií, je chyba v datech nebo interpretaci. 
          Pokud totiž není chyba v předpokladu a logickém postupu, musí zákony takto odvozené vždy být pravdivé.
          Tento přístup dominuje klasické ekonomii a rakouské ekonomické škole.
          <strong> Pozitivismus</strong> je přístup dnes převládající v ekonomii hlavního proudu. Jde o přístup založený na <strong>empirii</strong> a <strong>indukci</strong>. Ekonomické hypotézy hodnotíme podle toho, jak přesně dokáže popsat a předpovídat výsledky v reálném světě.
          Teorie často vytváří pohledem na existující data, ze kterých poté vyvozuje závěry.
        </p>

        <p>
          Oborem, který se zabývá analýzou, ověřováním a predikcí ekonomických jevů pomocí statistických metod je <strong>ekonometrie</strong>. Je klíčová pro pozitivistický přístup.
          Zatímco ekonomická teorie řekne: „Když lidem vzrostou příjmy, budou víc utrácet,“ ekonometrie spočítá: „Když lidem v Česku stoupne plat o 1 000 Kč, utratí v průměru o 750 Kč více.“
        </p>

        <p>
          To je vše o postupech a metodách ekonomického výzkumu. Příště se již podíváme na základní pojmy z ekonomie.
        </p>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/uvod-ekonomie" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-orange-700 group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Úvod do ekonomie
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/statek-vzacnost-uzitek-hodnota" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-orange-700 leading-snug">
                  Statek, vzácnost, užitek, hodnota
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