import { Link } from "react-router-dom";

export default function Footer() {
  const linkStyle = { fontSize: 11, opacity: 0.7, color: "inherit", textDecoration: "none" };

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
      <Link to="/privacy" style={linkStyle}>Privacy policy</Link>
      <Link to="/terms" style={linkStyle}>Terms</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </div>
  );
}