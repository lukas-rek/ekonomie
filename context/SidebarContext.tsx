"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Definujeme, co všechno náš "kabel" umí přenášet
type SidebarContextType = {
  isOpen: boolean;       // Je otevřeno? (true/false)
  toggle: () => void;    // Funkce "přepni to"
  close: () => void;     // Funkce "zavři to"
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 1. Automaticky zavřít menu, když klikneš na odkaz (změníš stránku)
  useEffect(() => {
    // Na mobilu to chceme zavřít vždy. Na PC to můžeme nechat, nebo taky zavírat.
    // Pro teď to necháme zavírat jen na mobilu (když je obrazovka úzká)
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname]);

  // 2. Při prvním načtení stránky zjistit, jestli jsme na PC.
  // Pokud ano, rovnou menu otevřeme.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
      setIsOpen(true);
    }
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Tohle je ten "háček", kterým se komponenty připojují
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar musí být použit uvnitř SidebarProvider");
  }
  return context;
}