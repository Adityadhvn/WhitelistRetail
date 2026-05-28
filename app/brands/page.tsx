"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import {
  CheckCircle,
  Building2,
  MapPin,
  Target,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Store,
} from "lucide-react";

const brandSchema = z.object({
  brandName: z.string().min(2, "Brand name is required"),
  requirementSpecs: z.string().min(10, "Please provide more details"),
  city: z.string().min(2, "City is required"),
  sqft: z.number().min(100, "Minimum 100 sqft"),
  contactDetails: z.string().email("Invalid email address"),
});

type BrandFormValues = z.infer<typeof brandSchema>;

export default function BrandsPage() {
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useMutation(api.brand_leads.submitBrandLead);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: { sqft: 1000 },
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      await submitLead(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const features = [
    {
      icon: Target,
      title: "Precision Sourcing",
      desc: "We match requirements based on footfall, frontage, and neighboring tenant mix.",
    },
    {
      icon: MapPin,
      title: "High-Growth Markets",
      desc: "Deep coverage across Delhi-NCR, UP, Rajasthan, and beyond.",
    },
    {
      icon: Building2,
      title: "Coordinated Execution",
      desc: "Managed documentation and unified communication through all deal stages.",
    },
  ];

  const stats = [
    { value: "5000+", label: "Verified Spaces" },
    { value: "120+", label: "Cities Covered" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const trustPoints = [
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      desc: "Location insights backed by real expansion demand.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Network",
      desc: "Trusted landlords and curated commercial inventory.",
    },
    {
      icon: Clock3,
      title: "Faster Closures",
      desc: "Reduced turnaround with streamlined deal coordination.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-stone-900 selection:bg-amber-900 selection:text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#F8F6F2] via-[#F8F6F2]/85 to-[#F8F6F2]/50 z-10" />

          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="grid lg:grid-cols-[1fr_560px] gap-16 items-start">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-amber-900/20 bg-white/70 backdrop-blur-sm text-[11px] font-bold uppercase tracking-[0.25em] text-[#4b5f49]">
                <Store className="w-3.5 h-3.5" />
                For Brands
              </div>

              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif leading-[0.98] tracking-tight">
                Your Growth.
                <br />
                <span className="text-[#4b5f49]">Our Network.</span>
                <br />
                Perfect Locations.
              </h1>

              <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-xl font-light">
                Tell us your expansion requirements. Our network of verified
                scouts and landlords will source high-potential spaces tailored
                to your brand&apos;s positioning and growth strategy.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/75 backdrop-blur-sm border border-stone-200 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="text-2xl font-serif text-stone-900">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>



              {/* Bottom Trust Strip */}
              <div className="mt-14 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  {trustPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 flex-1 items-start"
                    >
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-stone-700" />
                      </div>

                      <div>
                        <h4 className="text-s font-semibold mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-stone-500 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_15px_60px_rgba(0,0,0,0.08)] border border-stone-200 relative overflow-hidden">


                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 space-y-6"
                  >
                    <CheckCircle className="w-16 h-16 text-amber-700 mx-auto" />

                    <h2 className="text-3xl font-serif">
                      Brief Received.
                    </h2>

                    <p className="text-stone-500 font-light leading-relaxed">
                      Our expansion consultants will review your specifications
                      and reach out within 24 hours to discuss the next steps.
                    </p>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-xs uppercase tracking-widest bg-[#4b5f49] font-bold text-amber-900 border-b border-amber-900 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors"
                    >
                      Submit another brief
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-3">
                        Share Your Expansion Brief
                      </h2>

                      <p className="text-stone-500 leading-relaxed font-light">
                        Fill in your requirements and our team will curate
                        suitable opportunities aligned with your brand.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                        Brand Name
                      </label>

                      <input
                        {...register("brandName")}
                        className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                        placeholder="e.g. Whitelist"
                      />

                      {errors.brandName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.brandName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                          Target City
                        </label>

                        <input
                          {...register("city")}
                          className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                          placeholder="e.g. New Delhi"
                        />

                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                          Required SqFt
                        </label>

                        <input
                          type="number"
                          {...register("sqft", {
                            valueAsNumber: true,
                          })}
                          className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                        />

                        {errors.sqft && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.sqft.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                        Requirement Specs
                      </label>

                      <textarea
                        {...register("requirementSpecs")}
                        rows={5}
                        className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                        placeholder="Describe your ideal location, frontage, and neighboring brands..."
                      />

                      {errors.requirementSpecs && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.requirementSpecs.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500">
                        Contact Email
                      </label>

                      <input
                        {...register("contactDetails")}
                        className="w-full rounded-xl bg-stone-50/80 border border-stone-200 px-4 py-3.5 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                        placeholder="expansion@brand.com"
                      />

                      {errors.contactDetails && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contactDetails.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#4b5f49] text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#394736] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Brand Brief"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>


        {/* Bottom Trust Strip */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-16 -mt-2">
          <div className="max-w-7xl mx-auto bg-white border border-stone-200 rounded-[2rem]  md:p-10 shadow-sm">

            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-serif tracking-tight">
                Why Leading Brands Choose Whitelist
              </h2>

              <p className="text-stone-500 mt-3 text-sm md:text-base font-light max-w-2xl mx-auto">
                We combine technology, relationships, and real estate expertise
                to deliver a seamless leasing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-stone-700" />
                </div>

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Extensive Inventory
                  </h4>

                  <p className="text-sm text-stone-500 leading-relaxed font-light">
                    Access verified properties matching your exact expansion
                    requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-stone-700" />
                </div>

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Market Intelligence
                  </h4>

                  <p className="text-sm text-stone-500 leading-relaxed font-light">
                    Data-driven insights helping brands make smarter location
                    decisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Clock3 className="w-5 h-5 text-stone-700" />
                </div>

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Faster Turnaround
                  </h4>

                  <p className="text-sm text-stone-500 leading-relaxed font-light">
                    Streamlined coordination for quicker site closures and deal
                    movement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-stone-700" />
                </div>

                <div>
                  <h4 className="font-semibold text-xl mb-2">
                    Trusted by Brands
                  </h4>

                  <p className="text-sm text-stone-500 leading-relaxed font-light">
                    Preferred partner for retail, F&B, hospitality, and lifestyle
                    expansion.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}