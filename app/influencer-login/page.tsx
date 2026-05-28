"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InfluencerLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  
    const res = await fetch("/api/influencer-login", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
  
      // SAVE REFERRAL CODE
      localStorage.setItem(
        "influencerReferralCode",
        data.referralCode
      );
  
      router.push("/influencer-dashboard");
  
    } else {
  
      alert("Invalid credentials");
  
    }
  }

  

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef2ec] flex items-center justify-center px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(75,95,73,0.12),transparent_38%)]" />

      {/* FLOATING BLUR ORBS */}
      <div className="absolute top-[-120px] left-[-80px] w-[280px] h-[280px] bg-[#4b5f49]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-100px] w-[320px] h-[320px] bg-[#4b5f49]/10 blur-3xl rounded-full" />

      {/* CARD */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-white/30 bg-white/55 backdrop-blur-2xl shadow-[0_10px_60px_rgba(75,95,73,0.10)] px-7 md:px-9 py-6"
      >

        {/* TITLE */}
        <div className="mt-6">

          <p className="text-[32px] md:text-[38px] leading-none font-black tracking-[-0.03em] uppercase text-stone-900">
            Influencer Login
          </p>

          <p className="mt-4 text-s font-bold leading-6 text-stone-500 max-w-sm">
            Access your private dashboard, referral analytics
            and campaign activity.
          </p>
        </div>

        {/* INPUTS */}
        <div className="mt-10 space-y-5">

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-stone-500">
              Username
            </p>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border font-bold border-white/40 bg-white/70 px-5 py-4 text-stone-900 placeholder:text-stone-400 outline-none backdrop-blur-xl transition-all duration-300 focus:border-[#4b5f49]/30 focus:bg-white"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-stone-500">
              Password
            </p>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border font-bold border-white/40 bg-white/70 px-5 py-4 text-stone-900 placeholder:text-stone-400 outline-none backdrop-blur-xl transition-all duration-300 focus:border-[#4b5f49]/30 focus:bg-white"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="group relative overflow-hidden w-full rounded-2xl bg-[#4b5f49] py-4 transition-all duration-300 hover:bg-[#42533f] active:scale-[0.99]"
          >

            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.10),transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />

            <span className="relative z-10 text-sm font-bold uppercase tracking-[0.18em] text-white">
              Access Dashboard
            </span>
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-white/30">

          <p className="text-center text-[11px] uppercase tracking-[0.14em] text-stone-400 font-medium">
            Whitelist Influencer Portal
          </p>
        </div>
      </form>
    </div>
  );
}