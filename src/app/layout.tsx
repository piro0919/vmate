// eslint-disable-next-line filenames/match-exported
import type { Metadata } from "next";
import "ress";
import "./globals.css";

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "ブイメイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
