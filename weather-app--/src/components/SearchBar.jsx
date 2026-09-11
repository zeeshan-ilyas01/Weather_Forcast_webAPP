export default function SearchBar({ query, suggestions, onQueryChange, onSelectCity }) {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search a city..."
        style={{
          display: "block",
          width: "100%",
          maxWidth: 400,
          margin: "0 auto 12px",
          padding: "10px 14px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.15)",
          color: "#FAF8F4",
          fontSize: 15,
        }}
      />

      {suggestions.length > 0 && (
        <ul style={{ maxWidth: 400, margin: "0 auto 12px", padding: 0, listStyle: "none" }}>
          {suggestions.map((city, i) => (
            <li
              key={i}
              onClick={() => onSelectCity(city)}
              style={{ padding: "8px 12px", cursor: "pointer", fontSize: 14 }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}