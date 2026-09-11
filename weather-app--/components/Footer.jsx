export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        paddingTop: 12,
        marginTop: 16,
        borderTop: "0.5px solid rgba(255,255,255,0.15)",
      }}
    >
      <span style={{ fontSize: 11, opacity: 0.6, cursor: "pointer" }}>Privacy policy</span>
      <span style={{ fontSize: 11, opacity: 0.6, cursor: "pointer" }}>Terms</span>
      <span style={{ fontSize: 11, opacity: 0.6, cursor: "pointer" }}>Contact</span>
    </div>
  );
}