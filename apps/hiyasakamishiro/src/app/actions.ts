"use server";
import webpush from "web-push";

(
  webpush as {
    setVapidDetails: (
      subject: string,
      publicKey: string,
      privateKey: string,
    ) => void;
  }
).setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(
  sub: PushSubscription,
): Promise<{ success: boolean }> {
  await Promise.resolve();
  subscription = sub;

  // In a production environment, you would want to store the subscription in a database
  return { success: true };
}

export async function unsubscribeUser(): Promise<{ success: boolean }> {
  await Promise.resolve();
  subscription = null;

  // In a production environment, you would want to remove the subscription from the database
  return { success: true };
}

export async function sendNotification(
  message: string,
): Promise<{ error?: string; success: boolean }> {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await (
      webpush as unknown as {
        sendNotification: (
          subscription: {
            endpoint: string;
            keys: {
              auth: string;
              p256dh: string;
            };
          },
          payload: string,
        ) => Promise<void>;
      }
    ).sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.getKey("auth")?.toString() ?? "",
          p256dh: subscription.getKey("p256dh")?.toString() ?? "",
        },
      },
      JSON.stringify({
        body: message,
        icon: "/icon.png",
        title: "Test Notification",
      }),
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);

    return { error: "Failed to send notification", success: false };
  }
}
