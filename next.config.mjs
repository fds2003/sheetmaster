/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.getsheetmaster.com',
          },
        ],
        destination: 'https://getsheetmaster.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
