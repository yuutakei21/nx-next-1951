//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx,  } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // compiler: {
  //   // For other options, see https://styled-components.com/docs/tooling#babel-plugin
  //   styledComponents: true,
  // },
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
    optimizePackageImports: ['@material-tailwind/react'],
  },
  output: 'standalone',
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   // Important: return the modified config
  //   return config;
  // },
};

// if (process.env.STATIC === 'true') {
//   nextConfig.output = 'export';
//   nextConfig.typescript = {
//     ignoreBuildErrors: true,
//   };
//   nextConfig.distDir = './out';
//   nextConfig.trailingSlash = true;
// }

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
