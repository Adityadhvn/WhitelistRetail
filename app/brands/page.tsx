"use client";

import { motion, type Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  CheckCircle,
  Building2,

  TrendingUp,
  ShieldCheck,
  Headset,
  UserSearch,
  Rocket,
  Clock3,

} from "lucide-react";

const brandSchema = z.object({
  brandName: z.string().min(2, "Brand / Company Name is required"),

  fullName: z.string().min(2, "Full Name is required"),

  contactDetails: z.string().email("Invalid email address"),

  phoneNumber: z.string().min(10, "Phone number is required"),

  currentStoreCount: z
    .string()
    .min(1, "Please select your current store count"),

  expansionTarget: z
    .string()
    .min(1, "Please select your expansion target"),

  targetMarkets: z.string().min(2, "Target markets are required"),

  preferredPropertyType: z
    .string()
    .min(1, "Please select a property type"),

  requirementSpecs: z
    .string()
    .min(10, "Please provide more details about your requirements"),
});

type BrandFormValues = z.infer<typeof brandSchema>;

export default function BrandsPage() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLead = useMutation(api.brand_leads.submitBrandLead);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
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

      await submitLead(data);

      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stats = [
    { value: "175+", label: "Verified Spaces" },
    { value: "75+", label: "Cities Covered" },
    { value: "35+", label: "Brands" },
  ];

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
    <>
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="fixed left-0 top-0 -z-10 h-[100svh] w-screen overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F8F6F2]/10 via-[#F8F6F2]/65 to-[#F8F6F2]/90" />

          <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/brand-hero.jpg')",
          }}
        />
      </div>
          
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pt-32 pb-20">
            <div className="grid min-w-0 lg:grid-cols-[1fr_620px] gap-16 items-start">
              {/* Left Side */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="w-full min-w-0 max-w-2xl -translate-y-4"
              >
               <motion.div
                  variants={fadeUp}
                  className="mb-6 flex w-fit items-center gap-3"
                >
                <span className="h-px w-12 bg-[#4b5f49]" />

                <span className="text-xs font-semibold uppercase tracking-widest text-[#4b5f49]">
                  for brands
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl xl:text-7xl font-semibold font-serif leading-[0.98] tracking-tight"
              >
                  Your Expansion.
                  <br />
                  <span className="italic text-[#4b5f49]">Our Network.</span>
                  <br />
                  Perfect Locations.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-8 text-lg text-black leading-relaxed max-w-xl font-medium"
                >
                  Tell us your expansion requirements. Our network of verified
                  scouts and landlords will source high-potential spaces
                  tailored to your brand&apos;s growth strategy.
                </motion.p>

                {/* Stats */}
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-3 gap-4 mt-12 max-w-xl"
                >
                  {stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white/75 backdrop-blur-sm border border-stone-200 rounded-2xl px-4 py-5 sm:p-5 shadow-sm min-w-0"
                    >
                      <div className="text-2xl font-medium text-stone-900">
                        {stat.value}
                      </div>

                      <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-widest text-stone-500 mt-2 leading-tight break-words">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* TRUST STRIP */}
                <motion.div
                  variants={fadeUp}
                  className="mt-10"
                >
                  <div className="bg-white/72 backdrop-blur-md border border-white/70 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">

                    <div className="divide-y divide-stone-200/70">

                      {[
                        {
                          icon: TrendingUp,
                          title: "Market Intelligence",
                          desc: "Location insights backed by real expansion supply and demand.",
                        },
                        {
                          icon: ShieldCheck,
                          title: "Verified Network",
                          desc: "We have Trusted landlords along with a curated commercial inventory for your needs",
                        },
                        {
                          icon: Clock3,
                          title: "Faster Closures",
                          desc: "Reduced turnaround time with streamlined deal coordination.",
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


              </motion.div>




              {/* Right Side: Form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full min-w-0 lg:sticky lg:top-28"
              >
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_15px_60px_rgba(0,0,0,0.08)] border border-stone-200 relative overflow-hidden">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <CheckCircle className="w-16 h-16 text-[#476845] mx-auto" />

                      <h2 className="text-4xl font-serif">
                        Brief Received.
                      </h2>

                      <p className="text-stone-500 font-medium leading-relaxed">
                        Our expansion consultants will review your
                        specifications and reach out within 24 hours to
                        discuss the next steps.
                      </p>

                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-900 pb-1 hover:text-[#4b5f49] hover:border-[#4b5f49] transition-colors"
                      >
                        Submit another brief
                      </button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Form Heading */}
                      <div className="mb-8 text-center">
                        <p className="text-[16px] font-bold uppercase tracking-[0.2em] text-[#4b5f49]">
                          Ready to scale ?
                        </p>

                        <h2 className="text-3xl md:text-4xl mt-4 font-semibold font-serif tracking-tight mb-3">
                          Share Your Expansion Brief
                        </h2>

                        <p className="text-stone-500 leading-relaxed font-medium">
                          Fill in your requirements and our team will curate
                          suitable opportunities aligned with your brand.
                        </p>
                      </div>

                      {/* Brand Name + Full Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Brand / Company Name *
                          </label>

                          <input
                            {...register("brandName")}
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            placeholder="e.g. Zudio"
                          />

                          {errors.brandName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.brandName.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Full Name *
                          </label>

                          <input
                            {...register("fullName")}
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            placeholder="e.g. Rahul Mehta"
                          />

                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Work Email + Phone Number */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Work Email *
                          </label>

                          <input
                            type="email"
                            {...register("contactDetails")}
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            placeholder="e.g. rahul@brand.com"
                          />

                          {errors.contactDetails && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.contactDetails.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Phone Number *
                          </label>

                          <input
                            type="tel"
                            {...register("phoneNumber")}
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            placeholder="e.g. +91 99XXX XXXXX"
                          />

                          {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Current Store Count + Expansion Target */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mt-6 space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Current Store Count *
                          </label>

                          <select
                            {...register("currentStoreCount")}
                            defaultValue=""
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-500 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                          >
                            <option value="" disabled>
                              Select range
                            </option>
                            <option value="1-10">1–10</option>
                            <option value="11-50">11–50</option>
                            <option value="51-100">51–100</option>
                            <option value="101-250">101–250</option>
                            <option value="251-500">251–500</option>
                            <option value="500+">500+</option>
                          </select>

                          {errors.currentStoreCount && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.currentStoreCount.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Expansion Target
                            <br></br>
                            (Next 12 Months) *
                          </label>

                          <select
                            {...register("expansionTarget")}
                            defaultValue=""
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-500 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                          >
                            <option value="" disabled>
                              Select range
                            </option>
                            <option value="1-10">1–10 stores</option>
                            <option value="11-25">11–25 stores</option>
                            <option value="26-50">26–50 stores</option>
                            <option value="51-100">51–100 stores</option>
                            <option value="100+">100+ stores</option>
                          </select>

                          {errors.expansionTarget && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.expansionTarget.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Target Markets + Preferred Property Type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Target Markets *
                          </label>

                          <input
                            {...register("targetMarkets")}
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            placeholder="e.g. Delhi, Mumbai, Pune, Bengaluru"
                          />

                          {errors.targetMarkets && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.targetMarkets.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                            Preferred Property Type *
                          </label>

                          <select
                            {...register("preferredPropertyType")}
                            defaultValue=""
                            className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-500 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                          >
                            <option value="" disabled>
                              Select type
                            </option>
                            <option value="High Street">High Street</option>
                            <option value="Mall">Mall</option>
                            <option value="Commercial Complex">Commercial Complex</option>
                            <option value="Standalone">Standalone</option>
                            <option value="Any">Any</option>
                          </select>

                          {errors.preferredPropertyType && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.preferredPropertyType.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Property Requirements */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                          Property Requirements *
                        </label>

                        <textarea
                          {...register("requirementSpecs")}
                          rows={3}
                          className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                          placeholder="Store size, frontage, preferred locations, neighboring brands, etc."
                        />

                        {errors.requirementSpecs && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.requirementSpecs.message}
                          </p>
                        )}
                      </div>

                      {/* Turnstile */}
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

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting || !turnstileToken}
                        className="w-full rounded-xl bg-[#4b5f49] text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#394736] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : !turnstileToken
                            ? "Verifying..."
                            : "Submit Brand Brief"}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4  pb-16 mt-2">
            <div className="max-w-7xl mx-auto bg-white border border-stone-200 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-4xl  md:text-5xl font-serif tracking-tight">
                  Why Leading Brands Choose Whitelist
                </h2>

                <p className="text-stone-500 mt-3 text-sm md:text-base font-medium max-w-2xl mx-auto">
                  We combine technology, relationships, and real estate
                  expertise to deliver a seamless leasing experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Extensive Inventory
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Access verified properties matching your exact expansion
                      requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Market Intelligence
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Data-driven insights helping brands make smarter
                      location decisions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Clock3 className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Faster Turnaround
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Streamlined coordination for quicker site closures and
                      deal movement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Trusted by Brands
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Preferred partner for retail, F&B, hospitality, and
                      lifestyle expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-16 mt-2">
            <div className="max-w-7xl mx-auto bg-white border border-stone-200 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                  Built for Retail Expansion Teams
                </h2>

                <p className="text-stone-500 mt-3 text-sm md:text-base font-medium max-w-3xl mx-auto">
                  Designed to help brands discover verified retail spaces, reduce sourcing time, and expand
                  across multiple cities through one trusted network.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Verified Properties
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Every property is carefully verified for ownership, dimensions, frontage, and retail suitability before submission.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <UserSearch className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Local Scout Network
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Discover expansion-ready commercial spaces backed by live market demand and on-ground sourcing insights.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Headset className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Dedicated Support
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      A dedicated team coordinates property evaluations, communication, site visits, and leasing discussions seamlessly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-7 h-7 text-stone-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[20px] mb-2">
                      Faster Rollouts
                    </h4>

                    <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
                      Accelerate retail expansion with verified opportunities, reducing sourcing time and improving rollout efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}