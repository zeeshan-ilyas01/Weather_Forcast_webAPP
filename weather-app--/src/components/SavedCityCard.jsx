import { getWeatherLabel } from "../utils/weatherCodes";

export default function SavedCityCard({ name, temperature, weatherCode, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "10px 6px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{name}</p>
      <p style={{ fontSize: 12, opacity: 0.8, margin: 0 }}>
        {temperature}° · {getWeatherLabel(weatherCode)}
      </p>
    </div>
  );
}