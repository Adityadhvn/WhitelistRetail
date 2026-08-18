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
    title: v.string(),
    frontage: v.string(),
    floors: v.string(),
    brand: v.string(),
    size: v.string(),
    location: v.string(),
    priority: v.string(),
    category: v.union(
      v.literal("live_brand"),
      v.literal("size_based")
    ),
    logos: v.array(v.string()),
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