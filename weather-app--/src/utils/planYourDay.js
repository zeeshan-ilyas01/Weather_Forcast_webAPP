function hourLabel(iso) {
  const h = parseInt(iso.split("T")[1].split(":")[0], 10);
  return `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
}

export function getPlanTips(weather, toDisplay) {
  const nowHour = weather.current.time.slice(0, 13) + ":00";
  const start = Math.max(0, weather.hourly.time.indexOf(nowHour));
  const todayDate = weather.current.time.slice(0, 10);

  // 1. Best time for a walk: the daylight hour closest to 22°C in the next 24 hours
  let best = null;
  const end = Math.min(start + 24, weather.hourly.time.length);
  for (let i = start; i < end; i++) {
    const t = weather.hourly.time[i];
    const dayIdx = weather.daily.time.indexOf(t.slice(0, 10));
    if (dayIdx < 0) continue;
    const isDaylight = t >= weather.daily.sunrise[dayIdx] && t < weather.daily.sunset[dayIdx];
    if (!isDaylight) continue;
    const gap = Math.abs(weather.hourly.temperature_2m[i] - 22);
    if (!best || gap < best.gap) best = { i, gap };
  }

  let walk;
  if (best) {
    const t = weather.hourly.time[best.i];
    const next = weather.hourly.time[best.i + 1] || t;
    const prefix = t.slice(0, 10) === todayDate ? "" : "Tomorrow, ";
    walk = {
      title: "Best time for a walk",
      big: `${prefix}${hourLabel(t)} – ${hourLabel(next)}`,
      sub: `Around ${toDisplay(weather.hourly.temperature_2m[best.i])}°`,
    };
  } else {
    walk = { title: "Best time for a walk", big: "No daylight left", sub: "Check again tomorrow" };
  }

  // 2. Umbrella: today's highest rain chance
  const rain = weather.daily.precipitation_probability_max?.[0] ?? 0;
  const umbrella = {
    title: "Umbrella needed?",
    big: rain >= 50 ? "Yes" : rain >= 30 ? "Maybe" : "No",
    sub: `Rain chance today: ${rain}%`,
  };

  // 3. Sun protection: today's UV peak
  let peakUv = 0;
  let peakTime = "";
  weather.hourly.time.forEach((t, i) => {
    if (t.startsWith(todayDate) && weather.hourly.uv_index[i] > peakUv) {
      peakUv = weather.hourly.uv_index[i];
      peakTime = t;
    }
  });
  const uvLevel = peakUv >= 8 ? "Very high" : peakUv >= 6 ? "High" : peakUv >= 3 ? "Moderate" : "Low";
  const sun = {
    title: "Sun protection",
    big: peakUv < 3 ? "Not needed" : `Peaks at ${hourLabel(peakTime)}`,
    sub: `UV ${Math.round(peakUv)} (${uvLevel})`,
  };

  return [walk, umbrella, sun];
}