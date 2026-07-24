import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import type { Reel } from "@/data/reels";

export function ReelPlayer({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] snap-start bg-black flex items-center justify-center"
    >
      <div className="relative w-full max-w-[420px] aspect-[9/16] bg-neutral-900 overflow-hidden">
        {reel.videoSrc ? (
          <video
            ref={videoRef}
            src={reel.videoSrc}
            poster={reel.poster}
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={reel.poster} alt={reel.caption} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {!playing && reel.videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="size-14 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="size-6 fill-white text-white" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 font-mono text-[10px] bg-black/70 border border-border px-2 py-1 text-primary">
          {reel.tag}
        </div>

        {reel.videoSrc && (
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute top-3 right-3 size-9 border border-border bg-black/70 flex items-center justify-center hover:border-primary hover:text-primary"
            aria-label="Toggle sound"
          >
            {muted ? <VolumeX className="size-4" strokeWidth={1.5} /> : <Volume2 className="size-4" strokeWidth={1.5} />}
          </button>
        )}

        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <div className="font-mono text-[10px] text-primary uppercase tracking-widest">{reel.author}</div>
          <p className="text-sm leading-snug">{reel.caption}</p>
        </div>
      </div>
    </div>
  );
}
