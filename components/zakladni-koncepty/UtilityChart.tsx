"use client";
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Label 
} from 'recharts';

const data = [
  { q: 0, tu: 0, mu: 12 },
  { q: 1, tu: 10, mu: 10 },
  { q: 2, tu: 18, mu: 8 },
  { q: 3, tu: 24, mu: 6 },
  { q: 4, tu: 28, mu: 4 },
  { q: 5, tu: 30, mu: 2 },
  { q: 6, tu: 30, mu: 0 },   // Bod nasycení
  { q: 7, tu: 28, mu: -2 },  // MU v záporu
  { q: 8, tu: 24, mu: -4 },
];

export default function UtilityChart() {
  return (
    <div className="my-12 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden">
      <div className="h-[400px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 40, right: 100, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
            
            <XAxis 
              dataKey="q" 
              axisLine={false}
              tick={false} 
            
            >
              <Label value="Množství (Q)" offset={50} position="insideBottomRight" dx={150} dy={-40} fill="#94a3b8" fontSize={12} fontWeight="bold" />
            </XAxis>
            <ReferenceLine y={0} stroke="#cbd5e1" />
            <YAxis 
              axisLine={{ stroke: '#cbd5e1' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              ticks={["0"]}
            >
              <Label value="Užitek (U)" angle={0} position="insideTopLeft" dy={-30} dx={30} fill="#94a3b8" fontSize={12} fontWeight="bold" />
            </YAxis>
            
            {/* Tooltip bez hodnot - jen vodicí linka a identifikace */}
            <Tooltip 
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/80 backdrop-blur-sm p-2 border border-slate-100 shadow-lg rounded-lg text-[10px] font-black uppercase tracking-tighter">
                      Bod na křivce
                    </div>
                  );
                }
                return null;
              }}
            />


            
            {/* Bod nasycení s popiskem */}
            <ReferenceLine 
              x={6} 
              stroke="#cbd5e1" 
              strokeDasharray="6 4" 
              label={{ 
                position: 'top', 
                value: 'BOD NASYCENÍ', 
                fill: '#64748b', 
                fontSize: 10, 
                fontWeight: 900,
                letterSpacing: '0.1em'
              }} 
            />

            {/* TU Křivka */}
            <Line 
              type="monotone" 
              dataKey="tu" 
              stroke="#2563eb" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
              animationDuration={2000}
            />

            {/* MU Křivka */}
            <Line 
              type="monotone" 
              dataKey="mu" 
              stroke="#f59e0b" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 6, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda pod grafem */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-1.5 bg-blue-600 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Celkový užitek</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-1.5 bg-amber-500 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mezní užitek</span>
        </div>
      </div>
    </div>
  );
}