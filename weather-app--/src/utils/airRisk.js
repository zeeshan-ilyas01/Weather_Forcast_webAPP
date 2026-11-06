// US AQI categories (0-500 scale)
export function getAqiCategory(aqi) {
  if (aqi == null) return { label: "Unknown", short: "--", color: "#9aa5b1", advice: "Air data unavailable." };
  if (aqi <= 50)  return { label: "Good", short: "Good", color: "#00996a", advice: "Air is clean. Enjoy time outside." };
  if (aqi <= 100) return { label: "Moderate", short: "Moderate", color: "#e6a800", advice: "Acceptable. Very sensitive people may notice it." };
  if (aqi <= 150) return { label: "Unhealthy for sensitive groups", short: "Sensitive", color: "#ff7e00", advice: "Children, elderly and people with asthma should limit time outside." };
  if (aqi <= 200) return { label: "Unhealthy", short: "Unhealthy", color: "#d93636", advice: "Everyone may feel effects. Limit time outside." };
  if (aqi <= 300) return { label: "Very unhealthy", short: "Very", color: "#8a3ab9", advice: "Avoid outdoor activity. Keep windows shut." };
  return { label: "Hazardous", short: "Hazard", color: "#7e0023", advice: "Stay indoors. Wear a mask if you must go out." };
}

// Allergy and dust risk, estimated from dust and PM10 (ug/m3)
export function getAllergyDustRisk(air) {
  const dust = air?.dust ?? 0;
  const pm10 = air?.pm10 ?? 0;

  let score = 0; // 0 low, 1 moderate, 2 high
  if (dust >= 100 || pm10 >= 150) score = 2;
  else if (dust >= 40 || pm10 >= 50) score = 1;

  if (score === 2) {
    return {
      level: "High",
      color: "#d93636",
      text: "Dust and PM10 are elevated. Keep windows shut, and wear a mask if you have asthma or allergies.",
    };
  }
  if (score === 1) {
    return {
      level: "Moderate",
      color: "#ff7e00",
      text: "Some dust in the air. People with allergies may notice it, so keep medication handy.",
    };
  }
  return {
    level: "Low",
    color: "#00996a",
    text: "Dust and particles are low. Good day to open windows.",
  };
}