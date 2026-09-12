import { colors } from "../utils/theme";

export default function UnitToggle({ unit, onUnitChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 2, margin: "0 0 10px" }}>
      <button
        onClick={() => onUnitChange("C")}
        style={{
          height: 24,
          padding: "0 10px",
          fontSize: 12,
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          background: unit === "C" ? colors.cream : "transparent",
          color: unit === "C" ? colors.ink : `${colors.cream}B3`,
        }}
      >
        °C
      </button>
      <button
        onClick={() => onUnitChange("F")}
        style={{
          height: 24,
          padding: "0 10px",
          fontSize: 12,
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          background: unit === "F" ? colors.cream : "transparent",
          color: unit === "F" ? colors.ink : `${colors.cream}B3`,
        }}
      >
        °F
      </button>
    </div>
  );
}