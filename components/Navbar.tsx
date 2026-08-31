"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Učebnice ekonomie', href: '/uvod' },
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
    '/dejiny-ekonomickeho-mysleni',
    '/investice-a-podnikani'
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-[#1C1917] text-stone-100 border-b border-stone-800 shadow-sm
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-[1920px] mx-auto h-16 flex items-center justify-between">
        
        {/* LOGO SEKCE - ZAROVNÁNÍ */}
        <div className="flex items-center gap-3 w-72 px-6 border-r border-stone-800 h-full shrink-0 bg-[#1C1917]">
          <Link href="/" className="flex items-center gap-2.5 font-serif font-bold text-lg tracking-tight group">
            <div className="w-8 h-8 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 group-hover:text-amber-400 group-hover:border-amber-500/50 transition-colors">
              <BookOpen size={18} />
            </div>
            <span className="text-stone-100 group-hover:text-white transition-colors">
              PRACOVNÍ NÁZEV<span className="text-orange-500 font-sans text-xs ml-0.5 tracking-normal font-bold">.CZ</span>
            </span>
          </Link>
        </div>

        {/* HLAVNÍ NAVIGACE */}
        <div className="hidden md:flex flex-1 px-8 items-center justify-between">
          <div className="flex gap-8">
            {navLinks.map((link) => {
              const isTextbookLink = link.href === '/uvod';
              const isActive = isTextbookLink
                ? (pathname === '/uvod' || textbookPaths.some(path => pathname.startsWith(path)))
                : pathname.startsWith(link.href);

              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-all relative py-2 ${
                    isActive ? 'text-white font-black' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {link.name}
                  
                  {/* Aktivní podtržítko */}
                  {isActive && (
                    <span className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-orange-500"></span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-serif italic text-stone-400">
             ...
            </span>
          </div>
        </div>

        {/* Mobilní menu (hamburger) */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-4 text-stone-300 hover:text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobilní rozbalovací menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1C1917] border-t border-stone-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => {
            const isTextbookLink = link.href === '/uvod';
            const isActive = isTextbookLink
              ? (pathname === '/uvod' || textbookPaths.some(path => pathname.startsWith(path)))
              : pathname.startsWith(link.href);

            return (
              <Link 
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                  isActive ? 'text-orange-400 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}