import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.string(),
    applicationStatus: v.string(),
    referralCode: v.optional(v.string()),
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

    scoutId: v.id("users"), 

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

  landlord_leads: defineTable({
    fullName: v.string(),
    email: v.string(),
  
    phone1: v.string(),
    phone2: v.optional(v.string()),
  
    propertyAddress: v.string(),
  
    status: v.string(),
  
    createdAt: v.number(),
  }),

  brandRequirements: defineTable({
    brand: v.string(),
    title: v.string(),
    frontage: v.string(),
    size: v.string(),
    floors: v.string(),
    location: v.string(),
    priority: v.string(),
    logo: v.string(),
  
    isActive: v.boolean(),
  
    createdAt: v.number(),
  }),

  influencers: defineTable({
    username: v.string(),
    password: v.string(),
    name: v.string(),
    instagram: v.string(),
    referralCode: v.string(),
    isActive: v.boolean(),
  }).index("by_referral_code", ["referralCode"]),

  
});

