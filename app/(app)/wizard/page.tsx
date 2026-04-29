"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles, BookOpen, Check } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface WizardData {
  childName: string;
  age: string;
  interests: string[];
  fears: string[];
  lesson: string;
  extraNote: string;
}

const INTERESTS = [
  "Uzay & Gezegenler", "Dinozorlar", "Prensesler", "Super Kahramanlar",
  "Hayvanlar", "Deniz & Baliklar", "Robotlar", "Sihir & Buyuculer",
  "Arabalar", "Muzik & Dans", "Futbol", "Doga & Orman",
];

const FEARS = [
  "Karanlik", "Yalniz kalmak", "Yeni okul", "Canavar korkusu",
  "Doktor & igne", "Kardas kiskanclik", "Ebeveyn ayriligi", "Hicbiri",
];

const LESSONS = [
  "Paylasmayi ogrenmek", "Cesur olmak", "Donustluk", "Sabir",
  "Farkliliga saygi", "Sorumluluk", "Empati", "Ozguven",
];

const AGES = ["2-3", "4-5", "6-7", "8-9", "10+"];
const STEPS = ["Cocugu Tanit", "Ilgi Alanlari", "Korkular", "Ders", "Ozet"];

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    childName: "", age: "", interests: [],
    fears: [], lesson: "", extraNote: "",
  });

  const progress = (step / (STEPS.length - 1)) * 100;

  function toggleItem(field: "interests" | "fears", item: string) {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item],
    }));
  }

  function canNext() {
    if (step === 0) return data.childName.trim().length > 0 && data.age !== "";
    if (step === 1) return data.interests.length > 0;
    if (step === 3) return data.lesson !== "";
    return true;
  }

async function handleGenerate() {
  setLoading(true);
  toast.loading("Masal yaziliyor...", { id: "generate" });
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const res = await fetch("/api/story/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId: user?.id }),
    });
    if (!res.ok) throw new Error("Hata");
    const result = await res.json();
    toast.success("Masal hazir!", { id: "generate" });
    localStorage.setItem("ezobi_story", JSON.stringify(result));
    router.push(`/story/${result.id}`);
  } catch {
    toast.error("Bir hata olustu.", { id: "generate" });
    setLoading(false);
  }
}

  const chipStyle = (selected: boolean, color = "#0EA5E9", lightBg = "#EFF6FF", lightColor = "#0284C7") => ({
    padding: "9px 18px", borderRadius: 999, fontFamily: "inherit",
    border: "1.5px solid " + (selected ? color : "#E5E5E5"),
    cursor: "pointer", fontWeight: 600, fontSize: "0.875rem",
    background: selected ? lightBg : "white",
    color: selected ? lightColor : "#525252",
    transition: "all 0.2s",
    display: "inline-flex", alignItems: "center", gap: 6,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Poppins', system-ui, sans-serif" }}>

      <nav style={{
        background: "white", borderBottom: "1px solid #F0F0F0",
        padding: "0 1.5rem", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg,#0EA5E9,#F97316)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <BookOpen size={15} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1.1rem" }}>ezobi</span>
        </Link>
        <span style={{ fontSize: "0.85rem", color: "#A3A3A3", fontWeight: 500 }}>
          Adim {step + 1} / {STEPS.length}
        </span>
      </nav>

      <div style={{ height: 4, background: "#F0F0F0" }}>
        <motion.div
          animate={{ width: progress + "%" }}
          transition={{ duration: 0.4 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg,#0EA5E9,#F97316)",
            borderRadius: "0 4px 4px 0"
          }}
        />
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "3rem 1.5rem" }}>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: "0.78rem", fontWeight: 600,
              color: i === step ? "#0EA5E9" : i < step ? "#10B981" : "#D4D4D4",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: i < step ? "#10B981" : i === step ? "#0EA5E9" : "#F0F0F0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i < step
                  ? <Check size={11} color="white" strokeWidth={3} />
                  : <span style={{ fontSize: "0.65rem", color: i === step ? "white" : "#A3A3A3", fontWeight: 700 }}>{i + 1}</span>
                }
              </div>
              {i === step && <span>{s}</span>}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.28 }}
            style={{
              background: "white", borderRadius: 24, padding: "2.5rem",
              border: "1px solid #F0F0F0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
            }}
          >
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
                  Merhaba! Cocugunu taniyalim
                </h2>
                <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Masalin bas kahramani kim?
                </p>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.5rem" }}>
                    Cocugunun adi
                  </label>
                  <input
                    value={data.childName}
                    onChange={e => setData({ ...data, childName: e.target.value })}
                    placeholder="Örn: Ayse, Can, Mia..."
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: "1.5px solid #E5E5E5", borderRadius: 12,
                      fontSize: "1rem", outline: "none", fontFamily: "inherit",
                      boxSizing: "border-box", fontWeight: 500, color: "#0A0A0A"
                    }}
                    onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.75rem" }}>
                    Yas grubu
                  </label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {AGES.map(age => (
                      <button key={age} onClick={() => setData({ ...data, age })}
                        style={chipStyle(data.age === age)}>
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
                  {data.childName} ne seviyor?
                </h2>
                <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Birden fazla secebilirsin.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {INTERESTS.map(item => (
                    <motion.button key={item} whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("interests", item)}
                      style={chipStyle(data.interests.includes(item))}>
                      {data.interests.includes(item) && <Check size={12} strokeWidth={3} />}
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
                  Bir korkusu var mi?
                </h2>
                <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Masal bu korkuyu sevgiyle cozecek. Istege bagli.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {FEARS.map(item => (
                    <motion.button key={item} whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("fears", item)}
                      style={chipStyle(data.fears.includes(item), "#EC4899", "#FDF2F8", "#BE185D")}>
                      {data.fears.includes(item) && <Check size={12} strokeWidth={3} />}
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
                  Bu masal ne ogretsin?
                </h2>
                <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Bir tane sec.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {LESSONS.map(item => (
                    <motion.button key={item} whileTap={{ scale: 0.98 }}
                      onClick={() => setData({ ...data, lesson: item })}
                      style={{
                        padding: "13px 18px", borderRadius: 12, fontFamily: "inherit",
                        border: "1.5px solid " + (data.lesson === item ? "#F97316" : "#E5E5E5"),
                        cursor: "pointer", fontWeight: 600, fontSize: "0.9rem",
                        textAlign: "left", display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        background: data.lesson === item ? "#FFF7ED" : "white",
                        color: data.lesson === item ? "#C2410C" : "#525252",
                      }}>
                      {item}
                      {data.lesson === item && <Check size={16} color="#F97316" strokeWidth={2.5} />}
                    </motion.button>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.5rem" }}>
                    Eklemek istedigin bir sey? <span style={{ color: "#A3A3A3", fontWeight: 400 }}>(istege bagli)</span>
                  </label>
                  <textarea
                    value={data.extraNote}
                    onChange={e => setData({ ...data, extraNote: e.target.value })}
                    placeholder="Orn: Gecen hafta kardesi dogdu ve biraz kiskanc hissediyor..."
                    rows={3}
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: "1.5px solid #E5E5E5", borderRadius: 12,
                      fontSize: "0.9rem", outline: "none", fontFamily: "inherit",
                      resize: "none", boxSizing: "border-box", lineHeight: 1.6, color: "#0A0A0A"
                    }}
                    onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
                  Her sey hazir!
                </h2>
                <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Asagidaki butona bas, masal saniyeler icinde hazir olsun.
                </p>
                <div style={{
                  background: "#FAFAFA", borderRadius: 16, padding: "1.5rem",
                  border: "1px solid #F0F0F0", display: "flex", flexDirection: "column", gap: 12
                }}>
                  {[
                    { label: "Cocugun adi", value: data.childName },
                    { label: "Yas", value: data.age },
                    { label: "Ilgi alanlari", value: data.interests.join(", ") || "—" },
                    { label: "Korkusu", value: data.fears.join(", ") || "Yok" },
                    { label: "Ders", value: data.lesson },
                    ...(data.extraNote ? [{ label: "Not", value: data.extraNote }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#A3A3A3", minWidth: 110 }}>{label}</span>
                      <span style={{ fontSize: "0.875rem", color: "#0A0A0A", fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  onClick={handleGenerate}
                  disabled={loading}
                  style={{
                    width: "100%", marginTop: "1.75rem",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "16px", borderRadius: 14, border: "none",
                    background: loading ? "#7DD3FC" : "#0EA5E9", color: "white",
                    fontSize: "1rem", fontWeight: 800,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(14,165,233,0.4)", fontFamily: "inherit"
                  }}>
                  <Sparkles size={20} />
                  {loading ? "Masal yaziliyor..." : data.childName + " icin Masal Olustur"}
                  {!loading && <ArrowRight size={18} />}
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 4 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => step > 0 && setStep(step - 1)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 20px", borderRadius: 12, fontFamily: "inherit",
                border: "1.5px solid #E5E5E5", background: "white",
                fontSize: "0.9rem", fontWeight: 600,
                cursor: step === 0 ? "not-allowed" : "pointer",
                color: step === 0 ? "#D4D4D4" : "#525252",
                opacity: step === 0 ? 0.5 : 1
              }}>
              <ArrowLeft size={16} /> Geri
            </motion.button>
            <motion.button
              whileHover={{ scale: canNext() ? 1.03 : 1 }}
              whileTap={{ scale: canNext() ? 0.97 : 1 }}
              onClick={() => canNext() && setStep(step + 1)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 24px", borderRadius: 12, fontFamily: "inherit",
                border: "none", fontSize: "0.9rem", fontWeight: 700,
                cursor: canNext() ? "pointer" : "not-allowed",
                background: canNext() ? "#0EA5E9" : "#E5E5E5",
                color: canNext() ? "white" : "#A3A3A3",
                boxShadow: canNext() ? "0 2px 12px rgba(14,165,233,0.35)" : "none",
                transition: "all 0.2s"
              }}>
              {step === 3 ? "Ozeti Gor" : "Devam Et"} <ArrowRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}