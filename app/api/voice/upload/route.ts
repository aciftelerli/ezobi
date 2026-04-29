export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_ADD_VOICE_URL = "https://api.elevenlabs.io/v1/voices/add";
const MAX_SAMPLE_SIZE = 25 * 1024 * 1024;
const SUPPORTED_AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".mp4", ".webm", ".ogg", ".aac"];

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API anahtarı eksik. ELEVENLABS_API_KEY gerekli." },
        { status: 500 }
      );
    }

    const incomingForm = await req.formData();
    const file = incomingForm.get("file");
    const name = incomingForm.get("name");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Ses dosyası bulunamadı." }, { status: 400 });
    }

    const lowerFileName = file.name.toLowerCase();
    const isSupportedFile =
      file.type.startsWith("audio/") ||
      file.type === "video/mp4" ||
      SUPPORTED_AUDIO_EXTENSIONS.some((extension) => lowerFileName.endsWith(extension));

    if (!isSupportedFile) {
      return NextResponse.json(
        { error: "Lütfen MP3, WAV, M4A, MP4 veya benzeri bir ses dosyası yükle." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SAMPLE_SIZE) {
      return NextResponse.json({ error: "Ses dosyası en fazla 25 MB olabilir." }, { status: 400 });
    }

    const voiceName = typeof name === "string" && name.trim() ? name.trim() : "Storimini Özel Ses";
    const elevenLabsForm = new FormData();
    elevenLabsForm.append("name", voiceName);
    elevenLabsForm.append("description", "Storimini sesli masal okuma için yüklenen özel ses örneği.");
    elevenLabsForm.append("remove_background_noise", "true");
    elevenLabsForm.append("files", file, file.name);

    const response = await fetch(ELEVENLABS_ADD_VOICE_URL, {
      method: "POST",
      headers: { "xi-api-key": apiKey },
      body: elevenLabsForm,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: result?.detail?.message ?? result?.detail ?? result?.error ?? "Ses ElevenLabs'e yüklenemedi." },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json({
      voiceId: result?.voice_id,
      requiresVerification: Boolean(result?.requires_verification),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ElevenLabs voice upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

