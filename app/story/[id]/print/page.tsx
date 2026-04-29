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

export default function PrintPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [story, setStory] = useState<Story | null>(null);

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
              created_at: new Date().toISOString(),
            });
            return;
          }
        } catch {}
      }
      const { data } = await supabase
        .from("stories")
        .select("title, content, child_name, created_at")
        .eq("id", id)
        .single();
      if (data) setStory(data);
    }
    if (id) load();
  }, [id]);

  useEffect(() => {
    if (story) {
      setTimeout(() => window.print(), 500);
    }
  }, [story]);

  if (!story) {
    return (
      <div style={{ fontFamily: "Georgia, serif", padding: "2rem", textAlign: "center" }}>
        Yükleniyor...
      </div>
    );
  }

  const paragraphs = story.content.split("\n").filter(p => p.trim());
  const date = new Date(story.created_at).toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@400;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Lora', Georgia, serif;
          background: white;
          color: #1a1a1a;
        }

        .page {
          max-width: 680px;
          margin: 0 auto;
          padding: 60px 48px;
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 2px solid #0EA5E9;
        }

        .brand {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0EA5E9;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .title {
          font-family: 'Lora', serif;
          font-size: 28px;
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #888;
          font-weight: 400;
        }

        .content p {
          font-size: 16px;
          line-height: 1.9;
          color: #2a2a2a;
          margin-bottom: 18px;
          text-align: justify;
          hyphens: auto;
        }

        .content p:first-child::first-letter {
          font-size: 52px;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin: 6px 8px 0 0;
          color: #0EA5E9;
        }

        .footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid #e5e5e5;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          color: #bbb;
        }

        .no-print {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          gap: 10px;
          z-index: 100;
        }

        .btn-print {
          background: #0EA5E9;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-back {
          background: white;
          color: #525252;
          border: 1.5px solid #e5e5e5;
          padding: 12px 20px;
          border-radius: 10px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .page { padding: 40px; max-width: 100%; }
          @page {
            margin: 15mm 15mm 15mm 15mm;
            size: A4;
          }
        }
      `}</style>

      <div className="page">
        <div className="header">
          <div className="brand">ezobi · Kişisel Masal</div>
          <h1 className="title">{story.title}</h1>
          <p className="subtitle">
            {story.child_name} için özel olarak yazıldı · {date}
          </p>
        </div>

        <div className="content">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="footer">
          <p>Bu masal ezobi.vercel.app tarafından yapay zeka ile oluşturulmuştur.</p>
          <p style={{ marginTop: 4 }}>{story.child_name} için özel · {date}</p>
        </div>
      </div>

      <div className="no-print">
        <button className="btn-back" onClick={() => window.history.back()}>
          Geri Dön
        </button>
        <button className="btn-print" onClick={() => window.print()}>
          PDF Olarak Kaydet
        </button>
      </div>
    </>
  );
}