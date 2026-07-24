import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TickerHeader } from "../components/site/TickerHeader";
import { BottomNav } from "../components/site/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="font-mono text-[10px] text-primary uppercase tracking-widest">ERR_404 // SIGNAL_LOST</div>
        <h1 className="font-display text-7xl uppercase">Off Route</h1>
        <p className="text-sm text-neutral-400">
          You've drifted off the mapped path. Head back to base.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center border border-primary bg-primary text-primary-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest clip-corner"
        >
          Return
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="font-mono text-[10px] text-primary uppercase tracking-widest">SYSTEM_FAULT</div>
        <h1 className="font-display text-4xl uppercase">Engine Stall</h1>
        <p className="text-sm text-neutral-400">Something misfired. Restart or return to base.</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-primary bg-primary text-primary-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest clip-corner"
          >
            Restart
          </button>
          <a
            href="/"
            className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-primary"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SportJKT — Bike Enthusiasts" },
      { name: "description", content: "Midnight runs. Zero compromise. A collective of high-performance riders." },
      { name: "author", content: "SportJKT" },
      { name: "theme-color", content: "#080808" },
      { property: "og:title", content: "SportJKT — Bike Enthusiasts" },
      { property: "og:description", content: "Midnight runs. Zero compromise. A collective of high-performance riders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <TickerHeader />
        <main className="flex-1 pb-28">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
