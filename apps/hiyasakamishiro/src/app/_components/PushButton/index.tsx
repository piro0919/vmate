import { useEffect, useState } from "react";

type NotificationResponse = {
  error?: string;
  success?: boolean;
};

type PushMessage = {
  message: string;
  subscription: PushSubscription;
};

export default function PushButton(): React.JSX.Element {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const subscribe = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        throw new Error("通知の許可が得られませんでした");
      }

      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        userVisibleOnly: true,
      });
      const response = await fetch("/api/subscribe", {
        body: JSON.stringify(pushSubscription),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("サーバーへの登録に失敗しました");
      }

      setSubscription(pushSubscription);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました";

      alert(errorMessage);
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const sendNotification = async (): Promise<void> => {
    if (!subscription) return;
    setIsLoading(true);

    try {
      const pushMessage: PushMessage = {
        message: "テスト通知です！",
        subscription,
      };
      const response = await fetch("/api/push", {
        body: JSON.stringify(pushMessage),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as NotificationResponse;

      if (!response.ok) {
        throw new Error(data.error || "通知の送信に失敗しました");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "通知の送信に失敗しました";

      alert(errorMessage);
      console.error("Notification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkSubscription = async (): Promise<void> => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          setSubscription(existingSubscription);
        }
      } catch (error) {
        console.error("Subscription check failed:", error);
      }
    };

    void checkSubscription();
  }, []);

  return (
    <div>
      <button disabled={!!subscription || isLoading} onClick={subscribe}>
        {isLoading ? "処理中..." : subscription ? "登録済み" : "通知を登録"}
      </button>
      <button disabled={!subscription || isLoading} onClick={sendNotification}>
        {isLoading ? "送信中..." : "通知を送信"}
      </button>
    </div>
  );
}
