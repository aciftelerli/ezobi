import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createServiceClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { childName, age, interests, fears, lesson, extraNote } = await req.json();

    if (!childName || !interests?.length || !lesson) {
      return NextResponse.json({ error: "Eksik bilgi." }, { status: 400 });
    }

    const prompt = `Sen yaratıcı bir çocuk masalı yazarısın. Aşağıdaki bilgilere göre Türkçe, özgün ve sürükleyici bir çocuk masalı yaz.

Çocuğun adı: ${childName}
Yaş grubu: ${age}
İlgi alanları: ${interests.join(", ")}
${fears?.length ? `Korkuları: ${fears.join(", ")}` : ""}
Öğrenmesi gereken ders: ${lesson}
${extraNote ? `Ek not: ${extraNote}` : ""}

Kurallar:
- Masal 400-600 kelime olsun
- Baş kahraman ${childName} olsun
- İlgi alanlarından en az 2 tanesini kullan
- ${fears?.length ? `${fears[0]} korkusunu sevgiyle ve eğlenceyle çöz` : ""}
- Sonunda "${lesson}" dersini ver ama vaaz gibi değil, doğal hissettir
- Canlı, eğlenceli ve çocuğu heyecanlandıran bir dil kullan
- Başlık da yaz, sonra masalı yaz

Format:
BAŞLIK: [masal başlığı]

[masal metni]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200,
      temperature: 0.85,
    });

    const raw = completion.choices[0].message.content ?? "";
    const titleMatch = raw.match(/BAŞLIK:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `${childName}'in Masalı`;
    const content = raw.replace(/BAŞLIK:\s*.+\n?/, "").trim();

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("stories")
      .insert({
        user_id: "00000000-0000-0000-0000-000000000000",
        child_name: childName,
        interests,
        fears: fears ?? [],
        lesson,
        title,
        content,
        status: "done",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id, title, content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Masal oluşturulamadı." }, { status: 500 });
  }
}