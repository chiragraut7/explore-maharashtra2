/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  // Locate this section in your next.config.mjs
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://tpc.googlesyndication.com https://ep2.adtrafficquality.google;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
    img-src 'self' blob: data: https://*.basemaps.cartocdn.com https://www.goexploremaharashtra.in https://*.googleapis.com https://*.gstatic.com https://pagead2.googlesyndication.com https://ad.doubleclick.net https://*.google-analytics.com;
    font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://api.open-meteo.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google;
    
    frame-src 'self' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://ep2.adtrafficquality.google;
    
    frame-ancestors 'self';
  `.replace(/\s{2,}/g, ' ').trim()
}
];

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'goexploremaharashtra.com' }],
        destination: 'https://www.goexploremaharashtra.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.goexploremaharashtra.com' }],
        destination: 'https://www.goexploremaharashtra.in/:path*',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;