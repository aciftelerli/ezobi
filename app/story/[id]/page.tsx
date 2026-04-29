"use client";

const printStyles = `
  @media print {
    nav, .no-print { display: none !important; }
    body { background: white !important; }
    .story-content {
      max-width: 100% !important;
      padding: 20px !important;
    }
    @page { margin: 15mm; size: A4; }
  }
`;

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Download, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Story {
  title: string;
  content: string;
  child_name: string;
}

export default function StoryPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cached = localStorage.getItem("ezobi_story");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.title && parsed.content) {
            setStory({
              title: parsed.title,
              content: parsed.content,
              child_name: parsed.childName ?? "",
            });
            setLoading(false);
            return;
          }
        } catch {}
      }
      const { data } = await supabase
        .from("stories")
        .select("title, content, child_name")
        .eq("id", id)
        .single();
      setStory(data);
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <Sparkles size={40} color="#0EA5E9" style={{ margin: "0 auto 1rem" }} />
          <p style={{ color: "#737373", fontWeight: 500 }}>Masal yukleniyor...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif", flexDirection: "column", gap: 16 }}>
        <p style={{ color: "#737373", fontWeight: 500 }}>Masal bulunamadi.</p>
        <Link href="/dashboard" style={{ color: "#0EA5E9", fontWeight: 600, textDecoration: "none" }}>
          Dashboard a don
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <nav style={{ background: "white", borderBottom: "1px solid #F0F0F0", padding: "0 1.5rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#0EA5E9,#F97316)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={15} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1.1rem" }}>ezobi</span>
        </Link>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#0EA5E9", textDecoration: "none" }}>
          <ArrowLeft size={15} /> Dashboard
        </Link>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "#E0F2FE", color: "#0284C7", fontSize: "0.78rem", fontWeight: 600, marginBottom: "1.25rem" }}>
            <Sparkles size={11} /> {story.child_name} icin ozel masal
          </div>

          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "2.5rem" }}>
            {story.title}
          </h1>

          <div style={{ background: "white", borderRadius: 20, padding: "2.5rem", border: "1px solid #F0F0F0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {story.content.split("\n").filter(p => p.trim()).map((paragraph, i) => (
              <p key={i} style={{ fontSize: "1.0625rem", color: "#2A2A2A", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: "2rem", flexWrap: "wrap" }}>
            <Link href="/wizard" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, border: "none", background: "#0EA5E9", color: "white", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                <Sparkles size={16} /> Yeni Masal Olustur
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, border: "1.5px solid #E5E5E5", background: "white", color: "#525252", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              <Download size={16} /> Yazdir / PDF
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}