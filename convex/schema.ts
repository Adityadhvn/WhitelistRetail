import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.string(),
    applicationStatus: v.string(),
    scoutId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  properties: defineTable({
    title: v.string(),
    teaser: v.string(),
    description: v.string(),
    address: v.string(),
    city: v.string(),
    sqft: v.number(),

    scoutId: v.id("users"), // 🔥 important

    mediaStorageIds: v.array(v.string()),
    potentialCommission: v.number(),

    status: v.string(), // pending / approved / rejected
  }).index("by_scout", ["scoutId"]),

  brand_leads: defineTable({
    brandName: v.string(),
    requirementSpecs: v.string(),
    city: v.string(),
    sqft: v.number(),
    contactDetails: v.string(),
    status: v.string(),
  }),
});