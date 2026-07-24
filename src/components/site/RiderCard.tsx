import { Link } from "@tanstack/react-router";
import type { Rider } from "@/data/riders";

export function RiderCard({ rider }: { rider: Rider }) {
  return (
    <Link
      to="/roster/$handle"
      params={{ handle: rider.handle }}
      className="group relative block border border-border bg-card p-4 clip-corner hover:border-primary/60 transition-colors"
    >
      <div className="flex gap-4">
        <div className="w-24 h-24 shrink-0 overflow-hidden bg-neutral-900">
          <img
            src={rider.portrait}
            alt={rider.callsign}
            width={800}
            height={1000}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="min-w-0 space-y-1">
          <div className="font-mono text-[10px] text-primary uppercase">Unit_{rider.unit} // {rider.role}</div>
          <div className="font-display text-2xl uppercase tracking-tight truncate">{rider.callsign}</div>
          <div className="text-xs text-neutral-500 uppercase truncate">{rider.bike}</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-dashed border-border flex justify-between items-center gap-3">
        <span className="font-mono text-[10px] text-neutral-400 italic truncate">
          {rider.mods[0]}
        </span>
        <div className="size-2 bg-primary animate-pulse shrink-0" />
      </div>
    </Link>
  );
}
