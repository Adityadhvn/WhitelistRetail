import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.whitelistretail.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/onboarding/',
        '/influencer-dashboard/',
        '/influencer-login/',
        '/scout-redirect/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}