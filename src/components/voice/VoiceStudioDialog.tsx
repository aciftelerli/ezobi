"use client";

import { useEffect, useRef, useState } from "react";
import { FileAudio, Loader2, Mic2, Pause, Play, UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

const VOICE_SAMPLE_TEXT = `Merhaba, bugün sana sıcacık bir masal okuyacağım.
Küçük bir yıldız, gökyüzünde yolunu ararken cesur bir arkadaşla tanıştı.
Birlikte karanlıktan korkmamayı, paylaşmayı ve hayal kurmayı öğrendiler.
Şimdi gözlerini kapat, derin bir nefes al ve masal başlasın.`;

interface VoiceStudioDialogProps {
  open: boolean;
  userName: string;
  onClose: () => void;
}

type VoiceMode = "record" | "upload";
type RecordingStatus = "idle" | "recording" | "ready";

export function VoiceStudioDialog({ open, userName, onClose }: VoiceStudioDialogProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<VoiceMode>("record");
  const [voiceName, setVoiceName] = useState(userName ? `${userName} sesi` : "Benim sesim");
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => cleanupRecording();
  }, []);

  if (!open) return null;

  function cleanupRecording() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
  }

  function resetRecording() {
    cleanupRecording();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    chunksRef.current = [];
    setAudioBlob(null);
    setAudioUrl(null);
    setElapsedSeconds(0);
    setRecordingStatus("idle");
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Bu tarayıcı mikrofon kaydını desteklemiyor.");
      return;
    }

    try {
      resetRecording();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const nextUrl = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(nextUrl);
        setRecordingStatus("ready");
        cleanupRecording();
      };

      recorder.start();
      setRecordingStatus("recording");
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((seconds) => seconds + 1);
      }, 1000);
    } catch {
      toast.error("Mikrofon izni alınamadı.");
      cleanupRecording();
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleFileSelect(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      toast.error("Lütfen ses dosyası seç.");
      return;
    }
    setSelectedFile(file);
  }

  async function submitVoice() {
    const cleanName = voiceName.trim();
    const sourceFile =
      mode === "record" && audioBlob
        ? new File([audioBlob], `${cleanName || "storimini-ses"}.webm`, { type: audioBlob.type })
        : selectedFile;

    if (!cleanName) {
      toast.error("Sesine bir isim ver.");
      return;
    }
    if (!sourceFile) {
      toast.error(mode === "record" ? "Önce sesini kaydet." : "Önce ses dosyası seç.");
      return;
    }

    setUploading(true);
    toast.loading("Sesin ElevenLabs'e gönderiliyor...", { id: "voice-upload" });

    try {
      const formData = new FormData();
      formData.append("file", sourceFile);
      formData.append("name", cleanName);

      const response = await fetch("/api/voice/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? "Ses yüklenemedi.");
      if (!result?.voiceId) throw new Error("ElevenLabs voice id dönmedi.");

      localStorage.setItem("storimini_voice_id", result.voiceId);
      localStorage.setItem("storimini_voice_name", cleanName);
      localStorage.setItem("storimini_selected_voice_id", result.voiceId);
      window.dispatchEvent(
        new CustomEvent("storimini-voice-updated", {
          detail: { voiceId: result.voiceId, voiceName: cleanName },
        })
      );
      toast.success("Sesin hazır. Masal dinleme seçeneklerinde görünecek.", { id: "voice-upload" });
      resetRecording();
      setSelectedFile(null);
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ses yüklenemedi.";
      toast.error(message, { id: "voice-upload" });
    } finally {
      setUploading(false);
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  return (
    <div className="voice-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="voice-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="voice-dialog-top">
          <div>
            <span className="voice-dialog-kicker">
              <Mic2 size={14} /> Kendi sesin
            </span>
            <h2 id="voice-dialog-title">Sesini masal anlatıcısına dönüştür</h2>
          </div>
          <button type="button" className="voice-dialog-close" onClick={onClose} aria-label="Kapat">
            <X size={18} />
          </button>
        </div>

        <label className="voice-name-field">
          <span>Ses adı</span>
          <input value={voiceName} onChange={(event) => setVoiceName(event.target.value)} placeholder="Örn: Annemin sesi" />
        </label>

        <div className="voice-mode-tabs" role="tablist" aria-label="Ses ekleme yöntemi">
          <button type="button" className={mode === "record" ? "active" : ""} onClick={() => setMode("record")}>
            <Mic2 size={15} /> Sitede kaydet
          </button>
          <button type="button" className={mode === "upload" ? "active" : ""} onClick={() => setMode("upload")}>
            <FileAudio size={15} /> Dosya yükle
          </button>
        </div>

        {mode === "record" ? (
          <div className="voice-record-panel">
            <div className="voice-script">
              {VOICE_SAMPLE_TEXT.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="voice-record-actions">
              {recordingStatus === "recording" ? (
                <button type="button" className="voice-record-primary recording" onClick={stopRecording}>
                  <Pause size={17} /> Kaydı Bitir
                </button>
              ) : (
                <button type="button" className="voice-record-primary" onClick={startRecording}>
                  <Mic2 size={17} /> Kayda Başla
                </button>
              )}
              <span className="voice-record-timer">{formatTime(elapsedSeconds)}</span>
            </div>
            {audioUrl && (
              <div className="voice-preview">
                <audio src={audioUrl} controls />
                <button type="button" onClick={resetRecording}>Yeniden kaydet</button>
              </div>
            )}
          </div>
        ) : (
          <div className="voice-file-panel">
            <input
              ref={fileInputRef}
              className="voice-upload-input"
              type="file"
              accept="audio/*"
              onChange={(event) => handleFileSelect(event.target.files?.[0] ?? null)}
            />
            <button type="button" className="voice-file-drop" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud size={22} />
              <span>{selectedFile ? selectedFile.name : "Bilgisayarından ses dosyası seç"}</span>
            </button>
          </div>
        )}

        <div className="voice-dialog-actions">
          <button type="button" className="secondary-button" onClick={onClose}>Vazgeç</button>
          <button type="button" className="storimini-button" onClick={submitVoice} disabled={uploading}>
            {uploading ? <Loader2 size={16} className="spin-icon" /> : <Play size={16} />}
            {uploading ? "Hazırlanıyor" : "Sesi Oluştur"}
          </button>
        </div>
      </section>
    </div>
  );
}
