"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Clock, Eye, LogOut, Plus, Sparkles, Trash2 } from "lucide-react";
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

function cacheStory(story: Story) {
  const payload = JSON.stringify({
    title: story.title,
    content: story.content,
    childName: story.child_name,
  });
  localStorage.setItem("storimini_story", payload);
  localStorage.setItem("ezobi_story", payload);
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
  }, [router, supabase]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) {
      toast.error("Silinemedi.");
      setDeletingId(null);
      return;
    }
    setStories((prev) => prev.filter((s) => s.id !== id));
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
      doc.setTextColor(90, 90, 90);
      doc.text(`${story.child_name} icin Storimini masali`, margin, y);
      y += 12;

      doc.setDrawColor(235, 49, 92);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.setFontSize(12);
      doc.setTextColor(35, 28, 30);
      for (const para of story.content.split("\n").filter((p) => p.trim())) {
        const lines = doc.splitTextToSize(para, maxWidth);
        if (y + lines.length * 7 > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(lines, margin, y);
        y += lines.length * 7 + 5;
      }

      doc.setFontSize(9);
      doc.setTextColor(170, 170, 170);
      doc.text("storimini.com", margin, 287);
      doc.save(`${story.child_name}-masali.pdf`);
      toast.success("PDF indirildi!", { id: "pdf" });
    } catch {
      toast.error("PDF oluşturulamadı.", { id: "pdf" });
    }
  }

  function handleView(story: Story) {
    cacheStory(story);
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
    <div className="library-shell">
      <nav className="library-nav">
        <Link href="/" className="brand-wordmark" aria-label="Storimini ana sayfa">stori<span>mini</span></Link>
        <div className="library-nav-actions">
          <Link href="/wizard" className="storimini-button small"><Plus size={15} /> Yeni Masal</Link>
          <button type="button" className="secondary-button small" onClick={handleLogout}><LogOut size={14} /> Çıkış</button>
        </div>
      </nav>

      <main className="library-main">
        <motion.header className="library-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p className="auth-kicker dark">Masal kitaplığın</p>
          <h1>{userName ? `Merhaba, ${userName}` : "Masallarım"}</h1>
          <p>{loading ? "Yükleniyor..." : stories.length > 0 ? `${stories.length} masal oluşturdun.` : "Henüz masal yok, ilkini oluşturalım."}</p>
        </motion.header>

        {loading ? (
          <div className="story-grid">
            {[1, 2, 3].map((i) => <div key={i} className="story-skeleton" />)}
          </div>
        ) : stories.length === 0 ? (
          <section className="empty-library">
            <div><Sparkles size={28} /></div>
            <h2>Henüz masal yok</h2>
            <p>İlk masalını birkaç adımda oluşturabilirsin.</p>
            <Link href="/wizard" className="storimini-button"><Sparkles size={16} /> İlk Masalı Oluştur</Link>
          </section>
        ) : (
          <AnimatePresence>
            <div className="story-grid">
              {stories.map((story, i) => (
                <motion.article key={story.id} className="story-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .28, delay: i * .04 }}>
                  <button type="button" className="story-card-body" onClick={() => handleView(story)}>
                    <div className="story-card-top">
                      <span className="story-book-icon"><BookOpen size={18} /></span>
                      <span className="story-time"><Clock size={11} /> {timeAgo(story.created_at)}</span>
                    </div>
                    <h2>{story.title || `${story.child_name}'in Masalı`}</h2>
                    <p>{story.child_name} için · {story.lesson}</p>
                    <div className="story-tags">
                      {story.interests?.slice(0, 2).map((interest) => <span key={interest}>{interest}</span>)}
                    </div>
                  </button>
                  <div className="story-actions">
                    <button type="button" onClick={() => handleView(story)}><Eye size={13} /> Oku</button>
                    <button type="button" onClick={() => { cacheStory(story); window.open(`/story/${story.id}/print`, "_blank"); }}>PDF</button>
                    <button type="button" onClick={() => handleDelete(story.id)} disabled={deletingId === story.id}><Trash2 size={13} /> Sil</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
