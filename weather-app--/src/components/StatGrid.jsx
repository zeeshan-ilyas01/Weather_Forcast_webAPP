import { colors, fonts } from "../utils/theme";

export default function StatGrid({ humidity, windSpeed, sunrise, sunset, uvIndex, dewPoint }) {
  const stats = [
    { label: "Humidity", value: `${humidity}%` },
    { label: "Wind", value: `${windSpeed} km/h` },
    { label: "UV Index", value: uvIndex },
    { label: "Dew Point", value: `${dewPoint}°` },
    { label: "Sunrise", value: sunrise },
    { label: "Sunset", value: sunset },
  ];

  return (
    <div style={{
      padding: 20,
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <p style={{ margin: 0, fontFamily: fonts.body, fontSize: 14, fontWeight: 600 }}>
        Right now
      </p>

      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "8px 4px",
            borderRadius: 16,
            background: `${colors.cream}28`,
            border: `1px solid ${colors.cream}46`,
            textAlign: "center",
          }}>
            <span style={{ fontFamily: fonts.body, fontSize: 16, fontWeight: 700 }}>
              {stat.value}
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: 12, opacity: 0.85 }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}