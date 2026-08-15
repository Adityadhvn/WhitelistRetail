"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ScoutCard from "@/components/ScoutCard";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ChevronDown,
  MapPin,
  ArrowRight,
  Info,
} from "lucide-react";

export default function ScoutDashboard() {
  const { user } = useUser();

  const [approvedOpen, setApprovedOpen] = useState(false);
  const [requirementsOpen, setRequirementsOpen] = useState(true);

  const [requirementCategory, setRequirementCategory] = useState<
    "live" | "size"
  >("live");

  const dbUser = useQuery(
    api.users.getUser,
    user ? { clerkId: user.id } : "skip"
  );

  const properties = useQuery(
    api.properties.getScoutInventory,
    dbUser ? { scoutId: dbUser._id } : "skip"
  );

  const requirements = useQuery(
    api.requirements.getRequirements
  );

  const filteredRequirements = requirements?.filter(
    (req) =>
      req.category ===
      (requirementCategory === "live"
        ? "live_brand"
        : "size_based")
  );

  const WHATSAPP_NUMBER = "919654755007";

  const handleSubmitProperty = (req: any) => {
    const message =
      `Hi, I am interested in submitting a property for the ${req.brand} requirement.
  
Requirement: ${req.title}
Location: ${req.location}
Size: ${req.size}
Frontage: ${req.frontage}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleSubmitAnyProperty = () => {
    const message = `Hi, I am a Whitelist Scout and I would like to submit a property that may not currently match a listed requirement. I would like to share the property details with you.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (!user) return null;

  if (dbUser === undefined) {
    return <div className="p-10">Loading...</div>;
  }

  if (dbUser === null) {
    return <div className="p-10">Setting up your account...</div>;
  }

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      <Navbar />

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0
        bg-[linear-gradient(to_right,rgba(75,95,73,0.06)_1px,transparent_1px),
linear-gradient(to_bottom,rgba(75,95,73,0.06)_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* CONTENT */}
      <div className="relative z-10 pt-24 pb-14 px-4 md:px-8 lg:px-10 space-y-6 md:space-y-8">

        {/* SCOUT CARD */}
        {dbUser.applicationStatus === "approved" && (
          <div className="w-full flex justify-center px-1 md:px-0">
            <div className="w-full">
              <ScoutCard user={dbUser} />
            </div>
          </div>
        )}

        {/* STATUS */}
        {dbUser.applicationStatus === "not_applied" && (
          <button
            onClick={() => window.open("SCOUT_FORM_URL", "_blank")}
            className="px-6 py-3 border border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Apply as Scout
          </button>
        )}

        {dbUser.applicationStatus === "under_review" && (
          <p className="text-gray-600">
            Application under review
          </p>
        )}

        {dbUser.applicationStatus === "rejected" && (
          <p className="text-red-500">
            Application not approved
          </p>
        )}

        {/* APPROVED LISTINGS */}
        {dbUser.applicationStatus === "approved" && (
          <div className="relative bg-gradient-to-br from-white via-[#f8fbf8] to-[#f1f6f1] border border-[#dfe7de] rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(75,95,73,0.10),0_0_0_1px_rgba(75,95,73,0.03)]">

            {/* UNIFORM GREEN GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,125,89,0.18),transparent_38%)] pointer-events-none" />

            {/* SOFT EDGE GLOW */}
            <div className="absolute inset-0 rounded-[28px] ring-1 ring-[#4b5f49]/8 shadow-[0_0_55px_rgba(91,121,87,0.10)] pointer-events-none" />

            <div className="relative z-10">

              {/* HEADER */}
              <button
                onClick={() => setApprovedOpen(!approvedOpen)}
                className="w-full flex items-center justify-between gap-4 px-5 md:px-8 py-6 md:py-8 bg-gradient-to-r from-[#f8fbf8] via-white to-[#f3f8f3] transition-all duration-300 hover:bg-[#f7faf7]"
              >
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl !font-sans font-semibold uppercase text-stone-900">
                    Approved Listings
                  </h2>

                  <p className="text-base font-medium md:text-base text-stone-500 mt-2 max-w-xl">
                    Your approved commercial inventory.
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: approvedOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-[#4b5f49]" />
                </motion.div>
              </button>

              {/* CONTENT */}
              <AnimatePresence initial={false}>
                {approvedOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden bg-gradient-to-br from-white via-[#f8fbf8] to-[#f1f6f1]"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 md:px-8 pb-8"
                    >

                      {properties === undefined && (
                        <p className="text-gray-500">
                          Loading listings...
                        </p>
                      )}

                      {properties?.length === 0 && (
                        <p className="text-gray-500">
                          No approved listings yet
                        </p>
                      )}

                      <div className="grid gap-5 md:grid-cols-2 mt-5">
                        {properties?.map((p) => (
                          <motion.div
                            key={p._id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-[#fcfdfc] backdrop-blur-sm border border-[#dfe7de] rounded-2xl px-5 md:px-6 py-5 shadow-[0_4px_18px_rgba(75,95,73,0.04)] hover:border-[#4b5f49]/30 transition-all duration-300"
                          >
                            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                              {/* LEFT */}
                              <div className="flex-1 min-w-0">

                                <div className="flex flex-wrap items-center gap-3">

                                  <div className="px-3 py-1 rounded-full bg-[#4b5f49]/10 text-[#4b5f49] text-xs font-medium">
                                    Approved
                                  </div>

                                  <div className="flex items-center gap-2 text-sm text-stone-500">
                                    <MapPin className="w-4 h-4" />
                                    {p.city}
                                  </div>
                                </div>

                                <h3 className="mt-4 text-xl md:text-2xl font-serif font-medium  text-stone-900">
                                  {p.title}
                                </h3>

                                <p className="mt-3 text-stone-500 text-sm font-medium leading-6 max-w-2xl">
                                  {p.teaser}
                                </p>
                              </div>

                              {/* RIGHT */}
                              <div className="flex flex-row xl:flex-col items-start xl:items-end justify-between gap-6 xl:min-w-[220px]">

                                <div className="flex gap-8">

                                  <div>
                                    <p className="text-[11px] uppercase tracking-wider text-stone-400">
                                      Area
                                    </p>

                                    <p className="mt-2 text-stone-900 font-medium">
                                      {p.sqft} sqft
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-[11px] uppercase tracking-wider text-stone-400">
                                      Commission
                                    </p>

                                    <p className="mt-2 text-[#4b5f49] font-semibold">
                                      ₹{p.potentialCommission}
                                    </p>
                                  </div>
                                </div>

                                <button className="flex items-center gap-2 text-sm text-[#4b5f49] hover:gap-3 transition-all duration-300 font-medium">
                                  View Details
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}




        {/* REQUIREMENTS SECTION */}
        {dbUser.applicationStatus === "approved" && (
          <div className="relative bg-gradient-to-br from-[#fcfdfc] via-[#f8fbf8] to-[#f1f6f1] border border-[#dfe7de] rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(75,95,73,0.08)]">

            {/* UNIFORM GREEN GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,125,89,0.14),transparent_40%)] pointer-events-none" />

            <div className="relative z-10">

              {/* HEADER */}
              <button
                onClick={() => setRequirementsOpen(!requirementsOpen)}
                className="w-full flex items-start md:items-center justify-between gap-4 px-5 md:px-8 py-6 md:py-8 bg-gradient-to-r from-[#f8fbf8] via-[#fcfdfc] to-[#f3f8f3] transition-colors duration-300"
              >
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl uppercase !font-sans font-semibold text-stone-900">
                    Requirements
                  </h2>

                  <p className="text-base md:text-base text-stone-500 mt-2 max-w-2xl font-medium leading-6 md:leading-7">
                    Current retail space requirements from brand partners.
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: requirementsOpen ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="mt-1 flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#4b5f49]" />
                </motion.div>
              </button>

              {/* CONTENT */}
              <AnimatePresence initial={false}>
                {requirementsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.32,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="overflow-hidden bg-gradient-to-br from-[#fcfdfc] via-[#f8fbf8] to-[#f1f6f1] will-change-[height,opacity]"
                  >
                    <div className="px-4 md:px-8 pb-8">



                      {/* REQUIREMENT CATEGORY TABS */}
                      <div className="mb-6">

                        <div className="grid grid-cols-2 w-full max-w-2xl mx-auto md:mx-0 bg-[#eef3ee] p-1 rounded-2xl border border-[#dfe7de]">

                          {/* LIVE BRAND REQUIREMENTS */}
                          <button
                            onClick={() => setRequirementCategory("live")}
                            className="relative px-3 py-3 md:px-6 uppercase md:py-3.5 rounded-xl text-xs sm:text-sm md:text-base font-medium text-center transition-colors duration-300"
                          >
                            {requirementCategory === "live" && (
                              <motion.div
                                layoutId="requirement-tab"
                                className="absolute inset-0 bg-[#4b5f49] rounded-xl shadow-[0_4px_14px_rgba(75,95,73,0.20)]"
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 30,
                                }}
                              />
                            )}

                            <motion.span
                              layout
                              className={`relative z-10 inline-block ${requirementCategory === "size"
                                  ? "text-stone-600 font-bold normal-case"
                                  : "text-white font-bold uppercase"
                                }`}
                              animate={{
                                letterSpacing:
                                  requirementCategory === "size" ? "0.02em" : "0em",
                                scale:
                                  requirementCategory === "size" ? 1.01 : 1,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                            >
                              Live Brand Requirements
                            </motion.span>
                          </button>


                          {/* SIZE BASED REQUIREMENTS */}
                          <button
                            onClick={() => setRequirementCategory("size")}
                            className="relative px-3 py-3 md:px-6 md:py-3.5 rounded-xl text-xs sm:text-sm md:text-base font-medium text-center transition-colors duration-300"
                          >
                            {requirementCategory === "size" && (
                              <motion.div
                                layoutId="requirement-tab"
                                className="absolute inset-0 bg-[#4b5f49] rounded-xl shadow-[0_4px_14px_rgba(75,95,73,0.20)]"
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 30,
                                }}
                              />
                            )}

                            <motion.span
                              layout
                              className={`relative z-10 inline-block  ${requirementCategory === "size"
                                  ? "text-white font-bold uppercase"
                                  : "text-stone-600 font-bold normal-case"
                                }`}
                              animate={{
                                letterSpacing:
                                  requirementCategory === "size" ? "0.02em" : "0em",
                                scale:
                                  requirementCategory === "size" ? 1.01 : 1,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                            >
                              Size Based Requirements
                            </motion.span>
                          </button>

                        </div>

                      </div>



                      {/* REQUIREMENT HELPER TEXT */}
                      <motion.div
                        key={requirementCategory}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mb-7 rounded-2xl border border-[#dfe7de] bg-[#f4f7f3] px-5 py-5 md:px-6 md:py-6"
                      >
                        <div className="flex items-start gap-3.5">

                          {/* INFO ICON */}
                          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#4b5f49]/10">
                            <Info className="h-4.5 w-4.5 text-[#4b5f49]" strokeWidth={2} />
                          </div>

                          {/* TEXT */}
                          <div className="min-w-0">

                            <h3 className="text-base !font-sans font-bold uppercase tracking-[0.08em] text-[#4b5f49]">
                              {requirementCategory === "live"
                                ? "Live Brand Requirements"
                                : "Size-Based Requirements"}
                            </h3>

                            <div className="mt-2 space-y-3 text-sm font-medium leading-6 text-stone-600 md:text-[15px] md:leading-7">

                              {requirementCategory === "live" ? (
                                <>
                                  <p>
                                    Think of the brands shown here as clues about where other
                                    brands may also want to open stores. If you find an empty
                                    property in the same market or nearby area, it can be relevant
                                    — it does not have to be directly beside the brand shown.
                                  </p>

                                  <p>
                                    We have also mentioned the recommended size, frontage, floors,
                                    and location preference for each requirement. Use these numbers
                                    as a guide while scouting. If a property is close to the
                                    requirements and has good visibility, frontage, and footfall,
                                    you can still submit it for our team to review.
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>
                                    These requirements help you identify properties based on size and
                                    format, even if you don&apos;t know which brand they may suit.
                                    Simply compare your property&apos;s size, frontage, number of
                                    floors, and location type with the categories listed below. Our
                                    team will match suitable properties with the most relevant retail
                                    brands from our network. These categories represent the typical
                                    space requirements of different retail formats rather than any
                                    specific brand.
                                  </p>

                                  <p>
                                    Unless mentioned otherwise, ground-floor access is
                                    expected for almost all retail businesses. If your property has
                                    excellent visibility, a prominent main-road location, and strong
                                    commercial potential, it&apos;s always worth submitting — even if
                                    it doesn&apos;t perfectly fit a category.
                                  </p>
                                </>
                              )}

                            </div>
                          </div>
                        </div>
                      </motion.div>



                      {/* REQUIREMENT CARDS */}
                      <div className="space-y-4">

                        {requirements === undefined && (
                          <p className="text-stone-500">
                            Loading requirements...
                          </p>
                        )}

                        {requirements?.length === 0 && (
                          <p className="text-stone-500 uppercase text-center py-10">
                            {requirementCategory === "live"
                              ? "No live brand requirements yet."
                              : "No size based requirements yet."
                            }
                          </p>
                        )}

                        {filteredRequirements?.map((req, index) => (
                          <motion.div
                            key={req._id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.24,
                              delay: index * 0.04,
                            }}
                            className="border border-[#e3e9e2] rounded-2xl p-5 md:p-6 bg-[#fcfdfc] hover:border-[#4b5f49]/20 transition-all duration-300"
                          >
                            <div className="flex flex-col gap-6">

                              {/* TOP */}
                              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                                {/* LEFT */}
                                <div className="flex flex-col lg:flex-row gap-6 flex-1">

                                  {/* LOGO */}
                                  <div className="w-full sm:w-[170px] h-[90px] bg-[#fcfdfc] border border-stone-200 rounded-xl flex items-center justify-center overflow-hidden mx-auto lg:mx-0">
                                    {req.logo ? (
                                      <img
                                        src={req.logo}
                                        alt={req.brand}
                                        className="max-w-[120px] max-h-[50px] object-contain"
                                      />
                                    ) : (
                                      <span className="text-sm font-medium text-stone-400">
                                        {req.brand}
                                      </span>
                                    )}
                                  </div>

                                  {/* DETAILS */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 flex-1 text-center sm:text-left">

                                    <div>
                                      <p className="text-lg font-semibold text-stone-900">
                                        {req.title}
                                      </p>

                                      <div className="mt-4">
                                        <p className="text-xs uppercase font-medium tracking-wide text-stone-400">
                                          Front Width
                                        </p>

                                        <p className="mt-2 text-stone-800">
                                          {req.frontage}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-xs uppercase font-medium tracking-wide text-stone-400">
                                        Size Required
                                      </p>

                                      <p className="mt-6 text-stone-800">
                                        {req.size}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-xs uppercase font-medium tracking-wide text-stone-400">
                                        Floors
                                      </p>

                                      <p className="mt-6 text-stone-800">
                                        {req.floors}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-xs uppercase font-medium tracking-wide text-stone-400">
                                        Location Preference
                                      </p>

                                      <p className="mt-6 font-medium text-stone-800">
                                        {req.location}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* RIGHT */}
                                <div className="flex flex-col sm:flex-row xl:flex-col items-center xl:items-end gap-4">

                                  <div
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${req.priority === "High Priority"
                                      ? "bg-[#4b5f49]/10 text-[#4b5f49]"
                                      : "bg-[#f3f5f3] text-stone-700"
                                      }`}
                                  >
                                    {req.priority}
                                  </div>

                                  <button
                                    onClick={() => handleSubmitProperty(req)}
                                    className="w-full mt-5 px-4 py-3 bg-[#4b5f49] text-white rounded-xl hover:bg-[#42533f] transition flex items-center justify-center gap-2 text-sm"
                                  >
                                    Submit Property
                                    <FaWhatsapp className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* FOOTER CTA */}
                        <div className="border border-stone-200 rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 bg-[#fcfdfc]">

                          <p className="text-stone-700 text-center lg:text-left leading-7">
                            Don’t see a matching requirement?
                            Submit a property anyway.
                          </p>

                          <button
                            onClick={handleSubmitAnyProperty}
                            className="w-full lg:w-auto px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-100 transition flex items-center justify-center gap-2"
                          >
                            Submit Any Property
                            <FaWhatsapp className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}