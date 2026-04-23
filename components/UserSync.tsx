"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createOrGetUser);

  useEffect(() => {
    if (!user?.id) return;

    // ⏳ slight delay ensures localStorage is ready
    setTimeout(() => {
      const referralCode =
        typeof window !== "undefined"
          ? localStorage.getItem("referralCode") || ""
          : "";

      console.log("REFERRAL SENT:", referralCode); // 👈 DEBUG

      createUser({
        clerkId: user.id,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        referralCode,
      });

      if (referralCode) {
        localStorage.removeItem("referralCode");
      }

    }, 300); // ⏳ KEY FIX

  }, [user?.id]);

  return null;
}