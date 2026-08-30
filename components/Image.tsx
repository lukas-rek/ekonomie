import React from 'react';
import { Camera } from 'lucide-react';
import Image from "next/image";

interface ImageBlockProps {
  src: string;
  alt?: string;
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
  className?: string;
  align?: 'left' | 'right' | 'center'; 
}

export default function ImageBlock({ 
  src, 
  alt = "", 
  caption, 
  source, 
  width = 1200, 
  height = 800, 
  className = "max-w-4xl", 
  align = 'center'
}: ImageBlockProps) {

  const getPositionClasses = () => {
    switch (align) {
      case 'left':
        return 'float-left mr-8 mb-6 mt-2'; 
      case 'right':
        return 'float-right ml-8 mb-6 mt-2'; 
      case 'center':
      default:
        return 'mx-auto my-10 clear-both'; 
    }
  };

  return (
    <figure className={`${getPositionClasses()} ${className}`}>
      <div className="rounded-xl overflow-hidden shadow-sm border border-stone-300 bg-[#F5F2EB] relative group">
        <Image
          src={src}
          alt={alt || caption || "Ilustrace"}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>

      {(caption || source) && (
        <figcaption className={`mt-3 px-1 ${align === 'center' ? 'text-center md:text-left' : 'text-left'}`}>
          {caption && (
            <p className="text-sm font-serif italic text-stone-800 leading-snug">
              {caption}
            </p>
          )}
          {source && (
            <p className="text-xs text-stone-500 mt-1 font-sans flex items-center gap-1.5">
              <Camera size={12} className="shrink-0 opacity-70" />
              <span>{source}</span>
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}