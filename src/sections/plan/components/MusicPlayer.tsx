"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Music, Pause, Play } from "lucide-react";

type MusicPlayerProps = {
  // Prefer bvid for Bilibili audio because signed m4s URLs expire.
  bvid?: string;
  src?: string;
};

const BILIBILI_AUDIO_HOSTS = ["bilivideo.com", "hdslb.com", "akamaized.net"];

function isBilibiliAudioUrl(src: string) {
  try {
    const parsed = new URL(src);
    const hostname = parsed.hostname.toLowerCase();

    return BILIBILI_AUDIO_HOSTS.some((host) => {
      return hostname === host || hostname.endsWith(`.${host}`);
    });
  } catch {
    return false;
  }
}

function buildPlayableSrc(src?: string, bvid?: string) {
  if (bvid) {
    return `/api/bilibili-music?action=stream&bvid=${encodeURIComponent(bvid)}`;
  }

  if (!src) return "";
  if (src.startsWith("/api/bilibili-music")) return src;

  if (isBilibiliAudioUrl(src)) {
    return `/api/bilibili-music?action=stream&url=${encodeURIComponent(src)}`;
  }

  return src;
}

function withFreshQuery(src: string) {
  if (!src.startsWith("/api/bilibili-music")) return src;

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}t=${Date.now()}`;
}

export default function MusicPlayer({ src, bvid }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const playableSrc = useMemo(() => buildPlayableSrc(src, bvid), [src, bvid]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio || !playableSrc || isLoading) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      audio.src = withFreshQuery(playableSrc);
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
      setErrorMessage("播放失败，请换成 BV 号或重新获取音乐链接。");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setErrorMessage("播放失败，请换成 BV 号或重新获取音乐链接。");
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-full border border-white/40 bg-white/30 p-2 pr-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-md transition-all duration-300 hover:bg-white/40 sm:bottom-10 sm:right-10">
      <button
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-zinc-800 shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        disabled={!playableSrc || isLoading}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-current" />
        ) : (
          <Play className="ml-1 h-4 w-4 fill-current" />
        )}
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <div
          className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800/10 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "3s" }}
        >
          <Music className="h-3 w-3 text-zinc-700" />
        </div>
        <span className="text-sm font-medium text-zinc-800">
          {isLoading ? "Loading..." : isPlaying ? "Playing..." : "BGM"}
        </span>
      </div>

      {errorMessage ? (
        <span className="max-w-48 truncate text-xs text-red-700" title={errorMessage}>
          {errorMessage}
        </span>
      ) : null}

      <audio ref={audioRef} preload="none" />
    </div>
  );
}
