/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
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
