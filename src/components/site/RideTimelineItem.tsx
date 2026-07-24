import type { Ride } from "@/data/rides";
import { MapPin, ExternalLink } from "lucide-react";

export function RideTimelineItem({ ride }: { ride: Ride }) {
  const upcoming = ride.status === "upcoming";
  return (
    <div className="relative pl-8">
      <div
        className={`absolute left-[-5px] top-1.5 size-2.5 ${
          upcoming ? "bg-primary ring-4 ring-primary/20 animate-pulse" : "bg-neutral-700"
        }`}
      />
      <div className={`space-y-3 ${upcoming ? "" : "opacity-60"}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-mono text-[10px] uppercase tracking-widest ${
              upcoming ? "text-primary" : "text-neutral-500"
            }`}
          >
            {upcoming ? "Upcoming" : "Completed"} // {ride.date}
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight">{ride.title}</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono uppercase text-neutral-400 max-w-md">
          <div>
            <span className="text-neutral-600 block">Meet</span>
            {ride.meetTime}
          </div>
          <div>
            <span className="text-neutral-600 block">Pace</span>
            <span className={upcoming && ride.pace === "Lethal" ? "text-primary" : ""}>{ride.pace}</span>
          </div>
          <div>
            <span className="text-neutral-600 block">Distance</span>
            {ride.distance}
          </div>
          <div>
            <span className="text-neutral-600 block">Status</span>
            {upcoming ? "GO" : "LOGGED"}
          </div>
        </div>
        <div className="flex items-start gap-2 text-xs text-neutral-400 max-w-md">
          <MapPin className="size-3.5 mt-0.5 shrink-0 text-primary" strokeWidth={1.5} />
          <span>{ride.location}</span>
        </div>
        {ride.notes && <p className="text-xs text-neutral-500 max-w-md leading-relaxed">{ride.notes}</p>}
        {upcoming && (
          <a
            href={ride.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-colors clip-corner"
          >
            Open route <ExternalLink className="size-3" strokeWidth={1.5} />
          </a>
        )}
      </div>
    </div>
  );
}
