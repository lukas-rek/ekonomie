import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function DefinitionBox({ title = "Klíčová definice", children }: Props) {
  return (
    <div className="bg-blue-50/70 border border-blue-200/80 p-6 my-8 rounded-2xl shadow-sm">
      <div className="flex items-center mb-2">
        <Info className="text-blue-600 mr-2" size={20} />
        <h4 className="text-blue-950 font-bold m-0 uppercase text-sm tracking-wider">
          {title}
        </h4>
      </div>
      <div className="text-blue-900 m-0 font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );
}