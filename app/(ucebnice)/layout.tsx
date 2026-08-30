import React from 'react';
import TextbookProgressBar from '@/components/TextbookProgressBar';

export default function UcebniceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24 bg-[#FBF9F5]"> 
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {children}
      </main>

      <TextbookProgressBar />
    </div>
  );
}