import { useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import SavedCityCard from "../components/SavedCityCard";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { searchCities } from "../utils/api";

export default function HubPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);

  // Placeholder saved cities for now — real saving (localStorage) comes later
  const savedCities = [
    { name: "Khulna", temperature: 28, weatherCode: 45 },
    { name: "London", temperature: 12, weatherCode: 61 },
    { name: "Tokyo", temperature: 20, weatherCode: 0 },
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
    // Navigating to the detail page for this city comes once routing is wired up
    console.log("Selected:", city);
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ textAlign: "center", fontFamily: "'Fraunces', serif", fontSize: 22 }}>
        Weather Hub
      </h1>

      <SearchBar
        query={query}
        suggestions={suggestions}
        onQueryChange={handleQueryChange}
        onSelectCity={handleSelectCity}
      />

      <p style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 8px" }}>Saved locations</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {savedCities.map((city, i) => (
          <SavedCityCard
            key={i}
            name={city.name}
            temperature={city.temperature}
            weatherCode={city.weatherCode}
          />
        ))}
      </div>

      <AdSlot label="320x100" />

      <Footer />
    </div>
  );
}