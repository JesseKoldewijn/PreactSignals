import node from "@astrojs/node";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

const isLocalPreview = process.env.LOCAL_PREVIEW === "true";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: isLocalPreview
    ? node({
        mode: "standalone",
      })
    : vercel(),
  integrations: [react()],
  experimental: {
    clientPrerender: true,
  },
});
