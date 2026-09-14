import { getWeatherLabel } from "../utils/weatherCodes";
import { colors } from "../utils/theme";

export default function SavedCityCard({ name, temperature, weatherCode, onClick, onRemove }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        background: `${colors.cream}1F`,
        borderRadius: 12,
        padding: "10px 6px",
        textAlign: "center",
        cursor: "pointer",
        color: colors.cream,
      }}
    >
      <button
        onClick={onRemove}
        style={{
          position: "absolute",
          top: 4,
          right: 6,
          background: "none",
          border: "none",
          color: colors.cream,
          opacity: 0.6,
          fontSize: 14,
          cursor: "pointer",
          padding: 2,
          lineHeight: 1,
        }}
        aria-label={`Remove ${name}`}
      >
        ×
      </button>
      <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{name}</p>
      <p style={{ fontSize: 12, opacity: 0.8, margin: 0 }}>
        {temperature}° · {getWeatherLabel(weatherCode)}
      </p>
    </div>
  );
}