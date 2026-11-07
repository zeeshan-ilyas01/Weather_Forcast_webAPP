import { Link } from "react-router-dom";
import { colors, fonts, layout } from "../../utils/theme";

const h2 = { fontFamily: fonts.display, fontSize: 20, marginTop: 32 };
const p = { opacity: 0.9, lineHeight: 1.6 };

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
        <p style={{ opacity: 0.8, fontStyle: "italic" }}>Last updated: November 7, 2026</p>

        <h2 style={h2}>What this site does with your location</h2>
        <p style={p}>
          When you open the home page, we use your approximate location to show
          local weather straight away. This is worked out from your IP address
          by our hosting provider (Vercel). It gives us a rough city, country
          and coordinates, which may not be exactly where you are. We use it
          only to choose the first city to show, and we do not save it.
        </p>
        <p style={p}>
          If you tap "Use precise location", your browser asks for permission
          and then shares your exact coordinates with this page. We use them to
          show weather, air quality and prayer times for where you are. You can
          refuse, and you can change the permission in your browser at any time.
          We do not save your coordinates on any server we control.
        </p>

        <h2 style={h2}>Weather, air quality and prayer times</h2>
        <p style={p}>
          When you search for a city or view a forecast, your browser sends the
          search text or the coordinates of the place to Open-Meteo to get
          matching locations, weather and air quality. Open-Meteo can see your
          IP address, as any website you contact can. Prayer times are
          calculated in your browser from the coordinates, and are not sent
          anywhere.
        </p>

        <h2 style={h2}>Data stored on your device</h2>
        <p style={p}>
          If you save a city, its name and coordinates are kept in your
          browser's local storage on your own device. We do not receive them.
          You can remove saved cities with the × on each one, or by clearing
          your browser's site data.
        </p>

        <h2 style={h2}>Cookies and advertising</h2>
        <p style={p}>
          This site may show ads served by third-party advertising networks
          (such as Google AdSense). These networks may use cookies to show ads
          based on your visits to this and other websites. You can opt out of
          personalized advertising by visiting Google's Ads Settings.
        </p>

        <h2 style={h2}>Third-party services used</h2>
        <ul style={p}>
          <li>Open-Meteo (weather, air quality and location search)</li>
          <li>Vercel (hosting, and the approximate location from your IP address)</li>
          <li>Google AdSense (advertising, once approved)</li>
        </ul>

        <h2 style={h2}>Contact</h2>
        <p style={p}>
          Questions about this policy can be sent via the Contact page.
        </p>
      </div>
    </div>
  );
}