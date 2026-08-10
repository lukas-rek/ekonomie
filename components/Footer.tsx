import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-5 border-t border-slate-800 pt-5" >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-white font-black text-lg mb-4 tracking-tight">PRACOVNÍ NÁZEV.CZ</h4>
          <p className="text-sm leading-relaxed max-w-sm">
            Vše o ekonomii na jednom místě.
          </p>
        </div>
      {/*
        <div>
          <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Odkazy</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="/o-autorovi" className="hover:text-white transition-colors">O projektu</a></li>
            <li><a href="/materialy" className="hover:text-white transition-colors">Ke stažení</a></li>
            <li><a href="/clanky" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontakt</h5>
          <ul className="space-y-2 text-sm">
            <li>info@ekonomie.cz</li>
            <li className="flex items-center gap-1">
              
            </li>
          </ul>
        </div>*/}
      </div>
      
      <div className="mt-12 pt-2 border-t border-slate-800 text-center text-xs opacity-50">
        © 2026 Všechna práva vyhrazena.
      </div>
    </footer>
  );
}