"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface QuizCarouselProps {
  children: React.ReactNode[]; // Přijímá pole dětí (otázek)
}

export default function QuizCarousel({ children }: QuizCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Počet otázek
  const totalQuestions = React.Children.count(children);

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Výpočet progresu v procentech pro progress bar
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="my-12 max-w-2xl mx-auto">
      
      {/* Horní lišta s postupem */}
      <div className="flex items-center justify-between mb-4 text-sm font-bold text-slate-500">
        <span>Otázka {currentIndex + 1} z {totalQuestions}</span>
        <div className="flex items-center gap-2">
           {currentIndex === totalQuestions - 1 && (
             <span className="text-emerald-600 flex items-center gap-1 text-xs uppercase tracking-wider">
               <CheckCircle2 size={14} /> Finále
             </span>
           )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* HLAVNÍ KONTEJNER (Okénko) */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm min-h-[300px]">
        
        {/* Pás s otázkami (posouvá se pomocí translateX) */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            // Každá otázka musí mít šířku 100% kontejneru a nesmí se smrsknout
            <div className="w-full flex-shrink-0 p-8">
              {child}
            </div>
          ))}
        </div>

      </div>

      {/* OVLÁDACÍ TLAČÍTKA */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            currentIndex === 0 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ChevronLeft size={20} /> Předchozí
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            currentIndex === totalQuestions - 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200 hover:-translate-y-1'
          }`}
        >
          Další otázka <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
}