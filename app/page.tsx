"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Check, ArrowLeft, BookOpen, Star, Instagram, Linkedin, Youtube, Sprout, ShieldCheck, User, Palette, Mic, Lock } from "lucide-react";
import Link from "next/link";

/* ── Google Fonts ── */
const fontLink = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,400&family=Poppins:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  h1,h2,h3,h4 { font-family: 'Fraunces', Georgia, serif !important; }
  body { font-family: 'Poppins', sans-serif; }
`;

/* ── Storimi Logo ── */
function StorimiLogo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={size * 3.2} height={size} viewBox="0 0 160 48" fill="none">
        <text x="0" y="38" fontFamily="'Fraunces', Georgia, serif" fontSize="42" fontWeight="800" fill="#231C1E">stori</text>
        <text x="102" y="38" fontFamily="'Fraunces', Georgia, serif" fontSize="42" fontWeight="800" fill="#EB315C">mini</text>
        {/* Animated star on i */}
        <motion.g
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "112px", originY: "10px" }}
        >
          <path d="M112 4 L113.5 8.5 L118 10 L113.5 11.5 L112 16 L110.5 11.5 L106 10 L110.5 8.5 Z" fill="#231C1E" />
          <path d="M120 2 L120.8 4.2 L123 5 L120.8 5.8 L120 8 L119.2 5.8 L117 5 L119.2 4.2 Z" fill="#231C1E" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ── Pastel Crayon Shapes ── */
function CrayonCircle({ color, size = 80, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  const id = `cc-${color.replace("#","")}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity }}>
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <circle cx="40" cy="40" r="34" fill={color} filter={`url(#${id})`} />
    </svg>
  );
}

function CrayonTriangle({ color, size = 80, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  const id = `ct-${color.replace("#","")}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity }}>
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <polygon points="40,8 72,68 8,68" fill={color} filter={`url(#${id})`} />
    </svg>
  );
}

function CrayonSquare({ color, size = 72, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  const id = `cs-${color.replace("#","")}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={{ opacity }}>
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <rect x="8" y="8" width="56" height="56" rx="8" fill={color} filter={`url(#${id})`} />
    </svg>
  );
}

/* ── Wavy Divider ── */
function WavyDivider({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginBottom: -2 }}>
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={fill} />
    </svg>
  );
}

/* ── Data ── */
const steps = [
  {
    num: "01", color: "#516ED6",
    title: "Çocuğunu Tanıt!",
    desc: "Adı, yaşı, tutkuları, korkuları ve öğrenmesini istediğin bir öğreti. Sihirbaz çalışmaya başlasın.",
  },
  {
    num: "02", color: "#F8BF40",
    title: "Masal Saniyeler İçinde Hazır!",
    desc: "Sadece çocuğuna özel bir masal, ister kendin oku istersen sesini tanımla yapay zeka okusun.",
  },
  {
    num: "03", color: "#EB315C",
    title: "Kitabın Adresine Gelsin!",
    desc: "Seçeceğin pakete göre ayda 1 ya da 3 kitap adresine ücretsiz olarak gelsin, çocuğuna özel illüstrasyonlarla!",
  },
];

const features = [
  { icon: Sprout,      color: "#516ED6", bg: "rgba(81,110,214,0.1)",   title: "Montessori Temelli",    desc: "Çocuk gelişimini destekleyen, yaşa ve öğrenme evresine uygun hikaye kurguları." },
  { icon: ShieldCheck, color: "#EB315C", bg: "rgba(235,49,92,0.1)",    title: "Uzman Onaylı",          desc: "Pedagoglar ve deneyimli masal yazarları tarafından denetlenmiş içerikler." },
  { icon: User,        color: "#516ED6", bg: "rgba(81,110,214,0.1)",   title: "Kişisel Hikayeler",     desc: "Çocuğun adı, ilgi alanları ve karakter özelliklerine göre dinamik olarak oluşturulan masallar." },
  { icon: Palette,     color: "#F8BF40", bg: "rgba(248,191,64,0.15)",  title: "Özel İllüstrasyon",     desc: "Her hikaye için çocuğa özel üretilen, stilize ve özgün görsellerle dolu masal kitapları." },
  { icon: Mic,         color: "#EB315C", bg: "rgba(235,49,92,0.1)",    title: "Sesli Anlatım",         desc: "Ebeveynin sesiyle hikayeyi seslendirme ve duygusal bağ kurma." },
  { icon: Lock,        color: "#516ED6", bg: "rgba(81,110,214,0.1)",   title: "Güvenli Veri",          desc: "Tam gizlilik odaklı altyapı, çocuk verilerinin korunması ve dışarıya kapalı sistem." },
];

const plans = [
  {
    name: "Başlangıç", price: "Ücretsiz", period: "", desc: "İlk masalını oluştur, farkı gör",
    color: "#516ED6", highlighted: false,
    features: ["3 dijital masal", "Sesli dinleme", "PDF indirme", "Temel özelleştirme"],
    cta: "Hemen Başla",
  },
  {
    name: "Aile", price: "₺299", period: "/ ay", desc: "Her ay 1 özel kitap kapında",
    color: "#EB315C", highlighted: true,
    features: ["Aylık 1 baskı kitap", "Sınırsız dijital masal", "Özel illüstrasyon", "Sesli anlatım", "Ücretsiz kargo"],
    cta: "Başla",
  },
  {
    name: "Premium", price: "₺599", period: "/ ay", desc: "Masala doyamayanlar için",
    color: "#F8BF40", highlighted: false,
    features: ["Aylık 3 baskı kitap", "Sınırsız dijital masal", "Özel illüstrasyon", "Sesli anlatım", "Ücretsiz kargo", "Erken erişim"],
    cta: "Başla",
  },
];

const reviews = [
  { name: "Selin A.", role: "İki çocuk annesi, İstanbul", text: "Kızım her gece 'benim masalımı aç' diyor. O sahiplenmeyi başka hiçbir şeyle veremezdin.", stars: 5 },
  { name: "Mehmet K.", role: "Baba, Ankara", text: "Oğlumun karanlık korkusunu bir haftada çözdük. Bu kadar hızlı olacağını bilmiyordum.", stars: 5 },
  { name: "Ayşe T.", role: "İlkokul öğretmeni, İzmir", text: "Her çocuk için ayrı masal oluşturdum. Okuma motivasyonları bir ayda ikiye katlandı.", stars: 5 },
  { name: "Zeynep M.", role: "Anne, Bursa", text: "Çocuğumun ismi, sevdiği dinozorlar ve öğretmen korkusu — hepsi tek masalda. Ağladım.", stars: 5 },
  { name: "Can D.", role: "Baba, İzmir", text: "Kitap olarak bastırıp doğum günü hediyesi yaptım. Akrabalar şoke oldu.", stars: 5 },
  { name: "Büşra Y.", role: "Çocuk psikologu", text: "Montessori temelli yaklaşımı ve içerik kalitesi gerçekten etkileyici. Tavsiye ediyorum.", stars: 5 },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Testimonial Carousel ── */
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const total = reviews.length;

  function prev() { setCurrent(c => (c - 1 + total) % total); }
  function next() { setCurrent(c => (c + 1) % total); }

  function handleMouseDown(e: React.MouseEvent) {
    dragStart.current = e.clientX;
    setIsDragging(true);
  }
  function handleMouseUp(e: React.MouseEvent) {
    if (!isDragging) return;
    const diff = dragStart.current - e.clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setIsDragging(false);
  }

  const visible = [
    reviews[current % total],
    reviews[(current + 1) % total],
    reviews[(current + 2) % total],
  ];

  return (
    <div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem", cursor: "grab", userSelect: "none" }}
      >
        {visible.map((r, i) => (
          <motion.div key={`${current}-${i}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            style={{ background: "white", borderRadius: 18, padding: "1.75rem",
              border: "1.5px solid rgba(35,28,30,0.07)",
              borderTop: `3px solid ${["#516ED6","#EB315C","#F8BF40"][i]}` }}>
            <div style={{ display: "flex", gap: 2, marginBottom: "1rem" }}>
              {Array.from({ length: r.stars }).map((_,j) => <Star key={j} size={14} fill="#F8BF40" color="#F8BF40" />)}
            </div>
            <p style={{ fontSize: "0.9rem", color: "#231C1E", opacity: 0.75, lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.25rem" }}>
              "{r.text}"
            </p>
            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#231C1E" }}>{r.name}</div>
            <div style={{ fontSize: "0.75rem", color: "#231C1E", opacity: 0.45, marginTop: 2 }}>{r.role}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: "2rem" }}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
          onClick={prev}
          style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #231C1E",
            background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowLeft size={18} color="#231C1E" />
        </motion.button>
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: total }).map((_,i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999,
                background: i === current ? "#231C1E" : "rgba(35,28,30,0.2)",
                border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
          onClick={next}
          style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #231C1E",
            background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowRight size={18} color="#231C1E" />
        </motion.button>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", background: "#F3F5ED", color: "#231C1E", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: fontLink }} />

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(243,245,237,0.93)", backdropFilter: "blur(16px)",
        borderBottom: "1.5px solid rgba(35,28,30,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <StorimiLogo size={28} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/login" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#231C1E",
              padding: "8px 18px", borderRadius: 10, textDecoration: "none",
              border: "1.5px solid rgba(35,28,30,0.18)" }}>
              Giriş Yap
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: "0.875rem", fontWeight: 800, color: "#F3F5ED",
                  padding: "9px 22px", borderRadius: 10, border: "none",
                  background: "#231C1E", cursor: "pointer", fontFamily: "inherit" }}>
                Üye Ol
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center",
        paddingTop: 80, position: "relative", overflow: "hidden",
        background: "#F3F5ED" }}>

        {/* Dekoratif — az ama etkili */}
        <div style={{ position: "absolute", top: 100, right: "5%", zIndex: 0 }}>
          <motion.div animate={{ y: [0,-16,0], rotate: [0,8,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <CrayonCircle color="#516ED6" size={140} opacity={0.55} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", bottom: 80, left: "4%", zIndex: 0 }}>
          <motion.div animate={{ y: [0,12,0], rotate: [0,-6,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <CrayonTriangle color="#EB315C" size={100} opacity={0.45} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", top: "35%", left: "2%", zIndex: 0 }}>
          <motion.div animate={{ rotate: [0,360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <CrayonSquare color="#F8BF40" size={60} opacity={0.35} />
          </motion.div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem",
          textAlign: "center", position: "relative", zIndex: 1 }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999,
              background: "rgba(81,110,214,0.1)", border: "1.5px solid rgba(81,110,214,0.22)",
              fontSize: "0.78rem", fontWeight: 700, color: "#516ED6", marginBottom: "1.75rem",
              letterSpacing: "0.06em", textTransform: "uppercase" }}>
            AI destekli kişisel masal platformu
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: "clamp(2.75rem,7.5vw,5.5rem)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 1.0, color: "#231C1E", marginBottom: "1.5rem",
              fontFamily: "'Fraunces', Georgia, serif" }}>
            Çocuğun masalın<br />
            <span style={{ position: "relative", display: "inline-block", color: "#EB315C" }}>
              baş kahramanı
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }} height="12" viewBox="0 0 400 12">
                <motion.path
                  d="M4 8 Q100 2 200 8 Q300 14 396 6"
                  stroke="#F8BF40" strokeWidth="5" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
            </span>
            {" "}olsun!
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "#231C1E", opacity: 0.6,
              lineHeight: 1.8, maxWidth: 520, margin: "0 auto 2.75rem",
              fontFamily: "'Poppins', sans-serif" }}>
            Adını, sevdiklerini ve öğrenmesini istediğin dersi gir.
            Yapay zeka dakikalar içinde sadece ona ait bir masal yazar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "16px 34px", borderRadius: 16,
                  border: "none", background: "#231C1E", color: "#F3F5ED",
                  fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                  boxShadow: "4px 4px 0px #516ED6" }}>
                İlk 3 Masal Ücretsiz <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/wizard" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 26px", borderRadius: 16,
                  background: "transparent", color: "#231C1E", border: "2px solid #231C1E",
                  fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                <BookOpen size={17} /> Demo
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
              flexWrap: "wrap", fontSize: "0.85rem" }}>
            <div style={{ display: "flex" }}>
              {["#EB315C","#516ED6","#F8BF40","#231C1E","#516ED6"].map((c,i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: c,
                  border: "2.5px solid #F3F5ED", marginLeft: i > 0 ? -8 : 0 }} />
              ))}
            </div>
            <span style={{ color: "#231C1E", opacity: 0.65 }}>
              <strong style={{ opacity: 1 }}>2.400+</strong> aile her gece storimi ile uyutuyor
            </span>
            <div style={{ display: "flex", gap: 1 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F8BF40" color="#F8BF40" />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR (Mavi section) ── */}
      <WavyDivider fill="#516ED6" />
      <section style={{ padding: "6rem 1.5rem", background: "#516ED6", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, opacity: 0.12 }}>
          <CrayonCircle color="white" size={280} />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.p variants={fadeUp} style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(243,245,237,0.65)", marginBottom: "0.75rem",
              fontFamily: "'Poppins', sans-serif" }}>
              Nasıl Çalışır
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#F3F5ED",
              fontFamily: "'Fraunces', Georgia, serif" }}>
              Üç adımda masalın kahramanı ol!
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "6px 6px 0px rgba(35,28,30,0.2)" }}
                style={{ background: "rgba(243,245,237,0.12)", backdropFilter: "blur(10px)",
                  borderRadius: 20, padding: "2rem",
                  border: "1.5px solid rgba(243,245,237,0.2)",
                  transition: "all 0.25s" }}>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(243,245,237,0.25)",
                  lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.04em",
                  fontFamily: "'Fraunces', serif" }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F3F5ED", marginBottom: "0.75rem",
                  fontFamily: "'Fraunces', serif" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(243,245,237,0.72)", lineHeight: 1.75,
                  fontFamily: "'Poppins', sans-serif" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <WavyDivider fill="#F3F5ED" />

      {/* ── 6 ÖZELLİK (Açık section) ── */}
      <section style={{ padding: "6rem 1.5rem", background: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E",
              fontFamily: "'Fraunces', Georgia, serif" }}>
              Her şey çocuğun için tasarlandı
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#231C1E", opacity: 0.55,
              marginTop: "0.75rem", fontFamily: "'Poppins', sans-serif" }}>
              Bilimsel temeller, uzman denetimi ve sınırsız kişiselleştirme.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              const accent = ["#516ED6","#EB315C","#516ED6","#F8BF40","#EB315C","#516ED6"][i];
              return (
                <motion.div key={f.title} variants={fadeUp}
                  whileHover={{ y: -5, boxShadow: `4px 4px 0px ${accent}` }}
                  style={{ background: "white", borderRadius: 18, padding: "1.75rem",
                    border: `1.5px solid rgba(35,28,30,0.08)`,
                    transition: "all 0.25s" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#231C1E", marginBottom: "0.5rem",
                    fontFamily: "'Fraunces', serif" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#231C1E", opacity: 0.6, lineHeight: 1.75,
                    fontFamily: "'Poppins', sans-serif" }}>
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FİYATLANDIRMA (Sarı section) ── */}
      <WavyDivider fill="#F8BF40" />
      <section style={{ padding: "6rem 1.5rem", background: "#F8BF40", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -80, left: -80, opacity: 0.1 }}>
          <CrayonSquare color="#231C1E" size={300} />
        </div>
        <div style={{ maxWidth: 1050, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E",
              fontFamily: "'Fraunces', Georgia, serif" }}>
              Gizli ücret yok, sürpriz yok
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#231C1E", opacity: 0.65,
              marginTop: "0.75rem", fontFamily: "'Poppins', sans-serif" }}>
              İstediğin zaman tek tıkla iptal.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "1.25rem", alignItems: "center" }}>
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp}
                whileHover={{ y: -4 }}
                style={{ background: plan.highlighted ? "#231C1E" : "white",
                  borderRadius: 24, padding: "2.25rem",
                  border: plan.highlighted ? "none" : "2px solid rgba(35,28,30,0.12)",
                  transform: plan.highlighted ? "scale(1.04)" : "none",
                  position: "relative",
                  boxShadow: plan.highlighted ? "6px 6px 0px #EB315C" : "4px 4px 0px rgba(35,28,30,0.1)" }}>
                {plan.highlighted && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#EB315C", color: "white", fontSize: "0.7rem", fontWeight: 800,
                    padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap",
                    fontFamily: "'Poppins', sans-serif" }}>
                    EN POPÜLER
                  </div>
                )}
                <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase",
                  letterSpacing: "0.08em", marginBottom: "0.5rem",
                  color: plan.highlighted ? "rgba(243,245,237,0.5)" : "#231C1E",
                  fontFamily: "'Poppins', sans-serif" }}>
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em",
                    color: plan.highlighted ? "#F3F5ED" : "#231C1E",
                    fontFamily: "'Fraunces', serif" }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: "0.875rem", opacity: 0.5,
                    color: plan.highlighted ? "#F3F5ED" : "#231C1E",
                    fontFamily: "'Poppins', sans-serif" }}>
                    {plan.period}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", marginBottom: "1.75rem", opacity: 0.55,
                  color: plan.highlighted ? "#F3F5ED" : "#231C1E",
                  fontFamily: "'Poppins', sans-serif" }}>
                  {plan.desc}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem",
                  display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "0.875rem",
                      color: plan.highlighted ? "#F3F5ED" : "#231C1E",
                      fontFamily: "'Poppins', sans-serif" }}>
                      <Check size={14} color={plan.highlighted ? "#F8BF40" : plan.color} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{ textDecoration: "none" }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", padding: "13px", borderRadius: 12, fontFamily: "inherit",
                      border: plan.highlighted ? "none" : `2px solid ${plan.color}`,
                      background: plan.highlighted ? "#F8BF40" : "transparent",
                      color: plan.highlighted ? "#231C1E" : plan.color,
                      fontSize: "0.9rem", fontWeight: 800, cursor: "pointer" }}>
                    {plan.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <WavyDivider fill="#F3F5ED" />

      {/* ── YORUMLAR ── */}
      <section style={{ padding: "6rem 1.5rem", background: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E", marginBottom: "3.5rem",
              fontFamily: "'Fraunces', Georgia, serif" }}>
            Aileler ne diyor?
          </motion.h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FINAL CTA (Kırmızı section) ── */}
      <WavyDivider fill="#EB315C" />
      <section style={{ padding: "7rem 1.5rem", background: "#EB315C", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: "8%", opacity: 0.12 }}>
          <motion.div animate={{ rotate: [0,360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <CrayonSquare color="white" size={240} />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(243,245,237,0.15)",
            padding: "6px 18px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 700,
            color: "#F3F5ED", marginBottom: "1.5rem", letterSpacing: "0.04em",
            fontFamily: "'Poppins', sans-serif" }}>
            İlk 3 Masal Ücretsiz
          </div>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.25rem)", fontWeight: 900, color: "#F3F5ED",
            letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "1.25rem",
            fontFamily: "'Fraunces', Georgia, serif" }}>
            Bu gece ilk masalı<br />birlikte okuyun
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(243,245,237,0.72)", lineHeight: 1.8, marginBottom: "2.5rem",
            fontFamily: "'Poppins', sans-serif" }}>
            Hikayenin kahramanı çocuğunuz olsun!
          </p>
          <Link href="/signup" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05, y: -3, boxShadow: "6px 6px 0px rgba(35,28,30,0.3)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 44px",
                borderRadius: 16, border: "none", background: "#F3F5ED", color: "#231C1E",
                fontSize: "1.0625rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "4px 4px 0px rgba(35,28,30,0.2)" }}>
              Hemen Başla <ArrowRight size={20} />
            </motion.button>
          </Link>
          <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(243,245,237,0.45)",
            fontFamily: "'Poppins', sans-serif" }}>
            İstediğin zaman, tek tıkla iptal.
          </p>
        </motion.div>
      </section>
      <WavyDivider fill="#231C1E" />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#231C1E", padding: "4rem 1.5rem 2rem", color: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <StorimiLogo size={24} />
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(243,245,237,0.55)", lineHeight: 1.75,
                maxWidth: 280, fontFamily: "'Poppins', sans-serif" }}>
                Çocuğunun baş kahraman olduğu masallar. Yapay zeka destekli, uzman onaylı, sevgiyle tasarlandı.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: "1.5rem" }}>
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin,  href: "#", label: "LinkedIn" },
                  { icon: Youtube,   href: "#", label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} whileHover={{ scale: 1.15, y: -2 }}
                    style={{ width: 40, height: 40, borderRadius: 10,
                      background: "rgba(243,245,237,0.08)", border: "1px solid rgba(243,245,237,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      textDecoration: "none", color: "rgba(243,245,237,0.7)" }}>
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Site Haritası */}
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(243,245,237,0.4)", marginBottom: "1.25rem",
                fontFamily: "'Poppins', sans-serif" }}>
                Site Haritası
              </h4>
              {["Ana Sayfa", "Nasıl Çalışır", "Fiyatlandırma", "Blog", "İletişim"].map(l => (
                <Link key={l} href="#" style={{ display: "block", fontSize: "0.875rem",
                  color: "rgba(243,245,237,0.6)", textDecoration: "none", marginBottom: "0.625rem",
                  fontFamily: "'Poppins', sans-serif" }}>
                  {l}
                </Link>
              ))}
            </div>

            {/* Hukuki */}
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(243,245,237,0.4)", marginBottom: "1.25rem",
                fontFamily: "'Poppins', sans-serif" }}>
                Hukuki
              </h4>
              {["Gizlilik Politikası", "Kullanım Şartları", "KVKK", "Çerez Politikası", "Güvenlik", "Ebeveyn Rehberi"].map(l => (
                <Link key={l} href="#" style={{ display: "block", fontSize: "0.875rem",
                  color: "rgba(243,245,237,0.6)", textDecoration: "none", marginBottom: "0.625rem",
                  fontFamily: "'Poppins', sans-serif" }}>
                  {l}
                </Link>
              ))}
            </div>

            {/* İletişim */}
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(243,245,237,0.4)", marginBottom: "1.25rem",
                fontFamily: "'Poppins', sans-serif" }}>
                Destek
              </h4>
              {["Yardım Merkezi", "Bize Ulaş", "SSS"].map(l => (
                <Link key={l} href="#" style={{ display: "block", fontSize: "0.875rem",
                  color: "rgba(243,245,237,0.6)", textDecoration: "none", marginBottom: "0.625rem",
                  fontFamily: "'Poppins', sans-serif" }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(243,245,237,0.08)", paddingTop: "2rem",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: "0.8rem", color: "rgba(243,245,237,0.3)", fontFamily: "'Poppins', sans-serif" }}>
              © 2025 storimi. Tüm hakları saklıdır.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Gizlilik", "Şartlar", "Çerezler"].map(l => (
                <Link key={l} href="#" style={{ fontSize: "0.8rem", color: "rgba(243,245,237,0.3)",
                  textDecoration: "none", fontFamily: "'Poppins', sans-serif" }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}