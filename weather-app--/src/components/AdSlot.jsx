import { colors } from "../utils/theme";

export default function AdSlot({ label = "Ad space", text = colors.cream }) {
  return (
    <div
      style={{
        border: `1px dashed ${text}66`,
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        margin: "16px 0",
      }}
    >
      <p style={{ fontSize: 12, opacity: 0.7, margin: 0, color: text }}>{label}</p>
    </div>
  );
}