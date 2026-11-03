import { useState, useEffect } from "react";
import HeroCard from "../components/HeroCard";
import StatGrid from "../components/StatGrid";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import UnitToggle from "../components/UnitToggle";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { getForecast } from "../utils/api";
import { colors, layout, readableText } from "../utils/theme";
import Loader from "../components/Loader";
import { getWeatherCategory } from "../utils/weatherCodes";
import { addSavedCity, removeSavedCity, isCitySaved } from "../utils/storage";
import NavBar from "../components/NavBar";
import PlanYourDay from "../components/PlanYourDay";
import { getPlanTips } from "../utils/planYourDay";
function formatClock(isoLike) {
  if (!isoLike) return "--:--";
  const timePart = isoLike.split("T")[1] || isoLike;
  const [hStr, mStr] = timePart.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}
function formatHour(isoLike) {
  const h = parseInt(isoLike.split("T")[1].split(":")[0], 10);
  return `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
}

export default function DetailPage({ cityName = "Lahore", latitude = 31.55, longitude = 74.36 }) {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isCitySaved(cityName));
  }, [cityName]);

  useEffect(() => {
    async function loadWeather() {
      const data = await getForecast(latitude, longitude);
      setWeather(data);
    }
    loadWeather();
  }, [latitude, longitude]);

  function handleToggleSave() {
    if (saved) {
      removeSavedCity(cityName);
      setSaved(false);
    } else {
      addSavedCity({ name: cityName, latitude, longitude });
      setSaved(true);
    }
  }

  function toDisplay(celsius) {
    if (unit === "C") return Math.round(celsius);
    return Math.round((celsius * 9) / 5 + 32);
  }

  if (!weather) {
    return (
      <div style={{
        minHeight: "100vh",
        width: "100%",
        background: `linear-gradient(180deg, ${colors.sky.clear.day[0]}, ${colors.sky.clear.day[1]})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Loader color={colors.cream} />
      </div>
    );
  }

  const isDay = weather.current.is_day === 1;
  const category = getWeatherCategory(weather.current.weather_code);
  const weatherCode = weather.current.weather_code;
  const skyKey = category === "clear-or-cloudy"
    ? (weatherCode <= 2 ? "clear" : "cloudy")
    : category;
  const palette = colors.sky[skyKey][isDay ? "day" : "night"];
  const bottomText = readableText(palette[1]);


const currentHour = weather.current.time.slice(0, 13) + ":00";
const currentHourIndex = weather.hourly.time.indexOf(currentHour);
const uvIndex = currentHourIndex >= 0 ? Math.round(weather.hourly.uv_index[currentHourIndex]) : "--";
const dewPoint = currentHourIndex >= 0 ? toDisplay(weather.hourly.dew_point_2m[currentHourIndex]) : "--";


  const startHour = currentHourIndex >= 0 ? currentHourIndex : 0;
  const hours = weather.hourly.time
  .slice(startHour, startHour + 8)
  .map((time, i) => {
    const dayIdx = weather.daily.time.indexOf(time.slice(0, 10));
    const hourIsDay =
      time >= weather.daily.sunrise[dayIdx] && time < weather.daily.sunset[dayIdx];
    return {
      time: i === 0 ? "Now" : formatHour(time),
      weatherCode: weather.hourly.weather_code[startHour + i],
      temperature: toDisplay(weather.hourly.temperature_2m[startHour + i]),
      isDay: hourIsDay,
    };
  });

  const dateLabel = new Date(weather.current.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
const tips = getPlanTips(weather, toDisplay);
const days = weather.daily.time.map((date, i) => ({
  date,
  label: i === 0
    ? "Today"
    : new Date(date + "T00:00").toLocaleDateString("en-US", { weekday: "short" }),
  weatherCode: weather.daily.weather_code[i],
  rain: weather.daily.precipitation_probability_max?.[i] ?? 0,
  max: toDisplay(weather.daily.temperature_2m_max[i]),
  min: toDisplay(weather.daily.temperature_2m_min[i]),
}));
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: `linear-gradient(180deg, ${palette[0]}, ${palette[1]})`,
      color: colors.cream,
    }}>
      <div style={{ maxWidth: layout.pageWidth, margin: "0 auto", padding: "24px 16px" }}>
        <NavBar>
          <UnitToggle unit={unit} onUnitChange={setUnit} />
          <button
            onClick={handleToggleSave}
            style={{
              background: saved ? colors.cream : "transparent",
              color: saved ? colors.ink : colors.cream,
              border: `1px solid ${colors.cream}66`,
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {saved ? "✓ Saved" : "+ Save city"}
          </button>
        </NavBar>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.9fr 1fr",
          gap: 20,
          marginTop: 20,
        }}>
          <HeroCard
            cityName={cityName}
            dateLabel={dateLabel}
            temperature={toDisplay(weather.current.temperature_2m)}
            apparentTemperature={toDisplay(weather.current.apparent_temperature)}
            high={toDisplay(weather.daily.temperature_2m_max[0])}
            low={toDisplay(weather.daily.temperature_2m_min[0])}
            weatherCode={weather.current.weather_code}
            isDay={isDay}
          />

          <StatGrid
            humidity={weather.current.relative_humidity_2m}
            windSpeed={Math.round(weather.current.wind_speed_10m)}
            sunrise={formatClock(weather.daily.sunrise?.[0])}
            sunset={formatClock(weather.daily.sunset?.[0])}
            uvIndex={uvIndex}
            dewPoint={dewPoint}
          />
        </div>

        <HourlyForecast hours={hours} />

        <AdSlot label="in-feed" />

        <div style={{
  display: "grid",
  gridTemplateColumns: "1.6fr 1fr",
  gap: 20,
  marginTop: 20,
}}>
  <DailyForecast days={days} color={bottomText} />
  <PlanYourDay tips={tips} color={bottomText} />
</div>

        <Footer />
      </div>
    </div>
  );
}