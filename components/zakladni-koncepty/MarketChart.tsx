"use client";
import React from 'react';

// --- 1. DEFINICE DATOVÝCH TYPŮ ---

export interface Curve {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  label: string;
  color?: string;
  isDashed?: boolean;
}

export interface Arrow {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
}

export interface Point {
  x: number;
  y: number;
  label?: string;
  xLabel?: string;
  yLabel?: string;
  showLines?: boolean;
  color?: string;
  hidePoint?: boolean;
  labelPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom' | 'left' | 'right'; 
}

// NOVINKA: Definice vybarvené plochy
export interface FilledArea {
  // Pole bodů, které tvoří obvod plochy (např. 3 body pro trojúhelník)
  // Musí být v logických souřadnicích 0-100
  points: { x: number; y: number }[]; 
  color?: string;   // Barva výplně (např. "green", "#ff0000")
  opacity?: number; // Průhlednost (0.0 až 1.0, výchozí 0.3)
}

interface MarketChartProps {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  curves?: Curve[];
  arrows?: Arrow[];
  points?: Point[];
  areas?: FilledArea[]; // <-- Přidáno do props
  className?: string;
}

// --- 2. SAMOTNÁ KOMPONENTA ---

export default function MarketChart({
  title,
  xAxisLabel = "Množství (Q)",
  yAxisLabel = "Cena (P)",
  curves = [],
  arrows = [],
  points = [],
  areas = [], // <-- Výchozí prázdné pole
  className = ""
}: MarketChartProps) {

  // Rozměry grafu
  const width = 400;
  const height = 400;
  const padding = 50; 
  
  // Převod 0-100 (logika) na pixely (obrazovka)
  const getX = (val: number) => padding + (val / 100) * (width - padding * 2);
  const getY = (val: number) => (height - padding) - (val / 100) * (height - padding * 2);

  return (
    <div className={`my-8 flex flex-col items-center ${className}`}>
      {title && <h4 className="font-bold text-slate-800 mb-2">{title}</h4>}
      
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-md overflow-visible font-sans">
        
        {/* --- DEFINICE ŠIPEK --- */}
        <defs>
          <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
          </marker>
          <marker id="axisArrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="270">
            <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
          </marker>
          <marker id="shiftArrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* --- OSY --- */}
        <line x1={padding} y1={padding - 10} x2={padding} y2={height - padding} stroke="#334155" strokeWidth="2" markerStart="url(#axisArrow2)" />
        <text x={padding} y={padding - 25} textAnchor="middle" className="text-sm font-bold fill-slate-700">{yAxisLabel}</text>
        
        <line x1={padding} y1={height - padding} x2={width - padding + 10} y2={height - padding} stroke="#334155" strokeWidth="2" markerEnd="url(#axisArrow)" />
        <text x={width - padding + 20} y={height - padding + 4} textAnchor="start" dominantBaseline="middle" className="text-sm font-bold fill-slate-700">{xAxisLabel}</text>

        {/* --- 3. NOVINKA: VYBARVENÉ PLOCHY (Musí být vykresleny JAKO PRVNÍ, aby byly pod křivkami) --- */}
        {areas.map((area, i) => {
          // Převedeme pole bodů [{x,y}, ...] na řetězec pro SVG "x1,y1 x2,y2 ..."
          const pointsString = area.points
            .map(pt => `${getX(pt.x)},${getY(pt.y)}`)
            .join(' ');

          return (
            <polygon 
              key={`area-${i}`}
              points={pointsString}
              fill={area.color || "#cbd5e1"} // Výchozí šedá
              fillOpacity={area.opacity ?? 0.3} // Výchozí průhlednost 30%
            />
          );
        })}

        {/* --- KŘIVKY --- */}
        {curves.map((curve, i) => {
          const sx = getX(curve.startX);
          const sy = getY(curve.startY);
          const ex = getX(curve.endX);
          const ey = getY(curve.endY);
          const strokeColor = curve.color || "#2563eb";

          return (
            <g key={`curve-${i}`}>
              <line 
                x1={sx} y1={sy} 
                x2={ex} y2={ey} 
                stroke={strokeColor} 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray={curve.isDashed ? "6,6" : "none"}
              />
              <text 
                x={ex + 8} 
                y={ey + (curve.endY < curve.startY ? -5 : 15)} 
                className="text-base font-black" 
                fill={strokeColor}
              >
                {curve.label}
              </text>
            </g>
          );
        })}

        {/* --- VOLNÉ ŠIPKY (Posuny) --- */}
        {arrows.map((arr, i) => (
          <line 
            key={`arrow-${i}`}
            x1={getX(arr.startX)} y1={getY(arr.startY)} 
            x2={getX(arr.endX)} y2={getY(arr.endY)} 
            stroke={arr.color || "#94a3b8"} 
            strokeWidth="2" 
            markerEnd="url(#shiftArrow)" 
          />
        ))}

        {/* --- BODY A POPISKY --- */}
        {points.map((pt, i) => {
          const px = getX(pt.x);
          const py = getY(pt.y);

          // Výchozí pozice (top-right)
          let labelX = px + 8;
          let labelY = py - 8;
          let textAnchor = "start";

          // Logika pro všech 8 směrů
          switch (pt.labelPosition) {
            case 'top-left':
              labelX = px - 8;
              textAnchor = "end";
              break;
            case 'bottom-right':
              labelY = py + 16;
              break;
            case 'bottom-left':
              labelX = px - 8;
              labelY = py + 16;
              textAnchor = "end";
              break;
            case 'top':
              labelX = px;
              labelY = py - 12;
              textAnchor = "middle";
              break;
            case 'bottom':
              labelX = px;
              labelY = py + 20;
              textAnchor = "middle";
              break;
            case 'left':
              labelX = px - 12;
              labelY = py + 4;
              textAnchor = "end";
              break;
            case 'right':
              labelX = px + 12;
              labelY = py + 4;
              textAnchor = "start";
              break;
            case 'top-right':
            default:
              break;
          }

          return (
            <g key={`point-${i}`}>
              {/* Vodicí čáry */}
              {pt.showLines && (
                <>
                  <line x1={padding} y1={py} x2={px} y2={py} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
                  <line x1={px} y1={height - padding} x2={px} y2={py} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
                </>
              )}
              
              {/* Label na ose X */}
              {pt.xLabel && (
                <>
                  <line x1={px} y1={height - padding - 4} x2={px} y2={height - padding + 4} stroke="black" strokeWidth="1.5" />
                  <text x={px} y={height - padding + 20} textAnchor="middle" className="text-xs font-bold fill-slate-600">{pt.xLabel}</text>
                </>
              )}
              
              {/* Label na ose Y */}
              {pt.yLabel && (
                <>
                  <line x1={padding - 4} y1={py} x2={padding + 4} y2={py} stroke="black" strokeWidth="1.5" />
                  <text x={padding - 10} y={py} textAnchor="end" dominantBaseline="middle" className="text-xs font-bold fill-slate-600">{pt.yLabel}</text>
                </>
              )}
              
              {/* Samotný puntík a písmeno */}
              {!pt.hidePoint && (
                <>
                  <circle cx={px} cy={py} r="5" fill={pt.color || "#0f172a"} stroke="white" strokeWidth="2" />
                  {pt.label && (
                    <text 
                      x={labelX} 
                      y={labelY} 
                      textAnchor={textAnchor as any} 
                      className="text-sm font-bold fill-slate-800"
                    >
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