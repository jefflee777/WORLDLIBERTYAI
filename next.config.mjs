/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'coin-images.coingecko.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'assets.coingecko.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com', // Fallback for testing
            pathname: '/**',
          }
        ],
      },
};

export default nextConfig;
