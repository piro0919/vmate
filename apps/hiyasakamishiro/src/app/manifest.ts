import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "A Progressive Web App built with Next.js",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/icon-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/icon-512x512.png",
        type: "image/png",
      },
    ],
    name: "Next.js PWA",
    short_name: "NextPWA",
    start_url: "/",
    theme_color: "#000000",
  };
}
