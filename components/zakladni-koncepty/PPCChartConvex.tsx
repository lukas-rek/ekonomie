import React from 'react';

// 1. DEFINICE VLASTNOSTÍ BODU
export interface Point {
  x: number;           // 0 až 100
  y: number;           // 0 až 100
  label?: string;      // Text u bodu (např. "A") - zmizí, pokud je hidePoint: true
  xLabel?: string;     // Text na ose X (např. "50")
  yLabel?: string;     // Text na ose Y (např. "100")
  showLines?: boolean; // Zobrazit čárkované vodicí čáry?
  color?: string;      // Barva bodu (default červená)
  hidePoint?: boolean; // <--- POKUD JE TRUE, NEVYKRESLÍ SE PUNTÍK ANI PÍSMENO
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

  // ROZMĚRY GRAFU
  const width = 400;
  const height = 400;
  const padding = 50; 
  
  // Převod 0-100 na pixely
  const getX = (val: number) => padding + (val / 100) * (width - padding * 2);
  const getY = (val: number) => (height - padding) - (val / 100) * (height - padding * 2);

  const pathData = `
    M ${getX(0)} ${getY(80)} 
    Q ${getX(10)} ${getY(10)} 
      ${getX(80)} ${getY(0)}
  `;

  return (
    <div className={`my-8 flex flex-col items-center ${className}`}>
      {title && <h4 className="font-bold text-slate-800 mb-2">{title}</h4>}
      
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-md overflow-visible font-sans">
        
        {/* Definice šipky pro osy */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>

        {/* --- OSY --- */}
        {/* Osa Y */}
        <line 
          x1={padding} y1={padding} 
          x2={padding} y2={height - padding} 
          stroke="black" strokeWidth="2" 
        />
        <text x={padding} y={padding - 15} textAnchor="middle" className="text-sm font-bold fill-slate-700">
          {yAxisLabel}
        </text>
        
        {/* Osa X */}
        <line 
          x1={padding} y1={height - padding} 
          x2={width - padding} y2={height - padding} 
          stroke="black" strokeWidth="2" 
        />
        <text x={width - padding +10} y={height - padding + 0} textAnchor="start" dominantBaseline="middle" className="text-sm font-bold fill-slate-700">
           {" " + xAxisLabel}
        </text>

        {/* --- KŘIVKA --- */}
        <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

        {/* --- BODY --- */}
        {points.map((pt, i) => {
          const px = getX(pt.x);
          const py = getY(pt.y);

          return (
            <g key={i}>
              {/* 1. Vodicí čáry (tečkované) */}
              {pt.showLines && (
                <>
                  <line x1={padding} y1={py} x2={px} y2={py} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5,3" />
                  <line x1={px} y1={height - padding} x2={px} y2={py} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5,3" />
                </>
              )}

              {/* 2. Popisek na ose X */}
              {pt.xLabel && (
                <>
                  <line x1={px} y1={height - padding - 4} x2={px} y2={height - padding + 4} stroke="black" strokeWidth="1.5" />
                  <text x={px} y={height - padding + 20} textAnchor="middle" className="text-xs font-bold fill-slate-600">
                    {pt.xLabel}
                  </text>
                </>
              )}

              {/* 3. Popisek na ose Y */}
              {pt.yLabel && (
                <>
                  <line x1={padding - 4} y1={py} x2={padding + 4} y2={py} stroke="black" strokeWidth="1.5" />
                  <text x={padding - 10} y={py} textAnchor="end" dominantBaseline="middle" className="text-xs font-bold fill-slate-600">
                    {pt.yLabel}
                  </text>
                </>
              )}

              {/* 4. SAMOTNÝ BOD A JEHO NÁZEV (Zobrazí se jen když hidePoint NENÍ true) */}
              {!pt.hidePoint && (
                <>
                  <circle 
                    cx={px} cy={py} 
                    r="5" 
                    fill={pt.color || "#ef4444"} 
                    stroke="white" 
                    strokeWidth="2" 
                  />
                  
                  {pt.label && (
                    <text x={px + 8} y={py - 8} className="text-sm font-bold fill-slate-800">
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