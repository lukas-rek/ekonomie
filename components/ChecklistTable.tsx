"use client";
import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

interface SimpleQuestion {
  text: string;
  correct: string;
}

interface Option {
  id: string;
  label: string;
}

interface ChecklistTableProps {
  options: Option[];
  questions: SimpleQuestion[];
  title?: string;
}

export default function ChecklistTable({ options, questions, title }: ChecklistTableProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
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
    <div className="my-10 p-6 bg-[#FDFCF9] border border-stone-300 rounded-xl shadow-sm overflow-hidden">
      {title && (
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 px-1 tracking-tight">
          {title}
        </h3>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-stone-300">
              <th className="p-3.5 pl-2 text-xs font-black uppercase text-stone-500 tracking-wider w-1/2 font-sans">
                Tvrzení
              </th>
              {options.map((opt) => (
                <th key={opt.id} className="p-3.5 text-center text-xs font-black uppercase text-stone-700 tracking-wider w-1/4 font-sans">
                  {opt.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correct;
              const rowId = index; 

              return (
                <tr key={rowId} className="group hover:bg-stone-100/50 transition-colors">
                  <td className="p-4 pl-2 text-stone-800 font-sans font-medium text-sm leading-relaxed">
                    {q.text}
                    {isSubmitted && (
                      <div className="mt-1.5 text-xs font-semibold flex items-center gap-1 font-sans">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <Check size={14} /> Správně
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <X size={14} /> Chyba (správně: {options.find(o => o.id === q.correct)?.label})
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {options.map((opt) => {
                    const isSelected = userAnswer === opt.id;
                    let bgClass = "bg-white border-stone-300 hover:border-stone-500 text-stone-800";
                    let icon = null;

                    if (isSubmitted) {
                      if (q.correct === opt.id) {
                        bgClass = "bg-emerald-100 border-emerald-600 text-emerald-800";
                        if (isSelected) icon = <Check size={16} />;
                      } else if (isSelected && q.correct !== opt.id) {
                        bgClass = "bg-rose-100 border-rose-600 text-rose-800";
                        icon = <X size={16} />;
                      } else {
                        bgClass = "bg-stone-100 border-stone-200 opacity-40";
                      }
                    } else if (isSelected) {
                      bgClass = "bg-stone-900 border-stone-900 text-white";
                      icon = <Check size={16} />;
                    }

                    return (
                      <td key={opt.id} className="p-4 text-center">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleSelect(rowId, opt.id)}
                            className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all duration-150 shadow-sm ${bgClass}`}
                            aria-label={`Vybrat ${opt.label}`}
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

      <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-5">
        <div className="text-sm font-bold text-stone-600 pl-2 font-sans">
          {isSubmitted && <span>Skóre: {correctCount} / {questions.length}</span>}
        </div>
        
        {!isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="px-6 py-2.5 bg-stone-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
          >
            Zkontrolovat
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-stone-100 border border-stone-300 text-stone-700 font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-stone-200 flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw size={15} /> Znovu
          </button>
        )}
      </div>
    </div>
  );
}