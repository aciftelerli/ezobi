"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router   = useRouter();
  const supabase = createClient();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { toast.error("Email ve şifre gerekli."); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { toast.error("Email veya şifre hatalı."); return; }
      toast.success("Hoş geldin!");
      router.push("/dashboard");
      router.refresh();
    } finally { setLoading(false); }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Tekrar hoş geldin
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#737373" }}>
          Hesabına giriş yap, masallar seni bekliyor.
        </p>
      </div>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#0A0A0A", marginBottom: "0.5rem" }}>
            Email adresi
          </label>
          <div style={{ position: "relative" }}>
            <Mail size={15} color="#A3A3A3" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              autoComplete="email"
              style={{ width: "100%", padding: "11px 14px 11px 42px", border: "1.5px solid #E5E5E5", borderRadius: 10, fontSize: "0.9375rem", outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: "#0A0A0A" }}
              onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0A0A0A" }}>Şifre</label>
            <Link href="/forgot-password" style={{ fontSize: "0.8rem", color: "#0EA5E9", textDecoration: "none" }}>
              Şifremi unuttum
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={15} color="#A3A3A3" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{ width: "100%", padding: "11px 42px 11px 42px", border: "1.5px solid #E5E5E5", borderRadius: 10, fontSize: "0.9375rem", outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: "#0A0A0A" }}
              onFocus={e => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E5E5"; e.target.style.boxShadow = "none"; }}
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A3A3A3", padding: 0 }}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 12, border: "none", fontFamily: "inherit", background: loading ? "#7DD3FC" : "#0EA5E9", color: "white", fontSize: "0.9375rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 12px rgba(14,165,233,0.35)", marginTop: "0.25rem" }}>
          {loading ? "Giriş yapılıyor..." : <><span>Giriş Yap</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#737373" }}>
        Hesabın yok mu?{" "}
        <Link href="/signup" style={{ color: "#0EA5E9", fontWeight: 700, textDecoration: "none" }}>
          Ücretsiz kayıt ol
        </Link>
      </p>
    </motion.div>
  );
}