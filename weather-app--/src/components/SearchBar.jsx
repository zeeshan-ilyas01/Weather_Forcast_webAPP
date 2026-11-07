import { colors, layout } from "../utils/theme";

export default function SearchBar({ query, suggestions, onQueryChange, onSelectCity, text = colors.cream }) {
  return (
    <div>
      <style>{`.hub-search::placeholder{color:inherit;opacity:.7}`}</style>

      <input
        className="hub-search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search a city..."
        aria-label="Search a city"
        style={{
          display: "block",
          width: "100%",
          maxWidth: layout.narrowWidth,
          margin: "0 auto 12px",
          padding: "10px 14px",
          borderRadius: 999,
          border: `1px solid ${text}4D`,
          background: `${colors.cream}26`,
          color: text,
          fontSize: 15,
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            maxWidth: layout.narrowWidth,
            margin: "0 auto 12px",
            padding: 6,
            listStyle: "none",
            borderRadius: 16,
            background: `${colors.cream}40`,
            border: `1px solid ${colors.cream}55`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {suggestions.map((city, i) => (
            <li
              key={i}
              onClick={() => onSelectCity(city)}
              style={{ padding: "8px 12px", cursor: "pointer", fontSize: 14, color: text }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}