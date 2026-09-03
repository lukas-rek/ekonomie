"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";

export default function UvodDoEkonomie() {
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
          Lekce 01
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Úvod do ekonomie
        </h1>
        <div className="h-[2px] w-16 bg-[#F9C70F]"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Pod pojmem ekonomie si mnoho lidí představí jen peníze, grafy a pány v drahých sakách diskutující v Otázkách Václava Moravce o státním rozpočtu. 
          A skutečně i to jsou věci, kterými se ekonomie zabývá. Podstata a krása ekonomie však leží v něčem trochu jiném. Ekonomie je vědou o lidském jednání a rozhodování. 
          Zkoumá, jak lidé nakládají s vzácnými zdroji. Studium ekonomie nám pomáhá porozumět světu, ve kterém žijeme. 
          Proč má extraligový hokejista násobně vyšší plat než hasič? Jak rozhodnout, zda studovat déle na vysoké škole nebo jít pracovat? 
          Proč jsou některé státy chudé a jiné bohaté? Těmito a mnoha dalšími problémy našeho světa se ekonomie zabývá.
        </p>

        <DefinitionBox title="Definice ekonomie">
          Ekonomie je společenská věda, která studuje, jak lidé a společnost rozhodují o využití vzácných zdrojů k výrobě, distribuci a spotřebě statků a služeb.
        </DefinitionBox>

        <p>
          Výše vidíte jednu z definic ekonomie, se kterou se setkáte nejběžněji. Lidé čelí každý den nespočetně mnoha ekonomickým rozhodnutím o tom, jak využít neboli alokovat své zdroje. 
          Jinými slovy lidé čelí volbám neboli kompromisům (v angličtině výstižněji „trade-offs“). Můžeme si to představit na jednoduchém příkladu s penězi.
          Máme v kapse 200 korun a rozhodujeme se, zda půjdeme s kamarádem do kina nebo je použijeme na nákup nového trička. Vzácným zdrojem však nemusí být jenom peníze.
          Rozhodujeme se například o tom, jak alokovat náš čas. Zdali se půjdeme učit, trénovat volejbal, koukat na Netflix nebo vařit večeři. Při ekonomickém rozhodnutí se snažíme najít tu nejoptimálnější variantu tedy tu, která nám přinese největší užitek.
        </p>

        <p>
          Ekonomie stála dlouhou dobu na pomezí mezi společenskou a přírodní vědou. Narozdíl od přírodních věd jako je fyzika nebo chemie nepodléhá ekonomie univerzálním neměnným zákonitostem.
          Pokus, který uskuteční chemik si může kdokoliv na planetě zopakovat a za stejných podmínek bude výsledek stejný. Ekonom, protože předmětem jeho zkoumání je právě lidské jednání, které se žádnými pevně danými přírodními zákony neřídí, takovou možností nedisponuje. 
          To může vytvořit zajímavé situace, kdy lidé dokáží ekonomickou prognózu potvrdit či vyvrátit už jen tím, že se o ní dozví a na jejím základě změní své chování. Typickým příkladem budiž akciový trh. Pokud světová banka vydá prognózu, že trh v následujícím roce bude padat, lidé začnou na základě toho své akcie masivně prodávat, čímž prognózu potvrdí.
          V ekonomii je také zpravidla nemožné provádět experimenty s izolovanými proměnnými a spoléhá se tedy na teoretické modely a analýzu historických dat.
        </p>

        <p>
          Jako zakládající dílo ekonomie považujeme Bohatství národů skotského filosofa Adama Smitha z roku 1776.
          V tomto díle z období průmyslové revoluce popisuje základy hospodářského růstu. Odtud pochází i slavná metafora „neviditelné ruky trhu“. 
          Podle Smitha jsou zájmy společnosti nejlépe naplněny, když každý sleduje svůj vlastní zájem. „Neočekáváme, že svůj oběd dostaneme z dobré vůle řezníka, pivovarníka či pekaře, nýbrž v důsledku toho, že všichni jmenovaní sledují vlastní zájem.“
        </p>

        <DefinitionBox title="Ekonomie a ekonomika">
          Tyto dva pojmy se lidem často pletou. Ekonomie (angl. economics) je vědní obor a ekonomika (angl. economy) představuje hospodaření určitého celku. 
        </DefinitionBox>

        <p>
          Ekonomii standardně dělíme podle předmětu zkoumání na <strong>mikroekonomii</strong> a <strong>makroekonomii</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li><strong>Mikroekonomie:</strong> Zkoumá chování jednotlivých ekonomických subjektů (jednotlivců, domácností, firem).</li>
          <li><strong>Makroekonomie:</strong> Zkoumá ekonomiku jako celek, nejčastěji skrze tzv. agregáty (inflace, nezaměstnanost, HDP).</li>
        </ul>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-4">Tři základní otázky ekonomie</h3>
        <p>
          Ať se podíváme na jakoukoliv ekonomiku, vždy řeší tři základní otázky: <b>co vyrábět</b> (jaké statky a služby a v jakém množství), <b>jak vyrábět</b> (jakou kombinací výrobních faktorů a jakou technologií) a <b>pro koho vyrábět</b> (jak se vyrobené statky rozdělí mezi lidi). Způsob, jakým se ekonomika k odpovědím na tyto otázky dostává, se nazývá ekonomický systém. V <b>tržní ekonomice</b> o tom rozhodují ceny a dobrovolná směna mezi jednotlivci, v <b>příkazové ekonomice</b> o tom rozhoduje centrální plánovač (stát), a většina reálných ekonomik dnešního světa je <b>smíšená</b>, tedy kombinují tržní mechanismy se státními zásahy. 
        </p>

        <h3 className="font-serif font-bold text-stone-900 text-xl pt-4">Ekonomické školy</h3>
        <p>
          Ekonomové se velmi často neshodnou na závěrech vycházejících klidně ze stejných dat. 
          Často je to tím, jakou váhu přikládají různým faktorům, jaké modely používají nebo jaké proměnné se rozhodnou ve svých předpokladech zanedbat.
          Směry ekonomického myšlení se nazývají ekonomické školy. Různé ekonomické školy přistupují ke zkoumání stejných fenoménů různě. 
          Mezi známé ekonomické školy patří například rakouská ekonomická škola, keynesiánství nebo monetarismus. Dnešní mainstream představuje syntéza neoklasické mikroekonomie a novokeynesiánské makroekonomie, často označovaná jako  &quot;neoklasická syntéza&quot;.
          Některými se zabýváme v kapitole <a href="/dejiny-ekonomickeho-mysleni" className="text-stone-900 underline decoration-[#F9C70F] decoration-2 hover:text-stone-600 font-medium">Dějiny ekonomického myšlení</a>. 
        </p>

        <InteractiveQuestion 
          question="Co je podstatou ekonomické nauky?"
          options={[
            "Maximalizace zisku firem a bohatství společnosti", 
            "Mezinárodní obchod", 
            "Lidské jednání a alokace vzácných zdrojů"
          ]}
          correctAnswer={2}
          explanation="Ekonomie zkoumá, jak se lidé a společnost rozhoduje při alokaci vzácných zdrojů."
        />

        <p>
          Nyní již víme, co ekonomie zkoumá. V dalších částech této kapitoly se na některé ekonomické koncepty podíváme více do hloubky.
        </p>
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/metodologie" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Metodologie a ekonomické modely
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