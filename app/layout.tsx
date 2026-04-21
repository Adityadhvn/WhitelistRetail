import type {Metadata} from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import './globals.css';
import { Providers } from "./providers";
import UserSync from "@/components/UserSync";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Whitelist | Retail Sourcing Infrastructure',
  description: 'The specialized sourcing layer connecting Scouts, Landlords, and Brands.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkKey) {
    return (
      <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
        <body suppressHydrationWarning className="min-h-screen bg-bone text-charcoal font-sans flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-serif">Authentication Required</h1>
            <p className="text-charcoal/60">
              Please set the <code className="bg-charcoal/5 px-1">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> environment variable to enable authentication.
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
        <body suppressHydrationWarning className="min-h-screen bg-bone text-charcoal font-sans">
          <Providers>
          <UserSync /> 
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
