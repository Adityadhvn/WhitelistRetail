import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = body.token;

    if (!token) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const formData = new FormData();

    formData.append(
      "secret",
      process.env.TURNSTILE_SECRET_KEY!
    );

    formData.append("response", token);

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const outcome = await result.json();

    return NextResponse.json({
      success: outcome.success,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}