export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px", color: "#12181F", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontFamily: "'Fraunces', serif" }}>Privacy Policy</h1>
      <p><em>Last updated: [add today's date when you publish this]</em></p>

      <h2>What data this site collects</h2>
      <p>
        When you search for a city, that search text is sent to Open-Meteo's
        geocoding service to find matching locations. If you allow location
        access in your browser, your coordinates are sent to Open-Meteo's
        forecast service to show local weather. This site does not store
        your searches or location on any server we control.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        This site may show ads served by third-party advertising networks
        (such as Google AdSense). These networks may use cookies to show
        ads based on your visits to this and other websites. You can opt
        out of personalized advertising by visiting Google's Ads Settings.
      </p>

      <h2>Third-party services used</h2>
      <ul>
        <li>Open-Meteo (weather and location data)</li>
        <li>Google AdSense (advertising, once approved)</li>
      </ul>

      <h2>Contact</h2>
      <p>Questions about this policy can be sent via the Contact page.</p>
    </div>
  );
}