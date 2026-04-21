"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ScoutCard from "@/components/ScoutCard";

export default function ScoutDashboard() {
  const { user } = useUser();

  if (!user) return null;

  const dbUser = useQuery(api.users.getUser, {
    clerkId: user.id,
  });

  // ⏳ Loading
  if (dbUser === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  // 👤 Not created yet
  if (dbUser === null) {
    return <div className="p-10">Setting up your account...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-8">
      
      {/* ID CARD */}
      {dbUser.applicationStatus === "approved" && (
        <ScoutCard user={dbUser} />
      )}

      {/* STATUS */}
      {dbUser.applicationStatus === "not_applied" && (
        <button
          onClick={() => window.open("SCOUT_FORM_URL", "_blank")}
          className="px-6 py-3 border"
        >
          Apply as Scout
        </button>
      )}

      {dbUser.applicationStatus === "under_review" && (
        <p>Application under review</p>
      )}

      {dbUser.applicationStatus === "rejected" && (
        <p>Application not approved</p>
      )}
    </div>
  );
}