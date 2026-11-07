import { Link } from "react-router-dom";
import { colors } from "../utils/theme";

export default function Footer({ text = colors.cream }) {
  const linkStyle = { fontSize: 12, opacity: 0.85, color: text, textDecoration: "none" };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        paddingTop: 12,
        marginTop: 16,
        borderTop: `0.5px solid ${text}40`,
      }}
    >
      <Link to="/privacy" style={linkStyle}>Privacy policy</Link>
      <Link to="/terms" style={linkStyle}>Terms</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </div>
  );
}