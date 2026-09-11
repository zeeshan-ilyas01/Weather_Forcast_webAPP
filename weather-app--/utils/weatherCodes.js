export function getWeatherLabel(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

export function getWeatherIcon(code) {
  if (code === 0) return "sun";
  if (code <= 3) return "cloud";
  if (code <= 48) return "fog";
  if (code <= 86) return "rain";
  return "storm";
}

export function getWeatherCategory(code) {
  if (code === 0 || code <= 3) return "clear-or-cloudy";
  if (code <= 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  return "storm";
}