import { useEffect, useState } from "react";
import { getPrayerTimes, formatCountdown } from "../utils/prayerTimes";
import { glass } from "../utils/glass";
import { colors, fonts, readableText } from "../utils/theme";

export default function PrayerCard({ place, weather, text = colors.cream }) {
  const [now, setNow] = useState(() => new Date());

  // tick every second so the countdown is live
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!place || !weather) return null;

  const { prayers, next, msUntilNext } = getPrayerTimes(place.latitude, place.longitude, weather.timezone, now);
  const accentText = readableText(colors.accent);

  return (
    <div style={{ ...glass, color: text }}>
      <h2 style={{ fontFamily: fonts.display, fontSize: 22, margin: "0 0 14px" }}>Prayer times</h2>

      {/* next prayer and countdown */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
        background: `${colors.cream}33`, borderRadius: 16, padding: "12px 14px", marginBottom: 12,
      }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Next prayer</div>
          <div style={{ fontSize: 16 }}>
            <strong>{next.name}</strong> <span style={{ opacity: 0.85 }}>{next.label}</span>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {formatCountdown(msUntilNext)}
        </div>
      </div>

      {/* the five prayers */}
      <div>
        {prayers.map((p) => {
          const isNext = p.name === next.name;
          return (
            <div
              key={p.name}
              style={{
                display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: 12, fontSize: 15,
                background: isNext ? colors.accent : "transparent",
                color: isNext ? accentText : text,
                fontWeight: isNext ? 700 : 400,
              }}
            >
              <span>{p.name}{isNext ? " · next" : ""}</span>
              <span>{p.label}</span>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 11, lineHeight: 1.5, opacity: 0.75, margin: "12px 0 0" }}>
        Calculated for your location with the Karachi method and Hanafi Asr. May differ by a minute or two from your local mosque.
      </p>
    </div>
  );
}