import React from 'react';
import { Camera } from 'lucide-react';
import Image from "next/image";

interface ImageBlockProps {
  src: string;
  alt?: string; // Alt může být volitelný, pokud není, použije se caption nebo prázdný
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
  className?: string;
  
  // NOVÁ VLASTNOST: Zarovnání
  align?: 'left' | 'right' | 'center'; 
}

export default function ImageBlock({ 
  src, 
  alt = "", 
  caption, 
  source, 
  width = 1200, 
  height = 800, 
  className = "max-w-4xl", // Výchozí šířka
  align = 'center'         // Výchozí zarovnání
}: ImageBlockProps) {

  // Logika pro CSS třídy podle zarovnání
  const getPositionClasses = () => {
    switch (align) {
      case 'left':
        // float-left = pluje vlevo, mr-8 = mezera vpravo pro text
        return 'float-left mr-8 mb-6 mt-2'; 
      case 'right':
        // float-right = pluje vpravo, ml-8 = mezera vlevo pro text
        return 'float-right ml-8 mb-6 mt-2'; 
      case 'center':
      default:
        // mx-auto = střed, my-12 = mezera nahoře a dole (bez obtékání)
        return 'mx-auto my-12 clear-both'; 
    }
  };

  return (
    <figure className={`${getPositionClasses()} ${className}`}>
      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 relative group">
        <Image
          src={src}
          alt={alt || caption || "Obrázek"}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>

      {(caption || source) && (
        <figcaption className={`mt-3 px-2 ${align === 'center' ? 'text-center md:text-left' : 'text-left'}`}>
          {caption && (
            <p className="text-sm font-medium text-slate-700 leading-snug">
              {caption}
            </p>
          )}
          {source && (
            <p className="text-xs text-slate-400 mt-1.5 italic flex items-center gap-1.5">
              <Camera size={12} className="shrink-0 opacity-70" />
              <span>{source}</span>
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}