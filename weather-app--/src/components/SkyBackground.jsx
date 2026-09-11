import { getWeatherCategory } from "../utils/weatherCodes";

export default function SkyBackground({ isDay, weatherCode }) {
  const category = getWeatherCategory(weatherCode);
  const isRain = category === "rain" || category === "storm";
  const isSnow = category === "snow";

  const clouds = Array.from({ length: 5 }).map((_, i) => ({
    top: 10 + i * 15,
    duration: 30 + i * 8,
    delay: -i * 6,
  }));

  const stars = Array.from({ length: 25 }).map((_, i) => ({
    top: Math.random() * 60,
    left: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div className="sky">
      {!isDay &&
        stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{ top: `${s.top}%`, left: `${s.left}%`, animationDelay: `${s.delay}s` }}
          />
        ))}

      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud"
          style={{
            top: `${c.top}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div className="puff puff1" />
          <div className="puff puff2" />
          <div className="puff puff3" />
        </div>
      ))}

      {isRain &&
        Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="drop"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}
          />
        ))}

      {isSnow &&
        Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="flake"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }}
          />
        ))}
    </div>
  );
}