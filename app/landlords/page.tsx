"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { ArrowRight, ShieldCheck, TrendingUp, Key } from "lucide-react";

export default function LandlordsPage() {
  return (
    <main className="min-h-screen bg-[#Faf9f6] text-stone-900">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center space-x-3">
               <span className="w-12 h-[1px] bg-amber-900"></span>
               <span className="text-xs uppercase tracking-widest font-bold text-amber-900">Property Owners</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-16 leading-[1.05] tracking-tight">
              Discretion is <br/> <span className="italic text-stone-500">Our Default.</span>
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 items-center">
              <div className="lg:col-span-7 space-y-8">
                <h3 className="text-2xl md:text-3xl font-serif text-stone-800">Direct-to-Brand Placement</h3>
                <p className="text-stone-600 text-lg leading-relaxed font-light">
                  Avoid the noise, hassle, and exposure of public listings. Whitelist connects your premium commercial assets directly to the expansion heads of global luxury and lifestyle brands.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {[
                    { icon: ShieldCheck, text: "Verified Expansion Leads Only" },
                    { icon: Key, text: "Absolute Discretion Maintained" },
                    { icon: TrendingUp, text: "Maximized Yield Potential" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 bg-white p-4 border border-stone-200">
                      <item.icon className="w-5 h-5 text-amber-700 flex-shrink-0" />
                      <span className="text-xs uppercase tracking-wider font-bold text-stone-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-5">
                <div className="bg-stone-900 text-white p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/20 rounded-full blur-3xl group-hover:bg-amber-700/30 transition-all duration-700"></div>
                  <h4 className="text-7xl md:text-8xl font-serif mb-6 relative z-10">94<span className="text-amber-700">%</span></h4>
                  <div className="h-[1px] w-full bg-stone-700 mb-6"></div>
                  <p className="text-xs uppercase tracking-widest font-bold text-stone-400 relative z-10 leading-relaxed">
                    Success rate for prime high-street & premium mall placements in the past 12 months.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <p className="text-xl text-stone-600 leading-relaxed font-serif italic max-w-xl">
                "Your asset deserves a tenant that matches its prestige. We curate the match, you sign the lease."
              </p>
              <a 
                href="https://forms.gle/5PU6ppDozyJtGaB38" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-5 bg-stone-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-amber-900 transition-colors inline-flex items-center space-x-4 flex-shrink-0"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}