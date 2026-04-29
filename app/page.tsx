"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, BookOpen, Headphones, Download, Star, Wand2, Heart, Shield } from "lucide-react";
import Link from "next/link";

/* ── Pastel boya efektli SVG şekiller ── */
function Circle({ color, size = 80, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity }}>
      <circle cx="40" cy="40" r="36"
        fill={color}
        style={{ filter: "url(#crayon)" }}
      />
      <defs>
        <filter id="crayon">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
    </svg>
  );
}

function Triangle({ color, size = 80, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity }}>
      <defs>
        <filter id="crayon2">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <polygon points="40,6 74,70 6,70" fill={color} style={{ filter: "url(#crayon2)" }} />
    </svg>
  );
}

function Square({ color, size = 72, opacity = 0.85 }: { color: string; size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={{ opacity }}>
      <defs>
        <filter id="crayon3">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <rect x="8" y="8" width="56" height="56" rx="6" fill={color} style={{ filter: "url(#crayon3)" }} />
    </svg>
  );
}

/* ── Veri ── */
const features = [
  { icon: Wand2,      color: "#516ED6", title: "Beş Dakikada Hazır",       desc: "Adını, yaşını, ne sevdiğini gir. Gerisi bize kalsın." },
  { icon: Sparkles,   color: "#EB315C", title: "Gerçekten Ona Özel",        desc: "Baş kahraman senin çocuğun. Macera onun dünyasından." },
  { icon: Headphones, color: "#516ED6", title: "Yatmadan Önce Aç, Dinle",  desc: "Sıcak bir sesle okunan masalı aç, gözlerini kapat." },
  { icon: Download,   color: "#F8BF40", title: "Kitap Olarak Bastır",       desc: "PDF indir ya da gerçek kitap olarak kapına gelsin." },
  { icon: Heart,      color: "#EB315C", title: "Korkular Masalla Çözülür", desc: "Karanlık, yeni okul, kardeş kıskançlığı — masal halleder." },
  { icon: Shield,     color: "#516ED6", title: "Her Kelime Denetlendi",    desc: "Çocuk gelişimi filtrelerinden geçirilir. İçin rahat olur." },
];

const steps = [
  { num: "01", shape: <Triangle color="#516ED6" size={56} />, title: "Çocuğunu tanıt", desc: "Adı, yaşı, tutkuları ve öğrenmesini istediğin bir ders." },
  { num: "02", shape: <Circle   color="#F8BF40" size={56} />, title: "AI yazar, sen hayran kalırsın", desc: "Saniyeler içinde başka hiçbir çocuk için yazılmamış bir masal." },
  { num: "03", shape: <Square   color="#EB315C" size={50} />, title: "Dinle, indir, bastır", desc: "Sesli dinle, PDF al ya da gerçek kitap olarak sipariş ver." },
];

const plans = [
  {
    name: "Keşfet", price: "Ücretsiz", period: "", desc: "Önce dene, sonra karar ver",
    color: "#516ED6", shape: <Circle color="#516ED6" size={36} />,
    features: ["3 kişisel masal", "Sesli dinleme", "PDF indirme"], highlighted: false, cta: "Hemen Başla",
  },
  {
    name: "Aile", price: "₺149", period: "/ ay", desc: "Her geceye bir masal",
    color: "#EB315C", shape: <Triangle color="#EB315C" size={36} />,
    features: ["20 masal / ay", "Sesli dinleme", "PDF indirme", "Baskı desteği", "Öncelikli destek"], highlighted: true, cta: "Başla",
  },
  {
    name: "Sınırsız", price: "₺349", period: "/ ay", desc: "Masala doyamayanlar için",
    color: "#F8BF40", shape: <Square color="#F8BF40" size={32} />,
    features: ["Sınırsız masal", "Sesli dinleme", "PDF indirme", "Baskı desteği", "Erken erişim"], highlighted: false, cta: "Başla",
  },
];

const reviews = [
  { name: "Selin A.", role: "İki çocuk annesi", text: "Kızım her gece 'benim masalımı aç' diyor. O sahiplenmeyi başka hiçbir şeyle veremezdin.", stars: 5 },
  { name: "Mehmet K.", role: "Baba, Ankara", text: "Oğlumun karanlık korkusunu bir haftada çözdük. Bu kadar hızlı olacağını bilmiyordum.", stars: 5 },
  { name: "Ayşe T.", role: "İlkokul öğretmeni", text: "Her çocuk için ayrı masal oluşturdum. Okuma motivasyonları bir ayda ikiye katlandı.", stars: 5 },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", background: "#F3F5ED", color: "#231C1E", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(243,245,237,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1.5px solid rgba(35,28,30,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <Circle color="#F8BF40" size={36} />
              <BookOpen size={16} color="#231C1E" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
            </div>
            <span style={{ fontSize: "1.375rem", fontWeight: 800, color: "#231C1E", letterSpacing: "-0.04em" }}>
              storimi
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/login" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#231C1E", padding: "8px 16px", borderRadius: 10, textDecoration: "none", opacity: 0.7 }}>
              Giriş Yap
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: "0.875rem", fontWeight: 800, color: "#F3F5ED",
                  padding: "9px 22px", borderRadius: 10, border: "none",
                  background: "#231C1E", cursor: "pointer", fontFamily: "inherit" }}>
                Ücretsiz Dene
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>

        {/* Dekoratif şekiller */}
        <div style={{ position: "absolute", top: 80,  right: "8%",  zIndex: 0 }}>
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Circle color="#516ED6" size={120} opacity={0.7} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", top: 200, right: "18%", zIndex: 0 }}>
          <motion.div animate={{ rotate: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <Triangle color="#EB315C" size={80} opacity={0.6} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", bottom: 120, left: "6%", zIndex: 0 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
            <Square color="#F8BF40" size={90} opacity={0.65} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", top: 120, left: "12%", zIndex: 0 }}>
          <motion.div animate={{ rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Triangle color="#F8BF40" size={60} opacity={0.5} />
          </motion.div>
        </div>
        <div style={{ position: "absolute", bottom: 80, right: "10%", zIndex: 0 }}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <Circle color="#EB315C" size={70} opacity={0.5} />
          </motion.div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center", position: "relative", zIndex: 1 }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999,
              background: "rgba(81,110,214,0.12)", border: "1.5px solid rgba(81,110,214,0.25)",
              fontSize: "0.78rem", fontWeight: 700, color: "#516ED6", marginBottom: "1.75rem",
              letterSpacing: "0.06em", textTransform: "uppercase" }}>
            AI destekli kişisel masal platformu
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2.75rem,7vw,5rem)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.05, color: "#231C1E", marginBottom: "1.5rem" }}>
            Çocuğun kitabın<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ position: "relative", zIndex: 1 }}>baş kahramanı</span>
              <svg style={{ position: "absolute", bottom: -6, left: -4, right: -4, zIndex: 0 }} height="14" viewBox="0 0 300 14">
                <path d="M2 10 Q75 2 150 8 Q225 14 298 6" stroke="#F8BF40" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            {" "}olsun
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "#231C1E", opacity: 0.65,
              lineHeight: 1.8, maxWidth: 500, margin: "0 auto 2.75rem" }}>
            Adını, sevdiklerini ve öğrenmesini istediğin dersi gir.
            Yapay zeka dakikalar içinde sadece ona ait bir masal yazar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "15px 32px", borderRadius: 14,
                  border: "none", background: "#231C1E", color: "#F3F5ED",
                  fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                <Sparkles size={18} /> İlk Masalı Ücretsiz Oluştur <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/wizard" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 24px", borderRadius: 14,
                  background: "transparent", color: "#231C1E", border: "2px solid #231C1E",
                  fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                <BookOpen size={17} /> Demo'yu Dene
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              color: "#231C1E", opacity: 0.6, fontSize: "0.85rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {["#EB315C","#516ED6","#F8BF40","#231C1E","#516ED6"].map((c,i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c,
                  border: "2.5px solid #F3F5ED", marginLeft: i > 0 ? -8 : 0 }} />
              ))}
            </div>
            <span><strong style={{ color: "#231C1E", opacity: 1 }}>2.400+</strong> aile her gece storimi ile uyutuyor</span>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F8BF40" color="#F8BF40" />)}
            </div>
          </motion.div>

          {/* Hero kart */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginTop: "4.5rem", display: "flex", justifyContent: "center" }}>
            <div style={{ background: "white", borderRadius: 24, padding: "1.75rem", maxWidth: 440, width: "100%",
              textAlign: "left", boxShadow: "0 4px 6px rgba(35,28,30,0.06), 0 20px 48px rgba(35,28,30,0.1)",
              border: "1.5px solid rgba(35,28,30,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <Circle color="#516ED6" size={44} />
                <div style={{ marginLeft: -44, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <BookOpen size={20} color="white" style={{ position: "absolute" }} />
                </div>
                <div style={{ marginLeft: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#231C1E" }}>Ayşe'nin Cesur Macerası</div>
                  <div style={{ fontSize: "0.75rem", color: "#231C1E", opacity: 0.5, marginTop: 1 }}>Ayşe · 5 yaş · Uzay & Robotlar</div>
                </div>
                <div style={{ marginLeft: "auto", background: "#231C1E", color: "#F3F5ED",
                  fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", borderRadius: 999 }}>Hazır</div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#231C1E", opacity: 0.75, lineHeight: 1.8, fontStyle: "italic",
                borderLeft: "3px solid #EB315C", paddingLeft: "1rem" }}>
                "Küçük Ayşe rokete bindi, yıldızlar arasında süzüldü. Hiç korkmadı —
                annesinin öğrettiğini hatırladı: cesaret, kalbin en parlak yıldızıdır."
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
                {["Sesli Dinle", "PDF İndir", "Paylaş"].map(l => (
                  <button key={l} style={{ flex: 1, padding: "8px 4px", borderRadius: 8,
                    border: "1.5px solid rgba(35,28,30,0.12)", background: "transparent",
                    fontSize: "0.72rem", fontWeight: 600, color: "#231C1E", cursor: "pointer" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section style={{ padding: "7rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.p variants={fadeUp} style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#EB315C", marginBottom: "0.75rem" }}>
              Nasıl Çalışır
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E" }}>
              Üç adım, bir ömürlük masal
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
            {steps.map((step) => (
              <motion.div key={step.num} variants={fadeUp}
                style={{ background: "#F3F5ED", borderRadius: 20, padding: "2rem",
                  border: "1.5px solid rgba(35,28,30,0.07)" }}>
                <div style={{ marginBottom: "1.25rem" }}>{step.shape}</div>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "rgba(35,28,30,0.12)",
                  lineHeight: 1, marginBottom: "0.75rem", letterSpacing: "-0.04em" }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#231C1E", marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#231C1E", opacity: 0.6, lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ÖZELLİKLER ── */}
      <section style={{ padding: "7rem 1.5rem", background: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E" }}>
              Düşündüğün her şey var
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#231C1E", opacity: 0.6, marginTop: "0.75rem" }}>
              Masal oluşturmaktan kitap bastırmaya kadar eksiksiz.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              const shapes = [
                <Circle key="c" color={f.color} size={36} />,
                <Triangle key="t" color={f.color} size={36} />,
                <Square key="s" color={f.color} size={32} />,
              ];
              return (
                <motion.div key={f.title} variants={fadeUp}
                  whileHover={{ y: -4 }}
                  style={{ background: "white", borderRadius: 18, padding: "1.625rem",
                    border: "1.5px solid rgba(35,28,30,0.07)",
                    boxShadow: "0 2px 10px rgba(35,28,30,0.05)", transition: "all 0.25s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F3F5ED",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color={f.color} />
                    </div>
                    <div style={{ opacity: 0.4 }}>{shapes[i % 3]}</div>
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#231C1E", marginBottom: "0.4rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#231C1E", opacity: 0.6, lineHeight: 1.75 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FİYATLANDIRMA ── */}
      <section style={{ padding: "7rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E" }}>
              Gizli ücret yok, sürpriz yok
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#231C1E", opacity: 0.6, marginTop: "0.75rem" }}>
              İstediğin zaman tek tıkla iptal.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.25rem", alignItems: "center" }}>
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp}
                style={{ background: plan.highlighted ? "#231C1E" : "#F3F5ED",
                  borderRadius: 24, padding: "2.25rem",
                  border: plan.highlighted ? "none" : "1.5px solid rgba(35,28,30,0.08)",
                  transform: plan.highlighted ? "scale(1.04)" : "none",
                  position: "relative" }}>
                {plan.highlighted && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#EB315C", color: "white", fontSize: "0.7rem", fontWeight: 800,
                    padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
                    EN POPÜLER
                  </div>
                )}
                <div style={{ marginBottom: "1rem" }}>{plan.shape}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                  color: plan.highlighted ? "rgba(243,245,237,0.5)" : "#231C1E", opacity: plan.highlighted ? 1 : 0.5,
                  marginBottom: "0.5rem" }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em",
                    color: plan.highlighted ? "#F3F5ED" : "#231C1E" }}>{plan.price}</span>
                  <span style={{ fontSize: "0.875rem",
                    color: plan.highlighted ? "rgba(243,245,237,0.5)" : "#231C1E", opacity: plan.highlighted ? 1 : 0.5 }}>
                    {plan.period}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", marginBottom: "1.75rem",
                  color: plan.highlighted ? "rgba(243,245,237,0.6)" : "#231C1E", opacity: plan.highlighted ? 1 : 0.55 }}>
                  {plan.desc}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "0.875rem",
                      color: plan.highlighted ? "#F3F5ED" : "#231C1E" }}>
                      <Check size={14} color={plan.highlighted ? "#F8BF40" : plan.color} strokeWidth={2.5} />{f}
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

      {/* ── YORUMLAR ── */}
      <section style={{ padding: "7rem 1.5rem", background: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#231C1E", marginBottom: "3.5rem" }}>
            Aileler ne diyor?
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.25rem" }}>
            {reviews.map((r, i) => {
              const accent = ["#516ED6","#EB315C","#F8BF40"][i % 3];
              return (
                <motion.div key={r.name} variants={fadeUp}
                  style={{ background: "white", borderRadius: 18, padding: "1.625rem",
                    border: "1.5px solid rgba(35,28,30,0.07)",
                    borderTop: `3px solid ${accent}` }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: "1rem" }}>
                    {Array.from({ length: r.stars }).map((_,i) => <Star key={i} size={14} fill="#F8BF40" color="#F8BF40" />)}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#231C1E", opacity: 0.75, lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.25rem" }}>
                    "{r.text}"
                  </p>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#231C1E" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#231C1E", opacity: 0.45, marginTop: 2 }}>{r.role}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "7rem 1.5rem", background: "#231C1E", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: "5%", opacity: 0.15 }}>
          <Circle color="#F8BF40" size={200} />
        </div>
        <div style={{ position: "absolute", bottom: -40, left: "5%", opacity: 0.1 }}>
          <Triangle color="#EB315C" size={180} />
        </div>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: "2rem" }}>
            <Circle color="#516ED6" size={40} />
            <Triangle color="#F8BF40" size={40} />
            <Square color="#EB315C" size={36} />
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, color: "#F3F5ED",
            letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: "1rem" }}>
            Bu gece ilk masalı<br />birlikte okuyun
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(243,245,237,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Kredi kartı istemiyoruz. Kurulum yok. Üç masal bedava.
          </p>
          <Link href="/signup" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px",
                borderRadius: 14, border: "none", background: "#F8BF40", color: "#231C1E",
                fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              <Sparkles size={19} /> Hemen Başla, Bedava <ArrowRight size={19} />
            </motion.button>
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "rgba(243,245,237,0.3)" }}>
            İstediğin zaman, tek tıkla iptal.
          </p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2rem 1.5rem", borderTop: "1.5px solid rgba(35,28,30,0.08)", background: "#F3F5ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Circle color="#F8BF40" size={28} />
            <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#231C1E", marginLeft: -28+4 }}>storimi</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#231C1E", opacity: 0.35 }}>© 2025 storimi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}