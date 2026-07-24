import { Link } from "@tanstack/react-router";
import { Home, Users, CalendarClock, Images, Play } from "lucide-react";

const items = [
  { to: "/" as const, label: "Home", Icon: Home },
  // { to: "/roster" as const, label: "Roster", Icon: Users },
  { to: "/rides" as const, label: "Rides", Icon: CalendarClock },
  { to: "/vault" as const, label: "Vault", Icon: Images },
  { to: "/reels" as const, label: "Reels", Icon: Play },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md z-50">
      <div className="bg-card/90 backdrop-blur-xl border border-border p-1.5 flex justify-between items-stretch clip-corner shadow-2xl shadow-primary/10">
        {items.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex-1 flex flex-col items-center gap-1 py-2 px-1 text-neutral-500 transition-colors data-[status=active]:text-primary"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: to === "/" }}
          >
            <Icon className="size-4" strokeWidth={1.5} />
            <span className="font-mono text-[9px] uppercase tracking-tighter">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
