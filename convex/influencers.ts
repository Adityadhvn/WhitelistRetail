import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createInfluencer = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    name: v.string(),
    instagram: v.string(),
    referralCode: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("influencers", {
      username: args.username,
      password: args.password,
      name: args.name,
      instagram: args.instagram,
      referralCode: args.referralCode.toUpperCase(),
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
      const influencer = await ctx.db
        .query("influencers")
        .withIndex("by_referral_code", (q) =>
          q.eq("referralCode", args.referralCode.toUpperCase())
        )
        .first();
  
      return influencer !== null;
    },
  });

export const getInfluencer = query({
  args: {
    username: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("influencers")
      .filter((q) =>
        q.eq(q.field("username"), args.username)
      )
      .first();
  },
});