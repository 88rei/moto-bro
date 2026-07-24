import v1 from "@/assets/vault-1.jpg";
import v2 from "@/assets/vault-2.jpg";
import v3 from "@/assets/vault-3.jpg";
import v4 from "@/assets/vault-4.jpg";
import v5 from "@/assets/vault-5.jpg";
import v6 from "@/assets/vault-6.jpg";
import panigale from "@/assets/bike-panigale.jpg";
import r1m from "@/assets/bike-r1m.jpg";
import s1000rr from "@/assets/bike-s1000rr.jpg";
import h2r from "@/assets/bike-h2r.jpg";

export type VaultImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  source?: "instagram" | "local";
  username?: string;
  timestamp?: number;
};

export const vaultShowcase: VaultImage[] = [
  {
    src: "https://i.ibb.co.com/7x6vnCzw/651826415-18575140612007044-7829382730766378491-n.webp",
    alt: "Vault frame A",
    w: 1200,
    h: 1200,
    source: "local",
  },
  {
    src: "https://i.ibb.co.com/VcpMjhLX/672487145-18584796250007044-2400305151125866529-n.webp",
    alt: "Vault frame B",
    w: 1200,
    h: 1200,
    source: "local",
  },
];

export const fallbackVault: VaultImage[] = [
  { src: v1, alt: "Glowing exhaust tip", w: 800, h: 1000, source: "local" },
  { src: v2, alt: "Bikes parked under neon", w: 800, h: 800, source: "local" },
  { src: v3, alt: "Motion blur night ride", w: 800, h: 1200, source: "local" },
  { src: panigale, alt: "Panigale in alley", w: 1200, h: 800, source: "local" },
  { src: v5, alt: "Sparks off brake disc", w: 800, h: 1000, source: "local" },
  { src: v4, alt: "Riders at sunset", w: 800, h: 600, source: "local" },
  { src: r1m, alt: "R1M night detail", w: 1200, h: 800, source: "local" },
  { src: v6, alt: "Rider on dark track", w: 800, h: 1100, source: "local" },
  { src: s1000rr, alt: "S1000RR taillight", w: 1200, h: 800, source: "local" },
  { src: h2r, alt: "H2R wet street", w: 1200, h: 800, source: "local" },
];

// Keep `vault` for existing imports across other pages.
export const vault = fallbackVault;
