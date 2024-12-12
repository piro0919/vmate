// eslint-disable-next-line filenames/match-exported
import type { Metadata, Viewport } from "next";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    type: "website",
  },
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  twitter: {
    card: "summary",
    description: APP_DESCRIPTION,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
