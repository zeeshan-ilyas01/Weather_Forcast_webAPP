import { colors } from "../utils/theme";

function getKind(code) {
  if (code === 0) return "sun";
  if (code === 1 || code === 2) return "partly";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}

function Sun({ cx, cy, r }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      {rays.map((deg) => (
        <line
          key={deg}
          x1={cx}
          y1={cy - r - 6}
          x2={cx}
          y2={cy - r - 14}
          stroke={colors.accent}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={colors.accent} />
    </g>
  );
}

function Cloud({ fill = "#FFFFFF", dx = 0, dy = 0 }) {
  return (
    <g fill={fill} transform={`translate(${dx} ${dy})`}>
      <circle cx="34" cy="58" r="14" />
      <circle cx="52" cy="50" r="18" />
      <circle cx="70" cy="60" r="12" />
      <rect x="22" y="58" width="60" height="16" rx="8" />
    </g>
  );
}

export default function WeatherIcon({ code, size = 48 }) {
  const kind = getKind(code);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={kind}>
      {kind === "sun" && <Sun cx={50} cy={50} r={20} />}

      {kind === "partly" && (
        <>
          <Sun cx={36} cy={38} r={14} />
          <Cloud dx={6} dy={8} />
        </>
      )}

      {kind === "cloud" && <Cloud dy={4} />}

      {kind === "fog" && (
        <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round">
          <line x1="22" y1="40" x2="78" y2="40" />
          <line x1="28" y1="56" x2="84" y2="56" />
          <line x1="22" y1="72" x2="78" y2="72" />
        </g>
      )}

      {kind === "rain" && (
        <>
          <Cloud fill="#8FA0B5" dy={-6} />
          <g stroke="#2F6FB0" strokeWidth="5" strokeLinecap="round">
            <line x1="36" y1="76" x2="32" y2="88" />
            <line x1="52" y1="76" x2="48" y2="88" />
            <line x1="68" y1="76" x2="64" y2="88" />
          </g>
        </>
      )}

      {kind === "snow" && (
        <>
          <Cloud fill="#B9C6D6" dy={-6} />
          <g fill="#FFFFFF">
            <circle cx="36" cy="82" r="4" />
            <circle cx="52" cy="86" r="4" />
            <circle cx="68" cy="82" r="4" />
          </g>
        </>
      )}

      {kind === "storm" && (
        <>
          <Cloud fill="#5B6678" dy={-8} />
          <polygon points="54,64 40,84 50,84 46,98 66,76 55,76" fill="#FFD25A" />
        </>
      )}
    </svg>
  );
}