import { colors } from "./theme";

// Page background (top to bottom) and text colour for each scene
export const SCENES = {
  day:    { bg: "linear-gradient(180deg,#4FA8D8,#DCF3EE)", text: colors.ink },
  hot:    { bg: "linear-gradient(180deg,#2B8CD0 0%,#8CCBEA 45%,#FFE3B5 100%)", text: colors.ink },
  spring: { bg: "linear-gradient(180deg,#78C6EE,#E6F5D6)", text: colors.ink },
  snow:   { bg: "linear-gradient(180deg,#9FB2C6,#EFF5F9)", text: colors.ink },
  rain:   { bg: "linear-gradient(180deg,#48576A,#84939F)", text: colors.cream },
  storm:  { bg: "linear-gradient(180deg,#171B24,#4A5570)", text: colors.cream },
  night:  { bg: "linear-gradient(180deg,#0D1B2A,#243352)", text: colors.cream },
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