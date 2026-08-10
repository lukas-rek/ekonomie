// src/app/(ucebnice)/layout.tsx
import React from 'react';
import TextbookProgressBar from '@/components/TextbookProgressBar';
// import Sidebar from '@/components/ui/Sidebar'; 

export default function UcebniceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20"> 
      
      
      <main>
        {children}
      </main>

      <TextbookProgressBar />
    </div>
  );
}