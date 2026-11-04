import { colors, fonts } from "../utils/theme";
import { getWeatherLabel } from "../utils/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import useIsMobile from "../utils/useIsMobile";

export default function HeroCard({
  cityName,
  dateLabel,
  temperature,
  apparentTemperature,
  high,
  low,
  weatherCode,
  isDay,
}) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      padding: isMobile ? "20px" : "28px 32px",
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      minHeight: isMobile ? 200 : 260,
    }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: fonts.display, fontSize: isMobile ? 28 : 36 }}>
          {cityName}
        </h1>
        <p style={{ margin: "4px 0 0", fontFamily: fonts.body, fontSize: 15, opacity: 0.85 }}>
          {dateLabel}
        </p>

        <div style={{ fontFamily: fonts.display, fontSize: isMobile ? 72 : 96, fontWeight: 700, lineHeight: 1.1 }}>
          {temperature}°
        </div>

        <p style={{ margin: 0, fontFamily: fonts.body, fontSize: 20, fontWeight: 600 }}>
          {getWeatherLabel(weatherCode)}
        </p>
        <p style={{ margin: "4px 0 0", fontFamily: fonts.body, fontSize: 14, opacity: 0.85 }}>
          Feels like {apparentTemperature}° · H: {high}° L: {low}°
        </p>
      </div>

      <WeatherIcon code={weatherCode} size={isMobile ? 100 : 180} isDay={isDay} />
    </div>
  );
}