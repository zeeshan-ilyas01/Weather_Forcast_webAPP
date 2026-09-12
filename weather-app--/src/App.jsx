import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import HubPage from "./pages/HubPage";
import DetailPage from "./pages/DetailPage";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Contact from "./pages/legal/Contact";


function DetailPageWrapper() {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat")) || 31.55;
  const lon = parseFloat(searchParams.get("lon")) || 74.36;
  const name = searchParams.get("name") || "Lahore";

  return <DetailPage cityName={name} latitude={lat} longitude={lon} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/city" element={<DetailPageWrapper />} />
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/contact" element={<Contact />} />




      </Routes>
    </BrowserRouter>
  );
}