"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Sparkles, LogOut, Clock, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface Story {
  id: string;
  title: string;
  child_name: string;
  lesson: string;
  created_at: string;
  interests: string[];
  content: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserName(user.user_metadata?.full_name?.split(" ")[0] || "");
      const { data } = await supabase
        .from("stories")
        .select("id, title, child_name, lesson, created_at, interests, content")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setStories(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) {
      toast.error("Silinemedi.");
      setDeletingId(null);
      return;
    }
    setStories(prev => prev.filter(s => s.id !== id));
    setDeletingId(null);
    toast.success("Masal silindi.");
  }

  async function handleDownloadPDF(story: Story) {
    toast.loading("PDF hazırlanıyor...", { id: "pdf" });
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = 210;
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      let y = 30;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      const titleLines = doc.splitTextToSize(story.title, maxWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 10 + 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`${story.child_name} icin ozel masal`, margin, y);
      y += 12;

      doc.setDrawColor(14, 165, 233);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);

      const paragraphs = story.content.split("\n").filter(p => p.trim());
      for (const para of paragraphs) {
        const lines = doc.splitTextToSize(para, maxWidth);
        if (y + lines.length * 7 > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(lines, margin, y);
        y += lines.length * 7 + 5;
      }

      doc.setFontSize(9);
      doc.setTextColor(180, 180, 180);
      doc.text("ezobi.vercel.app", margin, 287);

      doc.save(`${story.child_name}-masali.pdf`);
      toast.success("PDF indirildi!", { id: "pdf" });
    } catch {
      toast.error("PDF oluşturulamadı.", { id: "pdf" });
    }
  }

  function handleView(story: Story) {
    localStorage.setItem("ezobi_story", JSON.stringify({
      title: story.title,
      content: story.content,
      childName: story.child_name,
    }));
    router.push(`/story/${story.id}`);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 2) return "az önce";
    if (mins < 60) return `${mins} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    return `${days} gün önce`;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <nav style={{ background: "white", borderBottom: "1px solid #F0F0F0", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#0EA5E9,#F97316)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={16} color="white" />
          </div>
          <span style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1.15rem" }}>ezobi</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/wizard" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "none", background: "#0EA5E9", color: "white", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              <Plus size={15} /> Yeni Masal
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: "1.5px solid #F0F0F0", background: "white", color: "#737373", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <LogOut size={14} /> Çıkış
          </motion.button>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.025em", marginBottom: "0.4rem" }}>
              {userName ? `Merhaba, ${userName}!` : "Masallarım"}
            </h1>
            <p style={{ color: "#737373", fontSize: "0.9rem" }}>
              {loading ? "Yükleniyor..." : stories.length > 0 ? `${stories.length} masal oluşturdun.` : "Henüz masal yok, ilkini oluştur!"}
            </p>
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.25rem" }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: "#F0F0F0", borderRadius: 16, height: 180, opacity: 0.5 }} />
              ))}
            </div>
          ) : stories.length === 0 ? (
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
          ) : (
            <AnimatePresence>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.25rem" }}>
                {stories.map((story, i) => (
                  <motion.div key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    style={{ background: "white", borderRadius: 18, border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden" }}>

                    {/* Kart üst kısım */}
                    <div style={{ padding: "1.5rem 1.5rem 1rem", cursor: "pointer" }} onClick={() => handleView(story)}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#E0F2FE,#BAE6FD)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <BookOpen size={19} color="#0EA5E9" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#A3A3A3", fontWeight: 500 }}>
                          <Clock size={11} />
                          {timeAgo(story.created_at)}
                        </div>
                      </div>
                      <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "0.4rem", lineHeight: 1.4 }}>
                        {story.title || `${story.child_name}'in Masalı`}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "#737373", marginBottom: "1rem" }}>
                        {story.child_name} için · {story.lesson}
                      </p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {story.interests?.slice(0, 2).map(interest => (
                          <span key={interest} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: "#F0F9FF", color: "#0284C7" }}>
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Kart alt aksiyon çubuğu */}
                    <div style={{ borderTop: "1px solid #F5F5F5", display: "flex" }}>
                      <button
                        onClick={() => handleView(story)}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: "#0EA5E9", fontFamily: "inherit", borderRight: "1px solid #F5F5F5" }}>
                        <Eye size={13} /> Oku
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(story)}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: "#10B981", fontFamily: "inherit", borderRight: "1px solid #F5F5F5" }}>
                        PDF
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        disabled={deletingId === story.id}
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: "#EF4444", fontFamily: "inherit", opacity: deletingId === story.id ? 0.5 : 1 }}>
                        <Trash2 size={13} /> Sil
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}