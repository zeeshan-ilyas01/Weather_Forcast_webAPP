import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SavedCityTile from "../components/SavedCityTile";
import HubHero from "../components/HubHero";
import SkyScene from "../components/SkyScene";
import TodayForYou from "../components/TodayForYou";
import AirPanel from "../components/AirPanel";
import PrayerCard from "../components/PrayerCard";
import PopularCities from "../components/PopularCities";
import AdSlot from "../components/AdSlot";
import Footer from "../components/Footer";
import { searchCities, getForecast, getAirQuality } from "../utils/api";
import { getSavedCities, removeSavedCity } from "../utils/storage";
import { useHubWeather } from "../utils/useHubWeather";
import { fonts, layout } from "../utils/theme";
import { SCENES, getSceneKey } from "../utils/scenes";

export default function HubPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [savedCities, setSavedCities] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const debounceTimer = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { place, weather, air, loading, locationError, requestPreciseLocation } = useHubWeather();

  // Add ?scene=storm (or rain, snow, night, hot, spring, day) to the address to preview a scene
  const forced = new URLSearchParams(window.location.search).get("scene");
  const sceneKey = SCENES[forced] ? forced : weather ? getSceneKey(weather, place?.latitude) : "day";
  const scene = SCENES[sceneKey];

  useEffect(() => {
    async function loadSavedCitiesWithWeather() {
      const stored = getSavedCities();

      const withWeather = await Promise.all(
        stored.map(async (city) => {
          const [data, airData] = await Promise.all([
            getForecast(city.latitude, city.longitude),
            getAirQuality(city.latitude, city.longitude).catch(() => null),
          ]);
          return {
            ...city,
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
            aqi: airData?.current?.us_aqi ?? null,
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
    removeSavedCity(cityName);
    // keep the weather and AQI of the cities that stay
    setSavedCities((prev) => prev.filter((c) => c.name !== cityName));
  }

  // "Not your city?" scrolls to the search box and focuses it
  function focusSearch() {
    const input = searchRef.current?.querySelector("input");
    if (!input) return;
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    input.focus();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        background: scene.bg,
        color: scene.text,
      }}
    >
      <SkyScene scene={sceneKey} />

      <div style={{ maxWidth: layout.pageWidth, margin: "0 auto", padding: "24px 16px", position: "relative", zIndex: 1 }}>
        <h1 style={{ textAlign: "center", fontFamily: fonts.display, fontSize: 22, color: scene.text }}>
          Weather Hub
        </h1>

        <div ref={searchRef}>
          <SearchBar
            query={query}
            suggestions={suggestions}
            onQueryChange={handleQueryChange}
            onSelectCity={handleSelectCity}
            text={scene.text}
          />
        </div>

        <HubHero
          place={place}
          weather={weather}
          air={air}
          loading={loading}
          locationError={locationError}
          onWrongCity={focusSearch}
          onPrecise={requestPreciseLocation}
          text={scene.text}
          scene={sceneKey}
        />

        {weather && (
          <TodayForYou weather={weather} air={air} placeName={place?.name} text={scene.text} />
        )}

        {weather && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 16, margin: "16px 0" }}>
            <AirPanel air={air} text={scene.text} />
            <PrayerCard place={place} weather={weather} text={scene.text} />
          </div>
        )}

        <p style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 8px", color: scene.text }}>
          Saved cities
        </p>

        {loadingSaved && <p style={{ opacity: 0.7, fontSize: 13 }}>Loading your saved cities…</p>}

        {!loadingSaved && savedCities.length === 0 && (
          <p style={{ opacity: 0.7, fontSize: 13 }}>
            No saved cities yet — search above and save one from its detail page.
          </p>
        )}

        {!loadingSaved && savedCities.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: 12 }}>
            {savedCities.map((city, i) => (
              <SavedCityTile
                key={i}
                name={city.name}
                temperature={city.temperature}
                weatherCode={city.weatherCode}
                aqi={city.aqi}
                text={scene.text}
                onClick={() => goToCity(city)}
                onRemove={(e) => handleRemoveCity(city.name, e)}
              />
            ))}
          </div>
        )}

        <AdSlot label="320x100" text={scene.text} />

        <PopularCities text={scene.text} />

        <Footer text={scene.text} />
      </div>
    </div>
  );
}