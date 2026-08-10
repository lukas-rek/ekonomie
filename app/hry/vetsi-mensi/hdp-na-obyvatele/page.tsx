"use client";

import React, { useState, useEffect, useCallback } from 'react';
import COUNTRY_DATA from '@/public/hry/gdp-per-capita.json';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
// --- Typová definice ---
type Country = {
  name: string;
  gdp: number;
};

// --- Custom Hook pro získání vlajky (z free API) ---
// Globální proměnné pro uložení vlajek, aby se API volalo jen jednou za celou hru
let globalFlagMap: Record<string, string> | null = null;
let flagFetchPromise: Promise<Record<string, string>> | null = null;

// --- Custom Hook pro získání vlajky (z free API) ---
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

// Extrémně rychlý a bezchybný hook bez načítání
function useFlag(countryName: string | undefined) {
  const [flagUrl, setFlagUrl] = useState<string>('');

  useEffect(() => {
    if (!countryName) return;
    
    // Očistíme text od letopočtu " (2025)"
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

// --- Komponenta pro plynulé najíždění čísla ---
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
    const duration = 1000; // Číslo bude stoupat 1 sekundu

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Funkce pro plynulé zpomalení ke konci (ease-out)
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

// --- HLAVNÍ HRA ---
export default function GdpHigherLowerGame() {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [nextCountry, setNextCountry] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  
  // Stavy řídící fáze hry a animace
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

    // 1. Spustíme odhalení čísla na pravé straně
    setGameState('revealing');

    const isHigher = nextCountry.gdp >= currentCountry.gdp;
    const isCorrect = (guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher);

    // 2. Počkáme 1.5 vteřiny (1 vteřina animace + 0.5 pauza na přečtení), než se hra posune
    setTimeout(() => {
      if (isCorrect) {
        // Hráč uhádl - zapneme posunující animaci
        setGameState('shifting');
        
        setTimeout(() => {
          setScore(s => s + 1);
          setCurrentCountry(nextCountry);
          setNextCountry(getRandomCountry(nextCountry));
          setGameState('waiting');
        }, 500); // Čas vyhrazený na CSS přechody
      } else {
        // Hráč neuhádl
        setGameState('gameover');
      }
    }, 1500);
  };

  if (!currentCountry || !nextCountry) return <div className="p-8 text-center text-slate-500">Načítám ekonomická data...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 font-sans text-slate-800 relative">
      
      {/* Horní lišta se skóre a nápovědou */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">HDP na obyvatele: Vyšší nebo Nižší?</h2>
        
        <div className="flex items-center gap-3">
          {/* Tlačítko s otazníkem */}
          <Link 
            href="/clanky/hdp-na-obyvatele" 
            className="flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-600 hover:text-white hover:shadow-sm transition-all border border-slate-200"
            title="Přečíst si vysvětlení konceptu"
          >
            <HelpCircle size={22} strokeWidth={2.5} />
          </Link>
          
          <div className="text-xl font-bold bg-slate-800 text-white px-6 py-2 rounded-xl shadow-lg border border-slate-700">
            Skóre: <span className="text-emerald-400">{score}</span>
          </div>
        </div>
      </div>

      {/* Hrací plocha */}
      <div className="relative flex flex-col md:flex-row gap-4 h-[450px]">
        
        {/* === LEVÁ STRANA (VŽDY ODHALENÁ) === */}
        <CountryCard 
          country={currentCountry} 
          revealed={true} 
          isWrong={false}
          instantReveal={true}
        />

        {/* VS Kolečko uprostřed */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-4 shadow-xl border-4 border-slate-800 font-black text-slate-800 text-xl md:text-2xl">
          VS
        </div>

        {/* === PRAVÁ STRANA (HÁDANÁ) === */}
        <CountryCard 
          country={nextCountry} 
          revealed={gameState !== 'waiting'} 
          isWrong={gameState === 'gameover'}
          hideButtons={gameState !== 'waiting'}
          onGuess={handleGuess}
        />

        {/* Překryvná obrazovka pro Konec Hry */}
        {gameState === 'gameover' && (
          <div className="absolute z-50 flex flex-col items-center justify-center inset-0 bg-slate-900/80 rounded-2xl backdrop-blur-sm animate-in fade-in duration-500">
            <p className="text-5xl font-black text-white mb-2 drop-shadow-lg">Konec hry!</p>
            <p className="text-2xl text-slate-200 mb-8 font-semibold">Tvé konečné skóre: <span className="text-emerald-400">{score}</span></p>
            <button 
              onClick={startGame}
              className="bg-emerald-500 text-white px-10 py-4 rounded-xl font-black hover:bg-emerald-400 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-xl"
            >
              Hrát znovu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- DÍLČÍ KOMPONENTA PRO ZEMĚ (VZHLED KARTIČKY) ---
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
    <div className={`relative flex-1 flex flex-col justify-center items-center rounded-2xl p-6 shadow-xl border-2 transition-all duration-700 overflow-hidden
      ${isWrong ? 'border-rose-500 shadow-rose-500/20' : 'border-slate-800'}
    `}>
      {/* Pozadí s vlajkou */}
      {flagUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${flagUrl})` }}
        />
      )}
      
      {/* Tmavý filtr na vlajku (ztlumení pro čitelnost textu) */}
      <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isWrong ? 'bg-rose-950/80' : 'bg-slate-900/75'}`} />

      {/* Obsah (nad filtrem) */}
      <div className="relative z-20 flex flex-col items-center text-white w-full">
        <h3 className="text-4xl md:text-5xl font-black text-center mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight">{country.name}</h3>
        
        {/* Číslo nebo Tlačítka */}
        <div className="h-[120px] flex flex-col justify-center w-full items-center">
          {revealed ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <p className="text-lg text-slate-300 mb-1 uppercase tracking-widest font-semibold drop-shadow-md">HDP na obyvatele</p>
              <div className={`text-5xl md:text-6xl font-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-colors duration-300 ${isWrong ? 'text-rose-400' : 'text-emerald-400'}`}>
                <AnimatedNumber value={country.gdp} play={revealed} instant={instantReveal} />
              </div>
            </div>
          ) : (
            <div className={`flex flex-col gap-4 w-full max-w-[220px] transition-all duration-500 ${hideButtons ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
               <button 
                 onClick={() => onGuess && onGuess('higher')}
                 className="group bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600 text-white flex flex-col items-center justify-center py-4 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all backdrop-blur-md"
               >
                 <span className="text-2xl font-black text-emerald-400 group-hover:text-emerald-300">▲ VĚTŠÍ</span>
               </button>
               
               <button 
                 onClick={() => onGuess && onGuess('lower')}
                 className="group bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600 text-white flex flex-col items-center justify-center py-4 rounded-xl hover:translate-y-1 hover:shadow-xl transition-all backdrop-blur-md"
               >
                 <span className="text-2xl font-black text-rose-400 group-hover:text-rose-300">▼ MENŠÍ</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}