"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface QuizCarouselProps {
  children: React.ReactNode[];
}

export default function QuizCarousel({ children }: QuizCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="my-10 max-w-2xl mx-auto">
      
      {/* Horní lišta s postupem */}
      <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-stone-500 font-sans">
        <span>Otázka {currentIndex + 1} z {totalQuestions}</span>
        <div className="flex items-center gap-2">
           {currentIndex === totalQuestions - 1 && (
             <span className="text-emerald-700 flex items-center gap-1 text-xs uppercase font-bold tracking-wider">
               <CheckCircle2 size={15} /> Poslední otázka
             </span>
           )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-stone-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-orange-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* HLAVNÍ KONTEJNER (Okénko) */}
      <div className="relative overflow-hidden bg-[#FDFCF9] border border-stone-300 rounded-xl shadow-sm min-h-[280px]">
        
        {/* Pás s otázkami */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => (
            <div className="w-full flex-shrink-0 p-6 md:p-8">
              {child}
            </div>
          ))}
        </div>

      </div>

      {/* OVLÁDACÍ TLAČÍTKA */}
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            currentIndex === 0 
              ? 'border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50' 
              : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 shadow-sm active:scale-95'
          }`}
        >
          <ChevronLeft size={16} /> Předchozí
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
            currentIndex === totalQuestions - 1
              ? 'border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50'
              : 'border-stone-900 bg-stone-900 text-white hover:bg-stone-800 shadow-sm active:scale-95'
          }`}
        >
          Další otázka <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}