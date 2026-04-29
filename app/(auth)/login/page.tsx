"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email ve şifre gerekli.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Email veya şifre hatalı.");
        return;
      }
      toast.success("Hoş geldin!");
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="auth-panel-inner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="auth-heading">
        <p className="auth-kicker dark">Storimini hesabı</p>
        <h1>Tekrar hoş geldin</h1>
        <p>Masal kitaplığın ve çocuk profillerin seni bekliyor.</p>
      </div>

      <form onSubmit={handleLogin} className="auth-form">
        <label className="field-label" htmlFor="email">Email adresi</label>
        <div className="input-wrap">
          <Mail size={16} aria-hidden="true" />
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" autoComplete="email" />
        </div>

        <div className="field-row">
          <label className="field-label" htmlFor="password">Şifre</label>
          <Link href="/forgot-password">Şifremi unuttum</Link>
        </div>
        <div className="input-wrap">
          <Lock size={16} aria-hidden="true" />
          <input id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          <button className="ghost-icon-btn" type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Şifreyi gizle" : "Şifreyi göster"}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <motion.button className="storimini-button full" type="submit" whileTap={{ scale: 0.98 }} disabled={loading}>
          {loading ? "Giriş yapılıyor..." : <><span>Giriş Yap</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>

      <p className="auth-switch">Hesabın yok mu? <Link href="/signup">Üye ol</Link></p>
    </motion.div>
  );
}
