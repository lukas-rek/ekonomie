import React from 'react';
import Link from 'next/link';
import { 
  Gamepad2, 
  Store, 
  Landmark, 
  ArrowUpDown, 
  Play, 
  Trophy, 
  ChartColumn
} from 'lucide-react';

const MINIGAMES = [
  /*{
    id: "vetsi-mensi",
    title: "Větší / Menší",
    description: "Myslíte si, že znáte reálné ceny, HDP nebo míry inflace? Otestujte svůj odhad a tipněte si, zda je další ekonomický ukazatel větší, nebo menší.",
    href: "/hry/vetsi-mensi",
    icon: ArrowUpDown,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600",
    tags: ["Data", "Odhad", "Rychlovka"]
  },*/

  {
    id: "trzni-principy",
    title: "Tržní principy",
    description: "Otestujte, jak dobře rozumíte základním tržním principům nabídky a poptávky. Řeště praktické scénáře a zjistěte, zda dokážete předvídat, jak se trh bude chovat.",
    href: "/hry/trzni-principy",
    icon: ChartColumn,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    textColor: "text-orange-600",
    tags: ["Nabídka a poptávka", "Analýza"]
  },
];

export default function MinigamesLibrary() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HLAVIČKA STRÁNKY */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Ekonomické minihry
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Teorie je fajn, ale praxe je lepší. Otestujte své ekonomické znalosti
            v našich interaktivních minihrách.
          </p>
        </div>

        {/* MŘÍŽKA S HRAMI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINIGAMES.map((game) => {
            const Icon = game.icon;
            
            return (
              <div 
                key={game.id} 
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Dekorativní pozadí při hoveru */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${game.color}`} />
                
                {/* Ikona hry */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${game.lightColor}`}>
                  <Icon size={28} className={game.textColor} />
                </div>

                {/* Obsah karty */}
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  {game.title}
                </h2>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                  {game.description}
                </p>

                {/* Štítky (Tags) */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {game.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tlačítko pro spuštění */}
                <Link 
                  href={game.href}
                  className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-white transition-all active:scale-95 hover:shadow-md ${game.color} hover:opacity-90`}
                >
                  <Play size={18} className="fill-white" />
                  Spustit hru
                </Link>
              </div>
            );
          })}
        </div>

        {/* PRÁZDNÝ SLOT PRO BUDOUCÍ HRY */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200/50 rounded-full text-slate-500 text-sm font-bold">
            <Trophy size={16} />
            <span>Další minihry už brzy...</span>
          </div>
        </div>

      </div>
    </div>
  );
}