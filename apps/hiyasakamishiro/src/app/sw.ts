import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, type SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json() as {
      body: string;
      icon?: string;
      title: string;
    };
    const options = {
      badge: "/badge.png",
      body: data.body,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
      icon: data.icon || "/icon.png",
      vibrate: [100, 50, 100],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(
    // @ts-expect-error: clients type is not properly recognized in service worker context
    (clients as Clients).openWindow(
      "https://vmate-hiyasakamishiro.vercel.app/",
    ),
  );
});

const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  precacheEntries: self.__SW_MANIFEST,
  runtimeCaching: defaultCache,
  skipWaiting: true,
});

serwist.addEventListeners();
