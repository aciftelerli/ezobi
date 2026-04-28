"use client";

import { motion } from "framer-motion";
import { BookOpen, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Poppins', system-ui, sans-serif" }}>

      <nav style={{ background: "white", borderBottom: "1px solid #F0F0F0", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#0EA5E9,#F97316)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={16} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1.15rem" }}>ezobi</span>
        </div>
        <Link href="/wizard" style={{ textDecoration: "none" }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10, border: "none", background: "#0EA5E9", color: "white", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={15} /> Yeni Masal
          </motion.button>
        </Link>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
            Masallarım
          </h1>
          <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "3rem" }}>
            Oluşturduğun masallar burada görünecek.
          </p>

          {/* Boş durum */}
          <div style={{ textAlign: "center", padding: "5rem 2rem", background: "white", borderRadius: 20, border: "1px solid #F0F0F0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Sparkles size={28} color="#0EA5E9" />
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.5rem" }}>
              Henüz masal yok
            </h3>
            <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "2rem" }}>
              İlk masalını oluşturmak için aşağıdaki butona tıkla.
            </p>
            <Link href="/wizard" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, border: "none", background: "#0EA5E9", color: "white", fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(14,165,233,0.35)" }}>
                <Sparkles size={17} /> İlk Masalı Oluştur
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}