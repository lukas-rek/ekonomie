"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveQuestion from "@/components/InteractiveQuestion";
import DefinitionBox from "@/components/DefinitionBox";
import GoodsClassification from "@/components/zakladni-koncepty/GoodsClassification";
import UtilityChart from '@/components/zakladni-koncepty/UtilityChart';
import QuizCarousel from '@/components/QuizCarousel';

export default function StatekVzacnostUzitekHodnotaPage() {
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
          Lekce 03
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 tracking-tight leading-tight">
          Statek, vzácnost, užitek, hodnota
        </h1>
        <div className="h-[2px] w-16 bg-[#F9C70F]"></div>
      </header>

      {/* HLAVNÍ TEXT */}
      <article className="space-y-6 text-stone-800 leading-relaxed text-base md:text-lg font-sans">
        <p>
          Pojmy z názvu této podkapitoly patří mezi základní stavební kameny ekonomie a bez jejich porozumění se při jakémkoliv studiu ekonomie neobejdeme.
          Ekonomie někdy používá slova, které v běžném jazyce mají volnější definici jako terminus technicus. Kdykoliv čteme nějaký ekonomický text, budou mít tyto pojmy vždy stejný význam a je potřeba je v tomto významu chápat.
          Pro běžnou konverzaci se to může zdát jako zbytečné slovíčkaření. Pro odbornější debatu je to však, jako ostatně u jiných vědních oborů, velmi praktické a užitečné.
          Ve zkratce bychom mohli pojmy z názvu shrnout takto: Lidé mají potřeby, k jejichž uspokojení využívají jistých věcí <strong>(statků)</strong>. 
          Těchto věcí však není dostatek pro uspokojení všech potřeb <strong>(vzácnost)</strong>, a proto si musí vybrat, co jim přinese největší uspokojení <strong>(užitek)</strong>, na základě čehož těmto věcem přiřadí hodnocení důležitosti <strong>(hodnotu)</strong>.
          Pojďme se na tyto pojmy nyní podívat podrobněji.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
          Statek
        </h2>
        <p>
          Statkem je v ekonomii cokoliv, co je schopno uspokojit lidskou potřebu. Může jít o fyzické věci - zboží jako je jídlo, oblečení nebo auto, ale také o služby jako je vzdělávání nebo zdravotní péče.
          Statky můžeme dělit na několik kategorií. Základní dělení je na <strong>volné </strong>a <strong>ekonomické (vzácné)</strong>. Volné statky jsou k dispozici v množství převyšující lidskou potřebu po nich. Z toho důvodu nemají žádnou cenu. Příkladem budiž třeba vzduch nebo sluneční světlo.
          Ekonomické statky jsou takové, jejichž množství je omezené a nedokáže uspokojit všechny lidské potřeby. Lidé jsou za ně proto ochotni platit. 
        </p>
        
        <p className="mb-2">
          Možností dělení statků je mnoho. Zde jsou ta, se kterými se setkáte nejčastěji:
        </p>

        <h3 className="font-serif italic font-bold text-lg text-stone-900">
          Podle vylučitelnosti ze spotřeby a rivality ve spotřebě:
        </h3>
        <p>
          Vylučitelnost ze spotřeby je vlastnost, která říká, jak snadno lze někomu ve spotřebě statku zabránit. 
          Například auto je vylučitelné, protože lze snadno - klíčkem - zabránit jeho použití jinou osobou. 
          Naopak veřejné osvětlení je nevylučitelné, protože nelze (nebo tak nákladně, že se to nevyplatí) zajistit, aby na někoho světlo svítilo a na jiného nikoliv.
          Rivalita ve spotřebě vyjadřuje, zda spotřeba statku jednou osobou snižuje množství dostupné pro ostatní.
          Jablko je rivalitní, protože jeho spotřebou zabráním komukoliv jinému to stejné jablko spotřebovávat. 
          Spotify předplatné je naopak nerivalitní, protože mnou koupené a spotřebované předplatné nesnižuje množství předplatného dostupného pro ostatní.
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li><strong>Veřejný statek:</strong> je nevylučitelný a nerivalitní</li>
          <li><strong>Soukromý statek:</strong> je vylučitelný a rivalitní</li>
          <li><strong>Smíšený statek:</strong> je buď vylučitelný nebo rivalitní</li>
        </ul>

        <DefinitionBox title="Problém vylučitelnosti a rivality">
          Vylučitelnost a rivalita nejsou objektivními vlastnostmi statku. Téměř každý statek je vylučitelný, avšak náklady na vyloučení mohou být extrémně vysoké. Stejně tak nelze vždy jasně určit rivalitu statku. Jedná se spíše o škály, na kterých statky vždy subjektivně posuzujeme.
        </DefinitionBox>

        <h3 className="font-serif italic font-bold text-lg text-stone-900">
          Podle vlivu změny důchodu spotřebitele na poptávku po statku:
        </h3>
        <p className="text-sm italic text-stone-600">
          Více v podkapitolách <a href="/zakladni-koncepty/nabidka-poptavka" className="text-stone-900 underline decoration-[#F9C70F] decoration-2 hover:text-stone-600 font-medium">Nabídka, poptávka a tržní rovnováha</a> a <a href="/mikroekonomie/elasticita" className="text-stone-900 underline decoration-[#F9C70F] decoration-2 hover:text-stone-600 font-medium">Elasticita</a>.
        </p>
        <p>
          U většiny statků s růstem důchodu spotřebitele roste i poptávka po daném statku. Takový statek nazýváme <strong>normální</strong>.
          U některých statků ale s růstem důchodu poptávka klesá. Ty pak nazýváme <strong>méněcenné (angl. inferior)</strong>. 
        </p>

        <h3 className="font-serif italic font-bold text-lg text-stone-900">
          Podle vlivu spotřeby na užitek spotřebitele:
        </h3>
        <p>
          Většina statků přináší spotřebiteli užitek. Takové statky pak nazýváme jako <strong>žádoucí</strong>. 
          Když máte ale například alergii na kiwi, pak je pro vás kiwi pravděpodobně <strong>nežádoucí</strong> statek, tedy z něj máte negativní užitek.
          Pokud spotřeba statku na uživatele nemá vliv jedná se o statek <strong>lhostejný</strong>. S tímto dělením se v ekonomické teorii příliš často nesetkáte.
        </p>

        <h3 className="font-serif italic font-bold text-lg text-stone-900">
          Podle přítomnosti tržních mechanismů při tvorbě ceny:
        </h3>
        <p>
          <strong>Tržní</strong> statek je takový, jehož cena je určována na trhu působením nabídky a poptávky. 
          <strong> Netržní</strong> statek je ten, jehož cena není určována trhem, ale například státem (např. zdravotní péče nebo školství). 
          <strong> Polotržní</strong> statek má pak cenu sice nakonec určenou trhem, ale je ovlivněna různými státními intervencemi (dnes je to většina statků).
        </p>

        <h3 className="font-serif italic font-bold text-lg text-stone-900">
          Na spotřební a výrobní:
        </h3>
        <p>
          Toto dělení je velmi důležité a často se s ním setkáte v pozdějším studiu ekonomie. <strong>Spotřební</strong> statky, někdy také statky <strong>prvního řádu</strong> jsou určeny k přímému uspokojení potřeb. Příkladem jsou jídlo nebo oblečení.
          Spotřební statky se také často dělí na dlouhodobé a krátkodobé, podle toho, jak dlouho slouží k uspokojování potřeb spotřebitele.
          <strong> Výrobní</strong> statky, někdy také statky <strong>vyššího řádu</strong> nebo <strong>kapitálové</strong> statky slouží k výrobě jiných statků. Příkladem budiž linka na výrobu aut.
        </p>

        <GoodsClassification />

        <p>
          Důležité je si uvědomit, že statek je kromě svých fyzických vlastností definován také kontextem.
          Tímto kontextem myslíme zpravidla místo a čas. Představme si třeba balení mléka. Když je toto balení ve skladu obchodu, je statkem výrobním. To stejné balení mléka u nás v lednici však již může být statkem spotřebním. 
          Nejedná se však o pouhou změnu stavu stejného statku. Z výrobního statku „mléko ve skladu“ se kombinací s jinými výrobními statky (regál v obchodě, doprava k nám domů apod.) stává zcela nový, teď již spotřební statek „mléko v lednici“.
          Kontext místa je důležitý i pokud mluvíme o vzácnosti statku. Pitnou vodu ve studánce v lese, kde jsme pouze my, bychom klidně mohli považovat za statek volný. Podívejme se ale na pouštní město jako je Káhira a zjistíme, že zde již množství pitné vody nenaplní všechny lidské potřeby a tudíž je statkem vzácným.
          Voda v Káhiře je jednoduše jiný statek než voda ve studánce v lese. Samozřejmě to stejné platí i o čase. Zatímco před několika tisíci lety bychom mohli lesy považovat za volný statek, lesy dnes považujeme za vzácný statek. Je zřejmé, že tato závislost vlastností statků na kontextu je poměrně nepraktická.
          Když tedy mluvíme o nějakém statku (pitná voda, lesy, mléko), předpokládáme, není-li uvedeno jinak, kontext vlastní naší době a místu.
        </p>
        <p>
          V ekonomických textech se také můžete setkat s dělením na statky (hmotné) a služby. V moderní ekonomii sice služby považujeme za statky jako každé jiné, nicméně kvůli některým specifikům se s tímto rozlišením lze stále setkat.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Vzácnost
        </h2>
        <p>
          Vzácnost (angl. scarcity) je základní ekonomický problém. Toto slovo je jedním z těch, které ekonomové využívají v jiném významu než v běžné řeči.
          Zatímco v běžném jazyce bychom za vzácné označili třeba zlato, šafrán nebo kaviár a pitnou vodu bychom jako vzácnou nepovažovali, v ekonomii by tomu bylo jinak.
          Jak jsme již uvedli v sekci o statcích, vzácnost je vlastnost statku, kdy jeho množství nedokáže uspokojit všechny lidské potřeby. 
          I pitná voda je vzácná, protože jí zkrátka není dost na všechny možné způsoby využití, které by lidé chtěli. Jinými slovy se vzácnost často popisuje takto: 
          Lidé mají neomezené potřeby, ale omezené zdroje.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Užitek
        </h2>
        <p>
          Užitek (angl. utility) je míra uspokojení, které člověk získá spotřebou statku.
          Užitek je subjektivní. To znamená, že stejný statek může přinést různým lidem různý užitek. 
          Příklad inspirujme příslovím: „Sytý hladovému nevěří.“ Pro hladového člověka bude mít chléb vysoký užitek, zatímco pro sytého nikoliv. 
          V ekonomii rozlišujeme dva klíčové koncepty užitku: <strong>celkový užitek (TU)</strong> a <strong>mezní užitek (MU)</strong>. Celkový užitek vyjadřuje celkovou míru uspokojení z určitého množství statku.
          TU tak zpravidla roste s rostoucím množstvím spotřebovaných statků až do tzv. bodu nasycení, kdy spotřeba již žádný užitek nepřináší (užitek naopak může klesat).
          Mezní užitek pak vyjadřuje změnu celkového užitku při spotřebě každé další jednotky statku navíc. V bodě nasycení je pak MU nula. Matematicky bychom tak mohli říct, že MU je první derivací TU (dobře to vidíme na grafu níže). 
        </p>

        <UtilityChart />

        <p>
          Graf také krásně ilustruje jeden z nejdůležitějších zákonů v ekonomii, <strong>zákon klesajícího mezního užitku</strong>. Tento zákon říká, že s každou další jednotkou spotřebovaného statku klesá mezní užitek, který nám tato jednotka přináší.
          Na grafu se to projevuje záporným sklonem křivky. 
        </p>
        <p>
          Pojďme si nyní tento zákon ilustrovat na příkladu. Představme si, že cestujeme pouští. Jsme unavení, žízniví a zpocení. Jaký užitek pro nás v tu chvíli bude mít řada láhví vody, kterou před nás někdo postaví?
          První láhev nám přinese obrovský užitek (MU bude vysoký), protože díky ní uhasíme žízeň a neumřeme. Druhá láhev nám již přinese užitek menší, protože již neodvrací naši smrt, ale stále nám pomůže doplnit tekutiny na zbytek cesty.
          Třetí láhev nám přinese užitek ještě menší, protože již pít nepotřebujeme. Stále ji ale oceníme například pro umytí. Když takto budeme postupovat dál, zjistíme, že spotřeba každé další láhve pro nás má menší a menší užitek. 
          V nějakém bodě se nám pak již ani nevyplatí láhve spotřebovávat a MU bude záporný.
        </p>
        <p>
          Racionální ekonomický aktér se snaží maximalizovat svůj celkový užitek. Kdykoliv čelíme ekonomickému rozhodnutí, tedy volbě, srovnáme mezní užitek každé alternativy a vybereme tu nejlepší. Představme si, že máme pouze dvě alternativy: čokoládové sušenky a jablka. 
          Přiřadili jsme jim hodnocení podle užitku, který nám přinesou níže v tabulce:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          {/* LEVÁ TABULKA */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-base px-1">Čokoládové sušenky</h4>
            <div className="overflow-hidden border border-stone-300 rounded-xl bg-[#FDFCF9] shadow-xs">
              <table className="w-full text-left border-collapse font-sans">
                <thead className="bg-[#F7F4EE] border-b border-stone-300">
                  <tr>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Množství (Q)</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Celkový užitek (TU)</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Mezní užitek (MU)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">1</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">10</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">10</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">2</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">15</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">5</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">3</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">15</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">0</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">4</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">12</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">-3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PRAVÁ TABULKA */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-base px-1">Jablka</h4>
            <div className="overflow-hidden border border-stone-300 rounded-xl bg-[#FDFCF9] shadow-xs">
              <table className="w-full text-left border-collapse font-sans">
                <thead className="bg-[#F7F4EE] border-b border-stone-300">
                  <tr>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Množství (Q)</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Celkový užitek (TU)</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-stone-600">Mezní užitek (MU)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">1</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">8</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">8</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">2</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">14</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">6</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">3</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">17</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">3</td>
                  </tr>
                  <tr className="hover:bg-stone-100/50 transition-colors">
                    <td className="p-3 text-xs text-stone-800">4</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">17</td>
                    <td className="p-3 text-xs text-stone-900 font-bold">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p>
          V jakém pořadí bychom měli tyto statky spotřebovávat? Vždy se podíváme na mezní užitky zbývajících alternativ. Jako první spotřebujeme 1. čokoládovou sušenku (MU=10).
          Poté následuje 1. jablko (MU=8), 2. jablko (MU=6), 2. sušenka (MU=5), 3. jablko (MU=3) a dále nám již nezbývají statky s kladným mezním užitkem, čili naše spotřeba zde končí - již nám nepřinese užitek. 
          Toto srovnávání mezních užitků provádíme ve složitější podobě intuitivně při každé volbě napříč všemi alternativami.
        </p>

        <p>
          Přístup, který jsme zvolili v případě příkladu výše počítá s tím, že užitku můžeme přiřadit nějakou jednotku (obvykle je zvaná util). Takový přístup, tedy že užitek je měřitelný a vyčíslitelný se nazývá <strong>kardinalismus</strong>.
          Je vhodný a praktický právě například při ilustraci základních principů. V moderní ekonomii je více přijímaná <strong>ordinalistická</strong> teorie užitku. 
          Ta říká, že není možné změřit užitek, ale spotřebitel je pouze schopný seřadit statky a kombinace statků do jakési preferenční stupnice podle toho, jaký užitek mu přináší.
          Nijak to však nevylučuje výše popsané principy. Jde pouze o to, že užitek nelze vyjádřit konkrétní číselnou hodnotou a není porovnatelný mezi lidmi. 
          Pro ekonomické bádání je totiž zcela postačující vědět, že spotřebitel preferuje statek nebo koš statků A před statkem nebo košem statků B a není potřeba vědět „o kolik“.
          Více se o teorii užitku dozvíte v kapitole <a href="/mikroekonomie" className="text-stone-900 underline decoration-[#F9C70F] decoration-2 hover:text-stone-600 font-medium">Mikroekonomie</a>.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Hodnota
        </h2>
        <p>
          Hodnota byla dlouhá léta předmětem rozporů mezi ekonomy. Dlouho byla vnímána jako objektivní vlastnost statku. Tento koncept však zbořila marginalistická revoluce v 70. letech 19. století. (více o teoriích hodnoty v kapitole <a href="/dejiny-ekonomickeho-mysleni" className="text-stone-900 underline decoration-[#F9C70F] decoration-2 hover:text-stone-600 font-medium">Dějiny ekonomického myšlení</a>). 
          Carl Menger přišel se subjektivní teorií hodnoty, která tvrdí, že hodnotu statku určuje jeho mezní užitek pro uživatele. 
          Vyřešil tím tak paradox vody a diamantů - Proč je voda, která je nezbytná pro život, tak levná, zatímco diamanty, které jsou v podstatě zbytečné, jsou tak drahé?
          Pojďme se podrobněji podívat na to, co určuje hodnotu. Dejme tomu, že chceme určit hodnotu vody. Opět si můžeme představit našeho cestovatele na poušti s láhvemi vody. 
          Má před sebou 5 láhví, které jsou schopné uspokojit tyto potřeby v daném pořadí:
        </p>

        <ul className="list-disc pl-6 space-y-1 marker:text-stone-400">
          <li>Zachránit život</li>
          <li>Zahnat menší žízeň</li>
          <li>Umýt se</li>
          <li>Osvěžit se</li>
          <li>Dát napít svému psovi</li>
        </ul>

        <p>
          Chceme určit hodnotu jedné láhve. Mohlo by se zdát, že pro nás bude mít téměř nevyčíslitelnou hodnotu, protože nám zachrání život.
          Hodnota je ale určena mezním užitkem z posledního možného využití. Hodnota láhve je tedy daná užitkem z napití našeho psa nikoliv užitkem ze záchrany našeho života.
          Přesně to způsobuje, že voda nezbytná k životu je levnější než diamanty. 
        </p>
        <p>
          Mohlo by vás napadnout v souvislosti s částí o užitku, že hodnota některých statků by měla být záporná, protože jejich mezní užitek při velkém množství jednotek bude záporný.
          Počítáme však s tím, že racionální spotřebitel vždy zastaví spotřebu statku v bodě, kdy je MU=0.
        </p>
        <p>
          Důležité je, že každý určuje hodnotu podle svého subjektivního hodnocení. Cena proto není to stejné co hodnota. 
          Když se rozmýšlíme, zda něco koupit či nekoupit, srovnáváme hodnotu tedy mezní užitek daného statku a peněz, které za tento statek musíme zaplatit. 
          Je to tedy stejné, jako když jsme srovnávali čokoládové sušenky a jablka.
        </p>

        <h2 className="text-2xl font-serif font-bold text-stone-900 pt-6">
          Co si z toho odnést?
        </h2>
        <p>
          V této podkapitole jsme se dozvěděli, co v ekonomii myslíme statkem, vzácností, užitkem a hodnotou. Zkuste si své znalosti z této podkapitoly otestovat níže. Dále se budeme věnovat výrobním faktorům.
        </p>

        <QuizCarousel>
          <InteractiveQuestion
            question="Co musí splňovat veřejný statek?"
            options={[ "Jeho množství převyšuje lidské potřeby", "Jeho hodnota je nulová nebo záporná", "Je nevylučitelný a nerivalitní ve spotřebě"]}
            correctAnswer={2}
            explanation='Spotřeba veřejného statku jedním spotřebitelem nesníží množství dostupné pro ostatní. Zároveň je velmi nákladné ze spotřeby statku kohokoliv vyloučit. Je tedy nerivalitní a nevylučitelný.'
          />
          <InteractiveQuestion
            question="Který z následujících statků považujeme za volný?"
            options={[ "Vzduch", "Pitná voda", "Zlato"]}
            correctAnswer={0}
            explanation='Volný statek je takový, jehož množství převyšuje lidské potřeby. Poznáme ho také tak, že nemá ekonomickou hodnotu.'
          />
          <InteractiveQuestion
            question="Co říká zákon klesajícího mezního užitku?"
            options={[ "Užitek, který získáme přidáním každé další jednotky se zmenšuje", "Celkový užitek se zmenšuje, protože je součtem mezních užitků všech jednotek, který klesá", "Mezní užitek je vždy záporný, jelikož předchozí jednotka nám vždy přinese více užitku"]}
            correctAnswer={0}
            explanation='Mezní užitek je užitek z každé další přidané jednotky. Protože každá další jednotka může naplnit jen ty potřeby, které nenaplnily jednotky předchozí, bude vždy klesat.'
          />
        </QuizCarousel> 
      </article>

      {/* NAVIGACE MEZI PODKAPITOLAMI */}
      <footer className="mt-16 pt-8 border-t border-stone-300">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <Link 
              href="/zakladni-koncepty/metodologie" 
              className="group flex items-start gap-3 max-w-[280px] text-left transition-all"
            >
              <ArrowLeft size={18} className="shrink-0 text-stone-400 group-hover:text-[#F9C70F] group-hover:-translate-x-1 transition-all mt-1" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Předchozí</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Metodologie a ekonomické modely
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/zakladni-koncepty/vyrobni-faktory" 
              className="group flex items-start text-right gap-3 max-w-[280px] transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1 font-sans">Další lekce</span>
                <span className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-900 leading-snug">
                  Výrobní faktory
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