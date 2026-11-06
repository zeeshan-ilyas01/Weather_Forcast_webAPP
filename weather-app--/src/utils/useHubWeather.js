import { useEffect, useState } from "react";
import { getForecast, getAirQuality, getApproxLocation } from "./api";

// Used when the visitor's location can't be guessed
const DEFAULT_PLACE = {
  name: "Lahore", country: "Pakistan", latitude: 31.55, longitude: 74.36, source: "default",
};

export function useHubWeather() {
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  // Step 1: work out where the visitor is (no permission pop-up)
  useEffect(() => {
    let cancelled = false;
    async function findPlace() {
      const loc = await getApproxLocation();
      if (cancelled) return;
      setPlace(
        loc
          ? { name: loc.city || "Your area", country: loc.countryName, latitude: loc.latitude, longitude: loc.longitude, source: "ip" }
          : DEFAULT_PLACE
      );
    }
    findPlace();
    return () => { cancelled = true; };
  }, []);

  // Step 2: load weather and air whenever the place changes
  useEffect(() => {
    if (!place) return;
    let cancelled = false;
    setLoading(true);
    Promise.all([
      getForecast(place.latitude, place.longitude),
      getAirQuality(place.latitude, place.longitude).catch(() => null), // page still works without air data
    ])
      .then(([w, a]) => {
        if (cancelled) return;
        setWeather(w);
        setAir(a);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [place]);

  // Only runs when the visitor taps "Use precise location" (the browser asks permission then)
  function requestPreciseLocation() {
    setLocationError(false);
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setPlace({
          name: "Your location", country: null,
          latitude: pos.coords.latitude, longitude: pos.coords.longitude, source: "gps",
        }),
      () => setLocationError(true)
    );
  }

  return { place, weather, air, loading, locationError, requestPreciseLocation };
}