import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SavedCityCard from "../components/SavedCityCard";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { searchCities } from "../utils/api";
import { colors, fonts, layout } from "../utils/theme";

export default function HubPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  const savedCities = [
    { name: "Khulna", temperature: 28, weatherCode: 45, latitude: 22.8456, longitude: 89.5403 },
    { name: "London", temperature: 12, weatherCode: 61, latitude: 51.5074, longitude: -0.1278 },
    { name: "Tokyo", temperature: 20, weatherCode: 0, latitude: 35.6762, longitude: 139.6503 },
  ];

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

  function handleSelectCity(city) {
    setQuery(city.name);
    setSuggestions([]);
    navigate(`/city?lat=${city.latitude}&lon=${city.longitude}&name=${encodeURIComponent(city.name)}`);
  }

  function handleCityClick(city) {
    navigate(`/city?lat=${city.latitude}&lon=${city.longitude}&name=${encodeURIComponent(city.name)}`);
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(180deg, #E8A66E, #F6D9B8)",
      color: "#FAF8F4",
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

        <p style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 8px", color: "#FAF8F4" }}>
          Saved locations
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {savedCities.map((city, i) => (
            <SavedCityCard
              key={i}
              name={city.name}
              temperature={city.temperature}
              weatherCode={city.weatherCode}
              onClick={() => handleCityClick(city)}
            />
          ))}
        </div>

        <AdSlot label="320x100" />

        <Footer />
      </div>
    </div>
  );
}