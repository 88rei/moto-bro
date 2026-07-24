import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { riders } from "@/data/riders";
import { rides } from "@/data/rides";
import { vaultShowcase } from "@/data/vault";
import { SectionHeader } from "@/components/site/SectionHeader";
import { RiderCard } from "@/components/site/RiderCard";
import { RideTimelineItem } from "@/components/site/RideTimelineItem";
import { ArrowRight } from "lucide-react";

const noImageFallback = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200"><rect width="1200" height="1200" fill="#111111"/><rect x="80" y="80" width="1040" height="1040" rx="24" ry="24" fill="none" stroke="#3b3b3b" stroke-width="16"/><path d="M300 820l180-220 140 140 180-220 100 120v180H300z" fill="#2a2a2a"/><circle cx="460" cy="420" r="70" fill="#2a2a2a"/><text x="600" y="980" font-family="monospace" font-size="64" fill="#9a9a9a" text-anchor="middle">NO IMAGE</text></svg>'
)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SportJKT — Nocturnal Motorcycle Crew" },
      { name: "description", content: "Midnight runs, engineered machines, and the roar between apex and exit. Meet SportJKT." },
      { property: "og:title", content: "SportJKT — Nocturnal Motorcycle Crew" },
      { property: "og:description", content: "Midnight runs, engineered machines, and the roar between apex and exit." },
    ],
  }),
  component: Home,
});

function Home() {
  const nextRide = rides.find((r) => r.status === "upcoming");
  const featuredRiders = riders.slice(0, 2);
  const vaultThumbs = vaultShowcase;

  return (
    <div className="animate-entrance">
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end p-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            width={1080}
            height={1920}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 scanline" />
        </div>

        <div className="relative z-10 space-y-5 mb-24 max-w-xl">
          <div className="inline-block bg-primary px-2 py-0.5 font-mono text-[10px] font-bold tracking-tighter text-white">
            EST. 2026
          </div>
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.85] tracking-tight uppercase">
            SPORTBIKE<br />JKT
          </h1>
          <p className="max-w-sm text-sm text-neutral-300 font-medium leading-relaxed">
            Morning Ride or Night Run? <br></br> we are a collective of high-performance-enthusiast riders who live for the adrenaline of Jakarta Roads.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {/* <Link
              to="/roster"
              className="bg-foreground text-background font-display text-lg py-4 px-6 text-center uppercase tracking-widest flex items-center justify-center gap-3"
            >
              Roster <ArrowRight className="size-4" />
            </Link> */}
            <Link
              to="/rides"
              className="border border-border backdrop-blur-sm font-display text-lg py-4 px-6 text-center uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              Upcoming Rides
            </Link>
            <Link
              to="/vault"
              className="border border-border backdrop-blur-sm font-display text-lg py-4 px-6 text-center uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Roster preview */}
      {/* <section className="p-6 py-16 space-y-8">
        <SectionHeader title="Roster" tag={`${String(riders.length).padStart(2, "0")}_ACTIVE_UNITS`} />
        <div className="grid gap-4 md:grid-cols-2">
          {featuredRiders.map((r) => (
            <RiderCard key={r.handle} rider={r} />
          ))}
        </div>
        <Link
          to="/roster"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-white"
        >
          View full roster <ArrowRight className="size-3.5" />
        </Link>
      </section> */}

      {/* Next ride */}
      {nextRide && (
        <section className="p-6 py-16 space-y-8">
          <SectionHeader title="Next Ride" tag="OPERATIONAL_RADAR" />
          <div className="border-l border-primary/20 ml-2">
            <RideTimelineItem ride={nextRide} />
          </div>
          <Link
            to="/rides"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-white"
          >
            Full ride log <ArrowRight className="size-3.5" />
          </Link>
        </section>
      )}

      {/* Vault preview */}
      <section className="p-6 py-16 space-y-8">
        <SectionHeader title="The Vault" tag="MEDIA_ARCHIVE" />
        <div className="grid grid-cols-2 gap-2">
          {vaultThumbs.map((v, i) => (
            <div key={i} className="aspect-square bg-neutral-900 overflow-hidden">
              <img
                src={v.src}
                alt={v.alt}
                loading="lazy"
                onError={(event) => {
                  const el = event.currentTarget;
                  if (el.src !== noImageFallback) {
                    el.src = noImageFallback;
                  }
                }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
        <Link
          to="/vault"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-white"
        >
          Enter the vault <ArrowRight className="size-3.5" />
        </Link>
      </section>

      <footer className="p-6 py-12 border-t border-border">
        <div className="font-display text-2xl uppercase tracking-tight">SportJKT</div>
        <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-2">
          Nocturnal Frequency // Est. MMXXIV
        </div>
      </footer>
    </div>
  );
}
