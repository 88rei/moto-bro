import { createFileRoute } from "@tanstack/react-router";
import { reels } from "@/data/reels";
import { ReelPlayer } from "@/components/site/ReelPlayer";

export const Route = createFileRoute("/reels")({
  head: () => ({
    meta: [
      { title: "Reels — SportJKT" },
      { name: "description", content: "Vertical short-form footage from SportJKT — fly-bys, exhaust cuts, and highlights." },
      { property: "og:title", content: "Reels — SportJKT" },
      { property: "og:description", content: "Short-form video feed from SportJKT." },
    ],
  }),
  component: ReelsPage,
});

function ReelsPage() {
  const feed = [...reels, ...reels, ...reels];

  return (
    <div className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory no-scrollbar -mt-[33px] pt-0 bg-black">
      {feed.map((r, i) => (
        <ReelPlayer key={`${r.id}-${i}`} reel={r} />
      ))}
    </div>
  );
}
