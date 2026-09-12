import { getWeatherLabel } from "../utils/weatherCodes";
import { colors } from "../utils/theme";

export default function SavedCityCard({ name, temperature, weatherCode, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: `${colors.cream}1F`,
        borderRadius: 12,
        padding: "10px 6px",
        textAlign: "center",
        cursor: "pointer",
        color: colors.cream,
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{name}</p>
      <p style={{ fontSize: 12, opacity: 0.8, margin: 0 }}>
        {temperature}° · {getWeatherLabel(weatherCode)}
      </p>
    </div>
  );
}