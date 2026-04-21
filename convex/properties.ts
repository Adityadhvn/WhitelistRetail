import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAdminInventory = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // In a real app, we'd check if the user has the 'admin' role in the users table
    // For this demo, we'll assume any authenticated user can see the admin view if they know the route,
    // but we'll filter by role in a production setting.
    
    const properties = await ctx.db.query("properties").collect();
    
    const propertiesWithUrls = await Promise.all(properties.map(async (p: any) => {
      const urls = await Promise.all(p.mediaStorageIds.map((id: string) => ctx.storage.getUrl(id)));
      return { ...p, mediaUrls: urls };
    }));

    return propertiesWithUrls;
  },
});

export const getScoutInventory = query({
  args: { scoutId: v.id("users") },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_scout", (q) => q.eq("scoutId", args.scoutId))
      .collect();

    // 🔥 filter approved only
    return properties.filter((p) => p.status === "approved");
  },
});

export const submitProperty = mutation({
  args: {
    title: v.string(),
    teaser: v.string(),
    description: v.string(),
    address: v.string(),
    city: v.string(),
    sqft: v.number(),
    scoutId: v.id("users"),
    mediaStorageIds: v.array(v.string()),
    potentialCommission: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("properties", {
      ...args,
      status: "pending",
    });
  },
});

export const getPublicInventory = query({
  args: {},
  handler: async (ctx) => {
    const properties = await ctx.db.query("properties").collect();
    return properties.map(p => ({
      _id: p._id,
      teaser: p.teaser,
      city: p.city,
      sqft: p.sqft,
      status: p.status,
    }));
  },
});
