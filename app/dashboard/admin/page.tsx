"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { ExternalLink, Play, Eye, FileText } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useUser();
  const inventory = useQuery(api.properties.getAdminInventory);
  const leads = useQuery(api.brand_leads.getBrandLeads);

  if (!user) return null;

  return (
    <main className="pt-20 bg-[#F5F5F3] min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif">Matchmaker Console</h1>
          <div className="flex space-x-4">
            <div className="bg-white px-4 py-2 border border-charcoal/5 text-xs uppercase tracking-widest font-bold">
              Active Assets: {inventory?.length || 0}
            </div>
            <div className="bg-white px-4 py-2 border border-charcoal/5 text-xs uppercase tracking-widest font-bold">
              New Leads: {leads?.length || 0}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          
          {/* Submissions Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-serif flex items-center space-x-2">
              <FileText className="w-5 h-5 text-bronze" />
              <span>Property Submissions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory?.map((item: any) => (
                <motion.div 
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white sharp-card p-6 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-bronze">
                        {item.city}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                        {item.sqft} SqFt
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif leading-tight">{item.title}</h3>
                    <p className="text-sm text-charcoal/60 line-clamp-2">{item.description}</p>
                    
                    {/* Private Media Player Placeholder */}
                    <div className="aspect-video bg-charcoal flex items-center justify-center group cursor-pointer relative overflow-hidden">
                      <Play className="w-8 h-8 text-white opacity-40 group-hover:opacity-100 transition-opacity z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-bold text-white/60">
                        Private Media Review
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-charcoal/5 flex items-center justify-between">
                    <button className="text-xs uppercase tracking-widest font-bold hover:text-bronze transition-colors flex items-center space-x-2">
                      <ExternalLink className="w-3 h-3" />
                      <span>Secure Link</span>
                    </button>
                    <button className="btn-bronze text-[10px] py-2 px-4">
                      Verify Asset
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Brand Leads Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-serif flex items-center space-x-2">
              <Eye className="w-5 h-5 text-bronze" />
              <span>Incoming Brand Briefs</span>
            </h2>
            <div className="bg-white border border-charcoal/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-charcoal/5 text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Target</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {leads?.map((lead: any) => (
                    <tr key={lead._id} className="border-b border-charcoal/5 hover:bg-bone/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-serif text-base">{lead.brandName}</p>
                        <p className="text-xs text-charcoal/40">{lead.sqft} SqFt Required</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal/60">{lead.city}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal/60">{lead.contactDetails}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] uppercase tracking-widest font-bold text-bronze hover:underline">
                          Match Assets
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
