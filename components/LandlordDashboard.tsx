"use client";

import { motion } from "motion/react";
import { ExternalLink, Shield, CheckCircle } from "lucide-react";

interface LandlordDashboardProps {
  user: any;
}

export default function LandlordDashboard({ user }: LandlordDashboardProps) {
  const LANDLORD_FORM_URL = process.env.NEXT_PUBLIC_LANDLORD_FORM_URL || "https://forms.gle/example-landlord";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left Column: Status */}
      <div className="lg:col-span-1 space-y-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-charcoal/40">Status</h2>
            <div className="flex items-center space-x-3 text-2xl font-serif">
              <Shield className="w-6 h-6 text-bronze" />
              <span>Verified Landlord</span>
            </div>
            <p className="text-charcoal/60 text-sm font-light leading-relaxed">
              You are an officially verified landlord with Whitelist. Your assets are reviewed with absolute discretion.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Actions & Info */}
      <div className="lg:col-span-2 space-y-12">
        <div className="bg-white p-12 border border-charcoal/5 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">Direct-to-brand placement with absolute discretion.</h1>
            <p className="text-charcoal/60 text-lg font-light leading-relaxed max-w-2xl">
              Our platform is designed to connect premium retail spaces with high-intent expansion leads. No public listings, only high-fidelity digital consultancy.
            </p>
          </div>

          <div className="pt-8 border-t border-charcoal/5 flex flex-col sm:flex-row items-center gap-6">
            <a
              href={LANDLORD_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze w-full sm:w-auto flex items-center justify-center space-x-3 group"
            >
              <Shield className="w-4 h-4 group-hover:animate-pulse" />
              <span>List Your Property</span>
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
            <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
              Review time: 24-48 hours
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-charcoal/5 bg-bone/50 space-y-4">
            <h3 className="text-xl font-serif">Discretion First</h3>
            <p className="text-charcoal/60 text-sm leading-relaxed">
              Your assets are never publicly listed. We only share details with high-intent brands.
            </p>
          </div>
          <div className="p-8 border border-charcoal/5 bg-bone/50 space-y-4">
            <h3 className="text-xl font-serif">High-Intent Leads</h3>
            <p className="text-charcoal/60 text-sm leading-relaxed">
              Direct access to premium high-street and mall-based brands seeking expansion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
