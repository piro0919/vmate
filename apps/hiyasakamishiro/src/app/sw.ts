import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, type SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

type PushNotificationData = {
  body: string;
  title: string;
};

// Push event handler
self.addEventListener("push", (event: PushEvent) => {
  const data = (event.data?.json() ?? {
    body: "",
    title: "",
  }) as PushNotificationData;
  const notificationPromise = self.registration.showNotification(data.title, {
    body: data.body,
  });

  event.waitUntil(notificationPromise);
});

// Serwist configuration and initialization
const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  precacheEntries: self.__SW_MANIFEST,
  runtimeCaching: defaultCache,
  skipWaiting: true,
});

serwist.addEventListeners();
