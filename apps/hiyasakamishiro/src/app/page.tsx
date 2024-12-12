"use client";
import { Fragment, useEffect, useState } from "react";
import { sendNotification, subscribeUser, unsubscribeUser } from "./actions";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function PushNotificationManager(): React.JSX.Element {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      void registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker(): Promise<void> {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();

    setSubscription(sub);
  }

  async function subscribeToPush(): Promise<void> {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
      userVisibleOnly: true,
    });

    setSubscription(sub);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await subscribeUser(sub);
  }

  async function unsubscribeFromPush(): Promise<void> {
    await subscription?.unsubscribe();
    setSubscription(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await unsubscribeUser();
  }

  async function sendTestNotification(): Promise<void> {
    if (subscription) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            type="text"
            value={message}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}

function InstallPrompt(): React.JSX.Element {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return <Fragment />; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span aria-label="share icon" role="img">
            {" "}
            ⎋{" "}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span aria-label="plus icon" role="img">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function Page(): React.JSX.Element {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
