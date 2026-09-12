import { Link } from "react-router-dom";
import { colors, fonts, layout } from "../../utils/theme";

export default function Privacy() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: `linear-gradient(180deg, ${colors.dawnStart}, ${colors.dawnEnd})`,
    }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "40px 20px", color: colors.cream, fontFamily: fonts.body }}>
        <Link to="/" style={{ color: colors.cream, opacity: 0.85, fontSize: 14, textDecoration: "none" }}>
          ← Weather Hub
        </Link>

        <h1 style={{ fontFamily: fonts.display, marginTop: 20 }}>Privacy Policy</h1>
    <p style={{ opacity: 0.8, fontStyle: "italic" }}>Last updated: September 12, 2026</p>

        <h2 style={{ fontFamily: fonts.display, fontSize: 20, marginTop: 32 }}>What data this site collects</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          When you search for a city, that search text is sent to Open-Meteo's
          geocoding service to find matching locations. If you allow location
          access in your browser, your coordinates are sent to Open-Meteo's
          forecast service to show local weather. This site does not store
          your searches or location on any server we control.
        </p>

        <h2 style={{ fontFamily: fonts.display, fontSize: 20, marginTop: 32 }}>Cookies and advertising</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          This site may show ads served by third-party advertising networks
          (such as Google AdSense). These networks may use cookies to show
          ads based on your visits to this and other websites. You can opt
          out of personalized advertising by visiting Google's Ads Settings.
        </p>

        <h2 style={{ fontFamily: fonts.display, fontSize: 20, marginTop: 32 }}>Third-party services used</h2>
        <ul style={{ opacity: 0.9, lineHeight: 1.6 }}>
          <li>Open-Meteo (weather and location data)</li>
          <li>Google AdSense (advertising, once approved)</li>
        </ul>

        <h2 style={{ fontFamily: fonts.display, fontSize: 20, marginTop: 32 }}>Contact</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          Questions about this policy can be sent via the Contact page.
        </p>
      </div>
    </div>
  );
}