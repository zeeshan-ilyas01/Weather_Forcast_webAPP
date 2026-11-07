import { getLifestyleTiles } from "../utils/lifestyleTiles";
import { glass } from "../utils/glass";
import { colors, fonts } from "../utils/theme";


const CSS = `
.hub-tiles{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
@media (min-width:760px){.hub-tiles{grid-template-columns:repeat(4,minmax(0,1fr))}}
@keyframes hub-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.hub-tile{animation:none!important;opacity:1!important}}
`;

export default function TodayForYou({ weather, air, placeName, text = colors.cream }) {
  const tiles = getLifestyleTiles(weather, air);

  return (
    <section style={{ margin: "24px 0", color: text }}>
      <style>{CSS}</style>
      <h2 style={{ fontFamily: fonts.display, fontSize: 24, margin: "0 0 4px" }}>Today for you</h2>
      <p style={{ margin: "0 0 14px", fontSize: 14, opacity: 0.85 }}>
        Simple guidance for {placeName || "your area"}, based on today's weather and air.
      </p>

            <div className="hub-tiles">
        {tiles.map((t, i) => (
          <div
            key={t.id}
            className="hub-tile"
            style={{
              ...glass,
              borderRadius: 18,
              padding: 18,
              opacity: 0,
              animation: "hub-rise .6s cubic-bezier(.2,.7,.2,1) forwards",
              animationDelay: `${i * 70}ms`,
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.8 }}>{t.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 17, margin: "8px 0 10px" }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: t.color, flex: "none" }} />
              {t.value}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.4 }}>{t.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}