"use client";

import React, { useState, useEffect, useCallback } from 'react';
import COUNTRY_DATA from '@/public/hry/gdp-per-capita.json';
import Link from 'next/link';
import { HelpCircle, ArrowLeft } from 'lucide-react';

// --- Typová definice ---
type Country = {
  name: string;
  gdp: number;
};

// Spolehlivý lokální slovník všech vlajek ve hře
const FLAG_MAP: Record<string, string> = {
  "Aruba": "aw", "Afghánistán": "af", "Angola": "ao", "Albánie": "al", "Andorra": "ad", 
  "Spojené arabské emiráty": "ae", "Argentina": "ar", "Arménie": "am", "Antigua a Barbuda": "ag", 
  "Austrálie": "au", "Rakousko": "at", "Ázerbájdžán": "az", "Burundi": "bi", "Belgie": "be", 
  "Benin": "bj", "Burkina Faso": "bf", "Bangladéš": "bd", "Bulharsko": "bg", "Bahrajn": "bh", 
  "Bahamy": "bs", "Bosna a Hercegovina": "ba", "Bělorusko": "by", "Belize": "bz", "Bermuda": "bm", 
  "Bolívie": "bo", "Brazílie": "br", "Barbados": "bb", "Brunej": "bn", "Bhútán": "bt", 
  "Botswana": "bw", "Středoafrická republika": "cf", "Kanada": "ca", "Švýcarsko": "ch", 
  "Chile": "cl", "Čína": "cn", "Pobřeží slonoviny": "ci", "Kamerun": "cm", 
  "Demokratická republika Kongo": "cd", "Kongo": "cg", "Kolumbie": "co", "Komory": "km", 
  "Kapverdy": "cv", "Kostarika": "cr", "Curacao": "cw", "Cayman Islands": "ky", "Kypr": "cy", 
  "Česko": "cz", "Německo": "de", "Džibutsko": "dj", "Dominika": "dm", "Dánsko": "dk", 
  "Dominikánská republika": "do", "Alžírsko": "dz", "Ekvádor": "ec", "Egypt": "eg", 
  "Španělsko": "es", "Estonsko": "ee", "Etiopie": "et", "Evropská unie": "eu", "Finsko": "fi", 
  "Fidži": "fj", "Francie": "fr", "Faroe Islands": "fo", "Gabon": "ga", "Spojené království": "gb", 
  "Gruzie": "ge", "Ghana": "gh", "Guinea": "gn", "Gambie": "gm", "Guinea-Bissau": "gw", 
  "Rovníková Guinea": "gq", "Řecko": "gr", "Grenada": "gd", "Guatemala": "gt", "Guyana": "gy", 
  "Hong Kong SAR, China": "hk", "Honduras": "hn", "Chorvatsko": "hr", "Haiti": "ht", 
  "Maďarsko": "hu", "Indonésie": "id", "Indie": "in", "Irsko": "ie", "Írán": "ir", "Irák": "iq", 
  "Island": "is", "Izrael": "il", "Itálie": "it", "Jamajka": "jm", "Jordánsko": "jo", 
  "Japonsko": "jp", "Kazachstán": "kz", "Keňa": "ke", "Kyrgyzstán": "kg", "Kambodža": "kh", 
  "Kiribati": "ki", "Svatý Kryštof a Nevis": "kn", "Jižní Korea": "kr", "Kuvajt": "kw", 
  "Laos": "la", "Libanon": "lb", "Libérie": "lr", "Libye": "ly", "Svatá Lucie": "lc", 
  "Lichtenštejnsko": "li", "Srí Lanka": "lk", "Lesotho": "ls", "Litva": "lt", "Lucembursko": "lu", 
  "Lotyšsko": "lv", "Macao SAR, China": "mo", "Maroko": "ma", "Monako": "mc", "Moldavsko": "md", 
  "Madagaskar": "mg", "Maledivy": "mv", "Mexiko": "mx", "Marshallovy ostrovy": "mh", 
  "Severní Makedonie": "mk", "Mali": "ml", "Malta": "mt", "Myanmar": "mm", "Černá Hora": "me", 
  "Mongolsko": "mn", "Mosambik": "mz", "Mauritánie": "mr", "Mauricius": "mu", "Malawi": "mw", 
  "Malajsie": "my", "Namibie": "na", "New Caledonia": "nc", "Niger": "ne", "Nigérie": "ng", 
  "Nikaragua": "ni", "Nizozemsko": "nl", "Norsko": "no", "Nepál": "np", "Nauru": "nr", 
  "Nový Zéland": "nz", "Omán": "om", "Pákistán": "pk", "Panama": "pa", "Peru": "pe", 
  "Filipíny": "ph", "Palau": "pw", "Papua-Nová Guinea": "pg", "Polsko": "pl", 
  "Puerto Rico (US)": "pr", "Portugalsko": "pt", "Paraguay": "py", "West Bank and Gaza": "ps", 
  "French Polynesia": "pf", "Katar": "qa", "Rumunsko": "ro", "Rusko": "ru", "Rwanda": "rw", 
  "Saúdská Arábie": "sa", "Súdán": "sd", "Senegal": "sn", "Singapur": "sg", 
  "Šalamounovy ostrovy": "sb", "Sierra Leone": "sl", "Salvador": "sv", "Somálsko": "so", 
  "Srbsko": "rs", "Svatý Tomáš a Princův ostrov": "st", "Surinam": "sr", "Slovensko": "sk", 
  "Slovinsko": "si", "Švédsko": "se", "Eswatini": "sz", "Sint Maarten (Dutch part)": "sx", 
  "Seychely": "sc", "Turks and Caicos Islands": "tc", "Čad": "td", "Togo": "tg", "Thajsko": "th", 
  "Tádžikistán": "tj", "Turkmenistán": "tm", "Východní Timor": "tl", "Tonga": "to", 
  "Trinidad a Tobago": "tt", "Tunisko": "tn", "Turecko": "tr", "Tuvalu": "tv", "Tanzanie": "tz", 
  "Uganda": "ug", "Ukrajina": "ua", "Uruguay": "uy", "USA": "us", "Uzbekistán": "uz", 
  "Svatý Vincenc a Grenadiny": "vc", "Venezuela": "ve", "Vietnam": "vn", "Vanuatu": "vu", 
  "Samoa": "ws", "Kosovo": "xk", "Jihoafrická republika": "za", "Zambie": "zm", "Zimbabwe": "zw"
};

function useFlag(countryName: string | undefined) {
  const [flagUrl, setFlagUrl] = useState<string>('');

  useEffect(() => {
    if (!countryName) return;
    const cleanName = countryName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const code = FLAG_MAP[cleanName];

    if (code) {
      setFlagUrl(`https://flagcdn.com/${code}.svg`);
    } else {
      console.warn('Pro tuto zemi chybí v mapě kód:', cleanName);
    }
  }, [countryName]);

  return flagUrl;
}

function AnimatedNumber({ value, play, instant }: { value: number, play: boolean, instant?: boolean }) {
  const [displayValue, setDisplayValue] = useState(instant ? value : 0);

  useEffect(() => {
    if (instant) {
      setDisplayValue(value);
      return;
    }
    if (!play) {
      setDisplayValue(0);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(value * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [value, play, instant]);

  return (
    <>
      {new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(displayValue)}
    </>
  );
}

export default function GdpHigherLowerGame() {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [nextCountry, setNextCountry] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  
  const [gameState, setGameState] = useState<'waiting' | 'revealing' | 'shifting' | 'gameover'>('waiting');

  const getRandomCountry = useCallback((exclude?: Country) => {
    let newCountry;
    do {
      const randomIndex = Math.floor(Math.random() * COUNTRY_DATA.length);
      newCountry = COUNTRY_DATA[randomIndex];
    } while (exclude && newCountry.name === exclude.name);
    return newCountry;
  }, []);

  const startGame = useCallback(() => {
    const first = getRandomCountry();
    const second = getRandomCountry(first);
    setCurrentCountry(first);
    setNextCountry(second);
    setScore(0);
    setGameState('waiting');
  }, [getRandomCountry]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleGuess = (guess: 'higher' | 'lower') => {
    if (!currentCountry || !nextCountry || gameState !== 'waiting') return;

    setGameState('revealing');

    const isHigher = nextCountry.gdp >= currentCountry.gdp;
    const isCorrect = (guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher);

    setTimeout(() => {
      if (isCorrect) {
        setGameState('shifting');
        setTimeout(() => {
          setScore(s => s + 1);
          setCurrentCountry(nextCountry);
          setNextCountry(getRandomCountry(nextCountry));
          setGameState('waiting');
        }, 500);
      } else {
        setGameState('gameover');
      }
    }, 1500);
  };

  if (!currentCountry || !nextCountry) return <div className="p-8 text-center text-stone-500 font-sans">Načítám ekonomická data...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 font-sans text-stone-800 relative min-h-screen py-10">
      
      {/* Horní lišta */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 px-2">
        <div className="flex items-center gap-3">
          <Link 
            href="/hry" 
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors group font-sans"
          >
            <ArrowLeft size={14} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Zpět na minihry
          </Link>
          <span className="text-stone-300">•</span>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            HDP na obyvatele: Vyšší nebo Nižší?
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/clanky/hdp-na-obyvatele" 
            className="flex items-center justify-center w-10 h-10 bg-white text-stone-700 rounded-lg hover:bg-stone-100 transition-all border border-stone-300 shadow-xs"
            title="Přečíst si vysvětlení konceptu"
          >
            <HelpCircle size={18} strokeWidth={2} />
          </Link>
          
          <div className="text-sm font-bold uppercase tracking-wider bg-stone-900 text-white px-5 py-2.5 rounded-lg shadow-sm border border-stone-800 font-mono">
            Skóre: <span className="text-orange-400 font-bold ml-1">{score}</span>
          </div>
        </div>
      </div>

      {/* Hrací plocha */}
      <div className="relative flex flex-col md:flex-row gap-4 h-[460px]">
        
        {/* LEVÁ STRANA */}
        <CountryCard 
          country={currentCountry} 
          revealed={true} 
          isWrong={false}
          instantReveal={true}
        />

        {/* VS Kolečko */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-md border-2 border-stone-900 font-serif font-bold text-stone-900 text-sm">
          VS
        </div>

        {/* PRAVÁ STRANA */}
        <CountryCard 
          country={nextCountry} 
          revealed={gameState !== 'waiting'} 
          isWrong={gameState === 'gameover'}
          hideButtons={gameState !== 'waiting'}
          onGuess={handleGuess}
        />

        {/* Konec Hry */}
        {gameState === 'gameover' && (
          <div className="absolute z-50 flex flex-col items-center justify-center inset-0 bg-stone-950/85 rounded-xl border border-stone-800 animate-in fade-in duration-300 p-6 text-center">
            <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Konec hry</p>
            <p className="text-lg text-stone-300 mb-8 font-sans">Konečné skóre: <span className="text-orange-400 font-bold font-mono text-xl">{score}</span></p>
            <button 
              onClick={startGame}
              className="bg-orange-700 text-white px-8 py-3.5 rounded-lg font-sans font-bold text-xs uppercase tracking-widest hover:bg-orange-800 transition-all shadow-sm active:scale-95"
            >
              Hrát znovu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CountryCard({ 
  country, 
  revealed, 
  isWrong, 
  hideButtons, 
  onGuess, 
  instantReveal 
}: { 
  country: Country, 
  revealed: boolean, 
  isWrong: boolean, 
  hideButtons?: boolean,
  onGuess?: (g: 'higher'|'lower') => void,
  instantReveal?: boolean
}) {
  const flagUrl = useFlag(country.name);

  return (
    <div className={`relative flex-1 flex flex-col justify-center items-center rounded-xl p-6 shadow-sm border transition-all duration-700 overflow-hidden
      ${isWrong ? 'border-rose-600 ring-2 ring-rose-600/50' : 'border-stone-300'}
    `}>
      {/* Pozadí s vlajkou */}
      {flagUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${flagUrl})` }}
        />
      )}
      
      {/* Tmavý filtr na vlajku */}
      <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isWrong ? 'bg-rose-950/85' : 'bg-stone-950/75'}`} />

      {/* Obsah */}
      <div className="relative z-20 flex flex-col items-center text-white w-full">
        <h3 className="text-white text-3xl md:text-4xl font-serif font-bold text-center mb-6 leading-tight drop-shadow-sm">{country.name}</h3>
        
        <div className="h-[120px] flex flex-col justify-center w-full items-center">
          {revealed ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <p className="text-xs text-stone-300 mb-1 uppercase tracking-widest font-bold font-sans">HDP na obyvatele</p>
              <div className={`text-4xl md:text-5xl font-serif font-bold transition-colors duration-300 ${isWrong ? 'text-rose-400' : 'text-orange-400'}`}>
                <AnimatedNumber value={country.gdp} play={revealed} instant={instantReveal} />
              </div>
            </div>
          ) : (
            <div className={`flex flex-col gap-3 w-full max-w-[200px] transition-all duration-300 ${hideButtons ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
               <button 
                 onClick={() => onGuess && onGuess('higher')}
                 className="group bg-stone-900/85 hover:bg-stone-900 border border-stone-600 text-white flex flex-col items-center justify-center py-3 rounded-lg hover:border-emerald-500 transition-all"
               >
                 <span className="text-lg font-sans font-bold text-emerald-400 group-hover:text-emerald-300">▲ VYŠŠÍ</span>
               </button>
               
               <button 
                 onClick={() => onGuess && onGuess('lower')}
                 className="group bg-stone-900/85 hover:bg-stone-900 border border-stone-600 text-white flex flex-col items-center justify-center py-3 rounded-lg hover:border-rose-500 transition-all"
               >
                 <span className="text-lg font-sans font-bold text-rose-400 group-hover:text-rose-300">▼ NIŽŠÍ</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}