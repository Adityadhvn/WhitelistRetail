"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createOrGetUser);

  useEffect(() => {
    if (!user?.id) return;

    createUser({
      clerkId: user.id,
      name: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
    });
  }, [user?.id]);

  return null;
}