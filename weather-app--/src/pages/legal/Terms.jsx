import { Link } from "react-router-dom";
import { colors, fonts, layout } from "../../utils/theme";
export default function Terms() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: `linear-gradient(180deg, ${colors.dawnStart}, ${colors.dawnEnd})`,
    }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "40px 20px", color: colors.cream, fontFamily: fonts.display }}>
        <Link to="/" style={{ color: "#FAF8F4", opacity: 0.85, fontSize: 14, textDecoration: "none" }}>
          ← Weather Hub
        </Link>

        <h1 style={{ fontFamily: "'Fraunces', serif", marginTop: 20 }}>Terms of Use</h1>
        <p style={{ opacity: 0.8, fontStyle: "italic" }}>Last updated: [add today's date when you publish this]</p>

        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginTop: 32 }}>Using this site</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          This site provides weather forecast information for general
          informational purposes only. Weather data is sourced from
          Open-Meteo and may not always be fully accurate or up to date.
          Do not rely on this site for decisions involving safety-critical
          weather situations (e.g. severe storm warnings) — always consult
          official government meteorological sources for those.
        </p>

        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginTop: 32 }}>No warranty</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          This site is provided "as is" without warranties of any kind. We
          are not liable for any damages resulting from use of, or inability
          to use, this site or its data.
        </p>

        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginTop: 32 }}>Changes to these terms</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          These terms may be updated occasionally. Continued use of the site
          after changes means you accept the updated terms.
        </p>
      </div>
    </div>
  );
}