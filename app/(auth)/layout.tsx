import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Poppins', system-ui, sans-serif" }}>

      {/* Sol panel */}
      <div style={{ background: "linear-gradient(135deg,#0C4A6E 0%,#0EA5E9 60%,#F97316 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", position: "relative", zIndex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} color="white" />
          </div>
          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>ezobi</span>
        </Link>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Her gece<br />yeni bir macera
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: 340, marginBottom: "2rem" }}>
            Çocuğunun adıyla, sevdikleriyle örülmüş masallar. Sadece ona özel.
          </p>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.2)", maxWidth: 380 }}>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, borderLeft: "2px solid rgba(255,255,255,0.4)", paddingLeft: "1rem", fontStyle: "italic" }}>
              "Küçük Can gezegenler arasında uçarken yalnız hissetmedi,
              çünkü cesaret her zaman yanındaydı..."
            </p>
          </div>
        </div>

        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }}>
          © 2025 Ezobi. Tüm hakları saklıdır.
        </p>
      </div>

      {/* Sağ panel — form */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem 2rem", background: "white", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {children}
        </div>
      </div>
    </div>
  );
}