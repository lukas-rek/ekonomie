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
    <div className="my-8 p-6 bg-[#FDFCF9] border border-stone-300 rounded-xl shadow-sm relative overflow-hidden">
      <div className="h-[380px] mx-auto bg-[#F7F4EE] rounded-lg p-2 border border-stone-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 40, right: 100, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
            
            <XAxis 
              dataKey="q" 
              axisLine={false}
              tick={false} 
            >
              <Label value="Množství (Q)" offset={40} position="insideBottomRight" dx={110} dy={-25} fill="#57534E" fontSize={11} fontWeight="bold" fontFamily="sans-serif" />
            </XAxis>
            <ReferenceLine y={0} stroke="#A8A29E" />
            <YAxis 
              axisLine={{ stroke: '#A8A29E' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              ticks={["0"]}
              tick={{ fill: '#78716C', fontSize: 11 }}
            >
              <Label value="Užitek (U)" angle={0} position="insideTopLeft" dy={-30} dx={20} fill="#57534E" fontSize={11} fontWeight="bold" fontFamily="sans-serif" />
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

            {/* Bod nasycení s popiskem */}
            <ReferenceLine 
              x={6} 
              stroke="#78716C" 
              strokeDasharray="4 4" 
              label={{ 
                position: 'top', 
                value: 'BOD NASYCENÍ', 
                fill: '#44403C', 
                fontSize: 10, 
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontFamily: 'sans-serif'
              }} 
            />

            {/* TU Křivka */}
            <Line 
              type="monotone" 
              dataKey="tu" 
              stroke="#2563EB" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#FFF" }}
              animationDuration={1500}
            />

            {/* MU Křivka */}
            <Line 
              type="monotone" 
              dataKey="mu" 
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
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans">Celkový užitek (TU)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-orange-700 rounded-full"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans">Mezní užitek (MU)</span>
        </div>
      </div>
    </div>
  );
}