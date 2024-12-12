import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
export default async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    experimental: {
      typedRoutes: true,
    },
    images: {
      unoptimized: true,
    },
    reactStrictMode: false,
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};
