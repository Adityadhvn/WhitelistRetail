"use client";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Join Whitelist</h1>

        <div className="flex gap-4">
          <button
            onClick={() => handleRole("scout")}
            className="px-6 py-3 border border-white rounded-lg"
          >
            Join as Scout
          </button>

          <button
            onClick={() => handleRole("landlord")}
            className="px-6 py-3 border border-white rounded-lg"
          >
            Join as Landlord
          </button>
        </div>
      </div>
    </div>
  );
}