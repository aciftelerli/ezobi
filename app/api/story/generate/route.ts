export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { childName, age, interests, fears, lesson, extraNote, userId } = body;

    if (!childName || !interests?.length || !lesson) {
      return NextResponse.json({ error: "Eksik bilgi." }, { status: 400 });
    }

    const extraContext = extraNote ? ` Ek not: ${extraNote}.` : "";
    const prompt = `Türkçe kısa bir çocuk masalı yaz. Baş kahraman ${childName} (${age} yaş). İlgi alanı: ${interests[0]}. Ders: ${lesson}.${extraContext} Maksimum 300 kelime. Format: BAŞLIK: [başlık]\n\n[masal]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.8,
    });

    const raw = completion.choices[0].message.content ?? "";
    const titleMatch = raw.match(/BAŞLIK:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `${childName}'in Masalı`;
    const content = raw.replace(/BAŞLIK:\s*.+\n?/, "").trim();
    const storyId = crypto.randomUUID();

    if (userId) {
      await supabase.from("stories").insert({
        id: storyId,
        user_id: userId,
        child_name: childName,
        interests,
        fears: fears ?? [],
        lesson,
        title,
        content,
        status: "done",
      });
    }

    return NextResponse.json({ id: storyId, title, content, childName });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

