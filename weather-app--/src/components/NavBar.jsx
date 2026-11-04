import { Link, useLocation } from "react-router-dom";
import { colors, fonts } from "../utils/theme";
import useIsMobile from "../utils/useIsMobile";

const tabs = [
  { label: "Today", to: "/" },
  { label: "Contact", to: "/contact" },
];

export default function NavBar({ children }) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      padding: "10px 20px",
      borderRadius: 30,
      background: `${colors.cream}3C`,
      border: `1px solid ${colors.cream}5F`,
      color: colors.cream,
    }}>
      <Link to="/" style={{
        fontFamily: fonts.display,
        fontSize: 22,
        fontWeight: 700,
        color: colors.cream,
        textDecoration: "none",
      }}>
        Weather Hub
      </Link>

      {!isMobile && (
        <div style={{ display: "flex", gap: 8 }}>
          {tabs.map((tab) => {
            const active = pathname === tab.to;
            return (
              <Link key={tab.to} to={tab.to} style={{
                padding: "8px 18px",
                borderRadius: 18,
                fontFamily: fonts.body,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                textDecoration: "none",
                color: active ? colors.ink : colors.cream,
                background: active ? colors.accent : "transparent",
              }}>
                {tab.label}
              </Link>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {children}
      </div>
    </nav>
  );
}