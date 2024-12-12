import { NextResponse } from "next/server";
import getWebPushInstance from "@/lib/getWebPushInstance";

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const webpush = getWebPushInstance();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { message, subscription } = await request.json();

    // VAPIDの設定確認
    if (
      !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
      !process.env.VAPID_PRIVATE_KEY
    ) {
      console.error("VAPID keys are not set");

      return NextResponse.json(
        { error: "VAPID keys are not configured" },
        { status: 500 },
      );
    }

    // デバッグ用のログ
    console.log("Subscription:", subscription);
    console.log("Message:", message);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const result = await webpush.sendNotification(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      subscription,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      JSON.stringify({ body: message, title: "プッシュ通知" }),
    );

    console.log("Push sent:", result);

    return NextResponse.json({ success: true });
  } catch (err) {
    // エラーの詳細をログに出力
    console.error("Push notification error:", err);

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
