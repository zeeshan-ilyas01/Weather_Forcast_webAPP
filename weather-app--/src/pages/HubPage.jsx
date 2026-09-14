import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SavedCityCard from "../components/SavedCityCard";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { searchCities, getForecast } from "../utils/api";
import { getSavedCities, removeSavedCity } from "../utils/storage";
import { colors, fonts, layout } from "../utils/theme";

export default function HubPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [savedCities, setSavedCities] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSavedCitiesWithWeather() {
      const stored = getSavedCities();

      const withWeather = await Promise.all(
        stored.map(async (city) => {
          const data = await getForecast(city.latitude, city.longitude);
          return {
            ...city,
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
          };
        })
      );

      setSavedCities(withWeather);
      setLoadingSaved(false);
    }

    loadSavedCitiesWithWeather();
  }, []);

  function handleQueryChange(text) {
    setQuery(text);

    clearTimeout(debounceTimer.current);
    if (text.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      const results = await searchCities(text);
      setSuggestions(results);
    }, 400);
  }

  function goToCity(city) {
    navigate(`/city?lat=${city.latitude}&lon=${city.longitude}&name=${encodeURIComponent(city.name)}`);
  }

  function handleSelectCity(city) {
    setQuery(city.name);
    setSuggestions([]);
    goToCity(city);
  }

  function handleRemoveCity(cityName, event) {
    event.stopPropagation();
    const updated = removeSavedCity(cityName);
    setSavedCities(updated);
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: `linear-gradient(180deg, ${colors.dawnStart}, ${colors.dawnEnd})`,
      color: colors.cream,
    }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ textAlign: "center", fontFamily: fonts.display, fontSize: 22, color: colors.cream }}>
          Weather Hub
        </h1>

        <SearchBar
          query={query}
          suggestions={suggestions}
          onQueryChange={handleQueryChange}
          onSelectCity={handleSelectCity}
        />

        <p style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 8px", color: colors.cream }}>
          Saved locations
        </p>

        {loadingSaved && <p style={{ opacity: 0.7, fontSize: 13 }}>Loading your saved cities…</p>}

        {!loadingSaved && savedCities.length === 0 && (
          <p style={{ opacity: 0.7, fontSize: 13 }}>
            No saved cities yet — search above and save one from its detail page.
          </p>
        )}

        {!loadingSaved && savedCities.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {savedCities.map((city, i) => (
              <SavedCityCard
                key={i}
                name={city.name}
                temperature={city.temperature}
                weatherCode={city.weatherCode}
                onClick={() => goToCity(city)}
                onRemove={(e) => handleRemoveCity(city.name, e)}
              />
            ))}
          </div>
        )}

        <AdSlot label="320x100" />

        <Footer />
      </div>
    </div>
  );
}