import node from "@astrojs/node";
import preact from "@astrojs/preact";
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
    : vercel({
        edgeMiddleware: true,
        imageService: true,
        devImageService: "sharp",
      }),
  integrations: [preact()],
  experimental: {
    clientPrerender: true,
  },
});
