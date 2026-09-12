import { colors } from "../utils/theme";

export default function StatGrid({ humidity, windSpeed, sunrise, sunset }) {
  const stats = [
    { label: "Humidity", value: `${humidity}%` },
    { label: "Wind", value: `${windSpeed} km/h` },
    { label: "Sunrise", value: sunrise },
    { label: "Sunset", value: sunset },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 8,
        margin: "16px 0",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: `${colors.cream}1A`,
            borderRadius: 10,
            padding: 8,
            textAlign: "center",
            color: colors.cream,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{stat.value}</p>
          <p style={{ fontSize: 10, opacity: 0.7, margin: "2px 0 0" }}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}