import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitLandlordLead = mutation({
  args: {
    fullName: v.string(),
    phone1: v.string(),
    email: v.string(),
    propertyAddress: v.string(),
    propertyType: v.string(),
    totalArea: v.number(),
    rentExpected: v.number(),
    frontage: v.number(),
    floors: v.string(),
    preferredTenantType: v.string(),
    additionalDetails: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("landlord_leads", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});