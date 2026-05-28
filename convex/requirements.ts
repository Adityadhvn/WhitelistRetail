import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRequirements = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("brandRequirements")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});

export const createRequirement = mutation({
    args: {
      brand: v.string(),
      title: v.string(),
      frontage: v.string(),
      size: v.string(),
      floors: v.string(),
      location: v.string(),
      priority: v.string(),
      logo: v.string(),
    },
  
    handler: async (ctx, args) => {
      return await ctx.db.insert("brandRequirements", {
        ...args,
        isActive: true,
        createdAt: Date.now(),
      });
    },
  });

  export const deleteRequirement = mutation({
    args: {
      id: v.id("brandRequirements"),
    },
  
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });