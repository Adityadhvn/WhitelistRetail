"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Shield, Zap, Globe, ArrowRight, StampIcon } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Turnstile } from "@marsidev/react-turnstile";
import { Suspense } from "react";
import Image from "next/image";


const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const markets = [
  {
    title: "Delhi-NCR",
    cities: "",
    img: "/images/markets/delhi-ncr.png",
  },
  {
    title: "Haryana",
    cities: "",
    img: "/images/markets/haryana.png",
  },
  {
    title: "Punjab",
    cities: "",
    img: "/images/markets/punjab.png",
  },
  {
    title: "Uttarakhand",
    cities: "",
    img: "/images/markets/uttarakhand.png",
  },
  {
    title: "Himachal Pradesh",
    cities: "",
    img: "/images/markets/himachal-pradesh.png",
  },
  {
    title: "Rajasthan",
    cities: "",
    img: "/images/markets/rajasthan.png",
  },
  {
    title: "Tricity",
    cities: "",
    img: "/images/markets/tricity.png",
  },
  {
    title: "Hyderabad",
    cities: "",
    img: "/images/markets/hyderabad.png",
  },
  {
    title: "Bengaluru",
    cities: "",
    img: "/images/markets/bengaluru.png",
  },
  {
    title: "Maharashtra",
    cities: "",
    img: "/images/markets/maharashtra.png",
  },
  {
    title: "Uttar Pradesh",
    cities: "",
    img: "/images/markets/uttar-pradesh.png",
  },
];

const brands = [
  {
    name: "CANTABIL",
    logo: "/images/brands/cantabil.png",
  },
  {
    name: "SNITCH",
    logo: "/images/brands/snitch.png",
  },
  {
    name: "LIBAS",
    logo: "/images/brands/libas.png",
  },
  {
    name: "SPARKY",
    logo: "/images/brands/sparky.png",
  },
  {
    name: "VALUE & VARIETY",
    logo: "/images/brands/value-variety.png",
  },
  {
    name: "LOUIS PHILIPPE",
    logo: "/images/brands/louis-philippe.png",
  },
  {
    name: "VAN HEUSEN",
    logo: "/images/brands/van-heusen.png",
  },
  {
    name: "ALLEN SOLLY",
    logo: "/images/brands/allen-solly.png",
  },
  {
    name: "WROGN",
    logo: "/images/brands/wrogn.png",
  },
  {
    name: "MR DIY",
    logo: "/images/brands/mr-diy.png",
  },
  {
    name: "OWND",
    logo: "/images/brands/ownd.png",
  },
];


function LandingPageContent() {
  const [turnstileToken, setTurnstileToken] = useState("");


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref && /^[A-Z0-9_-]{3,20}$/i.test(ref)) {
      const existing = localStorage.getItem("referralCode");

      if (!existing) {
        localStorage.setItem("referralCode", ref);
      }
    }
  }, []);



  const [openSignup, setOpenSignup] = useState(false);
  const [refCode, setRefCode] = useState(() => "");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("referralCode");
      if (stored) setRefCode(stored);
    }
  }, []);



  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const [isHovering, setIsHovering] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);






  const isValidReferral = useQuery(
    api.influencers.validateReferralCode,
    refCode
      ? { referralCode: refCode }
      : "skip"
  );




  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Calculate which item is closest to the center
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.scrollWidth / markets.length;
    const currentIndex = Math.round(scrollPosition / itemWidth);

    // Ensure we don't go out of bounds
    setActiveSlide(Math.min(Math.max(currentIndex, 0), markets.length - 1));

  };

  return (
    <main onMouseMove={!isMobile ? handleMouseMove : undefined}
      className="pt-24 md:pt-28 bg-[#Faf9f6] text-stone-900 min-h-screen selection:bg-stone-900 selection:text-white overflow-hidden">
      <Navbar />

      {/* Base Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
          backgroundSize: "24px 24px",
        }}
      />



      {/* 🔥 Highlighted Grid (cursor reactive) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-[0.22,1,0.36,1]"
          style={{
            opacity: isHovering ? 1 : 0,


            transform: `scale(${isHovering ? 1 : 0.98})`,
            transition: "opacity 0.4s ease, transform 0.4s ease",


            backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.45) 1.6px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.45) 1.6px, transparent 1px)
              `,
            backgroundSize: "24px 24px",

            maskImage: `radial-gradient(
                180px circle at ${mousePos.x}px ${mousePos.y}px,
                black,
                transparent 50%
              )`,
            WebkitMaskImage: `radial-gradient(
                180px circle at ${mousePos.x}px ${mousePos.y}px,
                black,
                transparent 50%
              )`,
          }}
        />
      )}


      {/* Hero Section */}
      <section
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative min-h-[85vh] overflow-hidden"
      >
        <div className="relative z-10 grid grid-cols-1 items-center md:grid-cols-[60%_40%]">
          {/* LEFT SIDE — HERO CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col justify-center px-6 py-4 text-left sm:px-10 md:px-12 md:py-6 lg:px-16 xl:px-20"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="mb-6 lg:px-2 text-sm font-semibold uppercase tracking-widest text-stone-500"
            >
              The infrastructure for 
              <span className="sm:hidden"> <br /></span>
              <span className="sm:inline"> </span>
              offline expansion
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="mb-7 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-stone-900 sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              Retail Expansion
              <br />
              <span className="italic text-[#4b5f49]">Simplified.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.div variants={fadeUp} className="mb-9 max-w-xl">
              <p className="text-base font-medium leading-relaxed text-stone-600 sm:text-lg md:text-lg lg:text-xl">
                Whitelist is a retail real-estate sourcing and expansion platform
                that connects brands with verified, expansion-ready commercial
                properties across high-growth cities.
              </p>

              <p className="mt-5 text-base font-medium leading-relaxed text-stone-600 sm:text-lg md:text-lg lg:text-xl">
                We bring structure, transparency, and coordination to offline
                retail expansion.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                href="/landlords#property-form"
                className="inline-flex w-full items-center justify-center gap-3 bg-stone-900 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 sm:w-fit sm:px-8"
              >
                <span>List a Property</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-stone-300/70 bg-stone-200"
          >
            <Image
              src="/images/retail-hero.jpeg"
              alt="Modern retail commercial property"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="scale-[1.01] object-cover"
            />
          </motion.div>
        </div>
      </section>


      {/* HOW WHITELIST WORKS */}
      <section className="relative py-28 px-6 bg-[#Faf9f6] text-stone-900 overflow-hidden">

        {/* Subtle Grid Background (matches your hero) */}
        <div className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative max-w-6xl mx-auto text-center space-y-20">

          {/* Heading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
              How Whitelist Works?
            </h2>

            <p className="max-w-2xl text-xl mx-auto font-medium text-stone-600 leading-relaxed">
              Whitelist sources and verifies retail spaces, matches them with brand
              requirements, and coordinates the entire expansion process through
              structured deal execution.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="group border border-stone-300 p-10 space-y-6 bg-transparent transition hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center">
                <div className="w-14 h-14 border border-stone-400 flex items-center justify-center transition group-hover:border-stone-600">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="font-serif font-semibold text-2xl">
                Property Sourcing
              </h3>

              <p className="text-base text-stone-600 leading-relaxed">
                We source expansion-ready retail spaces through verified scouts,
                landlords, and local market networks across high-growth cities.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group border border-stone-300 p-10 space-y-6 bg-transparent transition hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center">
                <div className="w-14 h-14 border border-stone-400 flex items-center justify-center transition group-hover:border-stone-600">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="font-serif font-semibold text-2xl">
                Verification and Matching
              </h3>

              <p className="text-base text-stone-600 leading-relaxed">
                Every property is reviewed for ownership, retail suitability, and
                market relevance before being matched with brand-specific expansion
                requirements and budget criteria.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group border border-stone-300 p-10 space-y-6 bg-transparent transition hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-center">
                <div className="w-14 h-14 border border-stone-400 flex items-center justify-center transition group-hover:border-stone-600">
                  <StampIcon className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3zm0 0V6m0 6v6m0 0H9m3 0h3" />
                  </StampIcon>
                </div>
              </div>

              <h3 className="font-serif font-semibold text-2xl">
                Coordinated Closure
              </h3>

              <p className="text-base text-stone-600 leading-relaxed">
                We manage site visits, negotiations, documentation, and stakeholder
                coordination ensuring structured, transparent, and efficient retail
                expansion from sourcing to deal closure.
              </p>
            </div>

          </div>
        </div>
      </section>








      {/* Network Strength Section */}
      <section className="relative py-20 bg-stone-900 text-stone-100">

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Whitelist Network Strength</h2>
            <p className="text-stone-400 font-light text-[22px] leading-relaxed tracking-wide">Inventory sourced through Verified Landlords and On-Ground Scouts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-stone-700 border-y border-stone-700 py-12">
            {[
              { number: "175+", label: "Properties Listed" },
              { number: "57", label: "Active Scouts" },
              { number: "75+", label: "Cities Covered" },
              { number: "35+", label: "Brands in Discussion" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-medium mb-2 text-white">{stat.number}</div>
                <div className="text-s py-2 font-bold tracking-widest uppercase text-stone-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* Stakeholders Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Built For Every Stakeholder</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "For Scouts",
                desc: "Institutionalize your local knowledge. Earn a commission on successful placements with full transparency.",
                link: "/scouts",
                btn: "Become a Scout",
                requiresReferral: true,
              },

              {
                icon: Shield,
                title: "For Landlords",
                desc: "Direct-to-brand placement with absolute discretion. No public listings, only high-intent expansion leads.",
                link: "/landlords#property-form",
                btn: "List Property",
                requiresReferral: false,
              },

              {
                icon: Globe,
                title: "For Brands",
                desc: "Replace unstructured brokerage with a data-driven sourcing layer. Access off-market assets vetted by local experts.",
                link: "/brands",
                btn: "Submit Requirement",
                requiresReferral: false,
              },
            ].map((item, i) => (
              <motion.div variants={fadeUp} key={i} className="bg-white p-10 border border-stone-200 hover:shadow-xl transition-shadow duration-500 group flex flex-col h-full">
                <div className="w-15 h-15 bg-stone-100 flex items-center justify-center rounded-full mb-8 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
                  <item.icon className="w-9 h-9 " />
                </div>
                <h3 className="text-2xl font-semibold font-serif mb-4">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed text-base font-medium mb-8 flex-grow">
                  {item.desc}
                </p>
                {item.requiresReferral ? (
                  <>
                    <SignedIn>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center space-x-2 text-s font-bold uppercase tracking-widest text-stone-900 hover:text-stone-700 transition-colors pt-6 border-t border-stone-100 w-full mt-auto"
                      >
                        <span>Go to Dashboard</span>

                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </SignedIn>

                    <SignedOut>
                      <button
                        onClick={() => setOpenSignup(true)}
                        className="inline-flex items-center space-x-2 text-s font-bold uppercase tracking-widest text-stone-900 hover:text-amber-700 transition-colors pt-6 border-t border-stone-100 w-full mt-auto"
                      >
                        <span>{item.btn}</span>

                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </SignedOut>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className="inline-flex items-center space-x-2 text-s font-bold uppercase tracking-widest text-stone-900 hover:text-amber-700 transition-colors pt-6 border-t border-stone-100 w-full mt-auto"
                  >
                    <span>{item.btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RETAIL MARKETS SECTION */}
      <section className="relative py-24 md:py-28 bg-[#111214] text-stone-100 overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-stone-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-0 md:px-6">
          {/* SECTION HEADER */}
          <div className="text-center mb-14 md:mb-16 px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-5xl font-serif tracking-tight text-white mb-4"
            >
              Retail Markets We Operate In
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-stone-400  font-medium text-base md:text-lg leading-relaxed"
            >
              Whitelist focuses on high-growth retail markets across key regions.
            </motion.p>
          </div>











          {/* MARKETS CAROUSEL / DESKTOP GRID */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 md:grid md:grid-cols-4 md:gap-4 md:px-0 md:pb-0 scroll-px-6 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {markets.map((market, index) => (
              <motion.div
                key={market.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="group relative shrink-0 snap-center w-[86vw] sm:w-[60vw] md:w-auto h-full flex flex-col overflow-hidden rounded-[14px] border border-white/[0.10] bg-white/[0.045] backdrop-blur-md p-3 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.065] hover:-translate-y-1"
              >
                {/* CARD CONTENT */}
                <div className="flex flex-col h-full">
                  {/* TITLE */}
                  <div className="px-2 pt-2 pb-3 text-center">
                    <h3 className="font-sans text-xl md:text-2xl text-stone-100 leading-relaxed font-medium">
                      {market.title}
                    </h3>
                    <p className="font-sans mt-1.5 text-[11px] md:text-xs text-stone-400 font-medium leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
                      {market.cities}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="relative w-full aspect-[1/1] overflow-hidden rounded-[11px] bg-stone-800">
                    <img
                      src={market.img}
                      alt={`${market.title} retail market`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Very subtle image overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-white/[0.03]" />
                  </div>

                </div>
              </motion.div>
            ))}

            {/* DON'T SEE YOUR CITY CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: markets.length * 0.06, duration: 0.6 }}
              className="group relative shrink-0 snap-center w-[86vw] sm:w-[60vw] md:w-auto min-h-full overflow-hidden rounded-[14px] border border-white/[0.10] bg-white/[0.045] backdrop-blur-md p-6 md:p-7 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.065] hover:-translate-y-1"
            >
              {/* MAIL ICON */}
              <div className="flex items-center justify-center w-8 h-8 mb-2 text-[#d5b85a]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                  <rect x="3" y="3" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>

              {/* TITLE */}
              <h3 className="text-xl md:text-2xl text-stone-100 tracking-tight">
                Don't See Your City?
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 max-w-[260px] text-sm md:text-sm leading-relaxed text-stone-400">
                We are continuously expanding our sourcing network across India.
              </p>
              <p className="mt-3 mb-2 max-w-[280px] text-sm md:text-sm leading-relaxed text-stone-400">
                If your city isn't listed yet, share your details with us and we'll notify you as soon as Whitelist starts operating in your market.
              </p>

              {/* MAIL CTA */}
              <Link
                href="mailto:contact@whitelistretail.com"
                className="group/mail mt-6 w-full h-10 rounded-[10px] border border-white/[0.10] flex items-center justify-between px-4 text-[11px] md:text-xs font-semibold tracking-[0.16em] uppercase text-[#d5b85a] transition-all duration-300 hover:bg-white/[0.06] hover:border-[#d5b85a]/40"
              >
                <span>Mail Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/mail:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE PAGINATION */}
          <div className="flex md:hidden justify-center items-center gap-2.5 mt-7 px-6">
            {markets.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "w-7 bg-[#d5b85a]" : "w-1.5 bg-stone-700"}`}
              />
            ))}
            {/* CTA card indicator */}
            <div className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === markets.length ? "w-7 bg-[#d5b85a]" : "w-1.5 bg-stone-700"}`} />
          </div>
        </div>
      </section>











      {/* Brands Grid */}
      <section className="border-y border-stone-200 bg-white py-18 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* HEADING */}
          <div className="mb-16 text-center md:mb-12">
            <h2 className="mb-4 font-serif font-semibold text-3xl md:text-4xl">
              Brands We Currently Work With
            </h2>
            <p className="text-base font-medium text-stone-500 md:text-lg">
              Partnering with growth-focused retail brands for their expansion needs.
            </p>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-2 py-5 gap-x-10 gap-y-16 md:grid-cols-4 md:gap-x-16 md:gap-y-20">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group flex flex-col items-center justify-center text-center"
              >
                {/* LOGO */}
                <div className="relative mb-3 flex h-20 w-full items-center justify-center transition-transform duration-500 group-hover:-translate-y-1 md:h-24">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={180}
                    height={80}
                    className="max-h-23 max-w-[180px] object-contain opacity-100  md:max-h-24 md:max-w-[220px]"
                  />
                </div>

                {/* BRAND NAME */}
                <div className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 transition-colors duration-300 group-hover:text-stone-900 md:text-sm">
                  {brand.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-20 px-6 border-t border-stone-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="text-2xl font-serif font-bold text-white tracking-widest">WHITELIST</div>
            <p className="text-sm font-light leading-relaxed">
              A structured retail expansion infrastructure company providing verified sourcing and coordination across India.
            </p>
          </div>
          <div>
            <h4 className="text-white text-s font-bold uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
              <li><Link href="/landlords" className="hover:text-white transition-colors">Landlords</Link></li>
              <li><Link href="/scouts" className="hover:text-white transition-colors">Scouts</Link></li>
              <li><Link href="/influencer-login" className="hover:text-white transition-colors">Influencer</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-s font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-s font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>Email: whitelist.retail@gmail.com</li>
              <li>Care: 9654755007</li>
              <li>DM us on Instagram</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>© 2026 Whitelist Retail Pvt Ltd. All rights reserved.</div>

          
          <div className="flex space-x-6">
          <div className="hover:text-white transition-colors">Platform engineered by Aditya Dhawan</div>
          </div>
        </div>
      </footer>



      <SignUpButton
        mode="modal"
        forceRedirectUrl="/scout-redirect"
      >
        <button id="hidden-signup" className="hidden" />
      </SignUpButton>



      {openSignup && (
        <>
          {/*Background blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setOpenSignup(false)}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/5"
          />

          {/*Glass popup */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white/60 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

              {/* subtle reflection */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 p-7 md:p-8">

                {/* TOP LABEL */}
                <div className="flex justify-center mb-6">
                  <div className="px-4 py-1.5 rounded-full border border-white/30 bg-white/20 text-[11px] uppercase tracking-[0.25em] font-bold text-stone-700">
                    Scout Access
                  </div>
                </div>

                {/* HEADING */}
                <div className="text-center mb-7">
                  <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-stone-900 mb-2">
                    Enter Referral Code
                  </h2>

                  <p className="text-sm text-stone-600 leading-relaxed font-light">
                    If you were invited by an existing scout,
                    enter their referral code below.
                  </p>
                </div>

                {/* INPUT */}
                <input
                  type="text"
                  placeholder="Referral code"
                  value={refCode}
                  onChange={(e) => setRefCode((e.target as HTMLInputElement).value.toUpperCase().replace(/\s/g, ""))}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/30
                    bg-white/30
                    px-5
                    py-4
                    text-sm
                    font-bold
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
                {/* BUTTONS */}
                <div className="mt-7 space-y-3">

                  {/* CONTINUE */}
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

                      // if user entered a code but it's invalid
                      if (refCode && !isValidReferral) {
                        alert("Invalid referral code");
                        return;
                      }

                      if (refCode && refCode.trim() !== "") {
                        localStorage.setItem(
                          "referralCode",
                          refCode.trim().toUpperCase()
                        );
                      }

                      setOpenSignup(false);
                      document.getElementById("hidden-signup")?.click();
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
                      tracking-[0.18em] ransition-all duration-300 hover:bg-stone-800 hover:scale-[1.01] active:scale-[0.99]
                    "
                  >
                    {!turnstileToken
                      ? "Verifying..."
                      : "Continue"}
                  </button>

                  {/* SKIP */}
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
                      document.getElementById("hidden-signup")?.click();
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
    </main>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingPageContent />
    </Suspense>
  );
}