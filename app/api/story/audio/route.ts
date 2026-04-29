export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_STREAM_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const DEFAULT_MODEL = "eleven_multilingual_v2";
const DEFAULT_OUTPUT_FORMAT = "mp3_44100_128";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;

    if (!apiKey || !voiceId) {
      return NextResponse.json(
        { error: "ElevenLabs ayarları eksik. ELEVENLABS_API_KEY ve ELEVENLABS_VOICE_ID gerekli." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!text) {
      return NextResponse.json({ error: "Seslendirilecek metin bulunamadı." }, { status: 400 });
    }

    const narrationText = [title, text].filter(Boolean).join("\n\n");
    const response = await fetch(
      `${ELEVENLABS_STREAM_URL}/${voiceId}/stream?output_format=${DEFAULT_OUTPUT_FORMAT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: narrationText,
          model_id: process.env.ELEVENLABS_MODEL_ID ?? DEFAULT_MODEL,
          language_code: "tr",
          voice_settings: {
            stability: 0.62,
            similarity_boost: 0.78,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "ElevenLabs ses üretimi başarısız oldu." },
        { status: response.status || 502 }
      );
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ElevenLabs audio error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

