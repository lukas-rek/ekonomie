"use client";
import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

// Jednoduché typy pro vstup (to, co píšeš ty)
interface SimpleQuestion {
  text: string;
  correct: string; // ID správného sloupce
}

interface Option {
  id: string;
  label: string;
}

interface ChecklistTableProps {
  options: Option[];         // Možnosti (hlavička)
  questions: SimpleQuestion[]; // Seznam otázek
  title?: string;
}

export default function ChecklistTable({ options, questions, title }: ChecklistTableProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({}); // ID je teď číslo (index řádku)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (rowIndex: number, optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [rowIndex]: optionId }));
  };

  const correctCount = questions.filter((q, index) => answers[index] === q.correct).length;

  const reset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="my-10 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {title && <h3 className="text-xl font-bold text-slate-800 mb-6 px-1">{title}</h3>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 pl-2 text-xs font-black uppercase text-slate-400 tracking-wider w-1/2">
                Tvrzení
              </th>
              {options.map((opt) => (
                <th key={opt.id} className="p-4 text-center text-xs font-black uppercase text-slate-600 tracking-wider w-1/4">
                  {opt.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correct;
              
              // Automatické ID podle indexu (0, 1, 2...)
              const rowId = index; 

              return (
                <tr key={rowId} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-2 text-slate-700 font-medium leading-snug">
                    {q.text}
                    {isSubmitted && (
                      <div className="mt-2 text-xs font-bold flex items-center gap-1">
                        {isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1"><Check size={14} /> Správně</span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1">
                             <X size={14} /> Chyba (správně: {options.find(o => o.id === q.correct)?.label})
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {options.map((opt) => {
                    const isSelected = userAnswer === opt.id;
                    let bgClass = "bg-white border-slate-300";
                    let icon = null;

                    if (isSubmitted) {
                      if (q.correct === opt.id) {
                        bgClass = "bg-emerald-100 border-emerald-500 text-emerald-700";
                        if (isSelected) icon = <Check size={16} />;
                      } else if (isSelected && q.correct !== opt.id) {
                        bgClass = "bg-rose-100 border-rose-500 text-rose-700";
                        icon = <X size={16} />;
                      } else {
                        bgClass = "bg-slate-50 border-slate-100 opacity-30";
                      }
                    } else if (isSelected) {
                      bgClass = "bg-blue-600 border-blue-600 text-white";
                      icon = <Check size={16} />;
                    }

                    return (
                      <td key={opt.id} className="p-4 text-center">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleSelect(rowId, opt.id)}
                            className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${bgClass}`}
                          >
                            {icon}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        <div className="text-sm font-bold text-slate-500 pl-2">
          {isSubmitted && <span>Skóre: {correctCount} / {questions.length}</span>}
        </div>
        
        {!isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200"
          >
            Zkontrolovat
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 flex items-center gap-2 transition-all"
          >
            <RefreshCw size={16} /> Znovu
          </button>
        )}
      </div>
    </div>
  );
}