"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";

import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Key,
  Building2,
  Users,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const landlordSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  email: z.string().email("Invalid email address"),

  phone1: z.string().min(10, "Valid phone number required"),

  phone2: z.string().optional(),

  propertyAddress: z
    .string()
    .min(10, "Please enter complete property address"),
});

type LandlordFormValues = z.infer<typeof landlordSchema>;

export default function LandlordsPage() {
  const [submitted, setSubmitted] = useState(false);

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
      await submitLead(data);

      setSubmitted(true);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f2] text-stone-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-28 px-5 md:px-10 lg:px-14">
        <div className="max-w-[1500px] mx-auto border border-stone-200 bg-[#f8f6f2] overflow-hidden rounded-[28px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[760px]">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="px-7 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col justify-center"
            >
              {/* Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 border border-stone-200 bg-white px-5 py-3 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />

                  <span className="text-sm font-medium text-stone-700">
                    India’s Trusted Leasing Platform
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-[3.1rem] md:text-[4rem] leading-[0.95] tracking-tight text-stone-900">
                Lease Faster.
                <br />
                Get Better Tenants.
                <br />
                Earn <span className="text-[#4b5f49]">More.</span>
              </h1>

              {/* Subtext */}
              <p className="mt-8 text-lg leading-8 text-stone-600 max-w-xl font-light">
                Whitelist connects your property with India’s top brands &
                businesses. Zero brokerage. Maximum value.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
                {[
                  "Zero Commission",
                  "Verified Tenants",
                  "Faster Leasing",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-stone-700"
                  >
                    <Check className="w-4 h-4 text-[#4b5f49]" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* MOBILE/TABLET FORM */}
              <div className="lg:hidden mt-12">
                <div className="bg-white border border-stone-200 rounded-[24px] p-6 shadow-sm">

                  <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#4b5f49] font-medium">
                      List Your Property
                    </p>

                    <h3 className="mt-3 text-3xl font-serif text-stone-900">
                      Get Started
                    </h3>

                    <p className="mt-3 text-stone-600 leading-7">
                      Fill in your details and our team will reach out shortly.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-[#e7efe4] mx-auto flex items-center justify-center">
                        <Check className="w-10 h-10 text-[#4b5f49]" />
                      </div>

                      <h4 className="mt-6 text-3xl font-serif text-stone-900">
                        Details Submitted
                      </h4>

                      <p className="mt-4 text-stone-600 leading-7">
                        Our leasing team will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="relative">
                        <User className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                        <input
                          type="text"
                          placeholder="Full Name"
                          {...register("fullName")}
                          className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />

                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                        <input
                          type="email"
                          placeholder="Email Address"
                          {...register("email")}
                          className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />

                        {errors.email && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                        <input
                          type="tel"
                          placeholder="Phone Number"
                          {...register("phone1")}
                          className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />

                        {errors.phone1 && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.phone1.message}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                        <input
                          type="tel"
                          placeholder="Phone Number 2"
                          {...register("phone2")}
                          className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="w-5 h-5 text-stone-400 absolute left-4 top-6" />

                        <textarea
                          rows={4}
                          placeholder="Property Address"
                          {...register("propertyAddress")}
                          className="w-full rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                        />

                        {errors.propertyAddress && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.propertyAddress.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-14 rounded-xl inline-flex items-center justify-center gap-3 font-medium"
                      >
                        <span>
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Details"}
                        </span>

                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[420px] lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop"
                alt="Commercial Property"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DESKTOP FORM SECTION */}
      <section className="hidden lg:block px-5 md:px-10 lg:px-14 mt-5">
        <div className="max-w-[1500px] mx-auto">
          <div className="bg-white border border-stone-200 rounded-[28px] p-10 shadow-sm">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              {/* LEFT TEXT */}
              <div className="max-w-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-[#4b5f49] font-medium">
                  List Your Property
                </p>

                <h3 className="mt-3 text-5xl font-serif text-stone-900 leading-tight">
                  Get Started
                </h3>

                <p className="mt-5 text-stone-600 leading-8 text-lg">
                  Fill in your property details and our leasing team will connect
                  with you shortly.
                </p>
              </div>

              {/* FORM */}
              {submitted ? (
                <div className="w-full lg:max-w-4xl text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-[#e7efe4] mx-auto flex items-center justify-center">
                    <Check className="w-12 h-12 text-[#4b5f49]" />
                  </div>

                  <h3 className="mt-8 text-5xl font-serif text-stone-900">
                    Details Submitted
                  </h3>

                  <p className="mt-5 text-lg text-stone-600 leading-8 max-w-xl mx-auto">
                    Thank you for listing your property with Whitelist.
                    Our leasing team will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full lg:max-w-4xl"
                >
                  <div className="grid grid-cols-2 gap-5">

                    <div className="relative">
                      <User className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                      <input
                        type="text"
                        placeholder="Full Name"
                        {...register("fullName")}
                        className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                      />

                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                      <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                      />

                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                      <input
                        type="tel"
                        placeholder="Phone Number 1 (WhatsApp)"
                        {...register("phone1")}
                        className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                      />

                      {errors.phone1 && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.phone1.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />

                      <input
                        type="tel"
                        placeholder="Phone Number 2"
                        {...register("phone2")}
                        className="w-full h-14 rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 outline-none focus:border-[#4b5f49] transition-all"
                      />
                    </div>

                    <div className="relative col-span-2">
                      <MapPin className="w-5 h-5 text-stone-400 absolute left-4 top-6" />

                      <textarea
                        rows={4}
                        placeholder="Property Address"
                        {...register("propertyAddress")}
                        className="w-full rounded-xl border border-stone-200 bg-[#faf9f6] pl-12 pr-4 pt-5 pb-4 outline-none focus:border-[#4b5f49] transition-all resize-none"
                      />

                      {errors.propertyAddress && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.propertyAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4b5f49] hover:bg-[#394736] transition-all text-white h-14 rounded-xl inline-flex items-center justify-center gap-3 font-medium"
                      >
                        <span>
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Details"}
                        </span>

                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-5 md:px-10 lg:px-14 mt-8">
        <div className="max-w-[1500px] mx-auto bg-white border border-stone-200 rounded-[24px] px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              {
                icon: Building2,
                number: "500+",
                label: "Landlords",
              },
              {
                icon: Key,
                number: "2500+",
                label: "Properties Leased",
              },
              {
                icon: ShieldCheck,
                number: "98%",
                label: "Landlord Satisfaction",
              },
              {
                icon: TrendingUp,
                number: "₹250 Cr+",
                label: "Total Leased Value",
              },
              {
                icon: Users,
                number: "5000+",
                label: "Brands & Businesses",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#f4f3ef] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-stone-700" />
                </div>

                <div>
                  <h3 className="text-3xl font-serif text-stone-900">
                    {item.number}
                  </h3>

                  <p className="text-sm text-stone-600 mt-1">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-5 md:px-10 lg:px-14">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-serif text-5xl text-stone-900">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-stone-600">
            A simple process. Maximum results.
          </p>

          <div className="max-w-[1500px] mx-auto bg-white border border-stone-200 rounded-[24px] px-8 py-10 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-4">
              {[
                {
                  step: "1",
                  title: "List Your Property",
                  desc: "Share your property details in just a few clicks.",
                  icon: Building2,
                },
                {
                  step: "2",
                  title: "We Market to Brands",
                  desc: "We promote your property to verified brands & businesses.",
                  icon: TrendingUp,
                },
                {
                  step: "3",
                  title: "Get Genuine Inquiries",
                  desc: "Receive serious inquiries from interested tenants.",
                  icon: Users,
                },
                {
                  step: "4",
                  title: "Close the Deal",
                  desc: "Finalize the lease and start earning more.",
                  icon: ShieldCheck,
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#f4f3ef] mx-auto flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-stone-700" />
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#dfe5d8] text-[#4b5f49] text-sm font-semibold flex items-center justify-center mx-auto mt-6">
                    {item.step}
                  </div>

                  <h3 className="mt-5 text-2xl font-serif text-stone-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-stone-600 leading-7 text-[15px] max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}