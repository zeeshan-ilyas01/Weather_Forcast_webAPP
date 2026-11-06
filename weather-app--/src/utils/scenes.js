import { colors } from "./theme";

// Page background (top to bottom) and text colour for each scene
export const SCENES = {
  day:    { top: "#4FA8DB", bottom: "#CDE8EE", text: colors.ink },
  hot:    { top: "#F28C38", bottom: "#F8D9A0", text: colors.ink },
  spring: { top: "#7CC4E8", bottom: "#F6D7E0", text: colors.ink },
  snow:   { top: "#9DB4C8", bottom: "#E6EEF4", text: colors.ink },
  rain:   { top: "#41596B", bottom: "#7088A0", text: colors.cream },
  storm:  { top: "#232B3D", bottom: "#566175", text: colors.cream },
  night:  { top: "#0E1A3A", bottom: "#2C3E6B", text: colors.cream },
};

export function getSceneKey(weather, latitude = 0) {
  const c = weather.current;
  const code = c.weather_code;
  const feels = c.apparent_temperature;

  const snowy = (code >= 71 && code <= 77) || code === 85 || code === 86;
  const rainy = (code >= 51 && code <= 67) || (code >= 80 && code <= 82);

  if (code >= 95) return "storm";
  if (snowy) return "snow";
  if (rainy) return "rain";
  if (!c.is_day) return "night";
  if (feels >= 33) return "hot";

  // Spring: Mar to May in the north, Sep to Nov in the south
  const month = new Date(c.time).getMonth();
  const inSpring = latitude >= 0 ? month >= 2 && month <= 4 : month >= 8 && month <= 10;
  if (inSpring && code <= 2 && feels >= 15 && feels <= 29) return "spring";

  return "day";
}