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
  
  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: ['@heroui/react', '@nextui-org/react', 'lodash'],
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  // Компилятор оптимизации
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Настройка webpack для уменьшения bundle size
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Исключаем дублирование зависимостей
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
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
