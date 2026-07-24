import { createFileRoute } from "@tanstack/react-router";
import { rides } from "@/data/rides";
import { SectionHeader } from "@/components/site/SectionHeader";
import { RideTimelineItem } from "@/components/site/RideTimelineItem";

export const Route = createFileRoute("/rides")({
  head: () => ({
    meta: [
      { title: "Rides — SportJKT" },
      { name: "description", content: "Upcoming meets, midnight loops, and the log of every past run." },
      { property: "og:title", content: "Rides — SportJKT" },
      { property: "og:description", content: "Upcoming meets and completed runs of SportJKT." },
    ],
  }),
  component: RidesPage,
});

function RidesPage() {
  const upcoming = rides.filter((r) => r.status === "upcoming");
  const past = rides.filter((r) => r.status === "past");

  return (
    <div className="p-6 py-10 space-y-14 animate-entrance">
      <div className="space-y-8">
        <SectionHeader title="Upcoming" tag={`${String(upcoming.length).padStart(2, "0")}_QUEUED`} />
        <div className="space-y-10 border-l border-primary/30 ml-2">
          {upcoming.map((r) => (
            <RideTimelineItem key={r.id} ride={r} />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader title="Ride Log" tag={`${String(past.length).padStart(2, "0")}_COMPLETED`} />
        <div className="space-y-10 border-l border-border ml-2">
          {past.map((r) => (
            <RideTimelineItem key={r.id} ride={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
