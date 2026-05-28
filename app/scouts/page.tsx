"use client";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import {ArrowRight,Check,Target,FileText,BarChart,} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import {SignUpButton,SignedIn,SignedOut} from "@clerk/nextjs";

export default function ScoutsPage() {
  const [openSignup, setOpenSignup] = useState(false);
  const [refCode, setRefCode] = useState(() => "");
  const [turnstileToken, setTurnstileToken] = useState("");


  return (
    <main className="min-h-screen bg-[#Faf9f6] text-stone-900">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-[#4b5f49]"></span>

              <span className="text-xs uppercase tracking-widest font-bold text-[#4b5f49]">
                Sourcing Partners
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold font-serif mb-8 leading-[1.05] tracking-tight">
              Institutionalize Your <br className="hidden md:block" />
              <span className="italic text-[#394736]/78">
                Local Knowledge.
              </span>
            </h1>

            <p className="text-stone-600 font-light max-w-2xl mb-16">
              Turn your deep understanding of local high-street retail and
              premium mall developments into a scalable, highly-rewarding
              business.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-start">

              {/* Left Side */}
              <div className="space-y-10 bg-white p-10 border border-stone-200 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-6">
                  Why Become a Whitelist Scout?
                </h3>

                <ul className="space-y-6">
                  {[
                    {
                      title: "10% Commission",
                      desc: "Transparent, guaranteed payouts on successful placements.",
                      icon: BarChart,
                    },
                    {
                      title: "Direct Brand Access",
                      desc: "Skip the middlemen and present to global expansion teams.",
                      icon: Target,
                    },
                    {
                      title: "Legal & Admin Support",
                      desc: "We handle the institutional credibility and paperwork.",
                      icon: FileText,
                    },
                    {
                      title: "Real-time Tracking",
                      desc: "Monitor the status of your property submissions via dashboard.",
                      icon: Check,
                    },
                    {
                      title: "Real-time Tracking",
                      desc: "Monitor the status of your property submissions via dashboard.",
                      icon: Check,
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded bg-stone-50 flex items-center justify-center flex-shrink-0 border border-stone-200 mt-1">
                        <item.icon className="w-4 h-4 text-[#4b5f49]" />
                      </div>

                      <div>
                        <span className="block text-sm font-bold uppercase tracking-widest text-stone-900 mb-1">
                          {item.title}
                        </span>

                        <span className="block text-sm text-stone-500 font-light leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side Cards */}
              <div className="flex flex-col gap-6">

                {/* Card 1 */}
                <div className="bg-white border border-amber-900/10 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-start gap-5">

                    <div className="w-14 h-14 rounded-full border border-amber-900/20 bg-white flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-[#4b5f49]" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif leading-snug text-stone-900 mb-4">
                        Post your property faster
                        <br />
                        or someone else will post it.
                      </h3>

                      <p className="text-stone-600 leading-relaxed font-light">
                        Great retail spaces get taken quickly.
                        <br />
                        Be the first to submit and earn the rewards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-stone-200 rounded-3xl p-8 mt-4 shadow-sm">
                  <div className="flex items-start gap-5">

                    <div className="w-14 h-14 rounded-full border border-stone-200 bg-stone-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-[#4b5f49]" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif leading-snug text-stone-900 mb-4">
                        We don&apos;t work with brokers or middlemen.
                      </h3>

                      <p className="text-stone-600 leading-relaxed font-light mb-5">
                        We work directly with landlords, because we believe in
                        transparency and fair deals.
                      </p>

                      <p className="text-stone-700 leading-relaxed">
                        Our commission is paid by landlords only.
                      </p>

                      <p><span className="font-semibold">
                        {" "}
                        You Earn, They Pay, Everyone Wins.
                      </span></p>

                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="bg-amber-50 border border-amber-900/10 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-lg text-[#4b5f49] leading-relaxed max-w-2xl">
                If you hold the keys to prime real estate in high-growth
                markets, we hold the mandates for the fastest-growing brands.
                Let&apos;s build.
              </p>

              <>
              <SignedIn>
                <a
                  href="/dashboard"
                  className="px-8 py-5 bg-[#4b5f49] text-white text-sm font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors inline-flex items-center space-x-4 flex-shrink-0 rounded-xl"
                >
                  <span>Go to Dashboard</span>

                  <ArrowRight className="w-4 h-4" />
                </a>
              </SignedIn>

              <SignedOut>
                <button
                  onClick={() => setOpenSignup(true)}
                  className="px-8 py-5 bg-[#4b5f49] text-white text-sm font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors inline-flex items-center space-x-4 flex-shrink-0 rounded-xl"
                >
                  <span>Register As Scout</span>

                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignedOut>
            </>
            </div>
          </motion.div>
        </div>
      </section>

      <SignUpButton
        mode="modal"
        forceRedirectUrl="/scout-redirect"
      >
        <button id="hidden-signup" className="hidden" />
      </SignUpButton>


      <AnimatePresence>
        {openSignup && (
          <>
            {/* Background Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setOpenSignup(false)}
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/5"
            />

            {/* Glass Modal */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white/40 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

                {/* Reflection */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

                <div className="relative z-10 p-7 md:p-8">

                  {/* Top Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="px-4 py-1.5 rounded-full border border-white/30 bg-white/20 text-[11px] uppercase tracking-[0.25em] font-bold text-stone-700">
                      Scout Access
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="text-center mb-7">
                    <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-900 mb-2">
                      Enter Referral Code
                    </h2>

                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                      If you were invited by an existing scout,
                      enter their referral code below.
                    </p>
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Referral code"
                    value={refCode}
                    onChange={(e) =>
                      setRefCode(
                        e.target.value.toUpperCase().replace(/\s/g, "")
                      )
                    }
                    className="w-full rounded-2xl border
                  border-white/30
                  bg-white/30
                  px-5
                  py-4
                  font-bold
                  text-sm
                  text-stone-900
                  placeholder:text-stone-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-white/50
                  focus:bg-white/40
                  focus:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]
                "
                  />

                <div className="flex justify-center mt-6">
                  <Turnstile
                    siteKey={
                      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                    }
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                    }}
                  />
                </div>
                  {/* Buttons */}
                  <div className="mt-7 space-y-3">

                    {/* Continue */}
                    <button
                      onClick={async () => {
                        if (!turnstileToken) {
                          alert("Please verify you are human.");
                          return;
                        }
                        const verification = await fetch(
                          "/api/verify-turnstile",
                          {method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              token: turnstileToken,
                            }),
                          }
                        );
                        const result = await verification.json();
                        if (!result.success) {
                          alert("Verification failed.");
                          return;
                        }
                        if (refCode && refCode.trim() !== "") {
                          localStorage.setItem(
                            "referralCode",
                            refCode.trim().toUpperCase()
                          );
                        }

                        setOpenSignup(false);

                        document
                          .getElementById("hidden-signup")
                          ?.click();
                      }}
                      disabled={!turnstileToken}
                      className="
                    w-full
                    rounded-2xl
                    bg-[#4b5f49]
                    text-white
                    py-4
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    hover:bg-stone-900
                    hover:scale-[1.01]
                    active:scale-[0.99]
                  "
                    >
                      {!turnstileToken
                        ? "Verifying..."
                        : "Continue"}
                    </button>

                    {/* Skip */}
                    <button
                      onClick={async () => {

                        if (!turnstileToken) {
                          alert("Please verify you are human.");
                          return;
                        }
                        const verification = await fetch(
                          "/api/verify-turnstile",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              token: turnstileToken,
                            }),
                          }
                        );
                        const result = await verification.json();
                        if (!result.success) {
                          alert("Verification failed.");
                          return;
                        }
                        setOpenSignup(false);

                        document
                          .getElementById("hidden-signup")
                          ?.click();
                      }}
                      disabled={!turnstileToken}
                      className="
                    w-full
                    rounded-2xl
                    border
                    border-white/20
                    bg-white/10
                    py-4
                    text-sm
                    text-stone-700
                    transition-all
                    duration-300
                    hover:bg-white/20
                  "
                    >
                      Skip for Now
                    </button>

                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}