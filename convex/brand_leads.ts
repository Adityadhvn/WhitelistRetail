import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitBrandLead = mutation({
  args: {
    brandName: v.string(),
    requirementSpecs: v.string(),
    city: v.string(),
    sqft: v.number(),
    contactDetails: v.string(),
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
