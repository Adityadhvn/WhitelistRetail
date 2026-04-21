"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ScoutCard from "@/components/ScoutCard";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ScoutDashboard() {
  const { user } = useUser();

  // ✅ FIXED hooks
  const dbUser = useQuery(
    api.users.getUser,
    user ? { clerkId: user.id } : "skip"
  );

  const properties = useQuery(
    api.properties.getScoutInventory,
    dbUser ? { scoutId: dbUser._id } : "skip"
  );

  

  if (!user) return null;

  if (dbUser === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  if (dbUser === null) {
    return <div className="p-10">Setting up your account...</div>;
  }
  
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      {/* 🔥 GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
             linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* CONTENT */}
      <div className="relative z-10 pt-24 p-10 space-y-10">
        
        {/* ID CARD */}
        {dbUser.applicationStatus === "approved" && (
          <ScoutCard user={dbUser} />
        )}

        {/* STATUS */}
        {dbUser.applicationStatus === "not_applied" && (
          <button
            onClick={() => window.open("SCOUT_FORM_URL", "_blank")}
            className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Apply as Scout
          </button>
        )}

        {dbUser.applicationStatus === "under_review" && (
          <p className="text-gray-600">Application under review</p>
        )}

        {dbUser.applicationStatus === "rejected" && (
          <p className="text-red-500">Application not approved</p>
        )}

        {/* LISTINGS */}
        {dbUser.applicationStatus === "approved" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Your Approved Listings
            </h2>

            {properties === undefined && (
              <p className="text-gray-500">Loading listings...</p>
            )}

            {properties?.length === 0 && (
              <p className="text-gray-500">
                No approved listings yet
              </p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {properties?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    {p.teaser}
                  </p>

                  <div className="mt-3 text-sm text-gray-700">
                    {p.city} • {p.sqft} sqft
                  </div>

                  <div className="mt-3 font-medium text-green-600">
                    ₹{p.potentialCommission}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}