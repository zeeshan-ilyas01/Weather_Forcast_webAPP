import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import HubPage from "./pages/HubPage";
import DetailPage from "./pages/DetailPage";

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
      </Routes>
    </BrowserRouter>
  );
}