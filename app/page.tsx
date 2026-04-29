"use client";

import { useEffect } from "react";

const landingHtml = String.raw`<header class="site-header">
    <nav class="nav" aria-label="Ana navigasyon">
      <a class="logo" href="#" aria-label="Storimini ana sayfa">
        stori<span class="logo-mini">mini</span>
      </a>
      <div class="nav-links" aria-label="Sayfa bağlantıları">
        <a href="#nasil-calisir">Nasıl Çalışır</a>
        <a href="#ozellikler">Özellikler</a>
        <a href="#fiyatlandirma">Fiyatlandırma</a>
        <a href="#yorumlar">Yorumlar</a>
      </div>
      <div class="nav-actions">
        <a class="btn" href="/login">Giriş Yap</a>
        <a class="btn primary" href="/signup">Üye Ol</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero" id="hero">
      <span class="floating-shape shape-star parallax" style="left: 8%; top: 24%;" data-speed=".22"></span>
      <span class="floating-shape shape-pill parallax" style="right: 14%; bottom: 14%;" data-speed=".16"></span>
      <span class="floating-shape shape-dot parallax" style="left: 45%; top: 12%;" data-speed=".1"></span>
      <div class="hero-inner">
        <div class="hero-copy reveal">
          <h1>Çocuğun masalın <span>baş kahramanı</span> olsun!</h1>
          <p class="lead">Storimini, çocuğunuzun ismini, ilgilerini ve öğrenmesini istediğiniz değerleri masalın içine taşıyan yapay zeka destekli kişiselleştirilmiş hikaye platformudur.</p>
          <div class="hero-actions">
            <a class="btn primary" href="/signup">
              İlk Masalı Oluştur
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </a>
            <a class="btn" href="#nasil-calisir">Nasıl Çalışır?</a>
          </div>
        </div>
        <div class="storybook-wrap reveal" aria-hidden="true">
          <div class="storybook parallax" data-speed=".08">
            <h2 class="story-card-title">Mina'nın Ay Bahçesi</h2>
            <div class="story-lines">
              <span class="story-line"></span>
              <span class="story-line"></span>
              <span class="story-line"></span>
              <span class="story-line"></span>
            </div>
            <span class="story-dot"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section color-blue" id="nasil-calisir">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Nasıl çalışır?</p>
          <h2 class="section-title">Üç adımda masalın kahramanı ol!</h2>
        </div>
        <div class="steps">
          <article class="step-card reveal">
            <span class="step-number">01</span>
            <h3>Çocuğunu Tanıt!</h3>
            <p>Adı, yaşı, tutkuları, korkuları ve öğrenmesini istediğin bir öğreti. Sihirbaz çalışmaya başlasın.</p>
          </article>
          <article class="step-card reveal">
            <span class="step-number">02</span>
            <h3>Masal Saniyeler İçinde Hazır!</h3>
            <p>Sadece çocuğuna özel bir masal, ister kendin oku istersen sesini tanımla yapay zeka okusun.</p>
          </article>
          <article class="step-card reveal">
            <span class="step-number">03</span>
            <h3>Kitabın Adresine Gelsin!</h3>
            <p>Seçeceğin pakete göre ayda 1 ya da 3 kitap adresine ücretsiz olarak gelsin, üstelik çocuğuna özel illustrasyonlarla!</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section light" id="ozellikler">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Düşündüğün her şey</p>
          <h2 class="section-title">Masal, gelişim ve aile bağını aynı yerde toplar.</h2>
          <p class="section-copy">Her hikaye çocuğunuzun dünyasına göre şekillenir; metin, görsel, ses ve güvenlik katmanları birlikte çalışır.</p>
        </div>
        <div class="features-grid">
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h11"/><path d="M8 7h8"/><path d="M8 11h6"/><path d="M6 21h13a1 1 0 0 0 1-1V6"/></svg></div>
            <h3>Montessori Temelli</h3>
            <p>Çocuk gelişimini destekleyen, yaşa ve öğrenme evresine uygun hikaye kurguları.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2 15 9l7 .5-5.5 4.6 1.8 7-6.3-3.8-6.3 3.8 1.8-7L2 9.5 9 9z"/></svg></div>
            <h3>Uzman Onaylı</h3>
            <p>Pedagoglar ve deneyimli masal yazarları tarafından denetlenmiş içerikler.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg></div>
            <h3>Kişisel Hikayeler</h3>
            <p>Çocuğun adı, ilgi alanları ve karakter özelliklerine göre dinamik olarak oluşturulan masallar.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="m14 4 6 6-9 9H5v-6z"/><path d="M14 4 5 13"/><path d="m5 19-2 2"/></svg></div>
            <h3>Özel İllüstrasyon</h3>
            <p>Her hikaye için çocuğa özel üretilen, stilize ve özgün görsellerle dolu masal kitapları.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></div>
            <h3>Sesli Anlatım</h3>
            <p>Ebeveynin sesiyle hikayeyi seslendirme ve duygusal bağ kurma.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/></svg></div>
            <h3>Güvenli Veri</h3>
            <p>Tam gizlilik odaklı altyapı, çocuk verilerinin korunması ve dışarıya kapalı sistem.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section color-yellow" id="fiyatlandirma">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Fiyatlandırma</p>
          <h2 class="section-title">Her aileye uygun bir paket.</h2>
          <p class="section-copy">Dijital masaldan kişiye özel basılı kitaba kadar, Storimini paketleri çocuğunuzun hikaye alışkanlığına göre ölçeklenir.</p>
        </div>
        <div class="pricing-grid">
          <article class="price-card reveal">
            <span class="badge">Başlangıç</span>
            <h3>Mini Masal</h3>
            <p>İlk keşifler ve gece rutini için.</p>
            <div class="price">₺149<small>/ay</small></div>
            <ul class="price-list">
              <li>Ayda 10 kişisel dijital masal</li>
              <li>3 yapay zeka illüstrasyonlu hikaye</li>
              <li>Standart sesli anlatım</li>
              <li>Ebeveyn kontrol paneli</li>
            </ul>
            <a class="btn" href="/signup">Paketi Seç</a>
          </article>
          <article class="price-card featured reveal">
            <span class="badge">En Sevilen</span>
            <h3>Ev Kitaplığı</h3>
            <p>Her ay eve gelen özel kitap deneyimi.</p>
            <div class="price">₺399<small>/ay</small></div>
            <ul class="price-list">
              <li>Sınırsız dijital masal üretimi</li>
              <li>Ayda 1 kişisel basılı kitap</li>
              <li>Ebeveyn sesiyle anlatım</li>
              <li>Uzman onaylı tema seçimi</li>
            </ul>
            <a class="btn primary" href="/signup">Paketi Seç</a>
          </article>
          <article class="price-card reveal">
            <span class="badge">Premium</span>
            <h3>Masal Kulübü</h3>
            <p>Kardeşler ve sık okuyan aileler için.</p>
            <div class="price">₺799<small>/ay</small></div>
            <ul class="price-list">
              <li>3 çocuk profili ve sınırsız masal</li>
              <li>Ayda 3 kişisel basılı kitap</li>
              <li>Özel illüstrasyon stil seçimi</li>
              <li>Öncelikli destek ve güvenli arşiv</li>
            </ul>
            <a class="btn blue" href="/signup">Paketi Seç</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section light" id="yorumlar">
      <div class="container">
        <div class="testimonials-top">
          <div class="section-head reveal" style="margin-bottom: 0;">
            <p class="section-kicker">Aileler ne diyor?</p>
            <h2 class="section-title">Uyku öncesi artık aynı masal değil.</h2>
          </div>
          <div class="carousel-actions reveal" aria-label="Yorumları gez">
            <button class="carousel-btn" type="button" data-dir="-1" aria-label="Önceki yorum">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="carousel-btn" type="button" data-dir="1" aria-label="Sonraki yorum">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div class="quote-track reveal" id="quoteTrack">
          <article class="quote-card">
            <p>"Kızım kendi adını duyunca masalın içine gerçekten girdi. Her gece yeni bir macera istemesi bizim için çok tatlı bir rutine dönüştü."</p>
            <div class="quote-author"><span class="avatar">E</span><span>Elif, 5 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Paylaşma temasını seçtik, masal bunu hiç ders verir gibi anlatmadan işledi. Ertesi gün kardeşiyle oyuncaklarını paylaşırken yakaladım."</p>
            <div class="quote-author"><span class="avatar">M</span><span>Mert, 2 çocuk babası</span></div>
          </article>
          <article class="quote-card">
            <p>"Sesimi tanımlayıp yapay zekaya okuttuğumda şehir dışında bile uyku öncesinde yanındaymışım gibi hissettirdi."</p>
            <div class="quote-author"><span class="avatar">D</span><span>Deniz, 4 yaş babası</span></div>
          </article>
          <article class="quote-card">
            <p>"Basılı kitabın içindeki karakterin oğluma benzemesi inanılmaz heyecan yarattı. Kitabı arkadaşlarına gösterip duruyor."</p>
            <div class="quote-author"><span class="avatar">A</span><span>Ayşe, 6 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Korkular kısmına karanlığı yazdık. Hikaye o kadar yumuşak ilerledi ki gece lambasını ilk kez kendi kapatmak istedi."</p>
            <div class="quote-author"><span class="avatar">S</span><span>Selin, 5 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Hızlı üretim kısmı hayat kurtarıyor. O gün okulda yaşadığı şeye göre aynı akşam ona özel bir masal hazırladık."</p>
            <div class="quote-author"><span class="avatar">K</span><span>Kerem, 7 yaş babası</span></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section color-pink free-section">
      <div class="container reveal">
        <p class="section-kicker">İlk 3 Masal ücretsiz.</p>
        <h2 class="section-title">Bu gece ilk masalı birlikte okuyun, hikayenin kahramanı çocuğunuz olsun!</h2>
        <p class="section-copy">Birkaç bilgi girin, Storimini çocuğunuzun dünyasına ait ilk macerayı saniyeler içinde hazırlasın.</p>
        <a class="btn" href="/signup">
          Ücretsiz Başla
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="logo footer-logo" href="#" aria-label="Storimini ana sayfa">
            stori<span class="logo-mini">mini</span>
          </a>
          <p class="footer-copy">Teknolojiyi klasik masal anlatıcılığıyla birleştiren, çocuklara özel modern dijital kütüphane.</p>
          <div class="social" aria-label="Sosyal medya">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><path d="M2 9h4v12H2z"/><path d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5z"/><path d="m10 9 5 3-5 3z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h3>Site Haritası</h3>
          <a href="#nasil-calisir">Nasıl Çalışır</a>
          <a href="#ozellikler">Özellikler</a>
          <a href="#fiyatlandirma">Fiyatlandırma</a>
          <a href="#yorumlar">Aile Yorumları</a>
          <a href="#">Blog</a>
        </div>
        <div class="footer-col">
          <h3>Yasal</h3>
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Şartları</a>
          <a href="#">KVKK</a>
          <a href="#">Çerez Politikası</a>
        </div>
        <div class="footer-col">
          <h3>Güven</h3>
          <a href="#">Güvenlik</a>
          <a href="#">Ebeveyn Rehberi</a>
          <a href="/login">Giriş Yap</a>
          <a href="/signup">Üye Ol</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Storimini. Tüm hakları saklıdır.</span>
        <span>Çocuk verileri gizlilik odaklı altyapıda korunur.</span>
      </div>
    </div>
  </footer>`;

export default function Home() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const parallaxItems = document.querySelectorAll<HTMLElement>(".parallax");
    const handleScroll = () => {
      const y = window.scrollY;
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 0.1);
        item.style.translate = "0 " + y * speed * -0.25 + "px";
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const track = document.getElementById("quoteTrack");
    const controls = Array.from(document.querySelectorAll<HTMLButtonElement>(".carousel-btn"));
    const controlHandlers = controls.map((button) => {
      const handler = () => {
        if (!track) return;
        const dir = Number(button.dataset.dir);
        track.scrollBy({ left: dir * Math.min(420, track.clientWidth * 0.86), behavior: "smooth" });
      };
      button.addEventListener("click", handler);
      return { button, handler };
    });

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const handlePointerDown = (event: PointerEvent) => {
      if (!track) return;
      isDown = true;
      startX = event.clientX;
      scrollStart = track.scrollLeft;
      track.classList.add("dragging");
      track.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDown || !track) return;
      const delta = event.clientX - startX;
      track.scrollLeft = scrollStart - delta;
    };

    const stopDragging = () => {
      isDown = false;
      track?.classList.remove("dragging");
    };

    track?.addEventListener("pointerdown", handlePointerDown);
    track?.addEventListener("pointermove", handlePointerMove);
    track?.addEventListener("pointerup", stopDragging);
    track?.addEventListener("pointercancel", stopDragging);
    track?.addEventListener("pointerleave", stopDragging);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      controlHandlers.forEach(({ button, handler }) => button.removeEventListener("click", handler));
      track?.removeEventListener("pointerdown", handlePointerDown);
      track?.removeEventListener("pointermove", handlePointerMove);
      track?.removeEventListener("pointerup", stopDragging);
      track?.removeEventListener("pointercancel", stopDragging);
      track?.removeEventListener("pointerleave", stopDragging);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: landingHtml }} />;
}
