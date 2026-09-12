import { colors } from "../utils/theme";

export default function AdSlot({ label = "Ad space" }) {
  return (
    <div
      style={{
        border: `1px dashed ${colors.cream}66`,
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        margin: "16px 0",
      }}
    >
      <p style={{ fontSize: 12, opacity: 0.6, margin: 0, color: colors.cream }}>{label}</p>
    </div>
  );
}