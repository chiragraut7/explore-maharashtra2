/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
      img-src 'self' blob: data: https://www.goexploremaharashtra.in https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://*.googleapis.com https://*.gstatic.com https://*.google.com;
      font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com;
      connect-src 'self' https://www.google-analytics.com https://*.google.com https://*.adtrafficquality.google https://api.open-meteo.com;
      frame-src 'self' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://*.google.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;