import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitBrandLead = mutation({
  args: {
    brandName: v.string(),
    fullName: v.string(),
    designation: v.string(),
    contactDetails: v.string(),
    phoneNumber: v.string(),
    currentStoreCount: v.string(),
    expansionTarget: v.string(),
    targetMarkets: v.string(),
    preferredPropertyType: v.array(v.string()),
    requirementSpecs: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("brand_leads", {
      ...args,
      status: "new",
    });
  },
});

export const getBrandLeads = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("brand_leads").collect();
  },
});