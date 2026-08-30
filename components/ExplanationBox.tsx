import React from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function ExplanationBox({ title = "Vysvětlení", children }: Props) {
  return (
    <div className="bg-[#FAF4EB] border-l-4 border-orange-700 border-y border-r border-orange-200/80 p-6 my-8 rounded-r-xl shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <HelpCircle className="text-orange-700 shrink-0" size={18} />
        <h4 className="text-stone-900 font-serif font-bold text-base m-0 tracking-wide uppercase">
          {title}
        </h4>
      </div>
      <div className="text-stone-800 font-sans text-base m-0 leading-relaxed">
        {children}
      </div>
    </div>
  );
}