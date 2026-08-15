"use client";

import { motion, AnimatePresence, type Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  BarChart3,
  MapPin,
  Users,
  Clock3,
  ClockAlert,
  Building2,
  UserPlus,
  Upload,
  WalletCards,
  Plus,
  X,
  CarFront,
  ClipboardCheck,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function ScoutsPage() {
  const [openSignup, setOpenSignup] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const referralCheck = useQuery(
    api.influencers.validateReferralCode,
    refCode.trim()
      ? {
        referralCode: refCode.trim().toUpperCase(),
      }
      : "skip"
  );

  const referralValid = referralCheck === true;

  const checkingReferral =
    refCode.trim() !== "" && referralCheck === undefined;


  const steps = [
    {
      number: "1",
      title: "Register",
      description:
        "Create your Scout profile with your basic details and if your profiile gets approved, you can start submitting commercial properties.",
      icon: UserPlus,
    },
    {
      number: "2",
      title: "Find a Property",
      description:
        "Use your local knowledge to identify vacant or upcoming commercial spaces that could match current retail brand requirements.",
      icon: Building2,
    },
    {
      number: "3",
      title: "Submit Details",
      description:
        "Upload accurate property information, photographs, location details, frontage, size and other specifications through your Scout dashboard",
      icon: Upload,
    },
    {
      number: "4",
      title: "Earn Incentive",
      description:
        "When your eligible property successfully leads to a closed deal, you receive a one-time incentive after Whitelist receives its commission.",
      icon: WalletCards,
    },
  ];

  const faqs = [
    {
      question: "What is a Whitelist Scout?",
      answer:
        "A Scout helps Whitelist discover vacant commercial properties that could match retail brand requirements in their local area.",
    },
    {
      question: "How do I become a Whitelist Scout?",
      answer:
        "Click the “Register as a scout” on our website and complete the Scout Application. Your profile will be reviewed before you are approved.",
    },
    {
      question: "How do Scouts earn money?",
      answer:
        "Scouts receive a one-time reward for properties that successfully result in a closed deal, and the payout is made at the same time Whitelist receives its commission. There are no monthly or recurring payments for the same property.",
    },
    {
      question: "Do I need real estate experience?",
      answer:
        "No. You don't need prior real-estate experience. Local knowledge, genuine property information and accurate submissions are what matter most.",
    },
    {
      question: "What properties should I submit?",
      answer:
        "Focus on vacant or soon-to-be-vacant commercial spaces with good locations, visibility, frontage and suitable sizes. You can also use the Requirements page to find active opportunities.",
    },
    {
      question: "How do I know what brands are looking for?",
      answer:
        "Your Scout dashboard includes current brand and size-based requirements, helping you identify properties that are more likely to be shortlisted.",
    },
  ];

  const handleSignup = async (saveReferral: boolean) => {
    if (!referralValid) {
      alert("Please enter a valid referral code.");
      return;
    }

    if (!turnstileToken) {
      alert("Please verify you are human.");
      return;
    }

    const verification = await fetch("/api/verify-turnstile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: turnstileToken,
      }),
    });

    const result = await verification.json();

    if (!result.success) {
      alert("Verification failed.");
      return;
    }

    if (saveReferral) {
      localStorage.setItem(
        "referralCode",
        refCode.trim().toUpperCase()
      );
    }

    setOpenSignup(false);

    document.getElementById("hidden-signup")?.click();
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#Faf9f6] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* EXISTING NAVBAR — KEEP YOUR CURRENT NAVBAR CODE */}
      <div className="absolute left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 items-center md:grid-cols-[60%_40%]">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 flex flex-col justify-start px-6 pb-6 pt-24 text-left sm:px-10 md:min-h-screen md:justify-center md:pb-6 md:pt-26 md:px-12 lg:px-14 xl:px-16"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex w-fit items-center gap-3"
            >
              <span className="h-px w-12 bg-[#4b5f49]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4b5f49]">
                For Scouts
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-7 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-stone-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              Turn Local Knowledge
              <br />
              <span className="italic text-[#4b5f49]">
                Into Real Earnings.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-base font-medium leading-relaxed text-stone-600 sm:text-lg md:text-lg lg:text-xl"
            >
              Become part of Whitelist&apos;s nationwide sourcing network.
              Submit verified retail properties, track your progress, and earn 
              performance based incentives on successful closures.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex w-full flex-col gap-3 sm:w-fit sm:flex-row"
            >
              <SignedIn>
                <a
                  href="/dashboard"
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[16px] bg-[#4b5f49] px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-900"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </a>
              </SignedIn>

              <SignedOut>
                <button
                  onClick={() => setOpenSignup(true)}
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[16px] bg-[#3b4c39] px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-900"
                >
                  Register As A Scout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </SignedOut>

              <a
                href="#how-it-works"
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[16px] border border-stone-300 bg-white px-8 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50"
              >
                Learn How It Works
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.03,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-0 mx-6 mt-6 h-[350px] w-[calc(100%-3rem)] overflow-hidden rounded-[22px] lg:absolute lg:bottom-2 lg:right-2 lg:top-2 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[47%]"
          >
            <img
              src="/images/scout-hero.jpeg"
              alt="Scout documenting a retail property"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>


      {/* Bottom Trust Strip */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 mt-14">
        <div className="max-w-7xl mx-auto bg-white border border-stone-200 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-4xl  md:text-5xl font-serif tracking-tight">
              Why Become A Whitelist Scout ?
            </h2>

            <p className="text-stone-500 mt-3 text-sm md:text-base font-medium max-w-3xl mx-auto">
              Turn your local property knowledge into flexible earnings with no fixed hours or brokers.
              Identify prime retail spots in your city and track your payouts directly through Whitelist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <WalletCards className="w-7 h-7 text-stone-700" />
              </div>

              <div>
                <h4 className="font-semibold text-[20px] mb-2">
                  Performance-Based Rewards
                </h4>

                <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                  Earn attractive incentives every time a property you source is successfully leased to a retail brand.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-stone-700" />
              </div>

              <div>
                <h4 className="font-semibold text-[20px] mb-2">
                  Work In Your Own City
                </h4>

                <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                  Discover commercial properties around you. No office, fixed hours, or prior real estate experience required.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-7 h-7 text-stone-700" />
              </div>

              <div>
                <h4 className="font-semibold text-[20px] mb-2">
                  Live Dashboard
                </h4>

                <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                  Track every property submission, monitor approvals, and stay updated on deal progress -all in one place.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-stone-700" />
              </div>

              <div>
                <h4 className="font-semibold text-[20px] mb-2">
                  Work Directly With Whitelist
                </h4>

                <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                  We don't rely on brokers or middlemen. Every verified property is reviewed and presented directly through our structured sourcing process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 pb-24 sm:pb-28"
      >
        <div className="mx-auto max-w-7xl px-6 pt-10 sm:px-8 lg:px-12">

          <div className="bg-white/78 backdrop-blur-md border border-white/70 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-5 md:px-10 py-10 md:py-14">

            {/* Heading */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-stone-950">
                How It Works
              </h2>

              {/* NO NEW DESCRIPTION ADDED */}
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16">

              {steps.map((step, i) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative"
                  >

                    {/* Connector */}
                    {i !== 3 && (
                      <div className="hidden lg:flex absolute top-[102px] left-[calc(100%-5px)] w-[50px] items-center z-10">
                        <div className="w-full border-t-2 border-dashed border-[#6b855f]" />

                        <div className="absolute right-0 w-2 h-2 border-t-2 border-r-2 border-[#6b855f] rotate-45" />
                      </div>
                    )}

                    {/* Step Card */}
                    <div className="relative bg-white/60 border border-stone-200 rounded-[28px] px-6 pt-12 pb-10 text-center h-full min-h-[370px]">

                      {/* Step Badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl bg-[#4b5f49] text-white text-base font-semibold flex items-center justify-center shadow-[0_6px_18px_rgba(75,95,73,0.25)] z-20">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="w-28 h-28 rounded-full bg-[#eef3e8] flex items-center justify-center mx-auto">
                        <Icon
                          className="w-11 h-11 text-[#4b5f49]"
                          strokeWidth={1.7}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.03em] text-stone-900">
                        {step.title}
                      </h3>

                      {/* Small Divider */}
                      <div className="w-10 h-[2px] bg-[#c9d6c2] mx-auto mt-4" />

                      {/* Description */}
                      <p className="mt-5 text-[15px] leading-7 font-medium text-stone-600 max-w-xs mx-auto">
                        {step.description}
                      </p>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* URGENCY BANNER */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-0 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-none bg-[#edf1ea] sm:rounded-2xl sm:border sm:border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">

              {/* CONTENT */}
              <div className="flex items-center gap-4 px-5 py-6 sm:gap-6 sm:p-10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#4b5f49]/20 bg-white text-[#4b5f49] sm:h-16 sm:w-16">
                  <ClockAlert
                    className="h-9 w-9 sm:h-8 sm:w-8"
                    strokeWidth={2}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-2xl font-bold leading-tight text-stone-900 sm:text-3xl">
                    Good Properties Don&apos;t Stay Available !
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-5 text-stone-600 sm:mt-3 sm:max-w-xl sm:text-[17px] sm:leading-relaxed">
                    Prime retail spaces are discovered quickly. If you find a
                    great location, submit it immediately before someone else
                    does.
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative h-[180px] min-h-0 overflow-hidden md:min-h-[230px]">
                <img
                  src="/images/scout-property.jpeg"
                  alt="Prime retail properties"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Soft fade from banner into image */}
                <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#edf1ea] via-[#edf1ea]/75 to-transparent md:block md:w-40" />
              </div>

            </div>
          </div>
        </div>
      </section>



            {/* WHAT MAKES A GOOD PROPERTY */}
            <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          {/* SECTION HEADING */}
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
              What Makes a Good Property?
            </h2>
          </div>

          {/* PROPERTY CRITERIA */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3e8]">
                <MapPin
                  className="h-7 w-7 text-[#4b5f49]"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-stone-900 sm:text-[20px]">
                Prime High Street Location
              </h3>

              <div className="mx-auto mt-3 h-[2px] w-8 bg-[#c9d6c2]" />

              <p className="mx-auto mt-4 max-w-xs text-[15px] font-medium leading-6 text-stone-500">
                Properties in high-footfall areas with strong visibility and
                accessibility.
              </p>
            </div>


            {/* CARD 2 */}
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3e8]">
                <Building2
                  className="h-7 w-7 text-[#4b5f49]"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-stone-900 sm:text-[20px]">
                Strong Commercial Surroundings
              </h3>

              <div className="mx-auto mt-3 h-[2px] w-8 bg-[#c9d6c2]" />

              <p className="mx-auto mt-4 max-w-xs text-[15px] font-medium leading-6 text-stone-500">
                Surrounded by popular retail brands, markets, and growing
                infrastructure.
              </p>
            </div>


            {/* CARD 3 */}
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3e8]">
                <CarFront
                  className="h-7 w-7 text-[#4b5f49]"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-stone-900 sm:text-[20px]">
                Easy Accessibility &amp; Visibility
              </h3>

              <div className="mx-auto mt-3 h-[2px] w-8 bg-[#c9d6c2]" />

              <p className="mx-auto mt-4 max-w-xs text-[15px] font-medium leading-6 text-stone-500">
                Good road connectivity, parking availability, and easy access
                for customers.
              </p>
            </div>


            {/* CARD 4 */}
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3e8]">
                <ClipboardCheck
                  className="h-7 w-7 text-[#4b5f49]"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-stone-900 sm:text-[20px]">
                Meets Brand Requirements
              </h3>

              <div className="mx-auto mt-3 h-[2px] w-8 bg-[#c9d6c2]" />

              <p className="mx-auto mt-4 max-w-xs text-[15px] font-medium leading-6 text-stone-500">
                The right size, frontage, and layout as per the brand&apos;s
                requirements.
              </p>
            </div>

          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mb-14 text-center">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          {/* TWO INDEPENDENT FAQ COLUMNS */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-3 md:gap-y-0">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-3">
              {faqs
                .filter((_, index) => index % 2 === 0)
                .map((faq, index) => {
                  const actualIndex = index * 2;
                  const isOpen = openFaq.includes(actualIndex);

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-stone-300 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpenFaq((prev) =>
                            isOpen
                              ? prev.filter((item) => item !== actualIndex)
                              : [...prev, actualIndex]
                          );
                        }}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="text-base font-semibold text-stone-900 sm:text-lg">
                          {faq.question}
                        </span>

                        <Plus
                          className={`h-5 w-5 flex-shrink-0 text-stone-700 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                          >
                            <p className="border-t border-stone-200 px-6 py-5 text-base font-medium leading-relaxed text-stone-600">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-3">
              {faqs
                .filter((_, index) => index % 2 === 1)
                .map((faq, index) => {
                  const actualIndex = index * 2 + 1;
                  const isOpen = openFaq.includes(actualIndex);

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-stone-300 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpenFaq((prev) =>
                            isOpen
                              ? prev.filter((item) => item !== actualIndex)
                              : [...prev, actualIndex]
                          );
                        }}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="text-base font-semibold text-stone-900 sm:text-lg">
                          {faq.question}
                        </span>

                        <Plus
                          className={`h-5 w-5 flex-shrink-0 text-stone-700 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                          >
                            <p className="border-t border-stone-200 px-6 py-5 text-base font-medium leading-relaxed text-stone-600">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-12 mb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-2xl bg-[#3b4c39]">
            <div className="flex flex-col gap-8 px-7 py-9 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">


                <div>
                <h2 className="font-serif text-2xl font-medium leading-tight text-white sm:text-3xl md:text-[32px]">
                    Ready to become a Whitelist Scout ?
                  </h2>

                  <p className="mt-2 max-w-5xl text-[17px] font-medium leading-relaxed text-white/75">
                    Join hundreds of scouts helping India&apos;s leading
                    retail brands expand into new cities.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:items-end">
                <SignedIn>
                  <a
                    href="/dashboard"
                    className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-md bg-[#d8bd68] px-8 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all duration-300 hover:bg-white"
                  >
                    Go To Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </SignedIn>

                <SignedOut>
                  <button
                    onClick={() => setOpenSignup(true)}
                    className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-md bg-[#d8bd68] px-5 sm:px-8 text-base font-bold uppercase tracking-widest text-stone-900 transition-all duration-300 hover:bg-white whitespace-nowrap">
                    Register As A Scout
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </SignedOut>
              </div>
            </div>
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
              <li>Email: contact@whitelistretail.com</li>
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

      {/* CLERK SIGNUP */}
      <SignUpButton
        mode="modal"
        forceRedirectUrl="/scout-redirect"
      >
        <button id="hidden-signup" className="hidden" />
      </SignUpButton>

      {/* SIGNUP MODAL */}
      <AnimatePresence>
        {openSignup && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onClick={() => {
                setOpenSignup(false);
                setRefCode("");
                setTurnstileToken("");
              }}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/30 bg-white/70 shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl">

                {/* GLASS GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent" />

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenSignup(false);
                    setRefCode("");
                    setTurnstileToken("");
                  }}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/70 bg-white/60 text-stone-600 backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-stone-900 hover:shadow-md"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>

                <div className="relative z-10 p-7 sm:p-8">

                  {/* LABEL */}
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full border border-white/30 bg-white/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-700">
                      Scout Access
                    </div>
                  </div>

                  {/* HEADING */}
                  <div className="mb-7 text-center">
                    <h2 className="mb-2 font-serif text-2xl tracking-tight text-stone-900 sm:text-3xl">
                      Enter Referral Code
                    </h2>

                    <p className="text-sm font-light leading-relaxed text-stone-600">
                      Enter the referral code provided by an existing Whitelist
                      scout to continue.
                    </p>
                  </div>

                  {/* REFERRAL INPUT */}
                  <div>
                    <input
                      type="text"
                      placeholder="Referral code"
                      value={refCode}
                      onChange={(e) => {
                        setRefCode(
                          e.target.value
                            .toUpperCase()
                            .replace(/\s/g, "")
                        );

                      }}
                      className={`w-full rounded-2xl border px-5 py-4 text-sm font-bold text-stone-900 outline-none transition-all duration-300 placeholder:text-stone-500 focus:bg-white/40 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.15)] ${referralValid
                        ? "border-[#4b5f49]/50 bg-[#4b5f49]/5"
                        : "border-white/30 bg-white/30 focus:border-white/50"
                        }`}
                    />

                    {/* VALIDATION MESSAGE */}
                    {refCode.trim() !== "" && (
                      <div className="mt-2 px-1 text-xs font-medium">
                        {checkingReferral ? (
                          <span className="text-stone-500">
                            Checking referral code...
                          </span>
                        ) : referralValid ? (
                          <span className="text-[#4b5f49]">
                            ✓ Valid referral code
                          </span>
                        ) : (
                          <span className="text-red-500">
                            Invalid referral code
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* TURNSTILE */}
                  <div className="mt-6 flex justify-center">
                    <Turnstile
                      siteKey={
                        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                      }
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                      }}
                    />
                  </div>

                  {/* CONTINUE */}
                  <div className="mt-7">
                    <button
                      onClick={() => handleSignup(true)}
                      disabled={
                        !referralValid ||
                        !turnstileToken ||
                        checkingReferral
                      }
                      className="w-full rounded-2xl bg-[#4b5f49] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-stone-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                    >
                      {!turnstileToken
                        ? "Verify You Are Human"
                        : !referralValid
                          ? "Enter Valid Referral Code"
                          : "Continue"}
                    </button>
                  </div>

                  {/* SMALL FOOTNOTE */}
                  <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-500">
                    A valid referral code is required to register as a Scout.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}