"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Shield, Zap, Globe, ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";


const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const markets = [
  {
    title: "Delhi-NCR",
    cities: "Delhi · Gurgaon · Noida · Ghaziabad",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Uttar Pradesh",
    cities: "Lucknow · Noida · Varanasi · Kanpur",
    img: "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Rajasthan",
    cities: "Jaipur · Jodhpur · Udaipur · Ajmer",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
  }
];



export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Calculate which item is closest to the center
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.scrollWidth / markets.length;
    const currentIndex = Math.round(scrollPosition / itemWidth);
    
    // Ensure we don't go out of bounds
    setActiveSlide(Math.min(Math.max(currentIndex, 0), markets.length - 1));

  };

  return (
    <main className="pt-20 bg-[#Faf9f6] text-stone-900 min-h-screen selection:bg-amber-900 selection:text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      >
      {/* Base Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          {/* 🔥 Highlighted Grid (cursor reactive) */}
          {!isMobile &&(
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.45) 1.6px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.45) 1.6px, transparent 1px)
              `,
              backgroundSize: "28px 28px",

              maskImage: `radial-gradient(
                180px circle at ${mousePos.x}px ${mousePos.y}px,
                black,
                transparent 50%
              )`,
              WebkitMaskImage: `radial-gradient(
                180px circle at ${mousePos.x}px ${mousePos.y}px,
                black,
                transparent 50%
              )`,
            }}
          />
          )}
          
      <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-block mb-6 px-4 py-1.5 border border-stone-300 rounded-full text-xs font-semibold tracking-widest uppercase text-stone-500 bg-white/50 backdrop-blur-sm">
            the infrastructure for offline expansion
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-[1.05] tracking-tight text-stone-900">
            Retail Expansion<br className="hidden md:block"/> <span className="italic text-stone-600">Simplified.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl font-serif text-stone-600 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Whitelist is a retail real-estate sourcing and expansion platform that connects brands with verified, expansion-ready commercial properties across high-growth cities. 
            <br className="hidden md:block" /><br className="hidden md:block" />
            We bring structure, transparency, and coordination to offline retail expansion.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-0">
            <SignedIn>
              <Link href="/dashboard" className="px-8 py-4 bg-stone-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors">
                Go to Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-stone-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors w-full sm:w-auto">
                  Join as Scout
                </button>
              </SignUpButton>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-transparent border border-stone-900 text-stone-900 text-sm font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors w-full sm:w-auto">
                  List Property
                </button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
        </motion.div>
      </section>

      {/* Network Strength Section */}
      <section className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Whitelist Network Strength</h2>
            <p className="text-stone-400 font-light text-2xl font-serif tracking-wide">Inventory sourced through Verified Landlords and On-Ground Scouts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-800 border-y border-stone-800 py-12">
            {[
              { number: "4,250+", label: "Properties Listed" },
              { number: "850+", label: "Active Scouts" },
              { number: "42", label: "Cities Covered" },
              { number: "25+", label: "Brands in Discussion" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-serif font-medium mb-2 text-white">{stat.number}</div>
                <div className="text-xs font-bold tracking-widest uppercase text-stone-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Built For Every Stakeholder</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              
              { icon: Zap, title: "For Scouts", desc: "Institutionalize your local knowledge. Earn 10% commission on successful placements with full transparency.", link: "/scouts", btn: "Become a Scout" },
              { icon: Shield, title: "For Landlords", desc: "Direct-to-brand placement with absolute discretion. No public listings, only high-intent expansion leads.", link: "/landlords", btn: "List Property" },
              { icon: Globe, title: "For Brands", desc: "Replace unstructured brokerage with a data-driven sourcing layer. Access off-market assets vetted by local experts.", link: "/brands", btn: "Submit Requirement" },
            ].map((item, i) => (
              <motion.div variants={fadeUp} key={i} className="bg-white p-10 border border-stone-200 hover:shadow-xl transition-shadow duration-500 group flex flex-col h-full">
                <div className="w-14 h-14 bg-stone-100 flex items-center justify-center rounded-full mb-8 group-hover:bg-amber-900 group-hover:text-white transition-colors duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-serif mb-4">{item.title}</h3>
                <p className="text-stone-600 font-serif leading-relaxed font-light mb-8 flex-grow">
                  {item.desc}
                </p>
                <Link href={item.link} className="inline-flex items-center space-x-2 text-s font-bold uppercase tracking-widest text-stone-900 hover:text-amber-700 transition-colors pt-6 border-t border-stone-100 w-full mt-auto">
                  <span>{item.btn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RETAIL MARKETS SECTION - SIMPLE SWIPE CAROUSEL */}
      <section className="py-32 bg-[#2A2B2E] text-stone-100">
        <div className="max-w-7xl mx-auto px-0 md:px-6 relative">
          <div className="text-center mb-16 px-6 md:px-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-4 text-white"
            >
              Retail Markets We Operate In
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-stone-400 font-serif font-light text-lg"
            >
              Whitelist focuses on high-growth retail markets across key regions.
            </motion.p>
          </div>

          {/* Simple Swipe Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 md:grid md:grid-cols-3 md:gap-8 md:px-0 scroll-px-6 md:scroll-px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {markets.map((market, index) => (
              <div 
                key={index}
                className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center bg-[#EDEDED] rounded-xl p-6 flex flex-col items-center"
              >
                <h3 className="text-2xl font-serif text-stone-900 mb-2">{market.title}</h3>
                <p className="text-stone-500 font-light text-sm text-center mb-6 h-10">{market.cities}</p>
                
                <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-6 bg-stone-300">
                  <img 
                    src={market.img} 
                    alt={`${market.title} Illustration`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                </div>
                
                <button className="w-full py-3.5 px-4 border border-stone-300 rounded-lg flex justify-center items-center gap-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors text-sm uppercase tracking-wider font-semibold group">
                  {market.title} 
                  <div className="text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            ))}
            {/* Invisible spacer to prevent the last card from getting cut off or leaving a void */}
            <div className="w-[1px] shrink-0 md:hidden block"></div>
          </div>

          {/* Pagination Dots (Mobile Only) */}
          <div className="flex md:hidden justify-center items-center gap-3 mt-8">
            {markets.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? "w-8 bg-white" 
                    : "w-2 bg-stone-600"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Brands We Currently Work With</h2>
            <p className="text-stone-500 font-serif font-light">Partnering with growth-focused retail brands for their expansion needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {["Allen Solly", "OWND", "VAN HEUSEN", "CANTABIL", "COBB", "LOUIS PHILIPPE", "Sparky", "SKECHERS"].map((brand, i) => (
              <div key={i} className="text-xl md:text-2xl font-serif font-bold tracking-tight text-stone-800 text-center">
                {brand}
              </div>
            ))}
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
            </ul>
          </div>
          <div>
            <h4 className="text-white text-s font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>

            </ul>
          </div>
          <div>
            <h4 className="text-white text-s font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>whitelist.retail@gmail.com</li>
              <li>Care: 9654755007</li>
              <li>DM us on Instagram</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>© 2026 Whitelist Infrastructure Pvt Ltd. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}