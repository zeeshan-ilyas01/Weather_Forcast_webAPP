import { Link } from "react-router-dom";
import { colors, fonts, layout } from "../../utils/theme";

export default function Contact() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
     background: `linear-gradient(180deg, ${colors.dawnStart}, ${colors.dawnEnd})`,
    }}>
      <div style={{maxWidth: layout.maxWidth, margin: "0 auto", padding: "40px 20px", color: colors.cream, fontFamily: fonts.display }}>
        <Link to="/" style={{ color: "#FAF8F4", opacity: 0.85, fontSize: 14, textDecoration: "none" }}>
          ← Weather Hub
        </Link>

        <h1 style={{ fontFamily: "'Fraunces', serif", marginTop: 20 }}>Contact</h1>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          Questions, feedback, or issues with this site? Reach out at:
        </p>
        <p style={{ fontWeight: 600 }}>[add your real email address here]</p>
      </div>
    </div>
  );
}