//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

if (process.env.STATIC === 'true') {
  nextConfig.output = 'export';
  nextConfig.typescript = {
    ignoreBuildErrors: false,
  };
  nextConfig.distDir = '../../web-docker/content';
  nextConfig.trailingSlash = true;
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
