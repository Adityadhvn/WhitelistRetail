import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const updateRole = mutation({
  args: {
    clerkId: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      role: args.role,
    });
  },
});


export const createOrGetUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) return existing;

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      role: "",
      applicationStatus: "not_applied",
      scoutId: "",
      createdAt: Date.now(),
    });
  },
});


export const approveScout = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    // find user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) throw new Error("User not found");

    // count total approved scouts
    const allUsers = await ctx.db.query("users").collect();

    const approvedScouts = allUsers.filter(
      (u) => u.applicationStatus === "approved"
    );

    const nextNumber = approvedScouts.length + 1;

    // generate ID like SCOUT-DEL-0001
    const scoutId = `SCOUT-DEL-${String(nextNumber).padStart(4, "0")}`;

    await ctx.db.patch(user._id, {
      applicationStatus: "approved",
      scoutId,
    });

    return scoutId;
  },
});

export const rejectScout = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      applicationStatus: "rejected",
    });
  },
});