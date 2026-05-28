"use client";

import { motion } from "motion/react";

export default function ScoutCard({ user }: any) {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-[380px] h-[230px] rounded-2xl overflow-hidden"
      >
        {/* 🔥 Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800" />

        {/* ✨ Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%)]" />

        {/* 💎 Glass Effect */}
        <div className="absolute inset-0 backdrop-blur-[6px]" />

        {/* 🌈 Shine Animation */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
        />

        {/* 🧾 Card Content */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-s tracking-[0.3em] text-white/60">
              WHITELIST
            </h2>
            <span className="text-[10px] text-green-400 tracking-widest">
              ● ACTIVE
            </span>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Verified Scout
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">
              {user.name}
            </h3>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end">
            
            {/* ID */}
            <div>
              <p className="text-[10px] text-white/50 tracking-widest mb-1">
                ID NUMBER
              </p>
              <p className="font-mono text-sm tracking-wider">
                {user.scoutId}
              </p>
            </div>

            {/* Date */}
            <div className="text-right">
              <p className="text-[10px] text-white/40 tracking-widest mb-1">
                JOINED
              </p>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>

        {/* 🔲 Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      </motion.div>
    </div>
  );
}