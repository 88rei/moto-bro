const ITEMS = [
  { label: "SQUAD_STATUS: READY_TO_ROLL", accent: true },
  { label: "FAVORITE_TIME: NIGHT_SHIFT // SUNMORIDE" },
  { label: "PILOTS_ONLINE: ACTIVE_CREW", accent: true },
  { label: "NEXT_DISPATCH: PENDING_SCHEDULE" },
  { label: "ASPHALT_CONDITION: OPTIMAL" },
];

export function TickerHeader() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex gap-8 px-4 items-center">
          {loop.map((item, i) => (
            <span
              key={i}
              className={`font-mono text-[10px] tracking-widest ${item.accent ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
