import { colors, fonts } from "../utils/theme";
//import { getWeatherLabel, getWeatherIcon } from "../utils/weatherCodes";
//import { getWeatherLabel, getWeatherEmoji } from "../utils/weatherCodes";

import { getWeatherLabel } from "../utils/weatherCodes";
import WeatherIcon from "./WeatherIcon";

export default function HeroCard({
  cityName,
  dateLabel,
  temperature,
  apparentTemperature,
  high,
  low,
  weatherCode,
}) {
  return (
    <div style={{
      padding: "28px 32px",
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      minHeight: 260,
    }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: fonts.display, fontSize: 36 }}>
          {cityName}
        </h1>
        <p style={{ margin: "4px 0 0", fontFamily: fonts.body, fontSize: 15, opacity: 0.85 }}>
          {dateLabel}
        </p>

        <div style={{ fontFamily: fonts.display, fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>
          {temperature}°
        </div>

        <p style={{ margin: 0, fontFamily: fonts.body, fontSize: 20, fontWeight: 600 }}>
          {getWeatherLabel(weatherCode)}
        </p>
        <p style={{ margin: "4px 0 0", fontFamily: fonts.body, fontSize: 14, opacity: 0.85 }}>
          Feels like {apparentTemperature}° · H: {high}° L: {low}°
        </p>
      </div>

     <WeatherIcon code={weatherCode} size={180} />
    </div>
  );
}
