"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ScoutCard from "@/components/ScoutCard";
import { useRouter } from "next/navigation";



export default function Dashboard() {




  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const dbUser = useQuery(api.users.getUser, {
    clerkId: user?.id || "",
  });

  if (dbUser === undefined) {
    return <div className="text-white p-10">Loading...</div>;
  }
  
  if (dbUser === null) {
    return <div className="text-white p-10">Setting up your account...</div>;
  }

  // If no role → go onboarding
  if (!dbUser.role) {
    router.push("/onboarding");
    return null;
  }

  // 🧍 SCOUT FLOW
  if (dbUser.role === "scout") {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        {dbUser.applicationStatus === "not_applied" && (
          <button
            onClick={() =>
              window.open("SCOUT_FORM_URL", "_blank")
            }
            className="px-6 py-3 border"
          >
            Apply as Scout
          </button>
        )}

        {dbUser.applicationStatus === "under_review" && (
          <p>Application under review</p>
        )}

        {dbUser.applicationStatus === "approved" && dbUser.scoutId && (
          <ScoutCard user={dbUser} />
        )}

        {dbUser.applicationStatus === "rejected" && (
          <p>Application not approved</p>
        )}
      </div>
    );
  }

  // 🏠 LANDLORD FLOW
  if (dbUser.role === "landlord") {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        <button
          onClick={() =>
            window.open("LANDLORD_FORM_URL", "_blank")
          }
          className="px-6 py-3 border"
        >
          List Your Property
        </button>
      </div>
    );
  }

  return null;
}