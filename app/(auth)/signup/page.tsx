"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { toast.error("Adin gerekli."); return; }
    if (!email) { toast.error("Email gerekli."); return; }
    if (password.length < 6) { toast.error("Sifre en az 6 karakter olmali."); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (error) { toast.error(error.message); return; }
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{
          width: 68, height: 68, borderRadius: "50%", background: "#D1FAE5",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem"
        }}>
          <Check size={30} color="#10B981" strokeWidth={2.5} />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.75rem" }}>
          Emailini dogrula
        </h2>
        <p style={{ color: "#737373", lineHeight: 1.7 }}>
          <strong>{email}</strong> adresine dogrulama linki gonderdik.
        </p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.5rem" }}>
          Hesap olustur
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#737373" }}>
          3 masal kredisi ucretsiz. Kredi karti gerekmez.
        </p>
      </div>

      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.5rem" }}>
            Adin
          </label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Adin Soyadın"
            style={{
              width: "100%", padding: "12px 14px",
              border: "1.5px solid #E5E5E5", borderRadius: 10,
              fontSize: "0.9375rem", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box", color: "#0A0A0A"
            }}
            onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.5rem" }}>
            Email adresi
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            style={{
              width: "100%", padding: "12px 14px",
              border: "1.5px solid #E5E5E5", borderRadius: 10,
              fontSize: "0.9375rem", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box", color: "#0A0A0A"
            }}
            onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0A0A0A", marginBottom: "0.5rem" }}>
            Sifre
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="En az 6 karakter"
            style={{
              width: "100%", padding: "12px 14px",
              border: "1.5px solid #E5E5E5", borderRadius: 10,
              fontSize: "0.9375rem", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box", color: "#0A0A0A"
            }}
            onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          style={{
            width: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, padding: "13px",
            borderRadius: 12, border: "none", fontFamily: "inherit",
            background: loading ? "#7DD3FC" : "#0EA5E9",
            color: "white", fontSize: "0.9375rem", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 12px rgba(14,165,233,0.35)"
          }}
        >
          {loading ? "Hesap olusturuluyor..." : <><span>Ucretsiz Basla</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#737373" }}>
        Zaten hesabin var mi?{" "}
        <Link href="/login" style={{ color: "#0EA5E9", fontWeight: 700, textDecoration: "none" }}>
          Giris yap
        </Link>
      </p>
    </motion.div>
  );
}