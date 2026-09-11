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
          background: unit === "C" ? "#FAF8F4" : "transparent",
          color: unit === "C" ? "#12181F" : "rgba(250,248,244,0.7)",
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
          background: unit === "F" ? "#FAF8F4" : "transparent",
          color: unit === "F" ? "#12181F" : "rgba(250,248,244,0.7)",
        }}
      >
        °F
      </button>
    </div>
  );
}