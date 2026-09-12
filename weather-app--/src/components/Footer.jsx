import { Link } from "react-router-dom";
import { colors } from "../utils/theme";

export default function Footer() {
  const linkStyle = { fontSize: 11, opacity: 0.7, color: colors.cream, textDecoration: "none" };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        paddingTop: 12,
        marginTop: 16,
        borderTop: `0.5px solid ${colors.cream}26`,
      }}
    >
      <Link to="/privacy" style={linkStyle}>Privacy policy</Link>
      <Link to="/terms" style={linkStyle}>Terms</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </div>
  );
}