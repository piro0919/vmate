/* eslint-disable @typescript-eslint/require-await */
import crypto from "crypto";
import { AuthToken, SkyWayAuthToken } from "@skyway-sdk/token";
import { NextResponse } from "next/server";

interface TokenResponse {
  token: string;
}

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/explicit-function-return-type
export async function GET() {
  try {
    if (!process.env.SKYWAY_APP_ID || !process.env.SKYWAY_SECRET_KEY) {
      throw new Error("Missing environment variables");
    }

    const parameters: AuthToken = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomUUID(),
      scope: {
        app: {
          actions: ["read", "write"],
          channels: [
            {
              actions: ["read", "write"],
              id: "*",
              members: [
                {
                  actions: ["write"],
                  id: "*",
                  name: "*",
                  publication: {
                    actions: ["write"],
                  },
                  subscription: {
                    actions: ["write"],
                  },
                },
              ],
              name: "*",
              sfuBots: [
                {
                  actions: ["write"],
                  forwardings: [
                    {
                      actions: ["write"],
                    },
                  ],
                },
              ],
            },
          ],
          id: process.env.SKYWAY_APP_ID,
          turn: true,
        },
      },
    };
    const token = new SkyWayAuthToken(parameters);
    const tokenString = token.encode(process.env.SKYWAY_SECRET_KEY);

    return NextResponse.json<TokenResponse>({ token: tokenString });
  } catch (error) {
    console.error("Token generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 },
    );
  }
}
