export async function searchCities(query) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`
  );
  const data = await res.json();
  return data.results || [];
}

export async function getForecast(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day` +
   `&hourly=temperature_2m,weather_code,dew_point_2m,uv_index` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&timezone=auto&forecast_days=6`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}
export async function getAirQuality(latitude, longitude) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}` +
    `&current=us_aqi,pm2_5,pm10,dust` +
    `&hourly=us_aqi,pm2_5,pm10,dust` +
    `&timezone=auto&forecast_days=2`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Air quality request failed");
  const data = await res.json();
  return data;
}