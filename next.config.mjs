/** @type {import('next').NextConfig} */
const nextConfig = {
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
