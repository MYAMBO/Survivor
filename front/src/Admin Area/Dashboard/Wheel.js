import React from "react";
import "./Dashboard.css";

export default function Wheel({ slices = [], centerLabel = "" }) {
  let cumulative = 0;
  const parts = slices.map(s => {
    const start = cumulative;
    cumulative += s.percent * 3.6;
    const end = cumulative;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(", ");

  const style = {
    background: `conic-gradient(${parts})`
  };

  return (
    <div className="wheel-container">
      <div className="wheel" style={style}>
        <div className="wheel-center">
          <div>
            <div className="big">{centerLabel}</div>
            <div className="small">startups</div>
          </div>
        </div>
      </div>

      <div className="wheel-legend">
        {slices.map((s, i) => (
          <div className="wheel-legend-item" key={i}>
            <span className="wheel-legend-swatch" style={{ background: s.color }} />
            <span>{s.label} — {s.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
