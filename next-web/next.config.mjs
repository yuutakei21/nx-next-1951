/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@material-tailwind/react"],
  },
  output: "standalone",
};
if (process.env.STATIC === "true") {
  nextConfig.output = "export";
  nextConfig.typescript = {
    ignoreBuildErrors: true,
  };
  nextConfig.distDir = "./export/static";
  nextConfig.trailingSlash = true;
}
export default nextConfig;
