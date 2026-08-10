"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Image as ImageIcon, ArrowRight } from 'lucide-react';
import MarketChart from '@/components/zakladni-koncepty/MarketChart';
import InteractiveMarketChart from '@/components/zakladni-koncepty/InteractiveMarketChart';
import QuizCarousel from '@/components/QuizCarousel';
import InteractiveQuestion from '@/components/InteractiveQuestion';
import ExplanationBox from '@/components/ExplanationBox';

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
          NABÍDKA, POPTÁVKA A TRŽNÍ ROVNOVÁHA
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        {/* <p className="italic mt-3">
            Lukáš Rek, 2026
        </p> */}
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed text-lg">
        <p>
          Nyní se v rychlosti podíváme na jeden z nejzákladnějších konceptů ekonomie, který budeme podrobněji probírat v kapitole <a href="/Mikroekonomie" className="underline font-light italic text-blue-600">Mikroekonomie</a>.
          Jde o princip sil, které jsou motorem celého tržního hospodářství, od rohlíků až po ceny akcií technologických gigantů. Jde o princip nabídky, poptávky a tržní rovnováhy. Protože jak kdysi s nadsázkou řekl skotský historik Thomas Carlyle: „Naučte papouška říkat ‚Nabídka a poptávka‘ a máte ekonoma.“
        </p>
        <p className='text-3xl font-bold text-black'>
          Poptávka
        </p>
        <p>
        Poptávka vyjadřuje vztah mezi cenou statku a množstvím, které jsou kupující ochotni a schopni při této ceně koupit.
        Zákon poptávky nám říká, že ceteris paribus s rostoucí cenou klesá poptávané množství statku (množství statku, které jsou lidé ochotni koupit). 
        Poptávková křivka má pro to v grafickém znázornění negativní sklon, tedy je klesající. 
        Poptávkový zákon je intuitivní. Sami jako spotřebitelé každý den vnímáme, že čím je něco levnější, tím více si toho chceme koupit.
        </p><p>Poptávku samozřejmě ovlivňují různé faktory, které její křivku mohou posunout doprava (nárust) nebo doleva (pokles). 
        Prvním faktorem je <strong>důchod spotřebitele</strong>. U normálních statků s růstem důchodu, tedy příjmu spotřebitele roste i poptávka. 
        Například čím větší budou lidé mít příjmy, tím více budou chtít cestovat a poroste poptávka po letenkách, ubytování, restauračních jídlech a podobně. Existují však i tzv. méněcenné neboli inferiorní statky, u nichž má zvášení důchodu spotřebitele efekt opařný, tedy snižuje poptávku po daném statku.
        Příkladem budiž ojetá auta nebo nekvalitní levné potraviny. Čím více lidé vydělávají, tím méně takových statků budou kupovat.
        </p><p>Dalším faktorem je pak <strong>cena souvisejících statků</strong> - substitutů a komplementů. Substituty jsou statky, které se dají vzájemně nahradit (například housky a rohlíky). Pokud vzroste cena substitutu našeho statku, zvýší se i poptávka. 
        Pokud rohlíky zdraží, lidé budou více kupovat housky, tedy se po nich zvýší poptávka. Komplementy jsou statky, které se spotřebovávají společně (auta a benzín). Efekt ceny na poptávku je zde opačný než u substitutů, tedy když se zvýší cena komplementu, snížní se poptávka po našem statku. 
        </p><p> <strong>Preference spotřebitelů</strong> také ovlivňují poptávku. Právě na tento faktor cílí reklamy, které se snaží zvýšit poptávku po inzerovaném produktu. Dále pak <strong>očekávání spotřebitelů</strong> - pokud lidé očekávají, že cena statku v budoucnu vzroste, nebo že se jim zvýší plat, mohou zvýšit svou současnou poptávku.
        A naposled pak <strong>počet kupujících</strong>. Čím více lidí nakupuje, tím více poroste i poptávka.
        </p><p> Musíme však rozlišovat mezi změnou poptávky a změnou poptávaného množství. Poptávané množství se mění pouze s cenou statku. Graficky se tak jedná o posun po poptávkové křivce v rámci vztahu mezi P (cenou) a právě Q (množstvím). 
          Změna poptávky pak vyjadřuje posun celé křívky v důsledku vnějších faktorů.
        </p>
        <p>
          Nyní si pojďme nakreslit poptávkovou křivku. Představme si, že vlastníme kavárnu a prodáváme zákusky. Ze zkušenosti víme, že při určitých cenách prodáme za den tato množství zákusků:
        </p>
          <div className="space-y-4">
    <div className="overflow-hidden border border-slate-200 rounded-xl">
       <table className="w-full text-left border-collapse">
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Cena</th>
        <th className="p-4 text-sm font-black uppercase tracking-wider text-slate-500">Množství</th>

      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="bg-slate-50 border-b border-slate-200">
        <td className="p-4 text-sm text-slate-700 font-bold">20</td>
        <td className="p-4 text-sm text-slate-700 font-bold">100</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
        <td className="p-4 text-sm text-slate-700 font-bold">40</td>
        <td className="p-4 text-sm text-slate-700 font-bold">80</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
        <td className="p-4 text-sm text-slate-700 font-bold">60</td>
        <td className="p-4 text-sm text-slate-700 font-bold">60</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
        <td className="p-4 text-sm text-slate-700 font-bold">80</td>
        <td className="p-4 text-sm text-slate-700 font-bold">40</td>
      </tr>
      <tr className="bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
        <td className="p-4 text-sm text-slate-700 font-bold">100</td>
        <td className="p-4 text-sm text-slate-700 font-bold">20</td>
      </tr>
    </tbody>
  </table>
    </div>
  </div>
  <p>Nyní pojďme z těchto hodnot udělat grafické znázornění. Mějme na paměti, že u grafu nabídky a poptávky je ekonomickým konsenzem nanášet závislou proměnou na osu x a nezávislou na osu y, tedy naopak, než jsme běžně zvyklí.</p>

<MarketChart 

  curves={[
    { 
      startX: 10, startY: 90, 
      endX: 90, endY: 10,     
      label: "",             
      color: "#2563eb"        
    }
  ]}

  points={[
    { 
      x: 20, y: 80,  
      xLabel: "20", yLabel: "100", 
      showLines: true 
    },
    { 
      x: 80, y: 20, 
      xLabel: "100", yLabel: "20", 
      showLines: true,
    },    
    { 
      x: 35, y: 65,  
      xLabel: "40", yLabel: "80", 
      showLines: true 
    },
    { 
      x: 65, y: 35, 
      xLabel: "80", yLabel: "40", 
      showLines: true,
    },
    { 
      x: 50, y: 50,  
      xLabel: "60", yLabel: "60", 
      showLines: true 
    }
  ]}
/>
<p>
  A teď se podíváme, jak vypadají posunu poptávkové křivky a pohyby na křivce. Vlevo vidíme, co se stane, když se zvedne cena z P<sub>1</sub> na P<sub>2</sub>. 
  Vpravo je pak situace zvýšené poptávky, například vlivem vyššího důchodu spotřebitele u normálního statku.
  Všimněme si, že v takovém případě je při stejné ceně vyšší poptávané množství.
</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
<div className="w-full">
<MarketChart 
  curves={[
    { startX: 10, startY: 90, endX: 90, endY: 10, label: "D", color: "#2563eb" }
  ]}
  points={[
    { x: 30, y: 70, label: "A", xLabel: "Q1", yLabel: "P1", showLines: true },
    { x: 60, y: 40, label: "B", xLabel: "Q2", yLabel: "P2", showLines: true}
  ]}
  arrows={[
    { startX: 25, startY: 65, endX: 55, endY: 35, color: "#334155" }
  ]}
/>
</div>
<MarketChart 
  curves={[
    { startX: 10, startY: 90, endX: 90, endY: 10, label: "D1", color: "#2563eb" },
    { startX: 30, startY: 90, endX: 100, endY: 20, label: "D2", color: "#00c8ff" }
  ]}
  arrows={[
    { startX: 57, startY: 45, endX: 73, endY: 45 }
  ]}
  points={[
    { x: 40, y: 60, label: "A", xLabel: "Q1", yLabel: "P1,2", showLines: true },
    { x: 60, y: 60, label: "B", xLabel: "Q2", showLines: true}
  ]}
/>
</div>
        <p className='text-3xl font-bold text-black'>
          Nabídka
        </p>
        <p>
          Zatímco poptávka sleduje vztah ceny a množství z pohledu spotřebitele, nabídka se na něj dívá pohledem prodávajícího.
          Nabídka vyjadřuje vztah mezi cenou statku a množstvím, které jsou prodávající ochotni a schopni při této ceně vyrobit a prodat.
          Zákon nabídky nám říká, že ceteris paribus s rostoucí cenou roste i nabízené množství. Stejně jako zákon poptávky je i zákon nabídky zcela intuitivní.
          Čím větší je cena statku, tím více mohou prodávající vydělat a tedy je vyšší cena motivuje více vyrábět a prodávat. Z poptávkového zákona pak vyplývá i sklon křivky, který bude v tomto případě pozitivní.
          </p><p>A co tedy ovlivňuje nabídku a může posunout nabídkovou křivku? První, co vás možná správně napadne je <strong>cena vstupů</strong>.
          Firma k výrobě každého statku spotřebovává nějaké výrobní faktory. Pokud jejich cena vzroste, výroba se stane méně ziskovou a při stejné ceně tak budou prodávající nabízet menší množství produktu a naopak, při snížení cen vstupů budou ochotni vyrábět více.
          <strong> Očekávání výrobců</strong> také ovlivňují nabídku. Pokud výrobci očekávají růst cen v budoucnu, část současné produkce mohou přesunout do budoucna a současná nabídka tak klesne.
          Dalším faktorem je <strong>počet prodejců na trhu</strong>. Více firem na trhu znamená vyšší celkovou nabídku.
          Dále zde hrají roli i <strong>přírodní a společenské faktory</strong>, například počasí v zemědělství nebo vládní zásahy.
        </p>
        <p>Níže vidíte grafické znázornění nabídky. Jak jsme již zmínili, s roustoucí cenou roste i nabízené množství.
          <MarketChart
           curves={[
    { 
      startX: 10, startY: 10, 
      endX: 90, endY: 90,   
      label: "",            
      color: "#eb2525"        
    }
  ]}
  points={[
    { 
      x: 20, y: 20,  
      xLabel: "20", yLabel: "20", 
      showLines: true 
    },
    { 
      x: 35, y: 35, 
      xLabel: "40", yLabel: "40", 
      showLines: true,
    },    
    { 
      x: 65, y: 65,  
      xLabel: "80", yLabel: "80", 
      showLines: true 
    },
    { 
      x: 80, y: 80, 
      xLabel: "100", yLabel: "100", 
      showLines: true,
    },
    { 
      x: 50, y: 50,  
      xLabel: "60", yLabel: "60", 
      showLines: true 
    }
  ]}
          />
        </p>
        <p>Stejně jako u poptávky i zde si musíme dávat pozor na rozdíl mezi posunem nabídky, tedy celé křivky a pouze změnou nabízeného množství.</p>
        <p className='text-3xl font-bold text-black'>
          Tržní rovnováha
        </p>
        <p>Spojme nabídku a poptávku a vznikne nám jednoduchý model trhu. Tam, kde se jejich křivky střetávají nastává <strong>rovnováha</strong>. Bod, ve kterém k tomu dochází, tedy nabídka je rovna poptávce nazýváme <strong>rovnovážný bod</strong>, který často značíme E.</p>          <MarketChart
    curves={[
    { 
      startX: 10, startY: 10, 
      endX: 90, endY: 90,   
      label: "S",            
      color: "#eb2525"        
    },
    { 
      startX: 10, startY: 90,  
      endX: 90, endY: 10,   
      label: "D",            
      color: "#2563eb"        
    }
  ]}
  points={[
    { 
      x: 50, y: 50,  
      label: "E",
      xLabel: "PQ", yLabel: "PE", 
      labelPosition: "right",
      showLines: true 
    }]}
    />
        <p>
        Trh má přirozenou tendenci se vždy vracet do rovnováhy. Co se tedy stane, když cena není rovnovážná?
        Když je cena vyšší (P1), nabízené množství převyšuje poptávané. Říkáme tomu <strong>přebytek (surplus)</strong> Co to znamená v praxi? Prodejci mají na skladech zboží, které ale nikdo není již ochoten koupit.
        Aby zboží prodali, musí snížit cenu, čímž se zvýší poptávané množství a zboží půjde na odbyt. 
        </p><p>Když je naopak cena nižší než rovnovážná (P2), nastává <strong>nedostatek (shortage)</strong>. Lidé by chtěli koupit více zboží, než mají prodejci k dispozci.
        Prodejci vidí tento zájem a zvýší cenu, což sníží poptávané množství, motivuje prodejce k výrobě zboží a trh se vyrovná.
        </p><p>Plocha zeleného trojúhelníku pak vyjadřuje hodnotu zboží, které je v přebytku nebo nedostatku.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
<div className="w-full">
<MarketChart 
 curves={[
    { 
      startX: 10, startY: 10, 
      endX: 90, endY: 90,   
      label: "S",            
      color: "#eb2525"        
    },
    { 
      startX: 10, startY: 90,  
      endX: 90, endY: 10,   
      label: "D",            
      color: "#2563eb"        
    }
  ]}
  points={[
    { 
      x: 50, y: 50,  
      label: "E",
      xLabel: "PQ", yLabel: "PE", 
      labelPosition: "right",
      showLines: true 
    },
    {
      x: 30, y: 70,  
      label: "",
      xLabel: "QS1", yLabel: "P1", 
      labelPosition: "right",
      showLines: true
    },
    {
      x: 70, y: 70,  
      label: "",
      xLabel: "QD1", yLabel: "P1", 
      labelPosition: "right",
      showLines: true
    }
    ]}
  arrows={[
    { startX: 30, startY: 70, endX: 48, endY: 52 },
    { startX: 70, startY: 70, endX: 52, endY: 52}
  ]}
  areas={[
    {points:[{x:30, y: 70}, {x:50, y:50}, {x:70, y:70}], color:"green"}
  ]}
/>
</div>
<MarketChart 
  curves={[
    { 
      startX: 10, startY: 10, 
      endX: 90, endY: 90,   
      label: "S",            
      color: "#eb2525"        
    },
    { 
      startX: 10, startY: 90,  
      endX: 90, endY: 10,   
      label: "D",            
      color: "#2563eb"        
    }
  ]}
  points={[
    { 
      x: 50, y: 50,  
      label: "E",
      xLabel: "PQ", yLabel: "PE", 
      labelPosition: "right",
      showLines: true 
    },
    {
      x: 30, y: 30,  
      label: "",
      xLabel: "QS2", yLabel: "P2", 
      labelPosition: "right",
      showLines: true
    },
    {
      x: 70, y: 30,  
      label: "",
      xLabel: "QD2", yLabel: "P2", 
      labelPosition: "right",
      showLines: true
    }
    ]}
  arrows={[
    { startX: 30, startY: 30, endX: 48, endY: 48 },
    { startX: 70, startY: 30, endX: 52, endY: 48}
  ]}
  areas={[
    {points:[{x:30, y: 30}, {x:50, y:50}, {x:70, y:30}], color:"green"}
  ]}
/>
</div>
<ExplanationBox title='Rovnováha v praxi'>Zamyslete se, jak překupníci lístků, kteří levně nakoupí a prodají za několikanásobnou cenu pomáhají dostat trh do rovnováhy. Jak vypadalo nabízené a poptávané množství před a po vstupu překupníků na trh?</ExplanationBox>
<p>
  Jaké faktory a jak ovlivňují nabídku a poptávku jsme si již řekli. Zkuste v s pomocí interaktivního grafu níže prozkoumat jejich efekt na tržní rovnováhu.
  Kam se posune rovnovážný bod? Jak se změní rovnovážná cena a rovnovážné množství? Zkuste zobrazit různé scénáře. Co se stane, když se zvýší důchod spotřebitele? Co když se zvýší cena substitutu nebo komplementu? Co když se zvýší cena vstupů? A co když se změní více faktorů najednou?

</p>
<InteractiveMarketChart/>
<p>Nyní již byste měli chápat, co je tržní rovnováha a co a jak ovlivňuje rovnovážné ceny a množství. Pojďme si nyní rychle vyzkoušet nejdůležitější znalosti z této podkapitoly.</p>
<QuizCarousel>
          <InteractiveQuestion
            question="Jaký zákon nám říká, že s rostoucí cenou klesá ochota spotřebitelů nakupovat?"
            options={[ "Zákon klesajícího mezního užitku", "Nabídkový zákon", "Poptávkový zákon"]}
            correctAnswer={2}
            explanation='Poptávkový zákon nám říká, že ceteris paribus s rostoucí cenou klesá poptávané množství statku (množství statku, které jsou lidé ochotni koupit). '
            />
            <InteractiveQuestion
            question="Co se stane s rovnovážnou cenou a množstvím, když se zvýší důchod spotřebitelů u normálního statku?"
            options={[ "Cena se zvýší a množství klesne", "Cena se sníží a množství se zvýší", "Cena se zvýší a množství se zvýší"]}
            correctAnswer={2}
            explanation='Zvýšení důchodu spotřebitelů zvyšuje jejich nakupovací schopnost, což vede ke zvýšení poptávky a tedy rovnovážnéceny u normálního statku.'
            />
            <InteractiveQuestion
            question="Co se stane s rovnovážnou cenou a množstvím, když se zvýší cena substitutu a zároveň výrobci budou očekávat růst ceny statku v budoucnu?"
            options={[ "Cena se zvýší a množství klesne", "Cena se zvýší a množství zůstane nezměněné", "Cena se zvýší a pohyb množství nemůžeme určit"]}
            correctAnswer={2}
            explanation='Zvýšení ceny substitutu vede ke zvýšení poptávky po statku, což zvýší cenu a množství. Očekávání růstu ceny v budoucnu však snižuje současnou nabídku, což dále zvyšuje cenu. Celkově tedy cena určitě vzroste, ale efekt na množství je nejasný, protože zvýšená poptávka zvyšuje množství, zatímco snížená nabídka ho snižuje (neznámo o kolik).'
            />
        </QuizCarousel> 
</article>
      {/* NAVIGACE MEZI PODKAPITOLAMI */}
     <footer className="mt-16 pt-8 border-t border-slate-100">
  <div className="grid grid-cols-2 gap-4">
    
    {/* Předchozí kapitola */}
    <div className="flex justify-start">
      <Link 
        href="/zakladni-koncepty/komparativni-absolutni-vyhoda" 
        className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
      >
       
        <ArrowLeft size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all mt-1" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Předchozí</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
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
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Další</span>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 leading-snug">
            Test z kapitoly
          </span>
        </div>
        <ArrowRight size={20} className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mt-1" />
      </Link>
    </div>
  </div>
</footer>
    </div>
  );
}