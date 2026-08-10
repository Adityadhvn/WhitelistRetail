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
    // 1. CHECK CLERK AUTHENTICATION
    // ==========================================

    const {
      isAuthenticated,
      sessionClaims,
      getToken,
    } = await auth();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ==========================================
    // 2. CHECK ADMIN ROLE
    // ==========================================

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
    // 3. PASS CLERK TOKEN TO CONVEX
    // ==========================================

    const token = await getToken({ template: "convex" });

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token unavailable" },
        { status: 401 }
      );
    }

    convex.setAuth(token);

    // ==========================================
    // 4. READ REQUEST BODY
    // ==========================================

    const body = await req.json();

    // ==========================================
    // 5. VALIDATE INPUT
    // ==========================================

    if (
      typeof body.username !== "string" ||
      typeof body.password !== "string" ||
      typeof body.name !== "string" ||
      typeof body.instagram !== "string" ||
      typeof body.referralCode !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const username = body.username.trim();
    const name = body.name.trim();
    const instagram = body.instagram.trim();
    const referralCode = body.referralCode.trim();

    if (
      !username ||
      !body.password ||
      !name ||
      !instagram ||
      !referralCode
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ==========================================
    // 6. HASH PASSWORD
    // ==========================================

    const hashedPassword = await bcrypt.hash(
      body.password,
      12
    );

    // ==========================================
    // 7. CREATE INFLUENCER
    // ==========================================

    await convex.mutation(
      api.influencers.createInfluencer,
      {
        username,
        password: hashedPassword,
        name,
        instagram,
        referralCode,
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(
      "Create influencer error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "";

    if (message === "Username already exists") {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    if (message === "Referral code already exists") {
      return NextResponse.json(
        { error: "Referral code already exists" },
        { status: 409 }
      );
    }

    if (message === "Forbidden") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    if (message === "Unauthenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}