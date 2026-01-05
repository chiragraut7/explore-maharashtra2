/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ⛔ Disable Turbopack (fixes Google Font error)
  },
};

export default nextConfig;
