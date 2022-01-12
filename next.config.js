const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withPWA = require('next-pwa');

const prod = process.env.NODE_ENV === 'production';

// add bundle analyzer config
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}; // eslint-disable-line
}

const withPwa = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: !prod,
  },
});

const nextConfig = {
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    // Do whatever you want in build-time
    // ask Webpack to replace @sentry/node imports with @sentry/browser when building the browser's bundle.
    if (!isServer) {
      // eslint-disable-next-line
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    return config;
  },
};

module.exports = withPlugins([[withImages], [withBundleAnalyzer], [withPwa]], nextConfig);
