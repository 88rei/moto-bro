import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        crawlLinks: false,
        filter: (page) => !page.path.startsWith("/roster"),
      },
      pages: [
        { path: "/" },
        { path: "/rides" },
        { path: "/reels" },
        { path: "/vault" },
        { path: "/roster", prerender: { enabled: false } },
      ],
    }),
    react(),
    tailwindcss(),
  ],
});
