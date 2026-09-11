import { useState, useEffect } from "react";
import SkyBackground from "../components/SkyBackground";
import CurrentConditions from "../components/CurrentConditions";
import StatGrid from "../components/StatGrid";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import UnitToggle from "../components/UnitToggle";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { getForecast } from "../utils/api";

function formatClock(isoLike) {
  if (!isoLike) return "--:--";
  const timePart = isoLike.split("T")[1] || isoLike;
  const [hStr, mStr] = timePart.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

export default function DetailPage({ cityName = "Lahore", latitude = 31.55, longitude = 74.35 }) {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    async function loadWeather() {
      const data = await getForecast(latitude, longitude);
      setWeather(data);
    }
    loadWeather();
  }, [latitude, longitude]);

  function toDisplay(celsius) {
    if (unit === "C") return Math.round(celsius);
    return Math.round((celsius * 9) / 5 + 32);
  }

  if (!weather) {
    return <p style={{ textAlign: "center", padding: 60 }}>Loading…</p>;
  }

  const isDay = weather.current.is_day === 1;

  const hours = weather.hourly.time.slice(0, 8).map((time, i) => ({
    time: time.split("T")[1],
    temperature: toDisplay(weather.hourly.temperature_2m[i]),
  }));

  const days = weather.daily.time.map((date, i) => ({
    date,
    weatherCode: weather.daily.weather_code[i],
    max: toDisplay(weather.daily.temperature_2m_max[i]),
    min: toDisplay(weather.daily.temperature_2m_min[i]),
  }));

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px" }}>
      <p style={{ textAlign: "center", fontFamily: "'Fraunces', serif", fontSize: 18 }}>
        {cityName}
      </p>

      <UnitToggle unit={unit} onUnitChange={setUnit} />

      <SkyBackground isDay={isDay} weatherCode={weather.current.weather_code} />

      <CurrentConditions
        temperature={toDisplay(weather.current.temperature_2m)}
        apparentTemperature={toDisplay(weather.current.apparent_temperature)}
        weatherCode={weather.current.weather_code}
      />

      <StatGrid
        humidity={weather.current.relative_humidity_2m}
        windSpeed={Math.round(weather.current.wind_speed_10m)}
        sunrise={formatClock(weather.daily.sunrise?.[0])}
        sunset={formatClock(weather.daily.sunset?.[0])}
      />

      <HourlyForecast hours={hours} />

      <AdSlot label="in-feed" />

      <DailyForecast days={days} />

      <Footer />
    </div>
  );
}