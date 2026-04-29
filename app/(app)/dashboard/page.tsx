"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Sparkles, LogOut, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Story {
  id: string;
  title: string;
  child_name: string;
  lesson: string;
  created_at: string;
  interests: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      setUserName(user.user_metadata?.full_name?.split(" ")[0] || "");

      const { data } = await supabase
        .from("stories")
        .select("id, title, child_name, lesson, created_at, interests")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setStories(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    return `${days} gün önce`;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "'Poppins', system-ui, sans-serif" }}>

      <nav style={{ background: "white", borderBottom: "1px solid #F0F0F0", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.025em", marginBottom: "0.4rem" }}>
              {userName ? `Merhaba, ${userName}!` : "Masallarım"}
            </h1>
            <p style={{ color: "#737373", fontSize: "0.9rem" }}>
              {stories.length > 0 ? `${stories.length} masal oluşturdun.` : "Henüz masal yok, ilkini oluştur!"}
            </p>
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: "#F0F0F0", borderRadius: 16, height: 160, animation: "pulse 1.5s infinite" }} />
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
              {stories.map((story, i) => (
                <motion.div key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                  onClick={() => {
                    localStorage.setItem("ezobi_story", JSON.stringify({
                      title: story.title,
                      content: "",
                      childName: story.child_name,
                    }));
                    router.push(`/story/${story.id}`);
                  }}
                  style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.25s" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#E0F2FE,#BAE6FD)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <BookOpen size={18} color="#0EA5E9" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "#A3A3A3", fontWeight: 500 }}>
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
                      <span key={interest} style={{ fontSize: "0.72rem", fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: "#F0F9FF", color: "#0284C7" }}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}