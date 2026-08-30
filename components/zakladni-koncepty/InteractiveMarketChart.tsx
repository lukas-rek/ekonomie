"use client";
import React, { useState, useRef, useEffect } from 'react';

const getSubscript = (n: number) => {
  const subs = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  return n >= 0 && n <= 9 ? subs[n] : n.toString();
};

export default function DraggableMarketChart() {
  const [demands, setDemands] = useState([{ shift: 0 }]);
  const [supplies, setSupplies] = useState([{ shift: 0 }]);
  const [timeline, setTimeline] = useState([{ d: 0, s: 0 }]);
  const [labelsOn, setLabelsOn] = useState(true);

  const [dragging, setDragging] = useState<{
    type: 'D' | 'S';
    index: number;
    startX: number;
    startShift: number;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const addDemand = () => {
    const newShift = demands[demands.length - 1].shift + 15; 
    setDemands([...demands, { shift: Math.min(newShift, 40) }]);
    setTimeline([...timeline, { d: demands.length, s: timeline[timeline.length - 1].s }]);
  };

  const addSupply = () => {
    const newShift = supplies[supplies.length - 1].shift + 15; 
    setSupplies([...supplies, { shift: Math.min(newShift, 40) }]);
    setTimeline([...timeline, { d: timeline[timeline.length - 1].d, s: supplies.length }]);
  };

  const resetChart = () => {
    setDemands([{ shift: 0 }]);
    setSupplies([{ shift: 0 }]);
    setTimeline([{ d: 0, s: 0 }]);
  };

  // ROZMĚRY PLÁTNA A GRAFU
  const width = 520;
  const height = 400;
  const paddingLeft = 50;
  const paddingRight = 120;
  const paddingY = 50;
  
  const graphWidth = width - paddingLeft - paddingRight;

  const getX = (val: number) => paddingLeft + (val / 100) * graphWidth;
  const getY = (val: number) => (height - paddingY) - (val / 100) * (height - paddingY * 2);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging || !svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const pixelToLogical = width / rect.width;
      
      const deltaXPixels = e.clientX - dragging.startX;
      const deltaXLogical = deltaXPixels * pixelToLogical * (100 / graphWidth);
      
      let newShift = dragging.startShift + deltaXLogical;
      newShift = Math.max(-45, Math.min(45, newShift));

      if (dragging.type === 'D') {
        const newD = [...demands];
        newD[dragging.index].shift = newShift;
        setDemands(newD);
      } else {
        const newS = [...supplies];
        newS[dragging.index].shift = newShift;
        setSupplies(newS);
      }
    };

    const handlePointerUp = () => setDragging(null);

    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, demands, supplies, width, graphWidth]);

  return (
    <div className="my-8 flex flex-col items-center bg-[#FDFCF9] p-6 rounded-xl border border-stone-300 select-none shadow-sm">

      <div className="flex gap-3 mb-6 w-full max-w-lg">
        <button 
          onClick={addDemand} 
          disabled={demands.length >= 4} 
          className="flex-1 py-2.5 px-4 bg-blue-50 text-blue-800 font-sans font-bold text-xs uppercase tracking-wider rounded-lg border border-blue-300 hover:bg-blue-100 hover:border-blue-400 disabled:opacity-40 transition-all shadow-xs"
        >
          + Přidat poptávku (D)
        </button>
        <button 
          onClick={addSupply} 
          disabled={supplies.length >= 4} 
          className="flex-1 py-2.5 px-4 bg-red-50 text-red-800 font-sans font-bold text-xs uppercase tracking-wider rounded-lg border border-red-300 hover:bg-red-100 hover:border-red-400 disabled:opacity-40 transition-all shadow-xs"
        >
          + Přidat nabídku (S)
        </button>
      </div>

      <svg 
        ref={svgRef} 
        width="100%" 
        viewBox={`0 0 ${width} ${height}`} 
        className="max-w-xl bg-[#F7F4EE] rounded-lg shadow-xs border border-stone-300 overflow-visible touch-none"
      >
        <defs>
          <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#1C1917" />
          </marker>
          <marker id="arrowHead2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="270">
            <path d="M0,0 L0,6 L9,3 z" fill="#1C1917" />
          </marker>
          <marker id="pathArrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#78716C" />
          </marker>
        </defs>

        {/* --- OSY --- */}
        <line x1={paddingLeft} y1={paddingY - 10} x2={paddingLeft} y2={height - paddingY} stroke="#1C1917" strokeWidth="2" markerStart="url(#arrowHead2)" />
        <text x={paddingLeft} y={paddingY - 25} textAnchor="middle" className="text-xs font-serif font-bold fill-stone-900">Cena (P)</text>
        
        <line x1={paddingLeft} y1={height - paddingY} x2={paddingLeft + graphWidth + 15} y2={height - paddingY} stroke="#1C1917" strokeWidth="2" markerEnd="url(#arrowHead)" />
        <text x={paddingLeft + graphWidth + 25} y={height - paddingY + 4} textAnchor="start" dominantBaseline="middle" className="text-xs font-serif font-bold fill-stone-900">Množství (Q)</text>

        {/* POPTÁVKY */}
        {demands.map((d, i) => {
          const qTop = 10 + d.shift; 
          const qBot = 90 + d.shift;
          const isActive = i === demands.length - 1;

          return (
            <g key={`d-${i}`}>
              <line 
                x1={getX(qTop)} y1={getY(90)} x2={getX(qBot)} y2={getY(10)} 
                stroke="#2563EB" strokeWidth={isActive ? "3" : "1.5"} 
                strokeDasharray={i === 0 ? "none" : "6,6"} opacity={isActive ? 1 : 0.45}
              />
              <line 
                x1={getX(qTop)} y1={getY(90)} x2={getX(qBot)} y2={getY(10)} 
                stroke="transparent" strokeWidth="22" className={dragging ? "cursor-grabbing" : "cursor-grab"}
                onPointerDown={(e) => setDragging({ type: 'D', index: i, startX: e.clientX, startShift: d.shift })}
              />
              <text x={getX(qBot) + 8} y={getY(10) + 8} className={`font-bold font-sans ${isActive ? 'fill-blue-700' : 'fill-blue-500 text-xs'}`}>
                D{getSubscript(i)}
              </text>
            </g>
          );
        })}

        {/* NABÍDKY */}
        {supplies.map((s, i) => {
          const qBot = 10 + s.shift;
          const qTop = 90 + s.shift;
          const isActive = i === supplies.length - 1;

          return (
            <g key={`s-${i}`}>
              <line 
                x1={getX(qBot)} y1={getY(10)} x2={getX(qTop)} y2={getY(90)} 
                stroke="#DC2626" strokeWidth={isActive ? "3" : "1.5"}
                strokeDasharray={i === 0 ? "none" : "6,6"} opacity={isActive ? 1 : 0.45}
              />
              <line 
                x1={getX(qBot)} y1={getY(10)} x2={getX(qTop)} y2={getY(90)} 
                stroke="transparent" strokeWidth="22" className={dragging ? "cursor-grabbing" : "cursor-grab"}
                onPointerDown={(e) => setDragging({ type: 'S', index: i, startX: e.clientX, startShift: s.shift })}
              />
              <text x={getX(qTop) + 8} y={getY(90)} className={`font-bold font-sans ${isActive ? 'fill-red-700' : 'fill-red-500 text-xs'}`}>
                S{getSubscript(i)}
              </text>
            </g>
          );
        })}

        {/* BODY ROVNOVÁHY */}
        {timeline.map((step, i) => {
          const dShift = demands[step.d].shift;
          const sShift = supplies[step.s].shift;
          
          const q = 50 + (dShift + sShift) / 2;
          const p = 50 + (dShift - sShift) / 2;
          const px = getX(q);
          const py = getY(p);
          const isLatest = i === timeline.length - 1;

          return (
            <g key={`e-${i}`}>
              {/* Vodicí čáry */}
              {labelsOn && (
                <>
                  <line x1={paddingLeft} y1={py} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="3,3" opacity={isLatest ? 1 : 0.4} />
                  <line x1={px} y1={height - paddingY} x2={px} y2={py} stroke="#A8A29E" strokeWidth="1" strokeDasharray="3,3" opacity={isLatest ? 1 : 0.4} />
                  
                  <text x={px} y={height - paddingY + 18} textAnchor="middle" className={`text-xs font-mono font-bold ${isLatest ? 'fill-stone-900' : 'fill-stone-500'}`}>
                    Q{getSubscript(i)}
                  </text>
                  <text x={paddingLeft - 8} y={py} textAnchor="end" dominantBaseline="middle" className={`text-xs font-mono font-bold ${isLatest ? 'fill-stone-900' : 'fill-stone-500'}`}>
                    P{getSubscript(i)}
                  </text>
                </>
              )}

              {/* Šipka předchozího kroku */}
              {i > 0 && (
                <line 
                  x1={getX(50 + (demands[timeline[i-1].d].shift + supplies[timeline[i-1].s].shift) / 2)} 
                  y1={getY(50 + (demands[timeline[i-1].d].shift - supplies[timeline[i-1].s].shift) / 2)} 
                  x2={px} y2={py} 
                  stroke="#78716C" strokeWidth="1.5" markerEnd="url(#pathArrow)"
                />
              )}

              <circle cx={px} cy={py} r={isLatest ? "6" : "4"} fill="#1C1917" stroke="#FFFFFF" strokeWidth="2" opacity={isLatest ? 1 : 0.5} />
              
              {labelsOn && (
                <text 
                  x={px} 
                  y={py - 12} 
                  textAnchor="middle" 
                  className={`font-serif font-bold ${isLatest ? 'fill-stone-900 text-sm' : 'fill-stone-600 text-xs'}`}
                >
                  E{getSubscript(i)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex gap-3 w-full max-w-lg border-t border-stone-200 pt-5">
        <button 
          onClick={() => setLabelsOn(!labelsOn)} 
          className="flex-1 py-2.5 bg-white text-stone-700 border border-stone-300 rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-xs active:scale-95"
        >
          {labelsOn ? "Skrýt popisky" : "Zobrazit popisky"}
        </button>
        <button 
          onClick={resetChart} 
          className="flex-1 py-2.5 bg-stone-900 text-white rounded-lg font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm active:scale-95"
        >
          Resetovat graf
        </button>
      </div>
    </div>
  );
}