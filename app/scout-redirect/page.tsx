"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ScoutRedirectPage() {

  const { user, isLoaded } = useUser();

  const hasRun = useRef(false);

  const createUser =
  useMutation(api.users.createOrGetUser);

  useEffect(() => {

    // wait for clerk
    if (!isLoaded || !user) return;

    // prevent double execution
    if (hasRun.current) return;

    hasRun.current = true;

    const referralCode =
      localStorage.getItem("referralCode");

    const syncUser = async () => {

      try {

        await createUser({
          clerkId: user.id,

          email:
            user.primaryEmailAddress?.emailAddress || "",

          name:
            user.fullName || "User",

          referralCode:
            referralCode || "",
        });

        // redirect AFTER convex sync
        window.location.href =
          "https://forms.gle/gWMzjN3jV21jmmTG9";

      } catch (err) {

        console.error(err);

      }
    };

    syncUser();

  }, [isLoaded, user]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#Faf9f6]">

      <div className="text-center space-y-4">

        <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto" />

        <p className="text-stone-600 text-sm uppercase tracking-widest">
          Preparing your onboarding...
        </p>

      </div>

    </main>
  );
}