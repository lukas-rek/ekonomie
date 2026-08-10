import React from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function ExplanationBox({ title = "Vysvětlení", children }: Props) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-xl shadow-sm">
      <div className="flex items-center mb-2">
        <HelpCircle className="text-amber-600 mr-2" size={20} />
        <h4 className="text-amber-900 font-bold m-0 uppercase text-sm tracking-wider">
          {title}
        </h4>
      </div>
      <div className="text-amber-900 m-0 leading-relaxed">
        {children}
      </div>
    </div>
  );
}