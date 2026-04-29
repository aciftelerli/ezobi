"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, Mail, UserRound } from "lucide-react";
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
    if (!fullName.trim()) { toast.error("Adın gerekli."); return; }
    if (!email) { toast.error("Email gerekli."); return; }
    if (password.length < 6) { toast.error("Şifre en az 6 karakter olmalı."); return; }

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
      <div className="auth-success">
        <div className="auth-success-icon"><Check size={28} /></div>
        <h1>Emailini doğrula</h1>
        <p><strong>{email}</strong> adresine doğrulama linki gönderdik.</p>
      </div>
    );
  }

  return (
    <motion.div className="auth-panel-inner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="auth-heading">
        <p className="auth-kicker dark">İlk 3 masal ücretsiz</p>
        <h1>Üye ol</h1>
        <p>Çocuğuna özel ilk masalı oluşturmak için hesabını aç.</p>
      </div>

      <form onSubmit={handleSignup} className="auth-form">
        <label className="field-label" htmlFor="fullName">Adın</label>
        <div className="input-wrap">
          <UserRound size={16} aria-hidden="true" />
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Adın Soyadın" autoComplete="name" />
        </div>

        <label className="field-label" htmlFor="signupEmail">Email adresi</label>
        <div className="input-wrap">
          <Mail size={16} aria-hidden="true" />
          <input id="signupEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" autoComplete="email" />
        </div>

        <label className="field-label" htmlFor="signupPassword">Şifre</label>
        <div className="input-wrap">
          <Lock size={16} aria-hidden="true" />
          <input id="signupPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="En az 6 karakter" autoComplete="new-password" />
        </div>

        <motion.button className="storimini-button full" type="submit" whileTap={{ scale: 0.98 }} disabled={loading}>
          {loading ? "Hesap oluşturuluyor..." : <><span>Ücretsiz Başla</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>

      <p className="auth-switch">Zaten hesabın var mı? <Link href="/login">Giriş yap</Link></p>
    </motion.div>
  );
}
