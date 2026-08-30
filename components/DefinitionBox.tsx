import React from 'react';
import { Bookmark } from 'lucide-react';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function DefinitionBox({ title = "Klíčová definice", children }: Props) {
  return (
    <div className="bg-[#F5F1E8] border-l-4 border-stone-900 border-y border-r border-stone-300/80 p-6 my-8 rounded-r-xl shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <Bookmark className="text-stone-800 shrink-0" size={18} />
        <h4 className="text-stone-900 font-serif font-bold text-base m-0 tracking-wide uppercase">
          {title}
        </h4>
      </div>
      <div className="text-stone-800 font-sans text-base m-0 font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );
}