import { getWeatherLabel } from "../utils/weatherCodes";

export default function CurrentConditions({ temperature, apparentTemperature, weatherCode }) {
  return (
    <div style={{ textAlign: "center", margin: "14px 0" }}>
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: 96,
          lineHeight: 1,
          margin: "4px 0",
        }}
      >
        {temperature}°
      </p>
      <p style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
        {getWeatherLabel(weatherCode)}
      </p>
      <p style={{ fontSize: 13, opacity: 0.75, margin: "4px 0 0" }}>
        Feels like {apparentTemperature}°
      </p>
    </div>
  );
}