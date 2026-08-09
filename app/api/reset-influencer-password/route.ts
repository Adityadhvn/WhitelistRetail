import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import bcrypt from "bcryptjs";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export async function POST(req: Request) {
  try {
    // ==========================================
    // 1. CHECK CLERK ADMIN
    // ==========================================

    const {
      isAuthenticated,
      sessionClaims,
    } = await auth();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const metadata = sessionClaims?.metadata as {
      role?: string;
    };

    if (metadata?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ==========================================
    // 2. READ REQUEST
    // ==========================================

    const body = await req.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    // ==========================================
    // 3. VALIDATE
    // ==========================================

    if (!username || !newPassword) {
      return NextResponse.json(
        {
          error:
            "Username and new password are required",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // 4. HASH NEW PASSWORD
    // ==========================================

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    // ==========================================
    // 5. UPDATE CONVEX
    // ==========================================

    await convex.mutation(
      api.influencers.resetInfluencerPassword,
      {
        username,
        password: hashedPassword,
      }
    );

    // ==========================================
    // 6. SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(
      "Reset influencer password error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "";

    if (message === "Influencer not found") {
      return NextResponse.json(
        { error: "Influencer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}