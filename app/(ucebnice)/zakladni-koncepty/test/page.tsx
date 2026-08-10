"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

// --- 1. STRUKTURA OTÁZEK ---
const QUESTIONS = [
  // --- SINGLE CHOICE ---
  {
    id: 'q1',
    type: 'single',
    text: 'Který z následujících tvrzení je příkladem normativní ekonomie?',
    options: [
      'Míra nezaměstnanosti v ČR je 3,5 %.',
      'Vláda by měla zvýšit minimální mzdu, aby pomohla chudším.',
      'Zvýšení daní povede k poklesu spotřeby.',
      'Inflace v minulém roce klesla.'
    ],
    correctAnswer: 'Vláda by měla zvýšit minimální mzdu, aby pomohla chudším.'
  },
  {
    id: 'q2',
    type: 'single',
    text: 'Co znamená ceteris paribus?',
    options: [
      'Zákon klesajících výnosů',
      'Neviditelná ruka trhu',
      'Za jinak stejných okolností (ostatní proměnné se nemění)',
      'Náklady obětované příležitosti'
    ],
    correctAnswer: 'Za jinak stejných okolností (ostatní proměnné se nemění)'
  },
  {
    id: 'q3',
    type: 'single',
    text: 'Mezní užitek je nula když:',
    options: [
      'Spotřebitel nemá žádný důchod.',
      'Celkový užitek začíná růst.',
      'Cena statku je nulová.',
      'Celkový užitek je maximální (bod nasycení).'
    ],
    correctAnswer: 'Celkový užitek je maximální (bod nasycení).'
  },
  {
    id: 'q4',
    type: 'single',
    text: 'Apple za hodinu vyrobí 28 000 mobilů a 2 800 notebooků. Samsung vyrobí 27 000 mobilů a 500 notebooků za stejnou dobu. Kdo má absolutní výhodu ve výrobě mobilů?',
    options: [
      'Apple',
      'Samsung',
      'Obě firmy mají stejnou absolutní výhodu.',
      'Z těchto dat nelze absolutní výhodu určit.'
    ],
    correctAnswer: 'Apple'
  },
  {
    id: 'q5',
    type: 'single',
    text: 'Kdo má komparativní výhodu ve výrobě mobilů z příkladu výše?',
    options: [
      'Apple',
      'Samsung',
      'Obě firmy mají stejnou komparativní výhodu.',
      'Nelze určit, chybí nám cena mobilů.'
    ],
    correctAnswer: 'Samsung'
  },
  {
    id: 'q6',
    type: 'single',
    text: 'Co se stane s poptávkou po inferiorním statku, pokud se sníží důchod spotřebitelů?',
    options: [
      'Poptávka se sníží (posun křivky doleva).',
      'Poptávka se zvýší (posun křivky doprava).',
      'Zvýší se pouze poptávané množství (posun po křivce).',
      'Poptávka se nezmění.'
    ],
    correctAnswer: 'Poptávka se zvýší (posun křivky doprava).'
  },
  {
    id: 'q7',
    type: 'single',
    text: 'U normálního statku se zvýší počet výrobců na trhu a zároveň klesne cena jeho komplementu. Co se stane s rovnovážným množstvím a cenou?',
    options: [
      'Množství i cena se jednoznačně zvýší.',
      'Cena se jednoznačně sníží, množství může vzrůst i klesnout.',
      'Množství se jednoznačně zvýší, cena může vzrůst i klesnout.',
      'Cena i množství se jednoznačně sníží.'
    ],
    correctAnswer: 'Množství se jednoznačně zvýší, cena může vzrůst i klesnout.'
  },
  
  // --- MULTIPLE CHOICE ---
  {
    id: 'q8',
    type: 'multiple',
    text: 'Vyberte, co patří mezi výrobní faktory:',
    options: [
      'Práce (lidský kapitál)',
      'Půda (přírodní zdroje)',
      'Kapitál (stroje, budovy, technologie)',
      'Peníze (bankovky a mince)'
    ],
    correctAnswers: ['Práce (lidský kapitál)', 'Půda (přírodní zdroje)', 'Kapitál (stroje, budovy, technologie)'] 
  },
  {
    id: 'q9',
    type: 'multiple',
    text: 'Vyberte veřejné statky:',
    options: [
      'Pouliční osvětlení',
      'Lístek do kina',
      'Národní obrana',
      'Jablko v supermarketu'
    ],
    correctAnswers: ['Pouliční osvětlení', 'Národní obrana'] 
  },
  {
    id: 'q10',
    type: 'multiple',
    text: 'Co z následujícího zvýší poptávku po normálním statku:',
    options: [
      'Růst důchodů spotřebitelů',
      'Růst ceny substitutu',
      'Pokles ceny komplementu',
      'Růst nákladů na výrobu'
    ],
    correctAnswers: ['Růst důchodů spotřebitelů', 'Růst ceny substitutu', 'Pokles ceny komplementu'] 
  },

  // --- FREE ANSWER ---
  {
    id: 'q11',
    type: 'text',
    text: 'Pomocí teorie komparativní výhody vysvětlete, proč je dělba práce a obchod výhodný:',
    suggestedAnswer: 'Dělba práce a obchod jsou výhodné, protože umožňují subjektům specializovat se na činnost, ve které mají nejnižší náklady obětované příležitosti (komparativní výhodu). Díky specializaci a následné směně se celkově vyrobí více statků a obě strany si mohou polepšit (mohou spotřebovávat za hranicí svých vlastních produkčních možností).'
  },
  {
    id: 'q12',
    type: 'text',
    text: 'Vysvětlete, co jsou náklady obětované příležitosti:',
    suggestedAnswer: 'Náklady obětované příležitosti představují hodnotu druhé nejlepší (nevybrané) varianty, které jsme se museli vzdát při našem rozhodování. Vzhledem k tomu, že zdroje jsou vzácné, každé rozhodnutí něco dělat znamená vzdát se příležitosti dělat něco jiného.'
  }
];

export default function ChapterTestPage() {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSingleChange = (questionId: string, value: string) => {
    if (isSubmitted) return; 
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChange = (questionId: string, value: string) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const currentSelection = prev[questionId] || [];
      if (currentSelection.includes(value)) {
        return { ...prev, [questionId]: currentSelection.filter((item: string) => item !== value) };
      } else {
        return { ...prev, [questionId]: [...currentSelection, value] };
      }
    });
  };

  const handleTextChange = (questionId: string, value: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
      <div className="max-w-4xl mx-auto pb-20 pt-5 px-4">
      {/* Navigace zpět na rozcestník */}
      <Link 
        href="/zakladni-koncepty" 
        className="flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Zpět na kapitolu: Základní koncepty
      </Link>

      {/* HLAVIČKA PODKAPITOLY */}
      <header className="mb-5">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
        TEST Z KAPITOLY: ZÁKLADNÍ EKONOMICKÉ KONCEPTY
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </header>

      {/* Seznam otázek */}
      <div className="space-y-10 mt-10">
        {QUESTIONS.map((q, index) => {
          return (
            <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {index + 1}. {q.text}
              </h3>

              {/* A) JEDNA SPRÁVNÁ ODPOVĚĎ */}
              {q.type === 'single' && (
                <div className="space-y-3">
                  {q.options?.map(option => {
                    const isSelected = answers[q.id] === option;
                    const isCorrect = option === q.correctAnswer;
                    
                    let labelClass = "border-slate-200 hover:bg-slate-50";
                    if (isSubmitted) {
                      if (isCorrect) labelClass = "border-green-500 bg-green-50 text-green-900";
                      else if (isSelected && !isCorrect) labelClass = "border-red-500 bg-red-50 text-red-900";
                      else labelClass = "border-slate-200 opacity-50";
                    } else if (isSelected) {
                      labelClass = "border-blue-500 bg-blue-50";
                    }

                    return (
                      <label key={option} className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${labelClass}`}>
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={option}
                          checked={isSelected}
                          onChange={() => handleSingleChange(q.id, option)}
                          disabled={isSubmitted}
                          className="mt-1 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="flex-1">{option}</span>
                        {isSubmitted && isCorrect && <CheckCircle2 className="text-green-600 shrink-0" size={20} />}
                        {isSubmitted && isSelected && !isCorrect && <XCircle className="text-red-600 shrink-0" size={20} />}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* B) VÍCE SPRÁVNÝCH ODPOVĚDÍ */}
              {q.type === 'multiple' && (
                <div className="space-y-3">
                  {q.options?.map(option => {
                    const isSelected = (answers[q.id] || []).includes(option);
                    const isCorrect = q.correctAnswers?.includes(option);
                    
                    let labelClass = "border-slate-200 hover:bg-slate-50";
                    if (isSubmitted) {
                      if (isCorrect && isSelected) labelClass = "border-green-500 bg-green-50 text-green-900";
                      else if (isCorrect && !isSelected) labelClass = "border-green-500 border-dashed opacity-60"; 
                      else if (!isCorrect && isSelected) labelClass = "border-red-500 bg-red-50 text-red-900"; 
                      else labelClass = "border-slate-200 opacity-50";
                    } else if (isSelected) {
                      labelClass = "border-blue-500 bg-blue-50";
                    }

                    return (
                      <label key={option} className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${labelClass}`}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleMultipleChange(q.id, option)}
                          disabled={isSubmitted}
                          className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="flex-1">{option}</span>
                        {isSubmitted && isCorrect && isSelected && <CheckCircle2 className="text-green-600 shrink-0" size={20} />}
                        {isSubmitted && !isCorrect && isSelected && <XCircle className="text-red-600 shrink-0" size={20} />}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* C) VOLNÁ ODPOVĚĎ */}
              {q.type === 'text' && (
                <div className="space-y-4">
                  <textarea
                    rows={4}
                    placeholder="Napište svou odpověď..."
                    value={answers[q.id] || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    disabled={isSubmitted}
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-0 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                  {isSubmitted && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
                      <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block font-bold text-blue-900 mb-1">Vzorové řešení pro kontrolu:</span>
                        <span className="text-blue-800 leading-relaxed">{q.suggestedAnswer}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* --- 5. SPODNÍ PANEL (VYHODNOCENÍ) --- */}
      <div className="mt-10 p-8 bg-slate-50 rounded-xl border border-slate-200 text-center">
        {!isSubmitted ? (
          <>
            <p className="text-slate-600 mb-6 text-lg">Zkontrolujte si své odpovědi. Až budete připraveni, klikněte na vyhodnotit.</p>
            <button 
              onClick={() => setIsSubmitted(true)}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-lg"
            >
              Vyhodnotit test
            </button>
          </>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Test byl vyhodnocen</h3>
            <p className="text-slate-600 mb-8">Prohlédněte si správné odpovědi a vzorová řešení výše.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => { setIsSubmitted(false); setAnswers({}); }}
                className="bg-white text-slate-700 font-bold py-3 px-6 rounded-lg border-2 border-slate-300 hover:bg-slate-100 transition-colors"
              >
                Zkusit test znovu
              </button>
              <Link 
                href="/mikroekonomie"
                className="bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Pokračovat na další kapitolu →
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}