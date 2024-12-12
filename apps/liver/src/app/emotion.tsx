// app/emotion.tsx
// eslint-disable-next-line filenames/match-exported
"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [cache] = useState(() => {
    return createCache({ key: "css", prepend: true });
  });

  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
