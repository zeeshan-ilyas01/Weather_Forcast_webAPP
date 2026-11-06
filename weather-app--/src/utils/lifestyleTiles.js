const GOOD = "#00996a";
const FAIR = "#e6a800";
const POOR = "#d93636";
const NEUTRAL = "#5b8def";

function hourLabel(iso) {
  const h = Number(iso.slice(11, 13));
  return `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
}

// First likely fog hour in the next 12 hours (fog code, or early-morning air at dew point)
function findFogHour(weather) {
  const { hourly, current } = weather;
  const start = hourly.time.findIndex((t) => t >= current.time.slice(0, 13) + ":00");
  if (start < 0) return null;
  const end = Math.min(start + 12, hourly.time.length);
  for (let i = start; i < end; i++) {
    const hour = Number(hourly.time[i].slice(11, 13));
    const spread = hourly.temperature_2m[i] - hourly.dew_point_2m[i];
    const fogCode = hourly.weather_code[i] === 45 || hourly.weather_code[i] === 48;
    if (fogCode || (hour <= 9 && spread <= 1)) return hourly.time[i];
  }
  return null;
}

// Highest UV index today
function todayUvPeak(weather) {
  const today = weather.current.time.slice(0, 10);
  let peak = 0;
  weather.hourly.time.forEach((t, i) => {
    if (t.startsWith(today)) peak = Math.max(peak, weather.hourly.uv_index[i] ?? 0);
  });
  return Math.round(peak);
}

// Temperatures are Celsius inside; toDisplay converts for the text only
export function getLifestyleTiles(weather, air, toDisplay = (c) => c) {
  const cur = weather.current;
  const daily = weather.daily;
  const t = (c) => `${Math.round(toDisplay(c))}°`;

  const feels = cur.apparent_temperature;
  const maxT = daily.temperature_2m_max[0];
  const minT = daily.temperature_2m_min[0];
  const rain = daily.precipitation_probability_max?.[0] ?? 0;
  const code = cur.weather_code;
  const humidity = cur.relative_humidity_2m;

  const aqi = air?.current?.us_aqi ?? null;
  const dust = air?.current?.dust ?? 0;
  const pm10 = air?.current?.pm10 ?? 0;
  const dusty = dust >= 100 || pm10 >= 150;

  const stormy = code >= 95;
  const wet = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || stormy;
  const snowy = (code >= 71 && code <= 77) || code === 85 || code === 86;
  const fogNow = code === 45 || code === 48;
  const fogHour = findFogHour(weather);

  const tiles = [];

  // 1. Laundry
  if (rain >= 50 || wet || snowy) {
    tiles.push({ id: "laundry", title: "Laundry", value: "Poor", color: POOR, text: "Rain is likely. Dry indoors" });
  } else if (dusty || (aqi ?? 0) > 150) {
    tiles.push({ id: "laundry", title: "Laundry", value: "Poor", color: POOR, text: "Dust and haze will settle on it" });
  } else if (rain >= 30 || humidity >= 80 || (aqi ?? 0) > 100) {
    tiles.push({ id: "laundry", title: "Laundry", value: "Fair", color: FAIR, text: "Slow drying. Watch the sky" });
  } else {
    tiles.push({ id: "laundry", title: "Laundry", value: "Good", color: GOOD, text: "Dry air, clothes dry quickly" });
  }

  // 2. What to wear
  let wear;
  if (snowy) wear = "Heavy coat";
  else if (wet || rain >= 50) wear = feels < 10 ? "Warm waterproof" : "Waterproof layer";
  else if (feels < 5) wear = "Heavy coat";
  else if (feels < 15) wear = "Warm jacket";
  else if (feels < 22) wear = "Light layers";
  else if (feels < 30) wear = "T-shirt";
  else wear = "Light, breathable";
  tiles.push({ id: "wear", title: "What to wear", value: wear, color: NEUTRAL, text: `${t(minT)} morning, ${t(maxT)} afternoon` });

  // 3. Mask
  if ((aqi ?? 0) > 150 || dusty) {
    tiles.push({ id: "mask", title: "Mask", value: "Recommended", color: POOR, text: aqi != null ? `AQI ${aqi}. N95 outdoors` : "Dusty air. N95 outdoors" });
  } else if ((aqi ?? 0) > 100) {
    tiles.push({ id: "mask", title: "Mask", value: "Sensitive groups", color: FAIR, text: `AQI ${aqi}. Wear one if you have asthma` });
  } else {
    tiles.push({ id: "mask", title: "Mask", value: "Not needed", color: GOOD, text: aqi != null ? `AQI ${aqi}. Air is fine` : "Air looks fine" });
  }

  // 4. Heat (or cold) stress, from feels-like temperature
  if (feels <= 0) {
    tiles.push({ id: "heat", title: "Cold stress", value: feels <= -10 ? "High" : "Moderate", color: feels <= -10 ? POOR : FAIR, text: `Feels like ${t(feels)}` });
  } else if (feels >= 41) {
    tiles.push({ id: "heat", title: "Heat stress", value: "Extreme", color: POOR, text: `Feels like ${t(feels)}. Stay indoors` });
  } else if (feels >= 35) {
    tiles.push({ id: "heat", title: "Heat stress", value: "High", color: POOR, text: `Feels like ${t(feels)}. Drink water` });
  } else if (feels >= 30) {
    tiles.push({ id: "heat", title: "Heat stress", value: "Moderate", color: FAIR, text: `Feels like ${t(feels)}` });
  } else {
    tiles.push({ id: "heat", title: "Heat stress", value: "Low", color: GOOD, text: `Feels like ${t(feels)}` });
  }

  // 5. Sunburn time (rough estimate for fair skin: 200 / UV index, in minutes)
  const uv = todayUvPeak(weather);
  if (!cur.is_day) {
    tiles.push({ id: "sun", title: "Sunburn time", value: "Sun is down", color: GOOD, text: "No sunburn risk now" });
  } else if (uv < 3) {
    tiles.push({ id: "sun", title: "Sunburn time", value: "Low risk", color: GOOD, text: `UV peaks at ${uv}` });
  } else {
    const mins = Math.max(10, Math.round(200 / uv / 5) * 5);
    tiles.push({ id: "sun", title: "Sunburn time", value: `About ${mins} min`, color: uv >= 8 ? POOR : FAIR, text: `UV peaks at ${uv}` });
  }

  // 6. Car wash
  if (rain >= 40 || wet || snowy) {
    tiles.push({ id: "car", title: "Car wash", value: "Poor", color: POOR, text: "Rain is likely" });
  } else if (dusty) {
    tiles.push({ id: "car", title: "Car wash", value: "Poor", color: POOR, text: "Dust settles within hours" });
  } else if (rain >= 20) {
    tiles.push({ id: "car", title: "Car wash", value: "Fair", color: FAIR, text: "Small chance of rain" });
  } else {
    tiles.push({ id: "car", title: "Car wash", value: "Good", color: GOOD, text: "Dry and clear" });
  }

  // 7. Driving and fog
  if (fogNow) {
    tiles.push({ id: "drive", title: "Driving and fog", value: "Poor", color: POOR, text: "Fog now. Use low beams" });
  } else if (stormy || snowy) {
    tiles.push({ id: "drive", title: "Driving and fog", value: "Poor", color: POOR, text: stormy ? "Storm. Drive carefully" : "Snow. Roads may be slippery" });
  } else if (fogHour) {
    tiles.push({ id: "drive", title: "Driving and fog", value: "Fair", color: FAIR, text: `Fog likely around ${hourLabel(fogHour)}` });
  } else if (wet || dusty) {
    tiles.push({ id: "drive", title: "Driving and fog", value: "Fair", color: FAIR, text: wet ? "Wet roads. Slow down" : "Dust lowers visibility" });
  } else {
    tiles.push({ id: "drive", title: "Driving and fog", value: "Good", color: GOOD, text: "Clear roads, good visibility" });
  }

  // 8. Outdoor play
  if ((aqi ?? 0) > 150 || stormy || snowy || feels >= 38 || feels <= -5) {
    const why = (aqi ?? 0) > 150 ? "Air too polluted for sport" : stormy ? "Thunderstorm outside" : feels >= 38 ? "Too hot for sport" : "Too cold for sport";
    tiles.push({ id: "play", title: "Outdoor play", value: "Poor", color: POOR, text: why });
  } else if ((aqi ?? 0) > 100 || wet || feels >= 32 || feels <= 3) {
    const why = (aqi ?? 0) > 100 ? "Air is so-so. Keep it light" : wet ? "Wet. Pick an indoor game" : feels >= 32 ? "Hot. Go early or late" : "Cold. Dress warm";
    tiles.push({ id: "play", title: "Outdoor play", value: "Fair", color: FAIR, text: why });
  } else {
    tiles.push({ id: "play", title: "Outdoor play", value: "Good", color: GOOD, text: "Nice conditions to be outside" });
  }

  return tiles;
}