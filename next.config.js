const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

// add bundle analyzer config
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}; // eslint-disable-line
}

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  webpack: (config, { isServer, dev }) => {
    // Do whatever you want in build-time
    // ask Webpack to replace @sentry/node imports with @sentry/browser when building the browser's bundle.
    if (!isServer) {
      // eslint-disable-next-line
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
};

module.exports = withPlugins([withImages, withBundleAnalyzer], nextConfig);
