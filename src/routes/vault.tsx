import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { fallbackVault, instagramUsernames, type VaultImage } from "@/data/vault";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Lightbox } from "@/components/site/Lightbox";

type InstagramEdge = {
  node?: {
    id?: string;
    display_url?: string;
    thumbnail_src?: string;
    accessibility_caption?: string;
    dimensions?: { width?: number; height?: number };
    is_video?: boolean;
    taken_at_timestamp?: number;
  };
};

type InstagramPayload = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: InstagramEdge[];
      };
    };
  };
  graphql?: {
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: InstagramEdge[];
      };
    };
  };
  user?: {
    edge_owner_to_timeline_media?: {
      edges?: InstagramEdge[];
    };
  };
};

const readInstagramFrames = createServerFn({ method: "GET" }).handler(async () => {
  const rankedUsers = instagramUsernames.map((username, rank) => ({ username, rank }));
  const collected: VaultImage[] = [];

  for (const user of rankedUsers) {
    const media = await fetchUserMedia(user.username);
    for (const frame of media) {
      collected.push({
        ...frame,
        username: user.username,
      });
    }
  }

  const rankByUser = new Map(rankedUsers.map((u) => [u.username, u.rank]));

  const images = collected
    .sort((a, b) => {
      const byDate = (b.timestamp ?? 0) - (a.timestamp ?? 0);
      if (byDate !== 0) return byDate;
      return (rankByUser.get(a.username ?? "") ?? Number.MAX_SAFE_INTEGER) - (rankByUser.get(b.username ?? "") ?? Number.MAX_SAFE_INTEGER);
    })
    .slice(0, 3);

  if (images.length > 0) {
    return { images, source: "instagram" as const };
  }

  return { images: fallbackVault.slice(0, 3), source: "local" as const };
});

async function fetchUserMedia(username: string): Promise<VaultImage[]> {
  const urls = [
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    `https://www.instagram.com/${encodeURIComponent(username)}/?__a=1&__d=dis`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          "accept": "application/json",
          "user-agent": "Mozilla/5.0",
          "x-ig-app-id": "936619743392459",
        },
      });

      if (!response.ok) continue;

      const text = await response.text();
      if (!text) continue;

      const payload = JSON.parse(text) as InstagramPayload;
      const edges =
        payload.data?.user?.edge_owner_to_timeline_media?.edges ??
        payload.graphql?.user?.edge_owner_to_timeline_media?.edges ??
        payload.user?.edge_owner_to_timeline_media?.edges ??
        [];

      const frames = edges
        .map((edge) => edge.node)
        .filter((node): node is NonNullable<typeof node> => Boolean(node?.display_url || node?.thumbnail_src))
        .filter((node) => !node.is_video)
        .map((node) => ({
          src: node.display_url ?? node.thumbnail_src ?? "",
          alt: node.accessibility_caption ?? `${username} post`,
          w: node.dimensions?.width ?? 1080,
          h: node.dimensions?.height ?? 1350,
          source: "instagram" as const,
          username,
          timestamp: node.taken_at_timestamp,
        }))
        .filter((frame) => Boolean(frame.src));

      if (frames.length > 0) {
        return frames;
      }
    } catch {
      // Ignore source errors and continue probing next endpoint.
    }
  }

  return [];
}

export const Route = createFileRoute("/vault")({
  loader: async () => {
    return await readInstagramFrames();
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
  const { images, source } = Route.useLoaderData();

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
        Source: {source === "instagram" ? "Instagram sync" : "Local archive fallback"}. Tap any frame to expand.
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
