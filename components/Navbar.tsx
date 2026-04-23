"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { useState,useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/scouts", label: "For Scouts" },
    { href: "/landlords", label: "For Landlords" },
    { href: "/brands", label: "The Brand Brief" },
  ];


  const [openSignup, setOpenSignup] = useState(false);
    const [refCode, setRefCode] = useState("");
    useEffect(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("referralCode");
        if (stored) setRefCode(stored);
      }
    }, []);

  return (
    <>
      <nav className=" fixed z-50 top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-md rounded-2xl md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-7xl md:rounded-2xl /* GLASS STYLE */ bg-white/10 backdrop-blur-xl backdrop-saturate-150 border border-white/30 /* DEPTH */ shadow-[0_10px_40px_rgba(0,0,0,0.12)] h-16 ">
        <div className="w-full px-8 h-full flex items-center justify-between relative">
          {/* ✅ DESKTOP BRAND (UNCHANGED) */}
          <Link href="/" className="hidden md:block items-center text-2xl font-serif font-bold tracking-tighter z-50">
            WHITELIST
          </Link>

          {/* ✅ MOBILE CENTER BRAND (NEW) */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          >
            <span className="text-xl font-serif font-bold tracking-widest">
              WHITELIST
            </span>
            <ChevronDown
              className={`w-4 h-4 mt-1 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* ✅ DESKTOP NAV (UNCHANGED) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-12 text-xs uppercase tracking-widest font-bold">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`hover:text-bronze transition-colors ${pathname === link.href ? 'text-bronze' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ✅ RIGHT SIDE (UNCHANGED) */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-xs uppercase tracking-widest font-bold hover:text-bronze transition-colors">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-xs uppercase tracking-widest font-bold hover:text-bronze transition-colors">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* ❌ REMOVE hamburger completely */}
          </div>
        </div>
      </nav>

      {/* 🔥 MOBILE GLASS DROPDOWN (NEW) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 🔥 Background blur (single source of blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 md:hidden backdrop-blur-sm bg-black/5 will-change-[opacity]"
            />

            {/* 🔥 Glass popup (NO backdrop blur here) */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-50 md:hidden will-change-transform"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/40 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-6 space-y-5">

                {/* ✨ subtle light reflection (Apple feel) */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-white/5 to-transparent via-white/10 to-transparent" />

                {/* CONTENT */}
                <div className="relative z-10 space-y-5">

                  {/* Links */}
                  <Link href="/" onClick={() => setIsOpen(false)} className="block font-bold text-center text-sm uppercase tracking-widest">
                    Home
                  </Link>

                  {navLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm uppercase tracking-widest"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Auth */}
                  <div className="pt-4 border-t border-white/30 flex flex-col items-center space-y-4">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="text-xs uppercase tracking-widest font-bold">
                          Login
                        </button>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-xs uppercase tracking-widest font-bold"
                      >
                        Dashboard
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}