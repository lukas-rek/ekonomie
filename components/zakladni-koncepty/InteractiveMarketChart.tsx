"use client";
import React, { useState, useRef, useEffect } from 'react';

const getSubscript = (n: number) => {
  const subs = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '▱', '₈', '₉'];
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

  // --- 1. ROZMĚRY PLÁTNA A GRAFU ---
  const width = 520;       // Zvětšeno z 450 pro širší bílý rámeček
  const height = 400;
  const paddingLeft = 50;  // Místo pro osu Y
  const paddingRight = 120;// Extra místo pro nápis Množství (Q)
  const paddingY = 50;     // Místo nahoře a dole
  
  const graphWidth = width - paddingLeft - paddingRight; // Vlastní šířka mřížky (350px - stejná jako dřív)

  const getX = (val: number) => paddingLeft + (val / 100) * graphWidth;
  const getY = (val: number) => (height - paddingY) - (val / 100) * (height - paddingY * 2);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging || !svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const pixelToLogical = width / rect.width;
      
      const deltaXPixels = e.clientX - dragging.startX;
      // Převod na logické jednotky s ohledem na novou šířku mřížky
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
    <div className="my-8 flex flex-col items-center bg-slate-50 p-6 rounded-xl border border-slate-200 select-none">

      <div className="flex gap-4 mb-6 w-full max-w-lg">
        <button onClick={addDemand} disabled={demands.length >= 4} className="flex-1 py-2 px-4 bg-blue-100 text-blue-700 font-bold rounded shadow-sm border border-blue-200 hover:bg-blue-200 disabled:opacity-50 transition-colors">
          + Přidat poptávku (D)
        </button>
        <button onClick={addSupply} disabled={supplies.length >= 4} className="flex-1 py-2 px-4 bg-red-100 text-red-700 font-bold rounded shadow-sm border border-red-200 hover:bg-red-200 disabled:opacity-50 transition-colors">
          + Přidat nabídku (S)
        </button>
      </div>

      <svg 
        ref={svgRef} 
        width="100%" 
        viewBox={`0 0 ${width} ${height}`} 
        className="max-w-xl bg-white rounded-lg shadow-sm border border-slate-100 overflow-visible touch-none"
      >
        <defs>
          <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
          </marker>
          <marker id="arrowHead2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="270">
            <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
          </marker>
          <marker id="pathArrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* --- OSY --- */}
        {/* Osa Y */}
        <line x1={paddingLeft} y1={paddingY - 10} x2={paddingLeft} y2={height - paddingY} stroke="#334155" strokeWidth="2" markerStart="url(#arrowHead2)" />
        <text x={paddingLeft} y={paddingY - 25} textAnchor="middle" className="text-sm font-bold fill-slate-700">Cena (P)</text>
        
        {/* Osa X */}
        <line x1={paddingLeft} y1={height - paddingY} x2={paddingLeft + graphWidth + 15} y2={height - paddingY} stroke="#334155" strokeWidth="2" markerEnd="url(#arrowHead)" />
        {/* OPRAVENO: Text vrácen vedle šipky a rámeček už ho neusekne */}
        <text x={paddingLeft + graphWidth + 25} y={height - paddingY + 4} textAnchor="start" dominantBaseline="middle" className="text-sm font-bold fill-slate-700">Množství (Q)</text>

        {/* POPTÁVKY */}
        {demands.map((d, i) => {
          const qTop = 10 + d.shift; 
          const qBot = 90 + d.shift;
          const isActive = i === demands.length - 1;

          return (
            <g key={`d-${i}`}>
              <line 
                x1={getX(qTop)} y1={getY(90)} x2={getX(qBot)} y2={getY(10)} 
                stroke="#2563eb" strokeWidth={isActive ? "3" : "1.5"} 
                strokeDasharray={i === 0 ? "none" : "6,6"} opacity={isActive ? 1 : 0.4}
              />
              <line 
                x1={getX(qTop)} y1={getY(90)} x2={getX(qBot)} y2={getY(10)} 
                stroke="transparent" strokeWidth="20" className={dragging ? "cursor-grabbing" : "cursor-grab"}
                onPointerDown={(e) => setDragging({ type: 'D', index: i, startX: e.clientX, startShift: d.shift })}
              />
              <text x={getX(qBot) + 8} y={getY(10) + 10} className={`font-bold ${isActive ? 'fill-blue-600' : 'fill-blue-400'}`}>
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
                stroke="#ef4444" strokeWidth={isActive ? "3" : "1.5"}
                strokeDasharray={i === 0 ? "none" : "6,6"} opacity={isActive ? 1 : 0.4}
              />
              <line 
                x1={getX(qBot)} y1={getY(10)} x2={getX(qTop)} y2={getY(90)} 
                stroke="transparent" strokeWidth="20" className={dragging ? "cursor-grabbing" : "cursor-grab"}
                onPointerDown={(e) => setDragging({ type: 'S', index: i, startX: e.clientX, startShift: s.shift })}
              />
              <text x={getX(qTop) + 8} y={getY(90)} className={`font-bold ${isActive ? 'fill-red-600' : 'fill-red-400'}`}>
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
                  <line x1={paddingLeft} y1={py} x2={px} y2={py} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" opacity={isLatest ? 1 : 0.4} />
                  <line x1={px} y1={height - paddingY} x2={px} y2={py} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" opacity={isLatest ? 1 : 0.4} />
                  
                  <text x={px} y={height - paddingY + 18} textAnchor="middle" className={`text-xs font-bold ${isLatest ? 'fill-slate-700' : 'fill-slate-400'}`}>
                    Q{getSubscript(i)}
                  </text>
                  <text x={paddingLeft - 8} y={py} textAnchor="end" dominantBaseline="middle" className={`text-xs font-bold ${isLatest ? 'fill-slate-700' : 'fill-slate-400'}`}>
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
                  stroke="#94a3b8" strokeWidth="2" markerEnd="url(#pathArrow)"
                />
              )}

              <circle cx={px} cy={py} r={isLatest ? "6" : "4"} fill="#0f172a" stroke="white" strokeWidth="2" opacity={isLatest ? 1 : 0.5} />
              
              {labelsOn && (
                <text 
                  x={px} 
                  y={py - 12} 
                  textAnchor="middle" 
                  className={`font-bold ${isLatest ? 'fill-slate-900' : 'fill-slate-500 text-xs'}`}
                >
                  E{getSubscript(i)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex gap-4 w-full max-w-lg border-t border-slate-200 pt-6">
        <button onClick={() => setLabelsOn(!labelsOn)} className="flex-1 py-2 bg-slate-100 text-slate-700 rounded font-medium hover:bg-slate-200 transition-colors">
          {labelsOn ? "Skrýt popisky" : "Zobrazit popisky"}
        </button>
        <button onClick={resetChart} className="flex-1 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 transition-colors">
          Resetovat graf
        </button>
      </div>
    </div>
  );
}