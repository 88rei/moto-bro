import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { riders } from "@/data/riders";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/roster/$handle")({
  loader: () => {
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Unit not found — SportJKT" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { rider } = loaderData;
    return {
      meta: [
        { title: `${rider.callsign} — SportJKT` },
        { name: "description", content: `${rider.callsign} rides a ${rider.bike}. ${rider.bio}` },
        { property: "og:title", content: `${rider.callsign} — SportJKT` },
        { property: "og:description", content: `${rider.callsign} // ${rider.bike}` },
        { property: "og:image", content: rider.bikePhoto },
        { name: "twitter:image", content: rider.bikePhoto },
      ],
    };
  },
  component: RiderProfile,
  notFoundComponent: RiderNotFound,
});

function RiderNotFound() {
  return (
    <div className="p-6 py-20 text-center space-y-4">
      <div className="font-mono text-[10px] text-primary uppercase">UNIT_NOT_FOUND</div>
      <h1 className="font-display text-5xl uppercase">Unknown Callsign</h1>
      <Link to="/roster" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
        <ChevronLeft className="size-3.5" /> Back to roster
      </Link>
    </div>
  );
}

function RiderProfile() {
  const { rider } = Route.useLoaderData();

  return (
    <div className="animate-entrance">
      <div className="relative">
        <div className="aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-neutral-900">
          <img
            src={rider.portrait}
            alt={rider.callsign}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="absolute top-4 left-4">
          <Link
            to="/roster"
            className="inline-flex items-center gap-1 border border-border bg-background/80 backdrop-blur px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-3" /> Roster
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">
            Unit_{rider.unit} // {rider.role}
          </div>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-none tracking-tight">
            {rider.callsign}
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-10">
        <p className="text-base text-neutral-300 max-w-xl leading-relaxed">{rider.bio}</p>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <h2 className="font-display text-2xl uppercase">Machine</h2>
            <span className="font-mono text-[10px] text-primary">SPEC_SHEET</span>
          </div>
          <div className="text-xl font-mono">{rider.bike}</div>
          <div className="aspect-[3/2] overflow-hidden bg-neutral-900 clip-corner border border-border">
            <img src={rider.bikePhoto} alt={rider.bike} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <h2 className="font-display text-2xl uppercase">Modifications</h2>
            <span className="font-mono text-[10px] text-primary">{rider.mods.length}_ITEMS</span>
          </div>
          <ul className="space-y-2">
            {rider.mods.map((mod: string, i: number) => (
              <li key={i} className="flex items-start gap-3 border-l-2 border-primary/40 pl-4 py-1">
                <span className="font-mono text-[10px] text-primary shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{mod}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
