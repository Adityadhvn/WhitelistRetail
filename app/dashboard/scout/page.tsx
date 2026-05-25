"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ScoutCard from "@/components/ScoutCard";
import Navbar from "@/components/Navbar";
import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  MapPin,
  BadgeAlert,
  ArrowRight,
} from "lucide-react";

export default function ScoutDashboard() {
  const { user } = useUser();

  const [approvedOpen, setApprovedOpen] = useState(false);
  const [requirementsOpen, setRequirementsOpen] = useState(true);

  const dbUser = useQuery(
    api.users.getUser,
    user ? { clerkId: user.id } : "skip"
  );

  const properties = useQuery(
    api.properties.getScoutInventory,
    dbUser ? { scoutId: dbUser._id } : "skip"
  );

  const requirements = [
    {
      brand: "Westside",
      title: "Beside Westside",
      frontage: "50 ft",
      size: "10,000 SQFT",
      floors: "Ground + First Floor",
      location: "High Street, Malls",
      priority: "High Priority",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Westside_Logo.svg",
    },

    {
      brand: "Zudio",
      title: "Beside Zudio",
      frontage: "30 - 45 ft",
      size: "6,000 SQFT",
      floors: "Ground + First Floor",
      location: "High Street, Malls",
      priority: "High Priority",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Zudio_Logo.jpg",
    },

    {
      brand: "Jockey",
      title: "Beside Jockey",
      frontage: "15 - 30 ft",
      size: "500 - 1,500 SQFT",
      floors: "Ground Floor Only",
      location: "High Street, Malls",
      priority: "Medium Priority",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Jockey_International_logo.svg",
    },

    {
      brand: "Snitch",
      title: "Beside Snitch",
      frontage: "30 ft",
      size: "4,000 - 6,000 SQFT",
      floors: "Ground + First Floor",
      location: "High Street, Malls",
      priority: "High Priority",
      logo:
        "https://images.seeklogo.com/logo-png/61/2/snitch-logo-png_seeklogo-614788.png",
    },
  ];

  if (!user) return null;

  if (dbUser === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  if (dbUser === null) {
    return <div className="p-10">Setting up your account...</div>;
  }

  return (
    <div className="relative min-h-screen bg-[#f8f6f2] text-black overflow-hidden">
      <Navbar />

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
        linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* CONTENT */}
      <div className="relative z-10 pt-24 pb-14 px-4 md:px-8 lg:px-10 space-y-6 md:space-y-8">

        {/* SCOUT CARD */}
        {dbUser.applicationStatus === "approved" && (
          <div className="w-full flex justify-center">
            <ScoutCard user={dbUser} />
          </div>
        )}

        {/* STATUS */}
        {dbUser.applicationStatus === "not_applied" && (
          <button
            onClick={() => window.open("SCOUT_FORM_URL", "_blank")}
            className="px-6 py-3 border border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Apply as Scout
          </button>
        )}

        {dbUser.applicationStatus === "under_review" && (
          <p className="text-gray-600">
            Application under review
          </p>
        )}

        {dbUser.applicationStatus === "rejected" && (
          <p className="text-red-500">
            Application not approved
          </p>
        )}

        {/* APPROVED LISTINGS */}
        {dbUser.applicationStatus === "approved" && (
          <div className="bg-white border border-stone-200 rounded-[28px] overflow-hidden shadow-sm">

            {/* HEADER */}
            <button
              onClick={() => setApprovedOpen(!approvedOpen)}
              className="w-full flex items-center justify-between gap-4 px-5 md:px-8 py-6 md:py-8 bg-gradient-to-r from-[#faf6f2] to-[#fff]"
            >
              <div className="text-left">
                <h2 className="text-2xl md:text-4xl font-serif text-stone-900">
                  Approved Listings
                </h2>

                <p className="text-sm md:text-base text-stone-500 mt-2 max-w-xl">
                  Your approved commercial inventory.
                </p>
              </div>

              {approvedOpen ? (
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              )}
            </button>

            {/* CONTENT */}
            {approvedOpen && (
              <div className="px-5 md:px-8 pb-8">

                {properties === undefined && (
                  <p className="text-gray-500">
                    Loading listings...
                  </p>
                )}

                {properties?.length === 0 && (
                  <p className="text-gray-500">
                    No approved listings yet
                  </p>
                )}

                <div className="grid gap-5 md:grid-cols-2 mt-5">
                  {properties?.map((p) => (
                    <div
                      key={p._id}
                      className="bg-[#faf9f6] border border-stone-200 rounded-2xl p-5 md:p-6 hover:shadow-md transition"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-stone-900">
                        {p.title}
                      </h3>

                      <p className="text-stone-600 text-sm mt-2 leading-6">
                        {p.teaser}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm text-stone-700">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{p.city}</span>
                      </div>

                      <div className="mt-2 text-sm text-stone-700">
                        {p.sqft} sqft
                      </div>

                      <div className="mt-5 font-medium text-green-700">
                        ₹{p.potentialCommission}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* REQUIREMENTS SECTION */}
        {dbUser.applicationStatus === "approved" && (
          
          <div className="bg-[#fcfbf9] border border-[#ebe5de] rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]">

           
              {/* HEADER */}
              <button
                onClick={() => setRequirementsOpen(!requirementsOpen)}
                className="w-full flex items-start md:items-center justify-between gap-4 px-5 md:px-8 py-6 md:py-8 bg-[#fcfbf9]"
              >
                <div className="text-left">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900">
                    Requirements
                  </h2>

                  <div className="mt-4 inline-flex items-center gap-2 bg-white text-[#5c4635] px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-[#e7dfd7] shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#8b5e3c]" />
                    Live Brand Requirements
                  </div>

                  <p className="text-sm md:text-base text-stone-500 mt-4 max-w-2xl leading-6 md:leading-7">
                    Current retail space requirements from brand partners.
                  </p>
                </div>

                {requirementsOpen ? (
                  <ChevronUp className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1" />
                )}
              </button>

              {/* CONTENT */}
              {requirementsOpen && (
                <div className="px-4 md:px-8 pb-8">

                  {/* INFO BANNER */}
                  <div className="border border-stone-200 rounded-2xl px-5 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 md:mb-8 bg-[#fcfbfa]">

                    <div className="flex items-start gap-4">
                      <div className="min-w-[48px] w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center bg-white">
                        <BadgeAlert className="w-5 h-5 text-stone-700" />
                      </div>

                      <div>
                        <h3 className="font-medium text-stone-900 leading-7">
                          Submit matching properties to increase your chances of faster approvals.
                        </h3>

                        <p className="text-stone-500 mt-2 text-sm leading-6">
                          All requirements are verified and updated regularly.
                        </p>
                      </div>
                    </div>

                    <button className="w-full lg:w-auto px-6 py-3 rounded-xl bg-[#4a382b] text-white text-sm hover:opacity-90 transition">
                      How It Works
                    </button>
                  </div>

                  {/* REQUIREMENT CARDS */}
                  <div className="space-y-4">

                    {requirements.map((req, i) => (
                      <div
                        key={i}
                        className="border border-[#ece7e2] rounded-2xl p-5 md:p-6 bg-white hover:border-[#d8cdc2] hover:shadow-[0_6px_24px_rgba(0,0,0,0.04)] transition-all duration-300"
                      >
                        <div className="flex flex-col gap-6">

                          {/* TOP */}
                          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                            {/* LEFT */}
                            <div className="flex flex-col lg:flex-row gap-6 flex-1">

                              {/* LOGO */}
                              <div className="w-full sm:w-[170px] h-[90px] bg-white border border-stone-200 rounded-xl flex items-center justify-center overflow-hidden mx-auto lg:mx-0">
                                <img
                                  src={req.logo}
                                  alt={req.brand}
                                  className="max-w-[120px] max-h-[50px] object-contain"
                                />
                              </div>

                              {/* DETAILS */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 flex-1 text-center sm:text-left">

                                <div>
                                  <p className="text-lg font-semibold text-stone-900">
                                    {req.title}
                                  </p>

                                  <div className="mt-4">
                                    <p className="text-xs uppercase tracking-wide text-stone-400">
                                      Front Width
                                    </p>

                                    <p className="mt-2 text-stone-800">
                                      {req.frontage}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-xs uppercase tracking-wide text-stone-400">
                                    Size Required
                                  </p>

                                  <p className="mt-6 text-stone-800">
                                    {req.size}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs uppercase tracking-wide text-stone-400">
                                    Floors
                                  </p>

                                  <p className="mt-6 text-stone-800">
                                    {req.floors}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs uppercase tracking-wide text-stone-400">
                                    Location Preference
                                  </p>

                                  <p className="mt-6 text-stone-800">
                                    {req.location}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex flex-col sm:flex-row xl:flex-col items-center xl:items-end gap-4">

                              <div
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  req.priority === "High Priority"
                                    ? "bg-[#f4ede7] text-[#6a4d37]"
                                    : "bg-[#f3f3f3] text-stone-700"
                                }`}
                              >
                                {req.priority}
                              </div>

                              <button className="w-full sm:w-auto px-6 py-3 bg-[#4a382b] text-white rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
                                Submit Property
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* FOOTER CTA */}
                    <div className="border border-stone-200 rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 bg-white">

                      <p className="text-stone-700 text-center lg:text-left leading-7">
                        Don’t see a matching requirement?
                        Submit your property anyway.
                      </p>

                      <button className="w-full lg:w-auto px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-100 transition flex items-center justify-center gap-2">
                        Submit Any Property
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          
        )}
      </div>
    </div>
  );
}