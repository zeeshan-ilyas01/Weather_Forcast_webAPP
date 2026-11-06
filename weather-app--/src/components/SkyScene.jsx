import { useEffect, useMemo, useRef } from "react";
import { SCENES } from "../utils/scenes";

const rnd = (a, b) => a + Math.random() * (b - a);

const CLOUD_COUNTS = {
  day: [3, 3, 1], hot: [2, 1, 0], spring: [3, 2, 1], rain: [2, 4, 3],
  storm: [3, 5, 4], snow: [3, 4, 3], night: [2, 2, 1],
};
// three depth layers: far (small, faint, slow) to near (big, solid, faster)
const LAYERS = [
  { w: 170, op: 0.5, top: [2, 16], dur: [150, 190] },
  { w: 270, op: 0.82, top: [8, 30], dur: [100, 130] },
  { w: 430, op: 0.95, top: [14, 40], dur: [70, 90] },
];
// [top colour, bottom colour, top opacity, bottom opacity]
const CLOUD_FILL = {
  day: ["#fff", "#D5E3F0", 1, 1],
  hot: ["#fff", "#FFE9CC", 1, 1],
  spring: ["#fff", "#E4EFFA", 1, 1],
  snow: ["#FAFCFF", "#C9D6E3", 1, 1],
  rain: ["#97A4B5", "#5D6879", 1, 1],
  storm: ["#505A70", "#1C222E", 1, 1],
  night: ["#8FA0C8", "#5B6A92", 0.42, 0.28],
};
const GLOW = {
  day: { size: 280, right: "7%", top: "3%", dur: 6, bg: "radial-gradient(circle,rgba(255,226,170,.95),rgba(255,226,170,0) 68%)" },
  hot: { size: 520, right: "2%", top: "-6%", dur: 4, bg: "radial-gradient(circle,rgba(255,236,170,1),rgba(255,170,70,.55) 40%,rgba(255,170,70,0) 70%)" },
  spring: { size: 240, right: "7%", top: "3%", dur: 6, bg: "radial-gradient(circle,rgba(255,240,190,.9),rgba(255,240,190,0) 68%)" },
  night: { size: 280, right: "7%", top: "3%", dur: 6, bg: "radial-gradient(circle,rgba(244,235,200,.5),rgba(244,235,200,0) 70%)" },
};
const PETAL_COLORS = ["#F6B8C8", "#F9CFD9", "#FFFFFF", "#F3A6BB"];

function makeCloud(layer) {
  const n = 4 + Math.floor(Math.random() * 3);
  const puffs = [];
  for (let i = 0; i < n; i++) {
    const cx = 55 + i * (190 / (n - 1)) + rnd(-7, 7);
    const mid = 1 - Math.abs(i / (n - 1) - 0.5) * 1.2;
    const r = 22 + mid * 20 + rnd(0, 8);
    puffs.push({ cx, cy: 80 - r * 0.55, r });
  }
  return {
    puffs,
    w: layer.w * rnd(0.85, 1.2),
    op: layer.op,
    top: rnd(...layer.top),
    dur: rnd(...layer.dur),
    delay: -rnd(0, layer.dur[1]),
  };
}

function makeParticles(scene) {
  const make = (n, fn) => Array.from({ length: n }, fn);
  return {
    stars: scene === "night" ? make(70, () => ({ left: rnd(0, 100), top: rnd(0, 70), delay: rnd(0, 3) })) : [],
    drops:
      scene === "rain"
        ? make(80, () => ({ left: rnd(0, 100), dur: rnd(0.7, 1.3), delay: -rnd(0, 2), slant: false }))
        : scene === "storm"
        ? make(150, () => ({ left: rnd(0, 130), dur: rnd(0.5, 0.9), delay: -rnd(0, 2), slant: true }))
        : [],
    flakes: scene === "snow"
      ? make(110, () => ({ left: rnd(0, 100), size: rnd(3, 8), dx: rnd(-70, 70), dur: rnd(9, 18), delay: -rnd(0, 18) }))
      : [],
    petals: scene === "spring"
      ? make(40, () => ({
          left: rnd(-5, 85), color: PETAL_COLORS[Math.floor(rnd(0, 4))],
          dx: rnd(120, 380), rot: rnd(360, 900), dur: rnd(10, 20), delay: -rnd(0, 20),
        }))
      : [],
  };
}

const CSS = `
.hs-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;animation:hs-fade 1.3s ease}
@keyframes hs-fade{from{opacity:0}to{opacity:1}}
.hs-glow{position:absolute;border-radius:50%;animation:hs-pulse ease-in-out infinite}
@keyframes hs-pulse{50%{transform:scale(1.1);opacity:.86}}
.hs-shimmer{position:absolute;left:0;right:0;bottom:0;height:50%;background:repeating-linear-gradient(0deg,rgba(255,255,255,.09) 0 5px,transparent 5px 13px);animation:hs-haze 3.2s ease-in-out infinite;-webkit-mask-image:linear-gradient(transparent,#000 70%);mask-image:linear-gradient(transparent,#000 70%)}
@keyframes hs-haze{0%,100%{transform:skewX(0) scaleY(1)}50%{transform:skewX(1.6deg) scaleY(1.05)}}
.hs-hills{position:absolute;left:-10%;right:-10%;bottom:-18vh;height:46vh;background:radial-gradient(60% 100% at 25% 100%,rgba(150,205,120,.55),transparent 70%),radial-gradient(55% 90% at 78% 100%,rgba(120,190,110,.5),transparent 70%)}
.hs-vignette{position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 0%,rgba(8,10,16,.55),transparent 70%)}
.hs-c{position:absolute;left:0;height:auto;animation:hs-drift linear infinite;will-change:transform}
@keyframes hs-drift{from{transform:translateX(-480px)}to{transform:translateX(calc(100vw + 480px))}}
.hs-star{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;animation:hs-tw 3s ease-in-out infinite}
@keyframes hs-tw{50%{opacity:.15}}
.hs-drop{position:absolute;top:-40px;width:2px;height:24px;background:linear-gradient(transparent,rgba(210,230,250,.75));animation:hs-fall linear infinite}
.hs-slant{height:34px;animation-name:hs-fallslant}
@keyframes hs-fall{to{transform:translateY(112vh)}}
@keyframes hs-fallslant{from{transform:translate(0,0) rotate(14deg)}to{transform:translate(-26vh,112vh) rotate(14deg)}}
.hs-flake{position:absolute;top:-12px;border-radius:50%;background:#fff;opacity:.92;filter:blur(.4px);animation:hs-snowfall linear infinite}
@keyframes hs-snowfall{from{transform:translate3d(0,0,0)}50%{transform:translate3d(var(--dx),55vh,0)}to{transform:translate3d(calc(var(--dx)*-.4),112vh,0)}}
.hs-petal{position:absolute;top:-20px;width:11px;height:8px;border-radius:80% 0 80% 0;background:var(--pc);opacity:.9;animation:hs-petal linear infinite}
@keyframes hs-petal{from{transform:translate3d(-30px,0,0) rotate(0)}to{transform:translate3d(var(--dx),112vh,0) rotate(var(--r))}}
.hs-flash{position:absolute;inset:0;background:radial-gradient(80% 60% at var(--fx,50%) 0%,rgba(225,235,255,.85),rgba(190,205,255,.25) 60%,transparent);opacity:0;transition:opacity .09s}
.hs-bolt{position:absolute;top:0;height:60vh;width:200px;opacity:0;transition:opacity .08s;filter:drop-shadow(0 0 8px #bcd0ff)}
.hs-bolt polyline{fill:none;stroke:#fff;stroke-width:3;stroke-linejoin:round}
@media (prefers-reduced-motion: reduce){
  .hs-sky,.hs-glow,.hs-shimmer,.hs-star{animation:none!important}
  .hs-c{animation-play-state:paused!important}
  .hs-drop,.hs-flake,.hs-petal{display:none}
}
`;

export default function SkyScene({ scene = "day" }) {
  const flashRef = useRef(null);
  const boltRef = useRef(null);
  const lineRef = useRef(null);

  const clouds = useMemo(() => {
    const counts = CLOUD_COUNTS[scene] || CLOUD_COUNTS.day;
    return counts.flatMap((count, li) => Array.from({ length: count }, () => makeCloud(LAYERS[li])));
  }, [scene]);
  const p = useMemo(() => makeParticles(scene), [scene]);

  // Soft, infrequent lightning (4.5 to 9 seconds apart, never rapid strobing)
  useEffect(() => {
    if (scene !== "storm") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    const timeouts = [];

    function strike() {
      const f = flashRef.current, b = boltRef.current, l = lineRef.current;
      if (!f || !b || !l) return;
      const x = rnd(10, 80);
      f.style.setProperty("--fx", x + "%");
      b.style.left = x + "%";
      let y = 0, px = 100;
      const pts = [];
      while (y <= 400) {
        pts.push(`${px.toFixed(0)},${y}`);
        px += rnd(-28, 28);
        y += rnd(35, 60);
      }
      l.setAttribute("points", pts.join(" "));
      f.style.opacity = 0.8;
      b.style.opacity = 1;
      timeouts.push(setTimeout(() => { f.style.opacity = 0; b.style.opacity = 0; }, 110));
      timeouts.push(setTimeout(() => { f.style.opacity = 0.45; }, 230));
      timeouts.push(setTimeout(() => { f.style.opacity = 0; }, 330));
    }
    function next() {
      timer = setTimeout(() => { strike(); next(); }, rnd(4500, 9000));
    }
    next();
    return () => { clearTimeout(timer); timeouts.forEach(clearTimeout); };
  }, [scene]);

  const glow = GLOW[scene];

  return (
    <div className="hs-sky" key={scene} style={{ background: SCENES[scene]?.bg }} aria-hidden="true">
      <style>{CSS}</style>

      {/* shared cloud gradients */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="hs-soft"><feGaussianBlur stdDeviation="1.3" /></filter>
          {Object.entries(CLOUD_FILL).map(([k, [a, b, oa, ob]]) => (
            <linearGradient key={k} id={`hs-cg-${k}`} gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="102">
              <stop offset="0" stopColor={a} stopOpacity={oa} />
              <stop offset="1" stopColor={b} stopOpacity={ob} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {glow && (
        <div className="hs-glow" style={{ width: glow.size, height: glow.size, right: glow.right, top: glow.top, background: glow.bg, animationDuration: `${glow.dur}s` }} />
      )}
      {scene === "hot" && <div className="hs-shimmer" />}
      {scene === "spring" && <div className="hs-hills" />}
      {scene === "storm" && <div className="hs-vignette" />}

      {clouds.map((c, i) => (
        <svg key={i} className="hs-c" viewBox="0 0 300 120" width={c.w}
          style={{ top: `${c.top}%`, opacity: c.op, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <g fill={`url(#hs-cg-${scene})`} filter="url(#hs-soft)">
            {c.puffs.map((pf, j) => <circle key={j} cx={pf.cx} cy={pf.cy} r={pf.r} />)}
            <rect x="22" y="68" width="256" height="34" rx="17" />
          </g>
        </svg>
      ))}

      {p.stars.map((s, i) => (
        <div key={i} className="hs-star" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
      ))}
      {p.drops.map((d, i) => (
        <div key={i} className={`hs-drop${d.slant ? " hs-slant" : ""}`}
          style={{ left: `${d.left}%`, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
      ))}
      {p.flakes.map((f, i) => (
        <div key={i} className="hs-flake"
          style={{ left: `${f.left}%`, width: f.size, height: f.size, "--dx": `${f.dx}px`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />
      ))}
      {p.petals.map((pt, i) => (
        <div key={i} className="hs-petal"
          style={{ left: `${pt.left}%`, "--pc": pt.color, "--dx": `${pt.dx}px`, "--r": `${pt.rot}deg`, animationDuration: `${pt.dur}s`, animationDelay: `${pt.delay}s` }} />
      ))}

      {scene === "storm" && (
        <>
          <div className="hs-flash" ref={flashRef} />
          <svg className="hs-bolt" ref={boltRef} viewBox="0 0 200 400" preserveAspectRatio="none">
            <polyline ref={lineRef} points="" />
          </svg>
        </>
      )}
    </div>
  );
}