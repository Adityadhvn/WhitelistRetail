"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();

  const dbUser = useQuery(
    api.users.getUser,
    user ? { clerkId: user.id } : "skip"
  );

  // ✅ MOVE useEffect HERE (before returns)
  useEffect(() => {
    if (!dbUser) return;

    if (!dbUser.role) {
      router.push("/onboarding");
    } else if (dbUser.role === "scout") {
      router.push("/dashboard/scout");
    } else if (dbUser.role === "landlord") {
      router.push("/dashboard/landlord");
    }
  }, [dbUser, router]);

  // ⏳ Wait for Clerk
  if (!user) return null;

  // ⏳ Loading
  if (dbUser === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  // 👤 First time user
  if (dbUser === null) {
    return <div className="p-10">Setting up your account...</div>;
  }

  return null;
}