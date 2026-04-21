"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function setUserRole(role: "scout" | "landlord") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  });

  return { success: true };
}
