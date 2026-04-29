"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Mic2, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { DEFAULT_STORY_VOICE_ID, STORY_VOICE_OPTIONS } from "@/lib/elevenlabs/voices";
import toast from "react-hot-toast";

interface ElevenLabsStoryPlayerProps {
  title: string;
  content: string;
}

type AudioStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "error";

export function ElevenLabsStoryPlayer({ title, content }: ElevenLabsStoryPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_STORY_VOICE_ID);
  const [customVoiceId, setCustomVoiceId] = useState<string | null>(null);
  const [customVoiceName, setCustomVoiceName] = useState("Kendi sesim");

  useEffect(() => {
    function syncCustomVoice() {
      const savedCustomVoiceId = localStorage.getItem("storimini_voice_id");
      const savedCustomVoiceName = localStorage.getItem("storimini_voice_name");
      const savedSelectedVoiceId = localStorage.getItem("storimini_selected_voice_id");
      setCustomVoiceId(savedCustomVoiceId);
      setCustomVoiceName(savedCustomVoiceName || "Kendi sesim");
      setSelectedVoiceId(savedSelectedVoiceId || savedCustomVoiceId || DEFAULT_STORY_VOICE_ID);
    }

    const timer = window.setTimeout(() => {
      syncCustomVoice();
    }, 0);
    window.addEventListener("storimini-voice-updated", syncCustomVoice);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storimini-voice-updated", syncCustomVoice);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  async function generateAudio() {
    setStatus("loading");
    toast.loading("Sesli masal hazırlanıyor...", { id: "story-audio" });

    try {
      const response = await fetch("/api/story/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          text: content,
          voiceId: selectedVoiceId,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error ?? "Ses üretilemedi.");
      }

      const audioBlob = await response.blob();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const nextUrl = URL.createObjectURL(audioBlob);
      objectUrlRef.current = nextUrl;
      setAudioUrl(nextUrl);
      setStatus("ready");
      toast.success("Sesli masal hazır!", { id: "story-audio" });

      window.setTimeout(() => {
        audioRef.current?.play().catch(() => setStatus("ready"));
      }, 80);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ses üretilemedi.";
      setStatus("error");
      toast.error(message, { id: "story-audio" });
    }
  }

  function handleVoiceChange(voiceId: string) {
    setSelectedVoiceId(voiceId);
    localStorage.setItem("storimini_selected_voice_id", voiceId);
    if (audioRef.current) audioRef.current.pause();
    setAudioUrl(null);
    setCurrentTime(0);
    setDuration(0);
    setStatus("idle");
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audioUrl || !audio) {
      generateAudio();
      return;
    }

    if (status === "playing") {
      audio.pause();
      return;
    }

    audio.play().catch(() => setStatus("ready"));
  }

  function restartAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => setStatus("ready"));
  }

  function downloadAudio() {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${title || "storimini-masal"}.mp3`;
    link.click();
  }

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="elevenlabs-player" aria-label="ElevenLabs sesli masal">
      <div className="elevenlabs-player-top">
        <div>
          <span className="elevenlabs-kicker">
            <Volume2 size={14} /> ElevenLabs
          </span>
          <h2>Sesli masal okuma</h2>
        </div>
        <span className="elevenlabs-status">
          {status === "loading"
            ? "Hazırlanıyor"
            : status === "playing"
              ? "Çalıyor"
              : status === "paused"
                ? "Duraklatıldı"
                : status === "error"
                  ? "Hata"
                  : audioUrl
                    ? "Hazır"
                    : "Yeni"}
        </span>
      </div>

      <label className="elevenlabs-voice-select">
        <span>
          <Mic2 size={14} /> Masal sesi
        </span>
        <select value={selectedVoiceId} onChange={(event) => handleVoiceChange(event.target.value)} disabled={status === "loading"}>
          {customVoiceId && <option value={customVoiceId}>{customVoiceName}</option>}
          {STORY_VOICE_OPTIONS.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.label} - {voice.description}
            </option>
          ))}
        </select>
      </label>

      <audio
        ref={audioRef}
        src={audioUrl ?? undefined}
        preload="metadata"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus(audioRef.current?.ended ? "ready" : "paused")}
        onEnded={() => setStatus("ready")}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />

      <div className="elevenlabs-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="elevenlabs-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="elevenlabs-actions">
        <button type="button" className="elevenlabs-primary" onClick={togglePlayback} disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 size={18} className="spin-icon" />
          ) : status === "playing" ? (
            <Pause size={18} />
          ) : (
            <Play size={18} />
          )}
          <span>{audioUrl ? (status === "playing" ? "Duraklat" : "Dinle") : "Sesli Oku"}</span>
        </button>
        <button type="button" onClick={restartAudio} disabled={!audioUrl || status === "loading"}>
          <RotateCcw size={16} />
          <span>Baştan</span>
        </button>
        <button type="button" onClick={downloadAudio} disabled={!audioUrl || status === "loading"}>
          <Download size={16} />
          <span>MP3</span>
        </button>
      </div>

      <label className="elevenlabs-rate">
        <span>Hız: {playbackRate.toFixed(2)}x</span>
        <input
          type="range"
          min="0.75"
          max="1.25"
          step="0.05"
          value={playbackRate}
          onChange={(event) => {
            const nextRate = Number(event.target.value);
            setPlaybackRate(nextRate);
            if (audioRef.current) audioRef.current.playbackRate = nextRate;
          }}
        />
      </label>
    </section>
  );
}

