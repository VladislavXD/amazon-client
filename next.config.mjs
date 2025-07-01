/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
    ],
  },
  trailingSlash: false,
  
  // Optimize for production
  output: 'standalone',
  
  // Configure API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
