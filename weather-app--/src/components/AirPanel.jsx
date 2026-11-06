import { useEffect, useState } from "react";
import { getAqiCategory, getAllergyDustRisk } from "../utils/airRisk";
import { glass } from "../utils/glass";
import { colors, fonts } from "../utils/theme";

const SEGMENTS = [
  ["Good", "#00996a"],
  ["Moderate", "#e6a800"],
  ["Sensitive", "#ff7e00"],
  ["Unhealthy", "#d93636"],
  ["Very", "#8a3ab9"],
  ["Hazard", "#7e0023"],
];
const BANDS = [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 500]];

// Where the marker sits along the 6-part scale (0 to 100 %)
function markerPercent(aqi) {
  const a = Math.min(Math.max(aqi, 0), 500);
  let idx = BANDS.findIndex(([, hi]) => a <= hi);
  if (idx < 0) idx = 5;
  const [lo, hi] = BANDS[idx];
  const frac = Math.min(1, Math.max(0, (a - lo) / (hi - lo)));
  return ((idx + frac) / 6) * 100;
}

export default function AirPanel({ air, text = colors.cream }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60); // lets the ring animate in
    return () => clearTimeout(t);
  }, []);

  const cur = air?.current;
  const heading = (
    <h2 style={{ fontFamily: fonts.display, fontSize: 22, margin: "0 0 14px" }}>Air and allergy today</h2>
  );

  if (!cur || cur.us_aqi == null) {
    return (
      <div style={{ ...glass, color: text }}>
        {heading}
        <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>Air quality data isn't available for this place right now.</p>
      </div>
    );
  }

  const aqi = Math.round(cur.us_aqi);
  const cat = getAqiCategory(aqi);
  const risk = getAllergyDustRisk(cur);

  const R = 52;
  const C = 2 * Math.PI * R;
  const fill = Math.min(aqi, 300) / 300;

  const tiles = [
    ["PM2.5", cur.pm2_5],
    ["PM10", cur.pm10],
    ["Dust", cur.dust],
  ];

  return (
    <div style={{ ...glass, color: text }}>
      {heading}

      {/* AQI ring and verdict */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <svg width="130" height="130" viewBox="0 0 130 130" style={{ flex: "none" }}>
          <circle cx="65" cy="65" r={R} fill="none" stroke={`${text}22`} strokeWidth="12" />
          <circle
            cx="65" cy="65" r={R} fill="none" stroke={cat.color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={ready ? C * (1 - fill) : C}
            transform="rotate(-90 65 65)"
            style={{ transition: "stroke-dashoffset 1.2s ease" }}
          />
          <text x="65" y="68" textAnchor="middle" fill={text} style={{ fontFamily: fonts.display, fontSize: 34, fontWeight: 700 }}>
            {aqi}
          </text>
          <text x="65" y="86" textAnchor="middle" fill={text} opacity="0.75" style={{ fontSize: 11 }}>
            US AQI
          </text>
        </svg>

        <div style={{ flex: 1, minWidth: 160 }}>
          <span style={{
            display: "inline-block", background: cat.color, color: cat.color === "#e6a800" ? "#1b1b1b" : "#fff",
            borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 700,
          }}>
            {cat.label}
          </span>
          <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.45 }}>{cat.advice}</p>
        </div>
      </div>

      {/* PM2.5, PM10, dust */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, margin: "18px 0" }}>
        {tiles.map(([label, value]) => (
          <div key={label} style={{ background: `${colors.cream}33`, borderRadius: 14, padding: "10px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{value == null ? "--" : Math.round(value)}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>{label} µg/m³</div>
          </div>
        ))}
      </div>

      {/* colour scale with marker */}
      <div style={{ position: "relative", paddingTop: 12 }}>
        <div style={{
          position: "absolute", top: 0, left: `${markerPercent(aqi)}%`, transform: "translateX(-50%)",
          fontSize: 11, lineHeight: 1,
        }}>
          ▼
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {SEGMENTS.map(([name, color]) => (
            <div key={name} style={{ flex: 1, height: 8, borderRadius: 4, background: color }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
          {SEGMENTS.map(([name]) => (
            <div key={name} style={{ flex: 1, fontSize: 9, opacity: 0.8, textAlign: "center" }}>{name}</div>
          ))}
        </div>
      </div>

      {/* allergy and dust risk */}
      <div style={{ background: `${colors.cream}33`, borderRadius: 16, padding: "12px 14px", marginTop: 16, fontSize: 14, lineHeight: 1.45 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 4 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: risk.color, flex: "none" }} />
          Allergy and dust risk: {risk.level}
        </div>
        {risk.text}
      </div>

      <p style={{ fontSize: 11, opacity: 0.75, margin: "12px 0 0" }}>Estimates use the US AQI scale.</p>
    </div>
  );
}