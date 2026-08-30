"use client";
import React from 'react';

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

export interface FilledArea {
  points: { x: number; y: number }[]; 
  color?: string;
  opacity?: number;
}

interface MarketChartProps {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  curves?: Curve[];
  arrows?: Arrow[];
  points?: Point[];
  areas?: FilledArea[];
  className?: string;
}

export default function MarketChart({
  title,
  xAxisLabel = "Množství (Q)",
  yAxisLabel = "Cena (P)",
  curves = [],
  arrows = [],
  points = [],
  areas = [],
  className = ""
}: MarketChartProps) {

  const width = 400;
  const height = 400;
  const padding = 50; 
  
  const getX = (val: number) => padding + (val / 100) * (width - padding * 2);
  const getY = (val: number) => (height - padding) - (val / 100) * (height - padding * 2);

  return (
    <div className={`my-8 flex flex-col items-center bg-[#FDFCF9] p-5 rounded-xl border border-stone-300 shadow-sm ${className}`}>
      {title && <h4 className="font-serif font-bold text-stone-900 mb-3 text-base">{title}</h4>}
      
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-md overflow-visible font-sans bg-[#F7F4EE] rounded-lg p-2 border border-stone-200">
        
        {/* --- DEFINICE ŠIPEK --- */}
        <defs>
          <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#1C1917" />
          </marker>
          <marker id="axisArrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="270">
            <path d="M0,0 L0,6 L9,3 z" fill="#1C1917" />
          </marker>
          <marker id="shiftArrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#78716C" />
          </marker>
        </defs>

        {/* --- OSY --- */}
        <line x1={padding} y1={padding - 10} x2={padding} y2={height - padding} stroke="#1C1917" strokeWidth="2" markerStart="url(#axisArrow2)" />
        <text x={padding} y={padding - 22} textAnchor="middle" className="text-xs font-serif font-bold fill-stone-900">{yAxisLabel}</text>
        
        <line x1={padding} y1={height - padding} x2={width - padding + 10} y2={height - padding} stroke="#1C1917" strokeWidth="2" markerEnd="url(#axisArrow)" />
        <text x={width - padding + 18} y={height - padding + 4} textAnchor="start" dominantBaseline="middle" className="text-xs font-serif font-bold fill-stone-900">{xAxisLabel}</text>

        {/* --- VYBARVENÉ PLOCHY --- */}
        {areas.map((area, i) => {
          const pointsString = area.points
            .map(pt => `${getX(pt.x)},${getY(pt.y)}`)
            .join(' ');

          return (
            <polygon 
              key={`area-${i}`}
              points={pointsString}
              fill={area.color || "#D6D3D1"}
              fillOpacity={area.opacity ?? 0.25}
            />
          );
        })}

        {/* --- KŘIVKY --- */}
        {curves.map((curve, i) => {
          const sx = getX(curve.startX);
          const sy = getY(curve.startY);
          const ex = getX(curve.endX);
          const ey = getY(curve.endY);
          const strokeColor = curve.color || "#2563EB";

          return (
            <g key={`curve-${i}`}>
              <line 
                x1={sx} 
                y1={sy} 
                x2={ex} 
                y2={ey} 
                stroke={strokeColor} 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeDasharray={curve.isDashed ? "6,6" : "none"}
              />
              <text 
                x={ex + 8} 
                y={ey + (curve.endY < curve.startY ? -5 : 15)} 
                className="text-sm font-sans font-bold" 
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
            x1={getX(arr.startX)} 
            y1={getY(arr.startY)} 
            x2={getX(arr.endX)} 
            y2={getY(arr.endY)} 
            stroke={arr.color || "#78716C"} 
            strokeWidth="1.5" 
            markerEnd="url(#shiftArrow)" 
          />
        ))}

        {/* --- BODY A POPISKY --- */}
        {points.map((pt, i) => {
          const px = getX(pt.x);
          const py = getY(pt.y);

          let labelX = px + 8;
          let labelY = py - 8;
          let textAnchor = "start";

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
                  <line x1={padding} y1={py} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1={px} y1={height - padding} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="3,3" />
                </>
              )}
              
              {/* Label na ose X */}
              {pt.xLabel && (
                <>
                  <line x1={px} y1={height - padding - 3} x2={px} y2={height - padding + 3} stroke="#1C1917" strokeWidth="1.5" />
                  <text x={px} y={height - padding + 18} textAnchor="middle" className="text-xs font-mono font-bold fill-stone-700">{pt.xLabel}</text>
                </>
              )}
              
              {/* Label na ose Y */}
              {pt.yLabel && (
                <>
                  <line x1={padding - 3} y1={py} x2={padding + 3} y2={py} stroke="#1C1917" strokeWidth="1.5" />
                  <text x={padding - 8} y={py} textAnchor="end" dominantBaseline="middle" className="text-xs font-mono font-bold fill-stone-700">{pt.yLabel}</text>
                </>
              )}
              
              {/* Samotný puntík a písmeno */}
              {!pt.hidePoint && (
                <>
                  <circle cx={px} cy={py} r="5" fill={pt.color || "#1C1917"} stroke="#FFFFFF" strokeWidth="1.5" />
                  {pt.label && (
                    <text 
                      x={labelX} 
                      y={labelY} 
                      textAnchor={textAnchor as any} 
                      className="text-xs font-serif font-bold fill-stone-900"
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