"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { CheckCircle, Building2, MapPin, Target } from "lucide-react";

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
    defaultValues: { sqft: 1000 }
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      await submitLead(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#Faf9f6] text-stone-900 selection:bg-amber-900 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-5/12 pt-8"
        >
          <div className="inline-block mb-6 px-4 py-1.5 border border-amber-900/30 text-amber-900 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-50">
            For Brands
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif mb-8 leading-[1.1] tracking-tight">
            The <span className="italic">Brand</span> Brief.
          </h1>
          <p className="text-stone-600 text-lg mb-12 font-light leading-relaxed">
            Tell us your expansion requirements. Our network of verified scouts and landlords will source off-market opportunities tailored strictly to your brand&apos;s DNA.
          </p>

          <div className="space-y-8">
            {[
              { icon: Target, title: "Precision Sourcing", desc: "We match requirements based on footfall, frontage, and neighboring tenant mix." },
              { icon: MapPin, title: "High-Growth Markets", desc: "Deep coverage across Delhi-NCR, UP, Rajasthan, and beyond." },
              { icon: Building2, title: "Coordinated Execution", desc: "Managed documentation and unified communication through all deal stages." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 text-stone-700">
                  <feature.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{feature.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed font-light">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:w-7/12"
        >
          <div className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 to-amber-900" />
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-6"
              >
                <CheckCircle className="w-16 h-16 text-amber-700 mx-auto" />
                <h2 className="text-3xl font-serif">Brief Received.</h2>
                <p className="text-stone-500 font-light">Our expansion consultants will review your specifications and reach out within 24 hours to discuss the next steps.</p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="mt-8 text-xs uppercase tracking-widest font-bold text-amber-900 border-b border-amber-900 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors"
                >
                  Submit another brief
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-stone-500">Brand Name</label>
                  <input 
                    {...register("brandName")}
                    className="w-full bg-stone-50/50 border border-stone-200 px-4 py-3 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-all"
                    placeholder="e.g. Aesop"
                  />
                  {errors.brandName && <p className="text-red-500 text-xs mt-1">{errors.brandName.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-stone-500">Target City</label>
                    <input 
                      {...register("city")}
                      className="w-full bg-stone-50/50 border border-stone-200 px-4 py-3 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-all"
                      placeholder="e.g. Jaipur"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-stone-500">Required SqFt</label>
                    <input 
                      type="number"
                      {...register("sqft", { valueAsNumber: true })}
                      className="w-full bg-stone-50/50 border border-stone-200 px-4 py-3 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-all"
                    />
                    {errors.sqft && <p className="text-red-500 text-xs mt-1">{errors.sqft.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-stone-500">Requirement Specs</label>
                  <textarea 
                    {...register("requirementSpecs")}
                    rows={4}
                    className="w-full bg-stone-50/50 border border-stone-200 px-4 py-3 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-all resize-none"
                    placeholder="Describe your ideal location, frontage, and neighboring brands..."
                  />
                  {errors.requirementSpecs && <p className="text-red-500 text-xs mt-1">{errors.requirementSpecs.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-stone-500">Contact Email</label>
                  <input 
                    {...register("contactDetails")}
                    className="w-full bg-stone-50/50 border border-stone-200 px-4 py-3 text-stone-900 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-all"
                    placeholder="expansion@brand.com"
                  />
                  {errors.contactDetails && <p className="text-red-500 text-xs mt-1">{errors.contactDetails.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Brand Brief"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}