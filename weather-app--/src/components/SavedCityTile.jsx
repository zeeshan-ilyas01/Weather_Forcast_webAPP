import { getAqiCategory } from "../utils/airRisk";
import { getWeatherLabel } from "../utils/weatherCodes";
import { glass } from "../utils/glass";
import { colors, fonts } from "../utils/theme";

// one-word verdicts for the badge
const SHORT = { Sensitive: "Sensitive", Very: "Very bad", Hazard: "Hazardous" };

export default function SavedCityTile({ name, temperature, weatherCode, aqi, text = colors.cream, onClick, onRemove }) {
  const cat = aqi != null ? getAqiCategory(Math.round(aqi)) : null;
  const verdict = cat ? SHORT[cat.short] || cat.short : null;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ ...glass, borderRadius: 18, padding: "14px 16px", color: text, cursor: "pointer", position: "relative" }}
    >
      <button
        aria-label={`Remove ${name}`}
        onClick={onRemove}
        style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", color: text, opacity: 0.6, cursor: "pointer", fontSize: 16, lineHeight: 1 }}
      >
        ×
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10, paddingRight: 14 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>{getWeatherLabel(weatherCode)}</div>
        </div>
        <div style={{ fontFamily: fonts.display, fontSize: 32, lineHeight: 1 }}>{temperature}°</div>
      </div>

      {cat && (
        <span style={{
          display: "inline-block", marginTop: 10, background: cat.color,
          color: cat.color === "#e6a800" ? "#1b1b1b" : "#fff",
          borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700,
        }}>
          AQI {Math.round(aqi)} · {verdict}
        </span>
      )}
    </div>
  );
}