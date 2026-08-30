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
    <div className="my-8 p-6 bg-[#FDFCF9] border border-stone-300 rounded-xl shadow-sm relative overflow-hidden">
      <div className="h-[380px] mx-auto bg-[#F7F4EE] rounded-lg p-2 border border-stone-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 40, right: 280, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
            
            <XAxis 
              dataKey="q" 
              axisLine={false}
              tick={false} 
              domain={['dataMin - 0', 'dataMax + 0']}
            >
              <Label value="Množství jednotek výrobního faktoru (F)" offset={40} position="insideBottomRight" dx={290} dy={-10} fill="#57534E" fontSize={11} fontWeight="bold" fontFamily="sans-serif" />
            </XAxis>
            <ReferenceLine y={0} stroke="#A8A29E" />
            <YAxis 
              axisLine={{ stroke: '#A8A29E' }}
              domain={['dataMin - 5', 'dataMax + 40']}
              ticks={["0"]}
              tick={{ fill: '#78716C', fontSize: 11 }}
            >
              <Label value="Množství produktu (Q)" angle={0} position="insideTopLeft" dy={-30} dx={0} fill="#57534E" fontSize={11} fontWeight="bold" fontFamily="sans-serif" />
            </YAxis>
            
            <Tooltip 
              cursor={{ stroke: '#A8A29E', strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#FDFCF9] p-2 border border-stone-300 shadow-sm rounded-md text-xs font-mono font-bold text-stone-800">
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
              stroke="#2563EB" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#FFF" }}
              animationDuration={1500}
            />

            {/* mp Křivka */}
            <Line 
              type="monotone" 
              dataKey="mp" 
              stroke="#C2410C" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 5, fill: "#C2410C", strokeWidth: 2, stroke: "#FFF" }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda pod grafem */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-4 pt-3 border-t border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans">Celková Produkce (Q)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-orange-700 rounded-full"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans">Mezní produkt (MP)</span>
        </div>
      </div>
    </div>
  );
}