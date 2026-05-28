"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import { Turnstile } from "@marsidev/react-turnstile";
import {ArrowRight,ShieldCheck,TrendingUp,Building2,Users,Check,User,Mail,Phone,MapPin,} from "lucide-react";


const landlordSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required"),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  phone1: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  phone2: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional()
    .or(z.literal("")),

  propertyAddress: z
    .string()
    .min(10, "Please enter complete property address"),
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
      await submitLead({
        ...data,
        email: data.email || "",
      });

      setSubmitted(true);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative min-h-screen text-stone-900 overflow-x-hidden">

      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F2]/88 via-[#F8F6F2]/82 to-[#F8F6F2]/92 z-10" />

        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">

        <div className="relative z-20 max-w-[1380px] mx-auto px-6 md:px-10 xl:px-16 pt-32 pb-28">

          <div className="grid lg:grid-cols-[1fr_580px] gap-24 xl:gap-32 items-start">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-[620px]"
            >

              <div className="mb-6 flex items-center space-x-3">
                <span className="w-12 h-[1px] bg-[#4b5f49]"></span>

                <span className="text-xs uppercase tracking-widest font-bold text-[#4b5f49]">
                  Sourcing Partners
                </span>
              </div>
              {/* Heading */}
              <h1 className="text-[3.4rem] sm:text-6xl xl:text-7xl font-semibold tracking-[-0.06em] leading-[0.92] text-stone-950">
                Lease Faster.
                <br />
                Get Better Tenants.
                <br />
                <span className="italic text-[#4b5f49]">Earn More.</span>
              </h1>

              {/* Subtext */}
              <p className="mt-8 text-[19px] leading-9 text-stone-600 max-w-xl font-normal">
                Whitelist connects your property with India’s top brands &
                businesses. Zero brokerage. Maximum value.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-x-8 gap-y-5 mt-10">
                {[
                  "Zero Commission",
                  "Verified Tenants",
                  "Faster Leasing",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-stone-700 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#4b5f49] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* TRUST STRIP */}
              <div className="mt-16">
                <div className="bg-white/72 backdrop-blur-md border border-white/70 rounded-[34px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">

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
                        className="flex items-start gap-5 px-7 py-7"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-[#edf2e7] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-7 h-7 text-[#4b5f49]" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-[1.08rem] font-semibold text-stone-900 tracking-[-0.01em]">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-[15px] leading-7 text-stone-600 font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MOBILE FORM */}
              <div
                id="property-form"
                className="lg:hidden mt-12 scroll-mt-32"
              >
                <div className="bg-white/88 backdrop-blur-md border border-white/70 rounded-[2.3rem] p-8 shadow-[0_15px_60px_rgba(0,0,0,0.08)]">

                  {!submitted ? (
                    <>
                      <div className="mb-8 text-center">
                        <p className="text-sm mt-3 uppercase tracking-[0.2em] text-[#4b5f49] font-semibold">
                          List Your Property
                        </p>

                        <h3 className="mt-7 text-5xl font-semibold tracking-[-0.04em] text-stone-900 leading-none">
                          Get Started
                        </h3>

                        <p className="mt-5 text-stone-500 leading-8 text-[15px]">
                          Fill in your property details and our leasing team will connect with you shortly.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                      >

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
                            placeholder="Phone Number 1 *"
                            {...register("phone1")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                          {errors.phone1 && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.phone1.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <Phone className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="tel"
                            maxLength={10}
                            inputMode="numeric"
                            placeholder="Phone Number 2 (optional)"
                            {...register("phone2")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />

                        </div>

                        <div className="relative">
                          <Mail className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                          <input
                            type="email"
                            placeholder="Email Address (optional)"
                            {...register("email")}
                            className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                          />
                        </div>

                        <div className="relative">
                          <MapPin className="w-5 h-5 text-stone-400 absolute left-5 top-6" />

                          <textarea
                            rows={4}
                            placeholder="Full Property Address *"
                            {...register("propertyAddress")}
                            className="w-full rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                          />

                          <p className="text-xs text-stone-500 mt-2 ml-1">
                            Please enter complete property address
                          </p>

                          {errors.propertyAddress && (
                            <p className="text-red-500 text-xs mt-2">
                              {errors.propertyAddress.message}
                            </p>
                          )}
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
                          className="w-full bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-[62px] rounded-2xl inline-flex items-center justify-center gap-3  font-bold text-[15px] shadow-lg shadow-[#4b5f49]/20"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="hidden lg:block lg:sticky lg:top-28"
            >
              <div className="bg-white/88 backdrop-blur-md p-10 md:p-12 rounded-[2.3rem] shadow-[0_15px_60px_rgba(0,0,0,0.08)] border border-white/70 relative overflow-hidden">

                {!submitted ? (
                  <>
                    <div className="mb-10 text-center">
                      <p className="text-sm mt-3 uppercase tracking-[0.2em] text-[#4b5f49] font-semibold">
                        List Your Property
                      </p>

                      <h3 className="mt-7 text-5xl font-semibold tracking-[-0.04em] text-stone-900 leading-none">
                        Get Started
                      </h3>

                      <p className="mt-7 text-stone-500 leading-8 text-[15px]">
                        Fill in your property details and our leasing team will connect with you shortly.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >

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
                          placeholder="Phone Number 1 *"
                          {...register("phone1")}
                          className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />



                        {errors.phone1 && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.phone1.message}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <Phone className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                        <input
                          type="tel"
                          maxLength={10}
                          inputMode="numeric"
                          placeholder="Phone Number 2 (optional)"
                          {...register("phone2")}
                          className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />

                      </div>

                      <div className="relative">
                        <Mail className="w-5 h-5 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />

                        <input
                          type="email"
                          placeholder="Email Address (optional)"
                          {...register("email")}
                          className="w-full h-[62px] rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="w-5 h-5 text-stone-400 absolute left-5 top-6" />

                        <textarea
                          rows={4}
                          placeholder="Full Property Address *"
                          {...register("propertyAddress")}
                          className="w-full rounded-2xl border border-stone-200 bg-[#faf9f6] pl-14 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                        />

                        <p className="text-xs text-stone-500 mt-2 ml-1">
                          Please enter complete property address
                        </p>

                        {errors.propertyAddress && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.propertyAddress.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !turnstileToken}
                        className="w-full mt-11 bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-[62px] rounded-2xl inline-flex items-center justify-center gap-3 font-semibold text-[15px] shadow-lg shadow-[#4b5f49]/20"
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
                  <div className="text-center py-24">
                    <div className="w-28 h-28 mt-25 rounded-full bg-[#e7efe4] mx-auto flex items-center justify-center">
                      <Check className="w-14 h-14 text-[#4b5f49]" />
                    </div>

                    <h3 className="mt-15 text-5xl font-semibold tracking-[-0.05em] text-stone-900">
                      Details Submitted
                    </h3>

                    <p className="mt-6 mb-75 text-stone-600 leading-8 text-[16px] max-w-md mx-auto">
                      Thank you for listing your property with Whitelist.
                      <br />
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
      <section className="px-6 md:px-10 xl:px-16 relative z-20">
        <div className="max-w-[1380px] mx-auto">

          <div className="bg-white/78 backdrop-blur-md border border-white/70 rounded-[34px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-8 md:px-12 py-10">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">

              {[
                {
                  icon: Building2,
                  number: "10,000+",
                  label: "Properties Listed",
                },
                {
                  icon: Users,
                  number: "250+",
                  label: "Brands Connected",
                },
                {
                  icon: MapPin,
                  number: "120+",
                  label: "Cities Covered",
                },
                {
                  icon: ShieldCheck,
                  number: "4.9/5",
                  label: "Landlord Rating",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center text-center relative ${i !== 3
                    ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:w-px lg:after:h-24 lg:after:bg-stone-200"
                    : ""
                    }`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#eef3e8] flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-[#4b5f49]" />
                  </div>

                  <h3 className="text-5xl font-semibold tracking-[-0.05em] text-stone-950">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-[15px] text-stone-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pt-8 pb-24 px-6 md:px-10 xl:px-16 relative z-20">
        <div className="max-w-[1380px] mx-auto">

          <div className="bg-white/78 backdrop-blur-md border border-white/70 rounded-[34px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-8 md:px-12 py-12 md:py-14">

            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-stone-950">
                How It Works
              </h2>

              <p className="mt-4 text-[15px] md:text-base text-stone-600">
                List your property in 3 simple steps and connect with verified tenants.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-14">

              {[
                {
                  step: "1",
                  title: "Submit Details",
                  desc: "Share your property details with us.",
                  icon: Building2,
                },
                {
                  step: "2",
                  title: "We Match",
                  desc: "We match you with the right brands & businesses.",
                  icon: Users,
                },
                {
                  step: "3",
                  title: "Close Faster",
                  desc: "Finalize the deal and start earning more.",
                  icon: ShieldCheck,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative"
                >

                  {/* Connector Line */}
                  {i !== 2 && (
                    <div className="hidden md:block absolute top-16 left-[72%] w-[60%] border-t-2 border-dashed border-[#6b855f]" />
                  )}

                  <div className="relative bg-white/60 border border-stone-200 rounded-[30px] p-8 md:p-10 text-center h-full">

                    {/* Step Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-xl bg-[#4b5f49] text-white text-sm font-semibold flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-24 h-24 rounded-full bg-[#eef3e8] flex items-center justify-center mx-auto">
                      <item.icon className="w-10 h-10 text-[#4b5f49]" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-stone-900">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[15px] leading-7 text-stone-600 max-w-xs mx-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 