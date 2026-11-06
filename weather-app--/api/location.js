export default function handler(req, res) {
  const h = req.headers;
  const num = (v) => (v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v));

  res.setHeader("Cache-Control", "private, no-store");
  res.status(200).json({
    city: h["x-vercel-ip-city"] ? decodeURIComponent(h["x-vercel-ip-city"]) : null,
    country: h["x-vercel-ip-country"] || null,
    latitude: num(h["x-vercel-ip-latitude"]),
    longitude: num(h["x-vercel-ip-longitude"]),
    timezone: h["x-vercel-ip-timezone"] || null,
  });
}