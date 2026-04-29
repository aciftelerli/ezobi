import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <aside className="auth-brand-panel">
        <Link href="/" className="brand-wordmark auth-brand-wordmark" aria-label="Storimini ana sayfa">
          stori<span>mini</span>
        </Link>

        <div className="auth-story-card">
          <p className="auth-kicker">Kişisel masal atölyesi</p>
          <h2>Çocuğun masalın baş kahramanı olsun.</h2>
          <p>
            Adı, ilgi alanları ve öğrenmesini istediğin değerlerle sadece ona ait masallar oluştur.
          </p>
          <div className="auth-quote">
            “Mina ay bahçesinde yürürken cesaretin küçük adımlarla büyüdüğünü fark etti...”
          </div>
        </div>

        <p className="auth-footer">© 2026 Storimini. Tüm hakları saklıdır.</p>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-mobile-brand">
          <Link href="/" className="brand-wordmark" aria-label="Storimini ana sayfa">
            stori<span>mini</span>
          </Link>
        </div>
        <div className="auth-form-card">{children}</div>
      </main>
    </div>
  );
}
