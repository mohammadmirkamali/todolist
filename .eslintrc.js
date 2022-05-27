// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: '@babel/eslint-parser',

  extends: ['airbnb', 'plugin:css-modules/recommended', 'prettier', 'eslint-config-next'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
      },
      extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      ],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            scss: 'never',
          },
        ],
      },
    },
  ],

  plugins: [
    'css-modules',
    'prettier',
    'cypress',
    'react-hooks',
    '@emotion',
    '@typescript-eslint',
  ],

  env: {
    browser: true,
    'cypress/globals': true,
    jest: true,
  },

  rules: {
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    'import/no-absolute-path': [2, { esmodule: false, commonjs: false, amd: false }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['warn', { packageDir: '.' }],
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-sequences': 'off',
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-key': 'warn',
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn'],
      },
    ],

    // Allow only special identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename'],
      },
    ],

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', 'tsx', 'ts'] },
    ],

    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-default': 'off',
    'css-modules/no-unused-class': 'off',
    'import/order': ['off', { groups: ['builtin', 'external', 'parent'] }],
    'no-restricted-imports': ['error', { patterns: ['..*'] }],
    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    camelcase: 'off',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'all', endOfLine: 'auto' },
    ],
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./'],
      },
    },
  },
};
