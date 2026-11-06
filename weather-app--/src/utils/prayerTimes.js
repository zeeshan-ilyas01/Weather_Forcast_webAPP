import { Coordinates, CalculationMethod, Madhab, PrayerTimes } from "adhan";

// Today's calendar date in the city's own timezone
function cityDate(timeZone, now) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

function calculate(lat, lon, y, m, d) {
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi;
  return new PrayerTimes(new Coordinates(lat, lon), new Date(y, m - 1, d), params);
}

export function getPrayerTimes(lat, lon, timeZone, now = new Date()) {
  const { y, m, d } = cityDate(timeZone, now);
  const today = calculate(lat, lon, y, m, d);
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" });

  const prayers = [
    { name: "Fajr", time: today.fajr },
    { name: "Dhuhr", time: today.dhuhr },
    { name: "Asr", time: today.asr },
    { name: "Maghrib", time: today.maghrib },
    { name: "Isha", time: today.isha },
  ].map((p) => ({ ...p, label: fmt.format(p.time) }));

  // Next prayer: first one still ahead, otherwise tomorrow's Fajr
  let next = prayers.find((p) => p.time > now);
  if (!next) {
    const tomorrow = calculate(lat, lon, y, m, d + 1);
    next = { name: "Fajr", time: tomorrow.fajr, label: fmt.format(tomorrow.fajr) };
  }

  return { prayers, next, msUntilNext: next.time - now };
}

// 14822000 ms -> "4h 07m 02s"
export function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const mins = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const secs = String(total % 60).padStart(2, "0");
  return h > 0 ? `${h}h ${mins}m ${secs}s` : `${mins}m ${secs}s`;
}