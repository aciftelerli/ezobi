"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ElevenLabsStoryPlayer } from "@/components/story/ElevenLabsStoryPlayer";

interface Story {
  title: string;
  content: string;
  child_name: string;
}

function readCachedStory(): Story | null {
  const cached = localStorage.getItem("storimini_story") || localStorage.getItem("ezobi_story");
  if (!cached) return null;
  try {
    const parsed = JSON.parse(cached);
    if (!parsed.title || !parsed.content) return null;
    return {
      title: parsed.title,
      content: parsed.content,
      child_name: parsed.childName ?? parsed.child_name ?? "",
    };
  } catch {
    return null;
  }
}

export default function StoryPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cached = readCachedStory();
      if (cached) {
        setStory(cached);
        setLoading(false);
        return;
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
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="story-loading">
        <Sparkles size={34} />
        <p>Masal yükleniyor...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-loading">
        <p>Masal bulunamadı.</p>
        <Link href="/dashboard">Kitaplığa dön</Link>
      </div>
    );
  }

  return (
    <div className="reader-shell">
      <nav className="library-nav reader-nav">
        <Link href="/" className="brand-wordmark" aria-label="Storimini ana sayfa">stori<span>mini</span></Link>
        <Link href="/dashboard" className="reader-back"><ArrowLeft size={15} /> Kitaplık</Link>
      </nav>

      <main className="reader-main">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
          <div className="story-label"><Sparkles size={12} /> {story.child_name} için özel masal</div>
          <h1>{story.title}</h1>
          <ElevenLabsStoryPlayer title={story.title} content={story.content} />
          <div className="reader-card">
            {story.content.split("\n").filter((p) => p.trim()).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="reader-actions">
            <Link href="/wizard" className="storimini-button"><Sparkles size={16} /> Yeni Masal Oluştur</Link>
            <button type="button" className="secondary-button" onClick={() => window.print()}><Download size={16} /> Yazdır / PDF</button>
          </div>
        </motion.article>
      </main>
    </div>
  );
}

