"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Story {
  title: string;
  content: string;
  child_name: string;
  created_at: string;
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
      created_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export default function PrintPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    async function load() {
      const cached = readCachedStory();
      if (cached) {
        setStory(cached);
        return;
      }
      const { data } = await supabase
        .from("stories")
        .select("title, content, child_name, created_at")
        .eq("id", id)
        .single();
      if (data) setStory(data);
    }
    if (id) load();
  }, [id, supabase]);

  useEffect(() => {
    if (story) setTimeout(() => window.print(), 500);
  }, [story]);

  if (!story) {
    return <div className="print-loading">Yükleniyor...</div>;
  }

  const paragraphs = story.content.split("\n").filter((p) => p.trim());
  const date = new Date(story.created_at).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #231C1E; }
        .print-page { max-width: 680px; margin: 0 auto; padding: 60px 48px; font-family: Georgia, serif; }
        .print-header { text-align: center; margin-bottom: 44px; padding-bottom: 28px; border-bottom: 2px solid #EB315C; }
        .print-brand { font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #EB315C; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 20px; }
        .print-title { font-size: 28px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; }
        .print-subtitle { font-family: Arial, sans-serif; font-size: 13px; color: #777; }
        .print-content p { font-size: 16px; line-height: 1.9; margin-bottom: 18px; text-align: justify; }
        .print-content p:first-child::first-letter { font-size: 52px; font-weight: 700; float: left; line-height: .8; margin: 6px 8px 0 0; color: #516ED6; }
        .print-footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e5e5; text-align: center; font-family: Arial, sans-serif; font-size: 11px; color: #aaa; }
        .no-print { position: fixed; bottom: 24px; right: 24px; display: flex; gap: 10px; z-index: 100; }
        .btn-print, .btn-back { border-radius: 8px; padding: 12px 20px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-print { border: 0; background: #EB315C; color: #fff; }
        .btn-back { border: 1.5px solid #e5e5e5; background: #fff; color: #525252; }
        @media print { .no-print { display: none !important; } .print-page { padding: 40px; max-width: 100%; } @page { margin: 15mm; size: A4; } }
      `}</style>

      <div className="print-page">
        <div className="print-header">
          <div className="print-brand">Storimini · Kişisel Masal</div>
          <h1 className="print-title">{story.title}</h1>
          <p className="print-subtitle">{story.child_name} için özel olarak yazıldı · {date}</p>
        </div>

        <div className="print-content">
          {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <div className="print-footer">
          <p>Bu masal Storimini tarafından yapay zeka ile oluşturulmuştur.</p>
          <p style={{ marginTop: 4 }}>{story.child_name} için özel · {date}</p>
        </div>
      </div>

      <div className="no-print">
        <button className="btn-back" onClick={() => window.history.back()}>Geri Dön</button>
        <button className="btn-print" onClick={() => window.print()}>PDF Olarak Kaydet</button>
      </div>
    </>
  );
}
