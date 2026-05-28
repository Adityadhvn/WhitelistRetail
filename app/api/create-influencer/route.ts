import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const hashedPassword =
      await bcrypt.hash(body.password, 10);

    await convex.mutation(
      api.influencers.createInfluencer,
      {
        username: body.username,
        password: hashedPassword,
        name: body.name,
        instagram: body.instagram,
        referralCode: body.referralCode,
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}