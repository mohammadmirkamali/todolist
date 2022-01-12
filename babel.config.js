/**
 * You should never manually add @babel/preset-env or one of the years presets (deprecated/removed in Babel 7 anyway).
 * https://github.com/zeit/next.js#customizing-babel-config
 */
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './components',
          utils: './utils',
          public: './public',
          store: './store',
          services: './services',
          lib: './lib',
        },
      },
    ],
    '@emotion',
    '@babel/plugin-proposal-optional-chaining',
    'macros',
  ],
};
