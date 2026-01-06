/** @type {import('next').NextConfig} */
const nextConfig = {
  // 重定向逻辑已移至 Vercel 后台统一管理
  // 避免与 Vercel Domain 设置冲突导致无限循环
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.getsheetmaster.com',
  //         },
  //       ],
  //       destination: 'https://getsheetmaster.com/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
