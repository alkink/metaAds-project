/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    // Use different API URLs based on environment
    // In development, use localhost
    // In production, use the deployed backend URL or relative path
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '/api/v1'  // Aynı domain'de çalışacağı için göreceli yol kullanıyoruz
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