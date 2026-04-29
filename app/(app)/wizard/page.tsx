"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
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
  "Uzay ve gezegenler", "Dinozorlar", "Periler", "Süper kahramanlar",
  "Hayvanlar", "Deniz ve balıklar", "Robotlar", "Sihirli ormanlar",
  "Arabalar", "Müzik ve dans", "Futbol", "Doğa",
];

const FEARS = [
  "Karanlık", "Yalnız kalmak", "Yeni okul", "Canavar korkusu",
  "Doktor ve iğne", "Kardeş kıskançlığı", "Ebeveyn ayrılığı", "Hiçbiri",
];

const LESSONS = [
  "Paylaşmayı öğrenmek", "Cesur olmak", "Dostluk", "Sabır",
  "Farklılığa saygı", "Sorumluluk", "Empati", "Özgüven",
];

const AGES = ["2-3", "4-5", "6-7", "8-9", "10+"];
const STEPS = ["Çocuğunu Tanıt", "İlgi Alanları", "Korkular", "Öğreti", "Özet"];

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    childName: "",
    age: "",
    interests: [],
    fears: [],
    lesson: "",
    extraNote: "",
  });

  const progress = (step / (STEPS.length - 1)) * 100;

  function toggleItem(field: "interests" | "fears", item: string) {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
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
    toast.loading("Masal yazılıyor...", { id: "generate" });
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
      toast.success("Masal hazır!", { id: "generate" });
      localStorage.setItem("storimini_story", JSON.stringify(result));
      router.push(`/story/${result.id}`);
    } catch {
      toast.error("Bir hata oluştu.", { id: "generate" });
      setLoading(false);
    }
  }

  return (
    <div className="wizard-shell">
      <nav className="wizard-nav">
        <Link href="/" className="brand-wordmark" aria-label="Storimini ana sayfa">
          stori<span>mini</span>
        </Link>
        <span>Adım {step + 1} / {STEPS.length}</span>
      </nav>

      <div className="wizard-progress" aria-hidden="true">
        <motion.div animate={{ width: progress + "%" }} transition={{ duration: 0.35 }} />
      </div>

      <main className="wizard-main">
        <div className="wizard-steps" aria-label="Masal oluşturma adımları">
          {STEPS.map((s, i) => (
            <div key={s} className={i === step ? "active" : i < step ? "done" : ""}>
              <span>{i < step ? <Check size={11} /> : i + 1}</span>
              <strong>{s}</strong>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={step} className="wizard-card" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div>
                <WizardHeader title="Çocuğunu tanıyalım" copy="Masalın baş kahramanı kim?" />
                <label className="field-label" htmlFor="childName">Çocuğunun adı</label>
                <input className="wizard-input" id="childName" value={data.childName} onChange={(e) => setData({ ...data, childName: e.target.value })} placeholder="Örn: Ayşe, Can, Mina..." />
                <label className="field-label space-top">Yaş grubu</label>
                <div className="chip-grid compact">
                  {AGES.map((age) => (
                    <button type="button" key={age} className={data.age === age ? "chip selected" : "chip"} onClick={() => setData({ ...data, age })}>{age}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <WizardHeader title={`${data.childName || "Çocuğun"} ne seviyor?`} copy="Birden fazla ilgi alanı seçebilirsin." />
                <div className="chip-grid">
                  {INTERESTS.map((item) => (
                    <button type="button" key={item} className={data.interests.includes(item) ? "chip selected" : "chip"} onClick={() => toggleItem("interests", item)}>
                      {data.interests.includes(item) && <Check size={12} />} {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <WizardHeader title="Bir korkusu var mı?" copy="İsteğe bağlı. Masal bu korkuya yumuşakça eşlik eder." />
                <div className="chip-grid">
                  {FEARS.map((item) => (
                    <button type="button" key={item} className={data.fears.includes(item) ? "chip selected pink" : "chip"} onClick={() => toggleItem("fears", item)}>
                      {data.fears.includes(item) && <Check size={12} />} {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <WizardHeader title="Bu masal ne öğretsin?" copy="Bugünün masalına tek bir ana öğreti seç." />
                <div className="lesson-list">
                  {LESSONS.map((item) => (
                    <button type="button" key={item} className={data.lesson === item ? "lesson selected" : "lesson"} onClick={() => setData({ ...data, lesson: item })}>
                      {item} {data.lesson === item && <Check size={16} />}
                    </button>
                  ))}
                </div>
                <label className="field-label space-top" htmlFor="extraNote">Eklemek istediğin bir şey? <span>(isteğe bağlı)</span></label>
                <textarea className="wizard-input" id="extraNote" value={data.extraNote} onChange={(e) => setData({ ...data, extraNote: e.target.value })} placeholder="Örn: Kardeşi doğdu ve biraz kıskanç hissediyor..." rows={3} />
              </div>
            )}

            {step === 4 && (
              <div>
                <WizardHeader title="Her şey hazır" copy="Storimini şimdi çocuğuna özel masalı yazabilir." />
                <div className="summary-list">
                  {[
                    { label: "Çocuğun adı", value: data.childName },
                    { label: "Yaş", value: data.age },
                    { label: "İlgi alanları", value: data.interests.join(", ") || "—" },
                    { label: "Korkusu", value: data.fears.join(", ") || "Yok" },
                    { label: "Öğreti", value: data.lesson },
                    ...(data.extraNote ? [{ label: "Not", value: data.extraNote }] : []),
                  ].map(({ label, value }) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <motion.button className="storimini-button full create-story" whileTap={{ scale: loading ? 1 : 0.98 }} onClick={handleGenerate} disabled={loading}>
                  <Sparkles size={18} /> {loading ? "Masal yazılıyor..." : `${data.childName} için Masal Oluştur`} {!loading && <ArrowRight size={16} />}
                </motion.button>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {step < 4 && (
          <div className="wizard-actions">
            <button type="button" className="secondary-button" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>
              <ArrowLeft size={16} /> Geri
            </button>
            <button type="button" className="storimini-button" onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}>
              {step === 3 ? "Özeti Gör" : "Devam Et"} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function WizardHeader({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="wizard-header">
      <h1>{title}</h1>
      <p>{copy}</p>
    </div>
  );
}
