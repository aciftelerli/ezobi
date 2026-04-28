"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Headphones, Download, Star, ArrowRight, Check, Wand2, Heart, Shield, Zap } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: Wand2,      color: "#0EA5E9", bg: "#E0F2FE", title: "Beş Dakikada Hazır",        desc: "Adını, yaşını, ne sevdiğini gir. Gerisi bize kalsın." },
  { icon: Sparkles,   color: "#F97316", bg: "#FFEDD5", title: "Gerçekten Ona Özel",         desc: "Baş kahraman senin çocuğun. Macera onun dünyasından." },
  { icon: Headphones, color: "#8B5CF6", bg: "#EDE9FE", title: "Yatmadan Önce Aç, Dinle",   desc: "Sıcak bir sesle okunan masalı aç, gözlerini kapat." },
  { icon: Download,   color: "#10B981", bg: "#D1FAE5", title: "Kitap Olarak Bastır",        desc: "PDF indir ya da gerçek kitap olarak kapına gelsin." },
  { icon: Heart,      color: "#EC4899", bg: "#FCE7F3", title: "Korkular Masalla Çözülür",  desc: "Karanlık, yeni okul, kardeş kıskançlığı — masal halleder." },
  { icon: Shield,     color: "#FBBF24", bg: "#FEF3C7", title: "Her Kelime Denetlendi",     desc: "Çocuk gelişimi filtrelerinden geçirilir. İçin rahat olur." },
];

const steps = [
  { num: "01", title: "Çocuğunu tanıt",           desc: "Adı, yaşı, tutkuları ve öğrenmesini istediğin bir ders." },
  { num: "02", title: "AI yazar, sen hayran kalırsın", desc: "Saniyeler içinde başka hiçbir çocuk için yazılmamış bir masal." },
  { num: "03", title: "Dinle, indir, bastır",      desc: "Sesli dinle, PDF al ya da gerçek kitap olarak sipariş ver." },
];

const plans = [
  { name: "Keşfet",   price: "Ücretsiz", period: "",     desc: "Görmeden inanma, önce dene",    color: "#0EA5E9", highlighted: false, features: ["3 kişisel masal", "Sesli dinleme", "PDF indirme", "Temel özelleştirme"],                            cta: "Hemen Başla" },
  { name: "Aile",     price: "₺149",     period: "/ ay", desc: "Her geceye bir masal",           color: "#F97316", highlighted: true,  features: ["20 masal / ay", "Sesli dinleme", "PDF indirme", "Baskı desteği", "Öncelikli destek"],              cta: "Başlamak İçin Tek Tık" },
  { name: "Sınırsız", price: "₺349",     period: "/ ay", desc: "Masala doyamayanlar için",       color: "#8B5CF6", highlighted: false, features: ["Sınırsız masal", "Sesli dinleme", "PDF indirme", "Baskı desteği", "Erken erişim", "API erişimi"], cta: "Başla" },
];

const reviews = [
  { name: "Selin A.", role: "İki çocuk annesi, İstanbul", text: "Kızım her gece 'benim masalımı aç' diyor. O sahiplenmeyi başka hiçbir şeyle veremezdin.", stars: 5 },
  { name: "Mehmet K.", role: "Baba, Ankara",              text: "Oğlumun karanlık korkusunu bir haftada çözdük. Bu kadar hızlı olacağını bilmiyordum.",  stars: 5 },
  { name: "Ayşe T.",  role: "İlkokul öğretmeni, İzmir",  text: "Her çocuk için ayrı masal oluşturdum. Okuma motivasyonları bir ayda ikiye katlandı.",    stars: 5 },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'Poppins',system-ui,sans-serif", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.9)",
        borderBottom: "1px solid rgba(229,229,229,0.8)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg,#0EA5E9,#F97316)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={17} color="white" />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.03em" }}>ezobi</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/login"  style={{ fontSize: "0.875rem", fontWeight: 500, color: "#525252", padding: "8px 14px", borderRadius: 10, textDecoration: "none" }}>Giriş Yap</Link>
            <Link href="/signup" style={{ fontSize: "0.875rem", fontWeight: 700, color: "white",   padding: "9px 20px",  borderRadius: 10, textDecoration: "none", background: "#0EA5E9", boxShadow: "0 2px 12px rgba(14,165,233,0.4)" }}>Ücretsiz Dene</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80,
        background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(14,165,233,0.08) 0%, transparent 70%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999,
              background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
              fontSize: "0.78rem", fontWeight: 700, color: "#0284C7", marginBottom: "1.75rem", letterSpacing: "0.04em" }}>
            <Zap size={11} fill="#0284C7" /> AI DESTEKLİ KİŞİSEL MASAL PLATFORMU
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(2.5rem,6.5vw,4.5rem)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.06, color: "#0A0A0A", marginBottom: "1.5rem" }}>
            Çocuğun kitabın<br />
            <span style={{ background: "linear-gradient(135deg,#0EA5E9 20%,#F97316 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              baş kahramanı olsun
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "#525252", lineHeight: 1.8,
              maxWidth: 500, margin: "0 auto 2.5rem" }}>
            Adını, sevdiklerini ve öğrenmesini istediğin dersi gir.
            Yapay zeka dakikalar içinde sadece ona ait bir masal yazar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 32px", borderRadius: 14,
                  border: "none", background: "#0EA5E9", color: "white", fontSize: "1rem", fontWeight: 700,
                  cursor: "pointer", boxShadow: "0 4px 24px rgba(14,165,233,0.45)", fontFamily: "inherit" }}>
                <Sparkles size={18} /> İlk Masalı Ücretsiz Oluştur <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/wizard" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 24px", borderRadius: 14,
                  background: "white", color: "#0A0A0A", border: "1.5px solid #E5E5E5",
                  fontSize: "1rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <BookOpen size={17} /> Demo'yu Dene
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              color: "#737373", fontSize: "0.85rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {["#F97316","#0EA5E9","#8B5CF6","#10B981","#FBBF24"].map((c,i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c,
                  border: "2px solid white", marginLeft: i > 0 ? -7 : 0 }} />
              ))}
            </div>
            <span><strong style={{ color: "#0A0A0A" }}>2.400+</strong> aile her gece Ezobi ile uyutuyor</span>
            <div style={{ display: "flex", gap: 1 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />)}
            </div>
          </motion.div>

          {/* Örnek Kart */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginTop: "4.5rem", display: "flex", justifyContent: "center" }}>
            <div style={{ background: "white", borderRadius: 22, padding: "1.75rem", maxWidth: 440, width: "100%",
              textAlign: "left", boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(14,165,233,0.12)",
              border: "1px solid #F0F9FF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11,
                  background: "linear-gradient(135deg,#0EA5E9,#8B5CF6)",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={19} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0A0A0A" }}>Ayşe'nin Cesur Macerası</div>
                  <div style={{ fontSize: "0.75rem", color: "#737373", marginTop: 1 }}>Ayşe · 5 yaş · Uzay & Robotlar</div>
                </div>
                <div style={{ marginLeft: "auto", background: "#D1FAE5", color: "#065F46",
                  fontSize: "0.7rem", fontWeight: 700, padding: "3px 9px", borderRadius: 999 }}>Hazır</div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#404040", lineHeight: 1.8, fontStyle: "italic",
                borderLeft: "3px solid #0EA5E9", paddingLeft: "0.875rem" }}>
                "Küçük Ayşe rokete bindi, yıldızlar arasında süzüldü. Hiç korkmadı —
                annesinin öğrettiğini hatırladı: cesaret, kalbin en parlak yıldızıdır."
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
                {[{ l: "Sesli Dinle", I: Headphones }, { l: "PDF İndir", I: Download }, { l: "Paylaş", I: Heart }].map(({ l, I: Icon }) => (
                  <button key={l} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 4, padding: "8px 4px", borderRadius: 8, border: "1px solid #E5E5E5",
                    background: "white", fontSize: "0.72rem", fontWeight: 600, color: "#525252", cursor: "pointer" }}>
                    <Icon size={12} />{l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section style={{ padding: "7rem 1.5rem", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <motion.p variants={fadeUp} style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase" as const, color: "#0EA5E9", marginBottom: "0.75rem" }}>Nasıl Çalışır</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.025em", color: "#0A0A0A" }}>Üç adım, bir ömürlük masal</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem" }}>
            {steps.map(s => (
              <motion.div key={s.num} variants={fadeUp}
                style={{ background: "white", borderRadius: 20, padding: "2rem",
                  border: "1px solid #F0F0F0", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "2.75rem", fontWeight: 900, color: "#EBEBEB",
                  lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.04em" }}>{s.num}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#737373", lineHeight: 1.75 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ÖZELLİKLER ── */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.025em", color: "#0A0A0A" }}>Düşündüğün her şey var</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#737373", marginTop: "0.75rem" }}>
              Masal oluşturmaktan kitap bastırmaya kadar eksiksiz.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
            {features.map(f => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                  style={{ background: "white", borderRadius: 18, padding: "1.625rem",
                    border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", transition: "all 0.25s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.4rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#737373", lineHeight: 1.75 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FİYATLANDIRMA ── */}
      <section style={{ padding: "7rem 1.5rem", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.025em", color: "#0A0A0A" }}>Gizli ücret yok, sürpriz yok</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#737373", marginTop: "0.75rem" }}>
              İstediğin zaman tek tıkla iptal.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.25rem", alignItems: "center" }}>
            {plans.map(p => (
              <motion.div key={p.name} variants={fadeUp}
                style={{ background: p.highlighted ? p.color : "white", borderRadius: 22, padding: "2rem",
                  border: p.highlighted ? "none" : "1px solid #EBEBEB",
                  boxShadow: p.highlighted ? `0 16px 48px rgba(249,115,22,0.3)` : "0 2px 12px rgba(0,0,0,0.04)",
                  transform: p.highlighted ? "scale(1.03)" : "none", position: "relative" as const }}>
                {p.highlighted && (
                  <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
                    background: "#0A0A0A", color: "white", fontSize: "0.68rem", fontWeight: 800,
                    padding: "4px 12px", borderRadius: 999, whiteSpace: "nowrap" as const, letterSpacing: "0.06em" }}>
                    EN POPÜLER
                  </div>
                )}
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em",
                  color: p.highlighted ? "rgba(255,255,255,0.65)" : "#A3A3A3", marginBottom: "0.5rem" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: "0.2rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em",
                    color: p.highlighted ? "white" : "#0A0A0A" }}>{p.price}</span>
                  <span style={{ fontSize: "0.875rem", color: p.highlighted ? "rgba(255,255,255,0.6)" : "#737373" }}>{p.period}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: p.highlighted ? "rgba(255,255,255,0.6)" : "#737373", marginBottom: "1.5rem" }}>{p.desc}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column" as const, gap: 10 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9,
                      fontSize: "0.85rem", color: p.highlighted ? "white" : "#525252" }}>
                      <Check size={14} color={p.highlighted ? "white" : p.color} strokeWidth={2.5} />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{ textDecoration: "none" }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", padding: "12px", borderRadius: 11, fontFamily: "inherit",
                      border: p.highlighted ? "none" : `2px solid ${p.color}`,
                      background: p.highlighted ? "white" : "transparent",
                      color: p.highlighted ? p.color : p.color,
                      fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}>
                    {p.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── YORUMLAR ── */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800,
              letterSpacing: "-0.025em", color: "#0A0A0A", marginBottom: "3rem" }}>
            Aileler ne diyor?
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.25rem" }}>
            {reviews.map(r => (
              <motion.div key={r.name} variants={fadeUp}
                style={{ background: "white", borderRadius: 18, padding: "1.625rem",
                  border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: "1rem" }}>
                  {Array.from({ length: r.stars }).map((_,i) => <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />)}
                </div>
                <p style={{ fontSize: "0.875rem", color: "#404040", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.25rem" }}>
                  "{r.text}"
                </p>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0A0A0A" }}>{r.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#A3A3A3", marginTop: 2 }}>{r.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "7rem 1.5rem", background: "linear-gradient(135deg,#0C4A6E,#0369A1)" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, color: "white",
            letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: "1rem" }}>
            Bu gece ilk masalı<br />birlikte okuyun
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Kredi kartı istemiyoruz. Kurulum yok. Üç masal bedava.
          </p>
          <Link href="/signup" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px",
                borderRadius: 14, border: "none", background: "#FBBF24", color: "#78350F",
                fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 6px 28px rgba(251,191,36,0.4)" }}>
              <Sparkles size={19} /> Hemen Başla, Bedava <ArrowRight size={19} />
            </motion.button>
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
            İstediğin zaman, tek tıkla iptal.
          </p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "1.75rem 1.5rem", borderTop: "1px solid #F0F0F0", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7,
              background: "linear-gradient(135deg,#0EA5E9,#F97316)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={13} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0A0A0A" }}>ezobi</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#C8C8C8" }}>© 2025 Ezobi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}