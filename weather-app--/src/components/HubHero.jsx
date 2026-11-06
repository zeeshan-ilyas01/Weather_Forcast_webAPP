import { getWeatherLabel } from "../utils/weatherCodes";
import { getVerdict } from "../utils/verdict";
import { colors, fonts } from "../utils/theme";

const glass = {
  background: `${colors.cream}34`,
  border: `1px solid ${colors.cream}55`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: 24,
  padding: "24px 22px",
  margin: "16px 0",
  color: colors.cream,
};

export default function HubHero({ place, weather, air, loading, locationError, onWrongCity, onPrecise }) {
  if (loading || !weather) {
    return (
      <div style={glass}>
        <p style={{ margin: 0, opacity: 0.8 }}>Finding the weather near you…</p>
      </div>
    );
  }

  const c = weather.current;
  const d = weather.daily;
  const pills = [
    `Feels like ${Math.round(c.apparent_temperature)}°`,
    `H ${Math.round(d.temperature_2m_max[0])}° L ${Math.round(d.temperature_2m_min[0])}°`,
    `Wind ${Math.round(c.wind_speed_10m)} km/h`,
    `Humidity ${c.relative_humidity_2m}%`,
  ];

  const linkButton = {
    background: "none", border: "none", padding: 0, color: colors.cream,
    textDecoration: "underline", fontSize: 13, cursor: "pointer",
  };
  const pillButton = {
    background: `${colors.cream}33`, border: "none", color: colors.cream,
    borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer",
  };

  return (
    <div style={glass}>
      {/* location line */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>
          {place.name}{place.country ? `, ${place.country}` : ""}
        </span>
        <button style={linkButton} onClick={onWrongCity}>Not your city?</button>
        {place.source !== "gps" && (
          <button style={pillButton} onClick={onPrecise}>Use precise location</button>
        )}
      </div>
      {locationError && (
        <p style={{ fontSize: 12, margin: "8px 0 0", opacity: 0.85 }}>
          Couldn't get your location. Check your browser's location permission.
        </p>
      )}

      {/* temperature and condition */}
      <div style={{ margin: "18px 0 6px", fontFamily: fonts.display, fontSize: "clamp(72px, 18vw, 120px)", lineHeight: 1 }}>
        {Math.round(c.temperature_2m)}°
      </div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{getWeatherLabel(c.weather_code)}</div>

      {/* verdict */}
      <p style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 1.3, margin: "18px 0", maxWidth: 520 }}>
        {getVerdict(weather, air)}
      </p>

      {/* quick facts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {pills.map((p) => (
          <span key={p} style={{ background: `${colors.cream}33`, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}