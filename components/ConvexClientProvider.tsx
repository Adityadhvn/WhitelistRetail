"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  const convex = useMemo(() => {
    if (!convexUrl) return null;
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!convex) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bone p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-serif">Configuration Required</h1>
          <p className="text-charcoal/60">
            Please set the <code className="bg-charcoal/5 px-1">NEXT_PUBLIC_CONVEX_URL</code> environment variable to connect to your database.
          </p>
        </div>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
