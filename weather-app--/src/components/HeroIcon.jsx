const CSS = `
.hs-icon{width:clamp(110px,22vw,190px);height:clamp(110px,22vw,190px);flex:none;overflow:visible;animation:hs-float 6s ease-in-out infinite}
@keyframes hs-float{50%{transform:translateY(-10px)}}
.hs-rays{animation:hs-spin 40s linear infinite}
@keyframes hs-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion: reduce){.hs-icon,.hs-rays{animation:none!important}}
`;

const ray = (a, x1, y1, x2, y2, cx, cy) => (
  <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} transform={`rotate(${a} ${cx} ${cy})`} />
);

const ICONS = {
  day: (
    <>
      <g className="hs-rays" style={{ transformOrigin: "50px 50px" }} stroke="#F2A65A" strokeWidth="4" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => ray(a, 50, 14, 50, 4, 50, 50))}
      </g>
      <circle cx="42" cy="42" r="18" fill="#F2A65A" />
      <g fill="#fff">
        <circle cx="46" cy="66" r="14" /><circle cx="62" cy="58" r="18" /><circle cx="78" cy="68" r="12" />
        <rect x="34" y="66" width="56" height="16" rx="8" />
      </g>
    </>
  ),
  hot: (
    <>
      <g className="hs-rays" style={{ transformOrigin: "50px 50px" }} stroke="#F2A65A" strokeWidth="4" strokeLinecap="round">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => ray(a, 50, 10, 50, 2, 50, 50))}
      </g>
      <circle cx="50" cy="50" r="26" fill="#F2A65A" />
      <circle cx="50" cy="50" r="20" fill="#FFC56E" />
    </>
  ),
  spring: (
    <>
      <g className="hs-rays" style={{ transformOrigin: "34px 34px" }} stroke="#F2A65A" strokeWidth="4" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => ray(a, 34, 8, 34, 0, 34, 34))}
      </g>
      <circle cx="34" cy="34" r="15" fill="#F2A65A" />
      <g transform="translate(66 68)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-11" rx="8" ry="12" fill="#F6B8C8" transform={`rotate(${a})`} />
        ))}
        <circle r="6" fill="#F5C842" />
      </g>
    </>
  ),
  night: (
    <>
      <defs>
        <mask id="hs-moon-mask">
          <rect width="100" height="100" fill="#fff" />
          <circle cx="62" cy="40" r="26" fill="#000" />
        </mask>
      </defs>
      <circle cx="48" cy="52" r="30" fill="#F4EBC8" mask="url(#hs-moon-mask)" />
      <g fill="#fff" opacity=".9">
        <circle cx="78" cy="22" r="2" /><circle cx="86" cy="44" r="1.5" /><circle cx="24" cy="20" r="1.5" />
      </g>
    </>
  ),
  rain: (
    <>
      <g fill="#B4C0CF">
        <circle cx="34" cy="48" r="14" /><circle cx="52" cy="40" r="18" /><circle cx="70" cy="50" r="12" />
        <rect x="22" y="48" width="60" height="16" rx="8" />
      </g>
      <g stroke="#8CC3F0" strokeWidth="5" strokeLinecap="round">
        <line x1="36" y1="72" x2="32" y2="86" /><line x1="52" y1="72" x2="48" y2="86" /><line x1="68" y1="72" x2="64" y2="86" />
      </g>
    </>
  ),
  storm: (
    <>
      <g fill="#5B6678">
        <circle cx="34" cy="42" r="14" /><circle cx="52" cy="34" r="18" /><circle cx="70" cy="44" r="12" />
        <rect x="22" y="42" width="60" height="16" rx="8" />
      </g>
      <polygon points="54,56 40,78 50,78 46,96 68,70 56,70" fill="#FFD25A" />
    </>
  ),
  snow: (
    <>
      <g fill="#AFC0D2">
        <circle cx="34" cy="44" r="14" /><circle cx="52" cy="36" r="18" /><circle cx="70" cy="46" r="12" />
        <rect x="22" y="44" width="60" height="16" rx="8" />
      </g>
      <g stroke="#7F9BB8" strokeWidth="3" strokeLinecap="round">
        {[[34, 76], [52, 84], [70, 76]].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <line x1="-6" y1="0" x2="6" y2="0" /><line x1="0" y1="-6" x2="0" y2="6" />
            <line x1="-4" y1="-4" x2="4" y2="4" /><line x1="-4" y1="4" x2="4" y2="-4" />
          </g>
        ))}
      </g>
    </>
  ),
};

export default function HeroIcon({ scene = "day" }) {
  return (
    <>
      <style>{CSS}</style>
      <svg className="hs-icon" viewBox="0 0 100 100" aria-hidden="true">
        {ICONS[scene] || ICONS.day}
      </svg>
    </>
  );
}