const STORAGE_KEY = "weatherHub.savedCities";

export function getSavedCities() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCities(cities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function addSavedCity(city) {
  const current = getSavedCities();
  const alreadySaved = current.some((c) => c.name === city.name);
  if (alreadySaved) return current;
  const updated = [...current, city];
  saveCities(updated);
  return updated;
}

export function removeSavedCity(cityName) {
  const current = getSavedCities();
  const updated = current.filter((c) => c.name !== cityName);
  saveCities(updated);
  return updated;
}

export function isCitySaved(cityName) {
  const current = getSavedCities();
  return current.some((c) => c.name === cityName);
}