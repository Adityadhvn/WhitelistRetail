"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
export default function InfluencerDashboardPage() {


    const [referralCode, setReferralCode] = useState("");
    console.log(referralCode);

    useEffect(() => {
    
      const code = localStorage.getItem(
        "influencerReferralCode"
      );
    
      if (code) {
        setReferralCode(code);
      }
    
    }, []);

    const data = useQuery(
      api.influencers.getInfluencerStats,
      referralCode
        ? { referralCode }
        : "skip"
    );

    if (!referralCode || data === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-sm font-medium text-stone-500">
          Loading...
        </p>
      </div>
    );
  }



  return (
    <main className="min-h-screen bg-[#f7f7f5] p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
            Influencer Dashboard
          </h1>

          <p className="mt-2 text-stone-500">
            Scouts and property performance linked to your referral code.
          </p>

        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500 font-medium">
              Active Scouts
            </p>
            <h2 className="mt-3 text-5xl font-black text-stone-900">
              {data.totalScouts}
            </h2>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500 font-medium">
              Approved Properties
            </p>
            <h2 className="mt-3 text-5xl font-black text-stone-900">
              {data.totalApproved}
            </h2>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500 font-medium">
              Leased Properties
            </p>
            <h2 className="mt-3 text-5xl font-black text-stone-900">
              {data.totalLeased}
            </h2>
          </div>
        </div>
        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-100 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-500">
                    Scout Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-500">
                    Email
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-500">
                    Approved
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-500">
                    Leased
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.scouts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-stone-500"
                    >
                      No scouts joined using your referral code yet.
                    </td>
                  </tr>
                ) : (
                  data.scouts.map((scout: any) => (

                    <tr
                      key={scout.scoutId}
                      className="border-b border-stone-100 last:border-0"
                    >

                      <td className="px-6 py-5 font-semibold text-stone-900">
                        {scout.scoutName}
                      </td>

                      <td className="px-6 py-5 text-stone-600">
                        {scout.scoutEmail}
                      </td>

                      <td className="px-6 py-5 text-center">

                        <span className="inline-flex items-center justify-center min-w-[42px] h-[42px] rounded-full bg-[#4b5f49] text-white font-bold">
                          {scout.approvedCount}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center justify-center min-w-[42px] h-[42px] rounded-full bg-black text-white font-bold">
                          {scout.leasedCount}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}