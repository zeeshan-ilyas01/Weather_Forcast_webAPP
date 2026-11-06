// One friendly sentence about today, e.g. "Mild and bright, but the air is unhealthy. Mask up outside."
export function getVerdict(weather, air) {
  const c = weather.current;
  const code = c.weather_code;
  const feels = c.apparent_temperature;
  const aqi = air?.current?.us_aqi ?? null;

  const stormy = code >= 95;
  const snowy = (code >= 71 && code <= 77) || code === 85 || code === 86;
  const rainy = (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
  const foggy = code === 45 || code === 48;

  let feel;
  if (feels < 5) feel = "Cold";
  else if (feels < 15) feel = "Cool";
  else if (feels < 22) feel = "Mild";
  else if (feels < 30) feel = "Warm";
  else if (feels < 36) feel = "Hot";
  else feel = "Very hot";

  if (stormy) return "Thunderstorm outside. Best to stay in.";
  if (snowy) return `${feel} with snow. Dress warm.`;
  if (rainy) return `${feel} and wet. Take an umbrella.`;
  if (foggy) return `${feel} and foggy. Drive carefully.`;

  const sky = code <= 1 ? (c.is_day ? "bright" : "clear") : "cloudy";

  if (aqi != null && aqi > 150) return `${feel} and ${sky}, but the air is unhealthy. Mask up outside.`;
  if (aqi != null && aqi > 100) return `${feel} and ${sky}, but the air is poor for sensitive groups.`;
  return `${feel} and ${sky}.`;
}