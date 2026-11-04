import { colors, fonts } from "../utils/theme";
import { getWeatherLabel } from "../utils/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import useIsMobile from "../utils/useIsMobile";

export default function DailyForecast({ days, color }) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      marginTop: 0,
      padding: isMobile ? "16px" : "20px 24px",
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
      fontFamily: fonts.body,
      color,
    }}>
      <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600 }}>
        {days.length}-day forecast
      </p>

      {days.map((day, i) => (
        <div key={day.date} style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "56px 36px 1fr 100px" : "70px 48px 1fr 56px 110px",
          alignItems: "center",
          gap: 12,
          padding: "8px 0",
          borderTop: i === 0 ? "none" : `1px solid ${color}30`,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{day.label}</span>
          <WeatherIcon code={day.weatherCode} size={32} />
          {!isMobile && (
            <span style={{ fontSize: 14, opacity: 0.9 }}>{getWeatherLabel(day.weatherCode)}</span>
          )}
          <span style={{ fontSize: 13, opacity: 0.85 }}>💧 {day.rain}%</span>
          <span style={{ fontSize: 15, fontWeight: 700, textAlign: "right" }}>
            {day.max}° / {day.min}°
          </span>
        </div>
      ))}
    </div>
  );
}