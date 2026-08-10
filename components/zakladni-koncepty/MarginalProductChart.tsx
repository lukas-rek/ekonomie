"use client";
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Label 
} from 'recharts';

const data = [
  { q: 0, Q: 0, mp: 0 },
  { q: 1, Q: 10, mp: 10 },
  { q: 2, Q: 30, mp: 20 },
  { q: 3, Q: 60, mp: 30 },
  { q: 4, Q: 100, mp: 40 },
  { q: 5, Q: 130, mp: 30 },
  { q: 6, Q: 150, mp: 20 },   
  { q: 7, Q: 160, mp: 10 },  
  { q: 8, Q: 160, mp: 0 },
  { q: 9, Q: 150, mp: -10 },
  { q: 10, Q: 130, mp: -20 },

];

export default function MarginalProductChart() {
  return (
    <div className="my-12 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden">
      <div className="h-[400px] mx-auto ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 40, right: 300, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
            
            <XAxis 
              dataKey="q" 
              axisLine={false}
              tick={false} 
              domain={['dataMin - 0', 'dataMax + 0']}
            >
              <Label value="Množství jednotek výrobního faktoru (F)" offset={50} position="insideBottomRight" dx={315} dy={-12} fill="#94a3b8" fontSize={12} fontWeight="bold" />
            </XAxis>
            <ReferenceLine y={0} stroke="#cbd5e1" />
            <YAxis 
              axisLine={{ stroke: '#cbd5e1' }}
              domain={['dataMin - 5', 'dataMax + 40']}
              ticks={["0"]}
            >
              <Label value="Množství produktu (Q)" angle={0} position="insideTopLeft" dy={-30} dx={0} fill="#94a3b8" fontSize={12} fontWeight="bold" />
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

            {/* Q Křivka */}
            <Line 
              type="monotone" 
              dataKey="Q" 
              stroke="#2563eb" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
              animationDuration={2000}
            />

            {/* mp Křivka */}
            <Line 
              type="monotone" 
              dataKey="mp" 
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
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Produkce</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-1.5 bg-amber-500 rounded-full"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mezní produkt výrobního faktoru</span>
        </div>
      </div>
    </div>
  );
}