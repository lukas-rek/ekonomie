import React from 'react';

export interface Point {
  x: number;
  y: number;
  label?: string;
  xLabel?: string;
  yLabel?: string;
  showLines?: boolean;
  color?: string;
  hidePoint?: boolean;
}

interface BasicPPFChartProps {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  points?: Point[];
  className?: string;
}

export default function BasicPPFChart({
  title,
  xAxisLabel = "Statky X",
  yAxisLabel = "Statky Y",
  points = [],
  className = ""
}: BasicPPFChartProps) {

  const width = 400;
  const height = 400;
  const padding = 50; 
  
  const getX = (val: number) => padding + (val / 100) * (width - padding * 2);
  const getY = (val: number) => (height - padding) - (val / 100) * (height - padding * 2);

  const pathData = `
    M ${getX(0)} ${getY(80)} 
    Q ${getX(10)} ${getY(10)} 
      ${getX(80)} ${getY(0)}
  `;

  return (
    <div className={`my-4 flex flex-col items-center bg-[#FDFCF9] p-4 rounded-xl border border-stone-300 shadow-sm ${className}`}>
      {title && <h4 className="font-serif font-bold text-stone-900 mb-2 text-sm">{title}</h4>}
      
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-md overflow-visible font-sans bg-[#F7F4EE] rounded-lg p-2 border border-stone-200">
        
        <line 
          x1={padding} y1={padding} 
          x2={padding} y2={height - padding} 
          stroke="#1C1917" strokeWidth="2" 
        />
        <text x={padding} y={padding - 15} textAnchor="middle" className="text-xs font-serif font-bold fill-stone-900">
          {yAxisLabel}
        </text>
        
        <line 
          x1={padding} y1={height - padding} 
          x2={width - padding} y2={height - padding} 
          stroke="#1C1917" strokeWidth="2" 
        />
        <text x={width - padding + 10} y={height - padding + 4} textAnchor="start" dominantBaseline="middle" className="text-xs font-serif font-bold fill-stone-900">
          {xAxisLabel}
        </text>

        {/* --- KŘIVKA --- */}
        <path d={pathData} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />

        {/* --- BODY --- */}
        {points.map((pt, i) => {
          const px = getX(pt.x);
          const py = getY(pt.y);

          return (
            <g key={i}>
              {pt.showLines && (
                <>
                  <line x1={padding} y1={py} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1={px} y1={height - padding} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="4,4" />
                </>
              )}

              {pt.xLabel && (
                <>
                  <line x1={px} y1={height - padding - 3} x2={px} y2={height - padding + 3} stroke="#1C1917" strokeWidth="1.5" />
                  <text x={px} y={height - padding + 18} textAnchor="middle" className="text-xs font-mono font-bold fill-stone-700">
                    {pt.xLabel}
                  </text>
                </>
              )}

              {pt.yLabel && (
                <>
                  <line x1={padding - 3} y1={py} x2={padding + 3} y2={py} stroke="#1C1917" strokeWidth="1.5" />
                  <text x={padding - 8} y={py} textAnchor="end" dominantBaseline="middle" className="text-xs font-mono font-bold fill-stone-700">
                    {pt.yLabel}
                  </text>
                </>
              )}

              {!pt.hidePoint && (
                <>
                  <circle 
                    cx={px} cy={py} 
                    r="5" 
                    fill={pt.color || "#1C1917"} 
                    stroke="#FFFFFF" 
                    strokeWidth="1.5" 
                  />
                  
                  {pt.label && (
                    <text x={px + 8} y={py - 8} className="text-xs font-serif font-bold fill-stone-900">
                      {pt.label}
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}