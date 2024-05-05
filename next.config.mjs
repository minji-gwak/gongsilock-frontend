/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/signup',
        destination: '/signup/mail',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
