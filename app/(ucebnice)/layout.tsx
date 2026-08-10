// src/app/(ucebnice)/layout.tsx
import React from 'react';
import TextbookProgressBar from '@/components/TextbookProgressBar';
// import Sidebar from '@/components/ui/Sidebar'; // Tvůj sidebar

export default function UcebniceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20"> {/* pb-20 dělá místo dole, aby text nezajel za progress bar */}
      
      {/* Zde pravděpodobně máš svůj Sidebar nebo wrapper */}
      
      <main>
        {children}
      </main>

      {/* Progress Bar ukotvený dole */}
      <TextbookProgressBar />
    </div>
  );
}