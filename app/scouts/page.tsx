"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { ArrowRight, Check, Target, FileText, BarChart } from "lucide-react";

export default function ScoutsPage() {
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
               <span className="text-xs uppercase tracking-widest font-bold text-amber-900">Sourcing Partners</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.05] tracking-tight">
              Institutionalize Your <br className="hidden md:block"/> <span className="italic text-stone-500">Local Knowledge.</span>
            </h1>
            <p className="text-xl text-stone-600 font-light max-w-2xl mb-16">
               Turn your deep understanding of local high-street retail and premium mall developments into a scalable, highly-rewarding business.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
              <div className="space-y-10 bg-white p-10 border border-stone-200">
                <h3 className="text-2xl font-serif text-stone-900 border-b border-stone-100 pb-6">The Scout Advantage</h3>
                <ul className="space-y-6">
                  {[
                    { title: "10% Commission", desc: "Transparent, guaranteed payouts on successful placements.", icon: BarChart },
                    { title: "Direct Brand Access", desc: "Skip the middlemen and present to global expansion teams.", icon: Target },
                    { title: "Legal & Admin Support", desc: "We handle the institutional credibility and paperwork.", icon: FileText },
                    { title: "Real-time Tracking", desc: "Monitor the status of your property submissions via dashboard.", icon: Check }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded bg-stone-50 flex items-center justify-center flex-shrink-0 border border-stone-200 mt-1">
                         <item.icon className="w-4 h-4 text-amber-700" />
                      </div>
                      <div>
                         <span className="block text-sm font-bold uppercase tracking-widest text-stone-900 mb-1">{item.title}</span>
                         <span className="block text-sm text-stone-500 font-light">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="bg-stone-900 text-white p-12 relative">
                  <div className="absolute top-6 left-6 text-6xl font-serif text-stone-700 opacity-50">&quot;</div>
                  <p className="text-2xl md:text-3xl font-serif mb-8 italic leading-relaxed relative z-10 pt-4">
                    Whitelist gave my network structure. I focus purely on sourcing the best corners in the city, while they handle the brand matching and deal closure.
                  </p>
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-12 h-[1px] bg-stone-600"></div>
                    <p className="text-xs uppercase tracking-widest font-bold text-stone-400">Senior Scout, Delhi-NCR</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-900/10 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-lg text-amber-900/80 leading-relaxed max-w-2xl">
                If you hold the keys to prime real estate in high-growth markets, we hold the mandates for the fastest-growing brands. Let's build.
              </p>
              <a 
                href="https://forms.gle/gWMzjN3jV21jmmTG9" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-5 bg-amber-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors inline-flex items-center space-x-4 flex-shrink-0"
              >
                <span>Register As Scout</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}