import { Link } from "react-router-dom";
import { glass } from "../utils/glass";
import { colors, fonts } from "../utils/theme";

const CITIES = [
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { name: "Delhi", latitude: 28.6139, longitude: 77.209 },
  { name: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Istanbul", latitude: 41.0082, longitude: 28.9784 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777 },
];

export default function PopularCities({ text = colors.cream }) {
  return (
    <section style={{ margin: "24px 0", color: text }}>
      <h2 style={{ fontFamily: fonts.display, fontSize: 22, margin: "0 0 12px" }}>Start with a popular city</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {CITIES.map((c) => (
          <Link
            key={c.name}
            to={`/city?lat=${c.latitude}&lon=${c.longitude}&name=${encodeURIComponent(c.name)}`}
            style={{
              ...glass,
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: text,
              textDecoration: "none",
            }}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}