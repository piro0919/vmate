import { NextResponse } from "next/server";
import getWebPushInstance from "@/lib/getWebPushInstance";

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  getWebPushInstance();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, unused-imports/no-unused-vars
  const subscription = await request.json();

  return NextResponse.json({ message: "Subscribed" });
}
