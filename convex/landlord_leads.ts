import { mutation , query } from "./_generated/server";
import { v } from "convex/values";

export const submitLandlordLead = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),

    phone1: v.string(),
    phone2: v.optional(v.string()),

    propertyAddress: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("landlord_leads", {
      ...args,

      status: "new",

      createdAt: Date.now(),
    });
  },
});