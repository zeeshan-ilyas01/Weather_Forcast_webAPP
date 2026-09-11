export default function HourlyForecast({ hours }) {
  return (
    <div>
      <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 8px", fontWeight: 600 }}>
        Next hours
      </p>
      <div style={{ display: "flex", gap: 14, overflowX: "auto" }}>
        {hours.map((hour, i) => (
          <div key={i} style={{ textAlign: "center", minWidth: 38 }}>
            <p style={{ fontSize: 11, opacity: 0.7, margin: "0 0 4px" }}>{hour.time}</p>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{hour.temperature}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}