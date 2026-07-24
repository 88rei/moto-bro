import { createFileRoute, notFound } from "@tanstack/react-router";
import { riders } from "@/data/riders";
import { RiderCard } from "@/components/site/RiderCard";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/roster")({
  loader: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Roster — SportJKT" },
      { name: "description", content: "The active units of SportJKT. Callsigns, machines, and modifications." },
      { property: "og:title", content: "Roster — SportJKT" },
      { property: "og:description", content: "Active riders and the machines they've engineered." },
    ],
  }),
  component: RosterPage,
  notFoundComponent: RosterDisabled,
});

function RosterDisabled() {
  return (
    <div className="p-6 py-20 text-center space-y-3 animate-entrance">
      <div className="font-mono text-[10px] text-primary uppercase tracking-widest">ROSTER_LOCKED</div>
      <h1 className="font-display text-5xl uppercase">Roster Disabled</h1>
      <p className="text-sm text-neutral-400">Unit access is temporarily disabled.</p>
    </div>
  );
}

function RosterPage() {
  return (
    <div className="p-6 py-10 space-y-8 animate-entrance">
      <SectionHeader title="Roster" tag={`${String(riders.length).padStart(2, "0")}_ACTIVE_UNITS`} />
      <p className="text-sm text-neutral-400 max-w-lg">
        Every unit ridden, tuned, and logged. Tap a card to open the full spec sheet.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {riders.map((r) => (
          <RiderCard key={r.handle} rider={r} />
        ))}
      </div>
    </div>
  );
}
