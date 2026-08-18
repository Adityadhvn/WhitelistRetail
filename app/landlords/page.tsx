"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import {
  ArrowRight, ShieldCheck, TrendingUp, Building2, Users, Check, User, Mail, Phone, MapPin,
  Clock3, Headset, Network, Handshake, Eye, LayoutDashboard, FilePenLine, MessagesSquare, UserRound, FileCheck2,
} from "lucide-react";


const landlordSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required"),

  phone1: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  propertyAddress: z
    .string()
    .min(10, "Please enter complete property address"),

  propertyType: z
    .string()
    .min(1, "Please select a property type"),

  totalArea: z
    .number()
    .min(1, "Total area is required"),

  rentExpected: z
    .number()
    .min(1, "Expected rent is required"),

  frontage: z
    .number()
    .min(1, "Frontage is required"),

  floors: z
    .string()
    .min(1, "Please select number of floors"),

  propertyStatus: z
    .string()
    .min(1, "Please select a Property Status"),

  additionalDetails: z
    .string()
    .optional(),
});

type LandlordFormValues = z.infer<typeof landlordSchema>;

export default function LandlordsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const submitLead = useMutation(
    api.landlord_leads.submitLandlordLead
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LandlordFormValues>({
    resolver: zodResolver(landlordSchema),
  });

  const onSubmit = async (data: LandlordFormValues) => {
    try {
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
      await submitLead(data);

      setSubmitted(true);

      reset();
    } catch (error) {
      console.error(error);
    }
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
    <main className="relative min-h-screen text-stone-900 overflow-x-hidden">

      {/* GLOBAL BACKGROUND */}
      <div className="fixed left-0 top-0 -z-10 h-[100svh] w-screen overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F8F6F2]/0 via-[#F8F6F2]/55 to-[#F8F6F2]/90" />

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/landlord-hero.png')",
          }}
        />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">

        <div className="relative z-20 max-w-[1380px] mx-auto px-5 md:px-10 xl:px-16 pt-28 md:pt-32 pb-20 md:pb-28">

          <div className="grid lg:grid-cols-[1fr_580px] gap-24 xl:gap-32 items-start">

            {/* LEFT CONTENT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-[620px]"
            >

              <motion.div
                variants={fadeUp}
                className="mb-6 flex w-fit items-center gap-3"
              >
                <span className="h-px w-12 bg-[#4b5f49]" />

                <span className="text-xs font-semibold uppercase tracking-widest text-[#4b5f49]">
                  for property owners
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-[-0.06em] leading-[0.92] text-stone-950"
              >
                The Right Retail Tenant.
                <br />
                <span className="italic text-[#4b5f49]">
                  For The Right Property.
                </span>
              </motion.h1>


              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="mt-8 text-lg text-black leading-relaxed max-w-xl font-medium"
              >
                Whitelist connects your commercial property with leading national and international retail brands actively expanding across India.
                Our team verifies your property, identifies the right brand fit, and manages the leasing process from submission to closure.
              </motion.p>


              {/* Features */}
              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
              >
                {[
                  {
                    icon: Building2,
                    title: "Expanding Retail Brands Network"
                  },
                  {
                    icon: ShieldCheck,
                    title: "Dedicated Leasing Support"
                  },
                  {
                    icon: Clock3,
                    title: "Faster Vacancies Turned Into Value"
                  },
                ].map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4"
                    >
                      <Icon className="w-9 h-9 flex-shrink-0 text-[#749c71] stroke-[1.5]" />

                      <div>
                        <h3 className="!font-sans mt-1 text-base font-medium text-black leading-tight whitespace-normal">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* TRUST STRIP */}
              <motion.div
                variants={fadeUp}
                className="mt-12"
              >
                <div className="bg-white/72 backdrop-blur-md border border-white/70 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">

                  <div className="divide-y divide-stone-200/70">

                    {[
                      {
                        icon: Building2,
                        title: "Premium Exposure",
                        desc: "Your property reaches expanding retail & F&B brands actively scouting locations.",
                      },
                      {
                        icon: TrendingUp,
                        title: "Faster Closures",
                        desc: "Reduce vacancy periods with qualified tenant introductions and faster coordination.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Verified Businesses",
                        desc: "Connect only with serious and verified businesses through our curated network.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 px-5 py-6"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#edf2e7] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-[#4b5f49]" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-[20px] font-semibold text-stone-900 tracking-[-0.01em]">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-[15px] leading-7 text-stone-600 font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>


         
              {/* MOBILE FORM */}
              <div id="property-form" className="lg:hidden mt-10 scroll-mt-28 w-full">
                <div className="w-full bg-white/88 backdrop-blur-md border border-white/70 rounded-[28px] p-5 sm:p-7 shadow-[0_15px_60px_rgba(0,0,0,0.08)]">

                  {!submitted ? (
                    <>
                      <div className="mb-8 text-center">
                        <p className="text-[15px] mt-1 uppercase tracking-[0.2em] text-[#4b5f49] font-semibold">
                          List Your Property
                        </p>

                        <h2 className="text-3xl md:text-4xl mt-4 font-semibold font-serif tracking-tight mb-3">
                          Get Started
                        </h2>

                        <p className="mt-4 text-stone-500 leading-7 text-[15px] max-w-[290px] mx-auto">
                          Fill in your property details and our leasing team will connect with you shortly.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                      >

                        {/* Full Name + Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="relative">
                            <User className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                            <input
                              type="text"
                              placeholder="Full Name *"
                              {...register("fullName")}
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.fullName && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.fullName.message}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <Phone className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                            <input
                              type="tel"
                              maxLength={10}
                              inputMode="numeric"
                              placeholder="Phone Number *"
                              {...register("phone1")}
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.phone1 && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.phone1.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email + Property Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="relative">
                            <Mail className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                            <input
                              type="email"
                              placeholder="Email Address *"
                              {...register("email")}
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.email && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <MapPin className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                            <input
                              type="text"
                              placeholder="Property Address *"
                              {...register("propertyAddress")}
                              className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.propertyAddress && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.propertyAddress.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Property Type + Total Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="relative">
                            <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                            <select
                              {...register("propertyType")}
                              defaultValue=""
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            >
                              <option value="" disabled>
                                Property Type *
                              </option>
                              <option value="High Street">High Street</option>
                              <option value="Commercial Complex">Commercial Complex</option>
                              <option value="Standalone">Standalone</option>
                              <option value="Other">Other</option>
                            </select>

                            {errors.propertyType && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.propertyType.message}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                            <input
                              type="number"
                              min="1"
                              {...register("totalArea", {
                                valueAsNumber: true,
                              })}
                              placeholder="Total Area (sq ft) *"
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.totalArea && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.totalArea.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rent + Frontage */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                              ₹
                            </span>

                            <input
                              type="number"
                              min="1"
                              {...register("rentExpected", {
                                valueAsNumber: true,
                              })}
                              placeholder="Expected Rent (₹) *"
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.rentExpected && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.rentExpected.message}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                              ft
                            </span>

                            <input
                              type="number"
                              min="1"
                              {...register("frontage", {
                                valueAsNumber: true,
                              })}
                              placeholder="Frontage (ft) *"
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            />

                            {errors.frontage && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.frontage.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Floors + Property Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="relative">
                            <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                            <select
                              {...register("floors")}
                              defaultValue=""
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            >
                              <option value="" disabled>
                                No. of Floors *
                              </option>
                              <option value="Ground Floor">Ground Floor</option>
                              <option value="Ground + 1">Ground + 1</option>
                              <option value="Ground + 2">Ground + 2</option>
                              <option value="Ground + 3">Ground + 3</option>
                            </select>

                            {errors.floors && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.floors.message}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <Users className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                            <select
                              {...register("propertyStatus")}
                              defaultValue=""
                              className="w-full h-[58px] md:h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                            >
                              <option value="" disabled>
                                Property Status *
                              </option>
                              <option value="Vacant">Vacant</option>
                              <option value="Occupied">Occupied</option>
                              <option value="Upcoming Vacancy">Upcoming Vacancy</option>
                              <option value="Under Construction">Under Construction</option>
                            </select>

                            {errors.propertyStatus && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.propertyStatus.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div className="relative">
                          <FilePenLine className="w-5 h-5 text-stone-400 absolute left-5 top-5" />

                          <textarea
                            rows={4}
                            placeholder="Additional Details (optional)"
                            {...register("additionalDetails")}
                            className="w-full min-h-[120px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                          />

                          <p className="text-xs text-stone-500 mt-2 ml-1">
                            E.g. nearby brands, amenities, possession date, parking, etc.
                          </p>
                        </div>


                        <div className="flex justify-center pt-2">
                          <Turnstile
                            siteKey={
                              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                            }
                            onSuccess={(token) => {
                              setTurnstileToken(token);
                            }}
                          />
                        </div>



                        <button
                          type="submit"
                          disabled={isSubmitting || !turnstileToken}
                          className="w-full bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-[58px] md:h-[62px] rounded-2xl inline-flex items-center justify-center gap-3 font-bold text-[15px] shadow-lg shadow-[#4b5f49]/20"
                        >
                          <span>
                            {isSubmitting
                              ? "Submitting..."
                              : !turnstileToken
                                ? "Verifying..."
                                : "Submit Details"}
                          </span>

                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 rounded-full bg-[#e7efe4] mx-auto flex items-center justify-center">
                        <Check className="w-12 h-12 text-[#4b5f49]" />
                      </div>

                      <h3 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-stone-900">
                        Details Submitted
                      </h3>

                      <p className="mt-5 text-stone-600 leading-8 text-[15px] max-w-sm mx-auto">
                        Thank you for listing your property with Whitelist.
                        Our leasing team will connect with you shortly.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>



            {/* DESKTOP FORM */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              id="property-form-desktop"
              className="hidden lg:block lg:sticky lg:top-28"
            >
              <div className="bg-white/88 backdrop-blur-md p-10 md:p-12 rounded-[2.3rem] shadow-[0_15px_60px_rgba(0,0,0,0.08)] border border-white/70 relative overflow-hidden">

                {!submitted ? (
                  <>
                    <div className="mb-10 text-center">
                      <p className="text-[15px] mt-1 uppercase tracking-[0.2em] text-[#4b5f49] font-semibold">
                        List Your Property
                      </p>

                      <h2 className="text-3xl md:text-4xl mt-4 font-semibold font-serif tracking-tight mb-3">
                        Get Started
                      </h2>

                      <p className="mt-7 text-stone-500 leading-8 text-[15px]">
                        Fill in your property details and our leasing team will connect with you shortly.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >

                      {/* Full Name + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <User className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="text"
                            placeholder="Full Name *"
                            {...register("fullName")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <Phone className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="tel"
                            maxLength={10}
                            inputMode="numeric"
                            placeholder="Phone (Whatsapp)*"
                            {...register("phone1")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.phone1 && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.phone1.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email + Property Address */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Mail className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="email"
                            placeholder="Email Address *"
                            {...register("email")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.email && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <MapPin className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="text"
                            placeholder="Property Address *"
                            {...register("propertyAddress")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.propertyAddress && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.propertyAddress.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Property Type + Total Area */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                          <select
                            {...register("propertyType")}
                            defaultValue=""
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-10 text-stone-500 outline-none focus:border-[#4b5f49] transition-all"
                          >
                            <option value="" disabled>
                              Property Type *
                            </option>
                            <option value="High Street">High Street</option>
                            <option value="Commercial Complex">Commercial Complex</option>
                            <option value="Standalone">Standalone</option>
                            <option value="Other">Other</option>
                          </select>

                          {errors.propertyType && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.propertyType.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="number"
                            min="1"
                            {...register("totalArea", {
                              valueAsNumber: true,
                            })}
                            placeholder="Total Area (sq ft) *"
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.totalArea && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.totalArea.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Rent + Frontage */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                            ₹
                          </span>

                          <input
                            type="number"
                            min="1"
                            {...register("rentExpected", {
                              valueAsNumber: true,
                            })}
                            placeholder="Expected Rent (₹) *"
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.rentExpected && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.rentExpected.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                            ft
                          </span>

                          <input
                            type="number"
                            min="1"
                            {...register("frontage", {
                              valueAsNumber: true,
                            })}
                            placeholder="Frontage (ft) *"
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.frontage && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.frontage.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Floors + Preferred Tenant Type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Building2 className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                          <select
                            {...register("floors")}
                            defaultValue=""
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-10 text-stone-500 outline-none focus:border-[#4b5f49] transition-all"
                          >
                            <option value="" disabled>
                              No. of Floors *
                            </option>
                            <option value="Ground Floor">Ground Floor</option>
                            <option value="Ground + 1">Ground + 1</option>
                            <option value="Ground + 2">Ground + 2</option>
                            <option value="Ground + 3">Ground + 3</option>
                          </select>

                          {errors.floors && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.floors.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <Users className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                          <select
                            {...register("propertyStatus")}
                            defaultValue=""
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-10 text-stone-500 outline-none focus:border-[#4b5f49] transition-all"
                          >
                            <option value="" disabled>
                              Property Status *
                            </option>
                            <option value="Vacant">Vacant</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Upcoming Vacancy">Upcoming Vacancy</option>
                            <option value="Under Construction">Under Construction</option>
                          </select>

                          {errors.propertyStatus && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.propertyStatus.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="relative">
                        <FilePenLine className="w-5 h-5 text-stone-400 absolute left-5 top-5" />

                        <textarea
                          rows={4}
                          placeholder="Additional Details (optional)"
                          {...register("additionalDetails")}
                          className="w-full rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                        />

                        <p className="text-xs text-stone-500 mt-2 ml-1">
                          E.g. nearby brands, amenities, possession date, parking, etc.
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <Turnstile
                          siteKey={
                            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                          }
                          onSuccess={(token) => {
                            setTurnstileToken(token);
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !turnstileToken}
                        className="w-full bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-[62px] rounded-2xl inline-flex items-center justify-center gap-3 font-semibold text-[15px] shadow-lg shadow-[#4b5f49]/20"
                      >
                        <span>
                          {isSubmitting
                            ? "Submitting..."
                            : !turnstileToken
                              ? "Verifying..."
                              : "Submit Details"}
                        </span>

                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-28 h-28 mt-8 rounded-full bg-[#e7efe4] mx-auto flex items-center justify-center">
                      <Check className="w-16 h-16 text-[#4b5f49]" />
                    </div>

                    <h3 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-stone-900">
                      Details Submitted
                    </h3>

                    <p className="mt-6 mb-10 text-stone-600 font-medium leading-8 text-[16px] max-w-md mx-auto">
                      Thank you for listing your property with Whitelist.
                      Our leasing team will connect with you shortly.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-5 md:px-10 xl:px-16 relative z-20">
        <div className="max-w-7xl mx-auto px-0 md:px-4">

          <div className="bg-white/78 backdrop-blur-md border border-white/70 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-4 md:px-8 py-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">

              {[
                {
                  icon: Building2,
                  number: "175+",
                  label: "Properties Listed",
                },
                {
                  icon: Users,
                  number: "35+",
                  label: "Brands Connected",
                },
                {
                  icon: MapPin,
                  number: "75+",
                  label: "Cities Covered",
                },
                {
                  icon: Headset,
                  number: "Dedicated",
                  label: "Leasing Support",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center text-center relative ${i !== 3
                    ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:w-px lg:after:h-24 lg:after:bg-stone-200"
                    : ""
                    }`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#eef3e8] flex items-center justify-center mb-3">
                    <item.icon className="w-9 h-9 text-[#4b5f49]" />
                  </div>

                  <h3 className="text-[32px] !font-sans font-semibold tracking-[-0.05em] text-stone-950">
                    {item.number}
                  </h3>

                  <p className="mt-2 uppercase font-medium text-[15px] text-stone-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Trust Strip */}
      <div className="relative z-30 max-w-7xl mx-auto px-5 md:px-4 pb-10 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto bg-white border border-stone-200 rounded-[28px] p-5 sm:p-8 md:p-10 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-4xl  md:text-5xl font-serif tracking-tight">
              Why Property Owners Choose Whitelist ?
            </h2>

            <p className="text-stone-500 mt-3 text-sm md:text-base font-medium max-w-2xl mx-auto">
              We combine technology, relationships, and real estate
              expertise to deliver a seamless leasing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="flex items-center gap-4 lg:border-r lg:border-stone-200 lg:pr-8">
              <div className="w-14 h-14 rounded-full bg-[#e8f0e3] border-2 border-[#4b5f49] flex items-center justify-center flex-shrink-0">
                <Network className="w-9 h-9 text-[#4b5f49]" strokeWidth={1.8} />
              </div>


              <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                Strong network of expanding retail brands
              </p>

            </div>

            <div className="flex items-center gap-4 lg:border-r lg:border-stone-200 lg:pr-8">
              <div className="w-14 h-14 rounded-full bg-[#e8f0e3] border-2 border-[#4b5f49] flex items-center justify-center flex-shrink-0">
                <Handshake className="w-9 h-9 text-[#4b5f49]" />
              </div>


              <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                One dedicated relationship
                <br></br>manager
              </p>

            </div>

            <div className="flex items-center gap-4 lg:border-r lg:border-stone-200 lg:pr-8">
              <div className="w-14 h-14 rounded-full bg-[#e8f0e3] border-2 border-[#4b5f49] flex items-center justify-center flex-shrink-0">
                <Eye className="w-9 h-9 text-[#4b5f49]" />
              </div>



              <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                Transparent and professional communication
              </p>

            </div>

            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-full bg-[#e8f0e3] border-2 border-[#4b5f49] flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-9 h-9 text-[#4b5f49]" />
              </div>


              <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                Real time updates <br></br>through your own <br></br>landlord dashboard
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="pt-6 md:pt-8 pb-16 md:pb-24 px-5 md:px-4 relative z-20">
        <div className="max-w-7xl mx-auto px-0 md:px-4">

          <div className="bg-white/78 backdrop-blur-md border border-white/70 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-5 md:px-10 py-10 md:py-14">

            {/* Heading */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-stone-950">
                How It Works
              </h2>

              <p className="mt-4 text-[15px] md:text-base text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
                From property submission to lease completion,
                our team manages every step of the retail leasing process.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16">

              {[
                {
                  step: "1",
                  title: "Property Submission",
                  desc: "Submit your property details through a simple online form along with photos.",
                  icon: FilePenLine,
                },
                {
                  step: "2",
                  title: "Property Evaluation",
                  desc: "Our leasing team reviews and matches your property with suitable retail brands.",
                  icon: Building2,
                },
                {
                  step: "3",
                  title: "Brand Coordination",
                  desc: "We coordinate discussions, property visits, and communication with interested brands.",
                  icon: MessagesSquare,
                },
                {
                  step: "4",
                  title: "Lease Completion",
                  desc: "Once terms are agreed upon, we assist through the final leasing process.",
                  icon: Handshake,
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
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
                        {item.step}
                      </div>

                      {/* Icon */}
                      <div className="w-28 h-28 rounded-full bg-[#eef3e8] flex items-center justify-center mx-auto">
                        <Icon className="w-11 h-11 text-[#4b5f49]" strokeWidth={1.7} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.03em] text-stone-900">
                        {item.title}
                      </h3>

                      {/* Small Divider */}
                      <div className="w-10 h-[2px] bg-[#c9d6c2] mx-auto mt-4" />

                      {/* Description */}
                      <p className="mt-5 text-[15px] leading-7 font-medium text-stone-600 max-w-xs mx-auto">
                        {item.desc}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-12 pt-2 mb-6 sm:pb-16 sm:pt-4 sm:mb-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-2xl bg-[#3b4c39]">

            <div className="flex flex-col gap-7 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-10">

              {/* CONTENT */}
              <div className="min-w-0">
                <h2 className="font-serif text-2xl font-medigum leading-tight text-white sm:text-3xl md:text-[32px]">
                  Ready to List Your Property?
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/75 sm:text-[17px] sm:leading-relaxed md:text-[17px]">
                  Connect your property with leading retail brands expanding across
                  India. Submit your property details and let our team take it from
                  there.
                </p>
              </div>

              {/* CTA */}
              <div className="flex w-full flex-shrink-0 md:w-auto">
              <button
                type="button"
                onClick={() => {
                  const isDesktop = window.innerWidth >= 1024;

                  const target = document.getElementById(
                    isDesktop ? "property-form-desktop" : "property-form"
                  );

                  target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-md bg-[#d8bd68] px-6 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all duration-300 hover:bg-white sm:px-8 md:w-auto"
              >
                List Your Property
                <ArrowRight className="h-5 w-5" />
              </button>
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




    </main>
  );
} 