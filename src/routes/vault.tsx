import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { vaultShowcase, type VaultImage } from "@/data/vault";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Lightbox } from "@/components/site/Lightbox";

const noImageFallback = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200"><rect width="1200" height="1200" fill="#111111"/><rect x="80" y="80" width="1040" height="1040" rx="24" ry="24" fill="none" stroke="#3b3b3b" stroke-width="16"/><path d="M300 820l180-220 140 140 180-220 100 120v180H300z" fill="#2a2a2a"/><circle cx="460" cy="420" r="70" fill="#2a2a2a"/><text x="600" y="980" font-family="monospace" font-size="64" fill="#9a9a9a" text-anchor="middle">NO IMAGE</text></svg>'
)}`;

const localFallbackFrames: VaultImage[] = [
  {
    src: vaultShowcase[0].src,
    alt: vaultShowcase[0].alt,
    w: 1200,
    h: 1200,
    source: "local",
  },
  {
    src: vaultShowcase[1].src,
    alt: vaultShowcase[1].alt,
    w: 1200,
    h: 1200,
    source: "local",
  },
];

export const Route = createFileRoute("/vault")({
  loader: () => {
    return { images: localFallbackFrames, source: "local" as const };
  },
  head: () => ({
    meta: [
      { title: "The Vault — SportJKT" },
      { name: "description", content: "High-fidelity photography from SportJKT's runs — bikes, gear, and scenic detours." },
      { property: "og:title", content: "The Vault — SportJKT" },
      { property: "og:description", content: "Photo archive of SportJKT." },
    ],
  }),
  component: VaultPage,
});

function VaultPage() {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const { images } = Route.useLoaderData();

  function labelFor(img: VaultImage): string {
    if (img.timestamp) {
      return new Date(img.timestamp * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return "ARCHIVE";
  }

  return (
    <div className="p-6 py-10 space-y-8 animate-entrance">
      <SectionHeader title="The Vault" tag={`${String(images.length).padStart(2, "0")}_FRAMES`} />
      <p className="text-sm text-neutral-400 max-w-lg">
        Source: Local archive fallback. Tap any frame to expand.
      </p>
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpenAt(i)}
            className="mb-3 block w-full overflow-hidden border border-border bg-neutral-900 group relative clip-corner"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onError={(event) => {
                const el = event.currentTarget;
                if (el.src !== noImageFallback) {
                  el.src = noImageFallback;
                }
              }}
              className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,30,30,0.2),transparent_40%),linear-gradient(130deg,rgba(255,255,255,0.08),transparent_35%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-2 border border-white/20 clip-corner pointer-events-none" />
            <div className="absolute top-2 left-2 pointer-events-none bg-background/80 border border-primary/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
              {img.username ? `@${img.username}` : "LOCAL"}
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none bg-background/80 border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neutral-300">
              {labelFor(img)}
            </div>
          </button>
        ))}
      </div>

      {openAt !== null && (
        <Lightbox
          images={images}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onIndex={setOpenAt}
        />
      )}
    </div>
  );
}
