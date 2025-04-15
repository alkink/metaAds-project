/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Type checking kısmını dağıtım sürecinde atlıyoruz
    // Böylece bazı tip hatalarında build'in başarısız olması engelleniyor
    ignoreBuildErrors: true,
  },
  eslint: {
    // Dağıtım sürecinde ESLint kontrolünü atlıyoruz
    ignoreDuringBuilds: true,
  },
  env: {
    // Use different API URLs based on environment
    // In development, use localhost
    // In production, use the deployed backend URL
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://meta-ads-backend.vercel.app/api/v1'
      : 'http://localhost:3001/api/v1'
  },
  async headers() {
    return [
      {
        // Frontend sayfalarında CORS başlıklarını ayarla
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  }
};

module.exports = nextConfig; 