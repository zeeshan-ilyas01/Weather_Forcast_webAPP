import { colors, fonts } from "../utils/theme";

export default function PlanYourDay({ tips, color }) {
  return (
    <div style={{
      padding: "20px 24px",
      borderRadius: 24,
      background: `${colors.cream}34`,
      border: `1px solid ${colors.cream}5F`,
      fontFamily: fonts.body,
      color,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Plan your day</p>

      {tips.map((tip) => (
        <div key={tip.title} style={{
          padding: "12px 16px",
          borderRadius: 16,
          background: `${colors.cream}28`,
          border: `1px solid ${colors.cream}46`,
        }}>
          <div style={{ fontSize: 12, opacity: 0.85 }}>{tip.title}</div>
          <div style={{ fontSize: 18, fontWeight: 700, margin: "2px 0" }}>{tip.big}</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>{tip.sub}</div>
        </div>
      ))}
    </div>
  );
}