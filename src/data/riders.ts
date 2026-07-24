import ghost from "@/assets/rider-ghost.jpg";
import ronin from "@/assets/rider-ronin.jpg";
import apex from "@/assets/rider-apex.jpg";
import vex from "@/assets/rider-vex.jpg";
import panigale from "@/assets/bike-panigale.jpg";
import r1m from "@/assets/bike-r1m.jpg";
import s1000rr from "@/assets/bike-s1000rr.jpg";
import h2r from "@/assets/bike-h2r.jpg";

export type Rider = {
  handle: string;
  unit: string;
  callsign: string;
  role: string;
  bike: string;
  mods: string[];
  portrait: string;
  bikePhoto: string;
  bio: string;
};

export const riders: Rider[] = [
  {
    handle: "ghost-walker",
    unit: "01",
    callsign: "GHOST_WALKER",
    role: "Lead Rider",
    bike: "Ducati Panigale V4R",
    mods: [
      "Full-system Akrapovič titanium exhaust",
      "Dry clutch conversion",
      "Öhlins TTX36 rear shock",
      "Brembo GP4-RS calipers",
      "Carbon fiber fairings",
    ],
    portrait: ghost,
    bikePhoto: panigale,
    bio: "Founding member. Known for perfect apex lines and a total refusal to lift on corner exit.",
  },
  {
    handle: "neon-ronin",
    unit: "02",
    callsign: "NEON_RONIN",
    role: "Technical",
    bike: "Yamaha YZF-R1M",
    mods: [
      "Marchesini forged magnesium wheels",
      "Öhlins electronic steering damper",
      "SC-Project CR-T slip-on",
      "GB Racing engine covers",
    ],
    portrait: ronin,
    bikePhoto: r1m,
    bio: "Data-obsessed. Runs telemetry on every ride. If it can't be logged, it didn't happen.",
  },
  {
    handle: "apex-cutter",
    unit: "03",
    callsign: "APEX_CUTTER",
    role: "Corner Specialist",
    bike: "BMW S1000RR",
    mods: [
      "HP Race calibration kit",
      "Alpha Racing rearsets",
      "Akrapovič full titanium",
      "Carbon wheels",
    ],
    portrait: apex,
    bikePhoto: s1000rr,
    bio: "Trackday veteran. Turns street sweepers into race lines.",
  },
  {
    handle: "vex-01",
    unit: "04",
    callsign: "VEX",
    role: "Straight-Line",
    bike: "Kawasaki Ninja H2R",
    mods: [
      "Supercharger tune",
      "Woolich Racing ECU flash",
      "Brock's Alien Head exhaust",
      "Rapid Bike Evo autotune",
    ],
    portrait: vex,
    bikePhoto: h2r,
    bio: "Only shows up when there's a long straight. Speedometer optional.",
  },
];
