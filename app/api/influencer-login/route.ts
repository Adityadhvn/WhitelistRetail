import { NextResponse } from "next/server";

import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const result = await convex.action(
      api.influencers.loginInfluencer,
      {
        username,
        password,
      }
    );

    return NextResponse.json({
      success: true,
      referralCode: result.referralCode,
      username: result.username,
      name: result.name,
    });

  } catch (error) {
    console.error("Influencer login error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "";

    if (
      message === "Invalid credentials" ||
      message === "Account inactive"
    ) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}