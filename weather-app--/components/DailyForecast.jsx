import { getWeatherLabel } from "../utils/weatherCodes";

export default function DailyForecast({ days }) {
  return (
    <div>
      <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 8px", fontWeight: 600 }}>
        6-day forecast
      </p>
      {days.map((day, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            padding: "8px 0",
            borderBottom: i < days.length - 1 ? "0.5px solid rgba(255,255,255,0.15)" : "none",
          }}
        >
          <span style={{ flex: 1 }}>{day.date}</span>
          <span style={{ flex: 1, opacity: 0.8 }}>{getWeatherLabel(day.weatherCode)}</span>
          <span>{day.max}° / {day.min}°</span>
        </div>
      ))}
    </div>
  );
}