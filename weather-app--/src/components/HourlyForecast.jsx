import { colors, fonts } from "../utils/theme";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hours }) {
  return (
    <div style={{
      marginTop: 20,
      padding: "20px 24px",
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
    }}>
      <p style={{ margin: "0 0 16px", fontFamily: fonts.body, fontSize: 14, fontWeight: 600 }}>
        Next hours
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto", gap: 8 }}>
        {hours.map((hour, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minWidth: 56,
            fontFamily: fonts.body,
          }}>
            <span style={{ fontSize: 13, opacity: 0.85, fontWeight: i === 0 ? 700 : 400 }}>
              {hour.time}
            </span>
            <WeatherIcon code={hour.weatherCode} size={40} isDay={hour.isDay} />
            <span style={{ fontSize: 16, fontWeight: 700 }}>{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}