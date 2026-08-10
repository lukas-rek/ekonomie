"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, Heart, Coffee } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Učebnice ekonomie', href: '/uvod' },
   // { name: 'Rakouská ekonomická škola', href: '/rakouska-ekonomicka-skola' },//
    { name: 'Minihry', href: '/hry' },
    { name: 'Materiály', href: '/materialy' },
    { name: 'O projektu', href: '/o-projektu' },
  ];
  const textbookPaths = [
    '/zakladni-koncepty',
    '/mikroekonomie',
    '/makroekonomie',
    '/penize-a-bankovnictvi',
    '/dejiny-ekonomie',
    '/investice-a-podnikani'
];
  return (
    <nav 
      className={`fixed w-full z-50 transition-transform duration-300 bg-blue-600 text-white shadow-md
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-[1920px] mx-auto h-16 flex items-center justify-between">
        
        {/* LOGO SEKCE - ZAROVNÁNÍ */}
        {/* Důležité: w-72 odpovídá šířce Sidebaru. border-blue-500 je jemná dělící čára. */}
        <div className="flex items-center gap-4 w-72 px-6 border-r border-blue-500 h-full shrink-0 bg-blue-600">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter group">
            {/* Ikona a text v bílé/světle modré kombinaci */}
            <BookOpen className="text-blue-200 group-hover:text-white transition-colors" />
            <span>PRACOVNÍ NÁZEV<span className="text-blue-200">.CZ</span></span>
          </Link>
        </div>

        {/* HLAVNÍ NAVIGACE */}
        <div className="hidden md:flex flex-1 px-8 items-center justify-between">
          <div className="flex gap-8">
            {navLinks.map((link) => {
              // 1. OPRAVA: Místo jména kontrolujeme odkaz na úvod učebnice. To eliminujeme překlepy.
                const isTextbookLink = link.href === '/uvod';
                
                // Proužek svítí, pokud je to odkaz na učebnici a jsme na /uvod NEBO v jakékoliv kapitole z pole textbookPaths.
                // Pro ostatní odkazy (Minihry, Materiály...) platí klasické startsWith.
                const isActive = isTextbookLink
                  ? (pathname === '/uvod' || textbookPaths.some(path => pathname.startsWith(path)))
                  : pathname.startsWith(link.href);

                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-bold transition-all relative ${
                      isActive ? 'text-white' : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                    
                    {/* Podtržítko pro aktivní odkaz */}
                    {isActive && (
                      <span className="absolute -bottom-6 left-0 w-full h-1 bg-white rounded-t-full"></span>
                    )}
                  </Link>
                );
              })}
          </div>

          <div className="flex items-center gap-4">
            {/*
            <Link 
              href="/podporte-me"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all border border-blue-500 hover:border-blue-400 shadow-sm"
            >
              <Heart size={14} className="text-pink-300" /> Podpořte mě
            </Link>*/}
          </div>
        </div>

        {/* Mobilní menu (hamburger) - jen ikona, barva bílá */}
        <button className="md:hidden p-4 text-white">
          <Menu />
        </button>
      </div>
    </nav>
  );
}