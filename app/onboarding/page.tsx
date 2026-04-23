"use client";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { user } = useUser();
  const router = useRouter();

  const updateRole = useMutation(api.users.updateRole);

  const handleRole = async (role: "scout" | "landlord") => {
    await updateRole({
      clerkId: user!.id,
      role,
    });

    router.push("/dashboard");
  };

  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("referralCode");
    if (stored) setRefCode(stored);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold">JOIN WHITELIST</h1>

        <div className="mb-6">
        <input
          type="text"
          placeholder="Referral Code (Optional)"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value)}
          className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition"
        />
      </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleRole("scout")}
            className="px-6 py-3 border border-black rounded-lg"
          >
            Join as Scout
          </button>

          <button
            onClick={() => handleRole("landlord")}
            className="px-6 py-3 border border-black rounded-lg"
          >
            Join as Landlord
          </button>
        </div>
      </div>
    </div>
  );
}