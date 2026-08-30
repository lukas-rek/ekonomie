"use client";
import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  question: string;
  options: string[];
  correctAnswer: number; // index správné odpovědi (0, 1, 2...)
  explanation: string;
}

export default function InteractiveQuestion({ question, options, correctAnswer, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-8 p-6 bg-[#FDFCF9] border border-stone-300 rounded-xl shadow-sm">
      <h4 className="text-lg font-serif font-bold mb-4 text-stone-900 leading-snug">
        {question}
      </h4>
      <div className="space-y-2.5">
        {options.map((opt, idx) => {
          let stateStyle = "border-stone-300 bg-white hover:border-stone-500 hover:bg-stone-50 text-stone-800";
          if (selected !== null) {
            if (idx === correctAnswer) {
              stateStyle = "border-emerald-700 bg-emerald-50/90 text-emerald-900 font-bold ring-1 ring-emerald-700/30";
            } else if (selected === idx) {
              stateStyle = "border-rose-700 bg-rose-50/90 text-rose-900 font-medium";
            } else {
              stateStyle = "border-stone-200 bg-stone-50 text-stone-400 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              disabled={selected !== null}
              className={`w-full text-left p-3.5 rounded-lg border transition-all text-sm ${stateStyle}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="leading-relaxed">{opt}</span>
                {selected !== null && idx === correctAnswer && (
                  <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                )}
                {selected === idx && idx !== correctAnswer && (
                  <XCircle size={18} className="text-rose-700 shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4 p-4 bg-[#F5F2EB] border border-stone-300 text-stone-800 rounded-lg text-sm leading-relaxed">
          <strong className="font-serif font-bold text-stone-900 mr-1">
            {selected === correctAnswer ? "Správně!" : "Bohužel ne."}
          </strong> 
          {explanation}
        </div>
      )}
    </div>
  );
}