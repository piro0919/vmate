// lib/webpush.ts
import webpush from "web-push";

let isInitialized = false;

export default function getWebPushInstance(): typeof webpush {
  if (!isInitialized) {
    webpush.setVapidDetails(
      "mailto:piro.haniwa@gmail.com",
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!,
    );
    isInitialized = true;
  }

  return webpush;
}
