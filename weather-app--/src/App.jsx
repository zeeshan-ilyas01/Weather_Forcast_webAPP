import { useState, useEffect, useRef } from "react";

function getWeatherLabel(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

function SkyBackground({ isDay, weatherCode }) {
  const isRain = weatherCode >= 51 && weatherCode <= 82;
  const isSnow = weatherCode >= 71 && weatherCode <= 86;

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

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const debounceTimer = useRef(null);

  function handleInputChange(e) {
    const text = e.target.value;
    setQuery(text);

    clearTimeout(debounceTimer.current);
    if (text.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=5`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
    }, 400);
  }

  async function handleSelectCity(city) {
    setQuery(city.name);
    setSuggestions([]);

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&timezone=auto&forecast_days=6`
    );
    const data = await res.json();
    setWeather(data);
  }

  return (
    <div>
      <style>{`
        body { margin: 0; font-family: sans-serif; }

        .sky {
          position: relative;
          height: 300px;
          overflow: hidden;
          background: linear-gradient(180deg, #4FA8D8, #DCF3EE);
          border-radius: 16px;
        }

        .star {
          position: absolute;
          width: 2px; height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 2s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .cloud {
          position: absolute;
          left: -150px;
          width: 120px; height: 50px;
          animation: drift linear infinite;
        }
        .puff {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.9;
        }
        .puff1 { width: 70px; height: 40px; left: 25px; top: 5px; }
        .puff2 { width: 55px; height: 45px; left: 55px; top: -5px; }
        .puff3 { width: 45px; height: 35px; left: 0px; top: 15px; }
        @keyframes drift {
          from { transform: translateX(0); }
          to { transform: translateX(120vw); }
        }

        .drop {
          position: absolute;
          top: -10px;
          width: 2px; height: 16px;
          background: rgba(255,255,255,0.6);
          animation: fall 0.6s linear infinite;
        }
        @keyframes fall {
          from { transform: translateY(-10px); }
          to { transform: translateY(310px); }
        }

        .flake {
          position: absolute;
          top: -10px;
          width: 5px; height: 5px;
          background: white;
          border-radius: 50%;
          animation: snowfall 6s linear infinite;
        }
        @keyframes snowfall {
          from { transform: translateY(-10px); }
          to { transform: translateY(310px); }
        }
      `}</style>

      <h1>Weather App</h1>

      <input
        value={query}
        onChange={handleInputChange}
        placeholder="Search a city..."
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city, i) => (
            <li key={i} onClick={() => handleSelectCity(city)}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}

      {weather && (
        <div>
          <SkyBackground isDay={weather.current.is_day === 1} weatherCode={weather.current.weather_code} />

          <h2>{weather.current.temperature_2m}°C</h2>
          <p>{getWeatherLabel(weather.current.weather_code)}</p>
          <p>Feels like {weather.current.apparent_temperature}°C</p>
          <p>Humidity: {weather.current.relative_humidity_2m}%</p>
          <p>Wind: {weather.current.wind_speed_10m} km/h</p>

          <h3>Next hours</h3>
          <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
            {weather.hourly.time.slice(0, 8).map((time, i) => (
              <div key={i}>
                <p>{time.split("T")[1]}</p>
                <p>{weather.hourly.temperature_2m[i]}°C</p>
              </div>
            ))}
          </div>

          <h3>6-day forecast</h3>
          {weather.daily.time.map((date, i) => (
            <div key={i} style={{ display: "flex", gap: "12px" }}>
              <span>{date}</span>
              <span>{getWeatherLabel(weather.daily.weather_code[i])}</span>
              <span>{weather.daily.temperature_2m_max[i]}° / {weather.daily.temperature_2m_min[i]}°</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;