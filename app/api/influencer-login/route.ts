import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { fetchQuery } from "convex/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { username, password } = body;

    // GET ALL INFLUENCERS
    const influencers = await fetchQuery(
      api.influencers.getInfluencers
    );

    // FIND USERNAME
    const influencer = influencers.find(
      (i: any) => i.username === username
    );

    if (!influencer) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      influencer.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // SUCCESS
    return NextResponse.json({
      success: true,

      // VERY IMPORTANT
      referralCode: influencer.referralCode,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}