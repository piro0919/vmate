"use client";
import { ReactNode } from "react";
import useShowWindowSize from "use-show-window-size";

export type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps): JSX.Element {
  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return <>{children}</>;
}
