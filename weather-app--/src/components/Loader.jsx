import { colors } from "../utils/theme";
export default function Loader({ color = colors.cream }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: `3px solid ${color}33`,
          borderTopColor: color,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}