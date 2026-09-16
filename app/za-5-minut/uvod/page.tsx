"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Move } from "lucide-react";

export default function MindmapPage() {
  // 0 = centered on root "Za 5 minut"
  // 1 = zoomed in on "Základní koncepty" and its 3 sub-nodes
  const [currentLayer, setCurrentLayer] = useState<number>(0);

  const isZoomed = currentLayer === 1;

  const handleDrillDown = () => {
    setCurrentLayer(1);
  };

  const handleLevelUp = () => {
    setCurrentLayer(0);
  };

  // Camera targets: shift camera to focus on Základní koncepty and its subnodes
  const cameraTarget = isZoomed
    ? { x: -440, y: 0, scale: 1.05 }
    : { x: 0, y: 0, scale: 1 };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] min-h-[680px] overflow-hidden bg-[#FBF9F5] select-none">
      {/* Background Dot Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: "radial-gradient(#D6D3D1 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Prominent Button: Go up a layer (VÝRAZNÉ TLAČÍTKO BEZ TEXTU V BARVĚ SFLyellow) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -10 }}
            className="absolute top-6 left-6 z-40"
          >
            <button
              onClick={handleLevelUp}
              aria-label="Přejít o úroveň výš"
              title="Přejít o úroveň výš"
              className="h-14 w-14 rounded-2xl bg-[#f9c710] hover:bg-[#eab308] text-stone-950 shadow-xl hover:shadow-2xl border border-stone-800/15 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-7 h-7 stroke-[2.7]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Bottom Helper */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur border border-stone-200/80 shadow-sm text-xs text-stone-500">
          <Move className="w-3.5 h-3.5 text-stone-400" />
          <span>Tažením myši posouváte mapu</span>
        </div>
      </div>

      {/* Interactive Draggable Mindmap Canvas */}
      <motion.div
        drag
        dragConstraints={{ left: -750, right: 750, top: -500, bottom: 500 }}
        dragElastic={0.12}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Animated Camera Rig */}
        <motion.div
          animate={{
            x: cameraTarget.x,
            y: cameraTarget.y,
            scale: cameraTarget.scale,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
            mass: 0.9,
          }}
          className="relative w-0 h-0 flex items-center justify-center"
        >
          {/* ============================================================== */}
          {/* PRETTY DASHED CONNECTING BRANCHES (SVG)                        */}
          {/* Coordinates centered around (0,0)                             */}
          {/* ============================================================== */}
          <svg
            className="absolute -top-[600px] -left-[600px] w-[1800px] h-[1200px] pointer-events-none z-0 overflow-visible"
            viewBox="-600 -600 1800 1200"
          >
            {/* 1. Branch: Root (0,0) -> Základní koncepty (300, 0) */}
            {/* Underlay faint guide */}
            <path
              d="M 96 0 L 300 0"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Main dashed line */}
            <path
              d="M 96 0 L 300 0"
              fill="none"
              stroke={isZoomed ? "#D6D3D1" : "#f9c710"}
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />

            {/* 2. Branch: Root (0,0) -> Mikroekonomie (-150, -250) (120°) */}
            <path
              d="M -48 -83 C -80 -140, -100 -180, -120 -210"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M -48 -83 C -80 -140, -100 -180, -120 -210"
              fill="none"
              stroke="#D6D3D1"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />

            {/* 3. Branch: Root (0,0) -> Makroekonomie (-150, 250) (240°) */}
            <path
              d="M -48 83 C -80 140, -100 180, -120 210"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M -48 83 C -80 140, -100 180, -120 210"
              fill="none"
              stroke="#D6D3D1"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />

            {/* Sub-branches from Základní koncepty (right edge: 556, 0) to its 3 destinations */}
            {/* Sub-branch 1 -> Lekce za 5 minut (left edge: 640, -130) */}
            <path
              d="M 556 0 C 600 0, 600 -130, 640 -130"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
            />
            <path
              d="M 556 0 C 600 0, 600 -130, 640 -130"
              fill="none"
              stroke={isZoomed ? "#f9c710" : "#D6D3D1"}
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
              className="transition-all duration-300"
            />

            {/* Sub-branch 2 -> Pojmy Flashcards (left edge: 660, 0) */}
            <path
              d="M 556 0 L 660 0"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
            />
            <path
              d="M 556 0 L 660 0"
              fill="none"
              stroke={isZoomed ? "#f9c710" : "#D6D3D1"}
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
              className="transition-all duration-300"
            />

            {/* Sub-branch 3 -> Podrobný přehled (left edge: 640, 130) */}
            <path
              d="M 556 0 C 600 0, 600 130, 640 130"
              fill="none"
              stroke="#E7E5E4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
            />
            <path
              d="M 556 0 C 600 0, 600 130, 640 130"
              fill="none"
              stroke={isZoomed ? "#f9c710" : "#D6D3D1"}
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              opacity={isZoomed ? 1 : 0.25}
              className="transition-all duration-300"
            />
          </svg>

          {/* ============================================================== */}
          {/* 1. CENTRAL ROOT BUBBLE: "Za 5 minut" (0, 0)                     */}
          {/* ============================================================== */}
          <div
            onClick={isZoomed ? handleLevelUp : handleDrillDown}
            className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
              isZoomed
                ? "opacity-35 grayscale hover:opacity-75 hover:grayscale-0 cursor-pointer scale-95"
                : "opacity-100 cursor-pointer"
            }`}
          >
            <motion.div
              whileHover={!isZoomed ? { scale: 1.04 } : {}}
              className="w-48 h-48 rounded-full bg-white border-2 border-stone-900 shadow-xl flex flex-col items-center justify-center text-center p-6"
            >
              <h1 className="text-2xl font-bold font-serif text-stone-900 leading-tight">
                Za 5 minut
              </h1>
              <p className="text-xs text-stone-500 mt-1.5 leading-snug">
                Úvod do ekonomie
              </p>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* CHAPTER 1: "Základní koncepty" (x: 300, y: 0)                   */}
          {/* ============================================================== */}
          <div
            onClick={!isZoomed ? handleDrillDown : undefined}
            className={`absolute left-[300px] top-0 -translate-y-1/2 z-20 transition-all duration-300 ${
              !isZoomed ? "cursor-pointer" : ""
            }`}
          >
            <motion.div
              whileHover={!isZoomed ? { scale: 1.05 } : {}}
              className={`w-64 rounded-[32px] bg-white p-6 transition-all duration-300 ${
                isZoomed
                  ? "border-2 border-[#f9c710] shadow-xl ring-4 ring-[#f9c710]/15"
                  : "border border-stone-300 shadow-md hover:shadow-xl hover:border-[#f9c710]"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                Kapitola 1
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900 leading-snug">
                Základní koncepty
              </h2>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Vzácnost, náklady obětované příležitosti a marginální myšlení.
              </p>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* CHAPTER 2: "Mikroekonomie" (x: -150, y: -250) - 120°           */}
          {/* ============================================================== */}
          <div
            className={`absolute left-[-150px] top-[-250px] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
              isZoomed ? "opacity-25 grayscale" : "opacity-80 hover:opacity-100"
            }`}
          >
            <div className="w-56 rounded-[28px] bg-white/90 border border-stone-200 p-5 shadow-sm">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                Kapitola 2
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-800">
                Mikroekonomie
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-snug">
                Chování firem a spotřebitelů.
              </p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CHAPTER 3: "Makroekonomie" (x: -150, y: +250) - 240°           */}
          {/* ============================================================== */}
          <div
            className={`absolute left-[-150px] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
              isZoomed ? "opacity-25 grayscale" : "opacity-80 hover:opacity-100"
            }`}
          >
            <div className="w-56 rounded-[28px] bg-white/90 border border-stone-200 p-5 shadow-sm">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                Kapitola 3
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-800">
                Makroekonomie
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-snug">
                HDP, inflace a hospodářská politika.
              </p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SUB-NODES OF "ZÁKLADNÍ KONCEPTY" (Leaf destinations)           */}
          {/* ============================================================== */}

          {/* Sub-node 1: Lekce za 5 minut (x: 640, y: -130) */}
          <div
            className={`absolute left-[640px] top-[-130px] -translate-y-1/2 z-20 transition-all duration-300 ${
              isZoomed
                ? "opacity-100 pointer-events-auto"
                : "opacity-20 pointer-events-none scale-95"
            }`}
          >
            <Link href="/za-5-minut/zakladni-koncepty" className="block group">
              <motion.div
                whileHover={isZoomed ? { scale: 1.04, x: 4 } : {}}
                whileTap={isZoomed ? { scale: 0.98 } : {}}
                className="w-72 rounded-[28px] bg-white border border-stone-200 p-5 shadow-md group-hover:shadow-xl group-hover:border-[#f9c710] transition-all"
              >
                <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-stone-900 transition-colors leading-snug">
                  Základní koncepty za 5 minut
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Interaktivní duolingo-styl lekce s rychlými kvízy a rozhodovacím scénářem.
                </p>
              </motion.div>
            </Link>
          </div>

          {/* Sub-node 2: Pojmy ze základních konceptů (x: 660, y: 0) */}
          <div
            className={`absolute left-[660px] top-0 -translate-y-1/2 z-20 transition-all duration-300 ${
              isZoomed
                ? "opacity-100 pointer-events-auto"
                : "opacity-20 pointer-events-none scale-95"
            }`}
          >
            <Link href="/za-5-minut/zakladni-koncepty/pojmy" className="block group">
              <motion.div
                whileHover={isZoomed ? { scale: 1.04, x: 4 } : {}}
                whileTap={isZoomed ? { scale: 0.98 } : {}}
                className="w-72 rounded-[28px] bg-white border border-stone-200 p-5 shadow-md group-hover:shadow-xl group-hover:border-[#f9c710] transition-all"
              >
                <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-stone-900 transition-colors leading-snug">
                  Pojmy ze základních konceptů
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Otáčecí kartičky s klíčovými definicemi, pravidly a praktickými příklady.
                </p>
              </motion.div>
            </Link>
          </div>

          {/* Sub-node 3: Podrobný přehled (x: 640, y: +130) */}
          <div
            className={`absolute left-[640px] top-[130px] -translate-y-1/2 z-20 transition-all duration-300 ${
              isZoomed
                ? "opacity-100 pointer-events-auto"
                : "opacity-20 pointer-events-none scale-95"
            }`}
          >
            <Link href="/zakladni-koncepty" className="block group">
              <motion.div
                whileHover={isZoomed ? { scale: 1.04, x: 4 } : {}}
                whileTap={isZoomed ? { scale: 0.98 } : {}}
                className="w-72 rounded-[28px] bg-white border border-stone-200 p-5 shadow-md group-hover:shadow-xl group-hover:border-[#f9c710] transition-all"
              >
                <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-stone-900 transition-colors leading-snug">
                  Podrobný přehled
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Úvodní stránka kapitoly v učebnici se všemi teoretickými podkapitolami.
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
