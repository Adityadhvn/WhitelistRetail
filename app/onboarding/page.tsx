"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock3, ArrowRight,CircleCheck } from "lucide-react";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#Faf9f6] text-stone-900 flex items-center justify-center px-4 overflow-hidden relative">

      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-stone-200/40 blur-3xl rounded-full" />

        <div className="absolute bottom-[-140px] right-[-140px] w-[320px] h-[320px] bg-amber-100/40 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          w-full
          max-w-xl
          overflow-hidden
          rounded-[34px]
          border
          border-white/30
          bg-white/40
          shadow-[0_8px_40px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
        "
      >

        {/* Apple reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/85 via-white/5 to-transparent" />

        <div className="relative z-10 px-8 py-12 md:px-12 md:py-14 text-center">

          {/* icon */}
          <div className="w-16 h-16 rounded-full bg-white/60 border border-white/40 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CircleCheck className="w-9 h-9 text-stone-700" />
          </div>

          {/* badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/40 bg-white/30 text-[11px] uppercase tracking-[0.25em] font-bold text-stone-600 mb-7">
            Scout Application
          </div>

          {/* heading */}
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight text-stone-900 mb-5">
            Your application
            <br />
            is under review.
          </h1>

          {/* description */}
          <br />
          <p className="text-stone-600 leading-relaxed max-w-md mx-auto text-[15px] md:text-base">
            Your application is under review!
            <br />
            You’ll receive access once verification is complete.
          </p>

          {/* divider */}
          <div className="w-full h-px bg-white/40 my-9" />

          {/* form section */}
          <div className="space-y-5">

            <div>
              <p className="text-s font-bold text-stone-500 mb-5">
                Didn&apos;t complete the scout onboarding form?
              </p>

              <a
                href="https://forms.gle/gWMzjN3jV21jmmTG9"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-2
                  rounded-2xl
                  bg-stone-900
                  text-white
                  text-sm
                  uppercase
                  tracking-[0.18em]
                  font-bold
                  transition-all
                  duration-300
                  hover:bg-stone-800
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Fill Scout Form

                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* optional secondary link */}
            <div className="pt-4">
              <Link
                href="/"
                className="text-sm text-stone-500 font-bold hover:text-stone-900 transition-colors"
              >
                RETURN TO HOMEPAGE
              </Link>
            </div>

          </div>
        </div>
      </motion.div>
    </main>
  );
}