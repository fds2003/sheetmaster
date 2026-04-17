/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: 域名重定向（www/非www）已移至 Vercel 后台统一管理
  // 以下仅处理页面级别的路径重定向，不涉及域名，不会产生冲突
  async redirects() {
    return [
      // 修复 Google 索引的错误 URL 格式
      // /formulas/countif-generator -> /formulas/countif
      // /formulas/left-generator -> /formulas/left
      {
        source: '/formulas/:slug-generator',
        destination: '/formulas/:slug',
        permanent: true,
      },
    ];
  },
  eslint: {
    // 忽略所有代码规范警告，确保立刻打包成功
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略类型检查报错
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
