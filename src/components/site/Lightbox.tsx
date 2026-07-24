import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { VaultImage } from "@/data/vault";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: VaultImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onIndex]);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex items-center justify-center animate-entrance"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx > 50) onIndex((index - 1 + images.length) % images.length);
        else if (dx < -50) onIndex((index + 1) % images.length);
        touchStartX.current = null;
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 border border-border bg-card/80 hover:border-primary hover:text-primary z-10"
        aria-label="Close"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndex((index - 1 + images.length) % images.length);
        }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-border bg-card/80 hover:border-primary hover:text-primary"
        aria-label="Previous"
      >
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndex((index + 1) % images.length);
        }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 border border-border bg-card/80 hover:border-primary hover:text-primary"
        aria-label="Next"
      >
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </button>
      <img
        src={img.src}
        alt={img.alt}
        className="max-w-[92vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}
