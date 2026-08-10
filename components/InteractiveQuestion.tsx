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
    <div className="my-8 p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl shadow-sm">
      <h4 className="text-lg font-bold mb-4 text-slate-800">{question}</h4>
      <div className="space-y-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            disabled={selected !== null}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
              selected === null 
                ? "border-white bg-white hover:border-blue-400 shadow-sm" 
                : idx === correctAnswer 
                  ? "border-green-500 bg-green-50 text-green-700 font-bold"
                  : selected === idx 
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-transparent bg-white opacity-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{opt}</span>
              {selected !== null && idx === correctAnswer && <CheckCircle2 size={20} />}
              {selected === idx && idx !== correctAnswer && <XCircle size={20} />}
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
          <strong>{selected === correctAnswer ? "Správně!" : "Bohužel ne."}</strong> {explanation}
        </div>
      )}
    </div>
  );
}