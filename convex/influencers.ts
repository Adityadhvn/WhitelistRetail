import {
  mutation,
  query,
  action,
  internalQuery,
} from "./_generated/server";

import { internal } from "./_generated/api";

import { v } from "convex/values";

import bcrypt from "bcryptjs";

export const createInfluencer = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    name: v.string(),
    instagram: v.string(),
    referralCode: v.string(),
  },

  handler: async (ctx, args) => {
    // ==========================================
    // 1. CHECK AUTHENTICATION
    // ==========================================

    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Unauthenticated");
    }

    console.log("CONVEX IDENTITY:", {
      subject: identity.subject,
      issuer: identity.issuer,
      customClaims: identity.customClaims,
    });
    // ==========================================
    // 2. CHECK ADMIN ROLE
    // ==========================================

    const metadata = identity.metadata as {
      role?: string;
    };
    
    if (metadata?.role !== "admin") {
      throw new Error("Forbidden");
    }

    // ==========================================
    // 3. NORMALIZE INPUT
    // ==========================================

    const username = args.username.trim();
    const name = args.name.trim();
    const instagram = args.instagram.trim();
    const referralCode = args.referralCode.trim().toUpperCase();

    // ==========================================
    // 4. CHECK DUPLICATE USERNAME
    // ==========================================

    const existingUsername = await ctx.db
      .query("influencers")
      .withIndex("by_username", (q) =>
        q.eq("username", username)
      )
      .first();

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // ==========================================
    // 5. CHECK DUPLICATE REFERRAL CODE
    // ==========================================

    const existingReferralCode = await ctx.db
      .query("influencers")
      .withIndex("by_referral_code", (q) =>
        q.eq("referralCode", referralCode)
      )
      .first();

    if (existingReferralCode) {
      throw new Error("Referral code already exists");
    }

    // ==========================================
    // 6. CREATE INFLUENCER
    // ==========================================

    return await ctx.db.insert("influencers", {
      username,
      password: args.password,
      name,
      instagram,
      referralCode,
      isActive: true,
    });
  },
});



export const getInfluencers = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("influencers")
      .collect();
  },
});



export const getInfluencerStats = query({
  args: {
    referralCode: v.string(),
  },

  handler: async (ctx, args) => {

    // FIND ALL SCOUTS USING THIS REFERRAL CODE
    const scouts = await ctx.db
      .query("users")
      .filter((q) =>
        q.eq(q.field("referralCode"), args.referralCode)
      )
      .collect();

    // GET STATS FOR EACH SCOUT
    const scoutStats = await Promise.all(
      scouts.map(async (scout) => {

        const properties = await ctx.db
          .query("properties")
          .withIndex("by_scout", (q) =>
            q.eq("scoutId", scout._id)
          )
          .collect();

        // COUNT APPROVED
        const approvedCount = properties.filter(
          (p) => p.status === "approved"
        ).length;

        // COUNT LEASED
        const leasedCount = properties.filter(
          (p) => p.status === "leased"
        ).length;

        return {
          scoutId: scout._id,
          scoutName: scout.name,
          scoutEmail: scout.email,
          approvedCount,
          leasedCount,
        };
      })
    );

    // TOTAL APPROVED
    const totalApproved = scoutStats.reduce(
      (sum, scout) => sum + scout.approvedCount,
      0
    );

    // TOTAL LEASED
    const totalLeased = scoutStats.reduce(
      (sum, scout) => sum + scout.leasedCount,
      0
    );

    return {
      totalScouts: scouts.length,
      totalApproved,
      totalLeased,
      scouts: scoutStats,
    };
  },
});


export const validateReferralCode = query({
  args: {
    referralCode: v.string(),
  },

  handler: async (ctx, args) => {
    const code = args.referralCode.trim().toUpperCase();

    const influencer = await ctx.db
      .query("influencers")
      .withIndex("by_referral_code", (q) =>
        q.eq("referralCode", code)
      )
      .first();

    return !!influencer && influencer.isActive;
  },
});

export const getInfluencerForLogin = internalQuery({
  args: {
    username: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("influencers")
      .withIndex("by_username", (q) =>
        q.eq("username", args.username.trim())
      )
      .first();
  },
});

export const loginInfluencer = action({
  args: {
    username: v.string(),
    password: v.string(),
  },

  handler: async (
    ctx,
    args
  ): Promise<{
    success: boolean;
    referralCode: string;
    username: string;
    name: string;
  }> => {
    const username = args.username.trim();

    if (!username || !args.password) {
      throw new Error("Invalid credentials");
    }

    const influencer = await ctx.runQuery(
      internal.influencers.getInfluencerForLogin,
      {
        username,
      }
    );

    if (!influencer) {
      throw new Error("Invalid credentials");
    }

    if (!influencer.isActive) {
      throw new Error("Account inactive");
    }

    const validPassword = await bcrypt.compare(
      args.password,
      influencer.password
    );

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    return {
      success: true,
      referralCode: influencer.referralCode,
      username: influencer.username,
      name: influencer.name,
    };
  },
});

export const resetInfluencerPassword = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },

  handler: async (ctx, args) => {
    const username = args.username.trim();

    const influencer = await ctx.db
      .query("influencers")
      .withIndex("by_username", (q) =>
        q.eq("username", username)
      )
      .first();

    if (!influencer) {
      throw new Error("Influencer not found");
    }

    await ctx.db.patch(influencer._id, {
      password: args.password,
    });

    return {
      success: true,
    };
  },
});