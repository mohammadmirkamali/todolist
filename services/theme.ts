import '@emotion/react';

type BreakpointsProp = Array<string> & {
  sm?: string;
  lg?: string;
};

/**
 * theme.js
 * https://github.com/system-ui/theme-specification
 */

const breakpoints: BreakpointsProp = ['768px', '1200px'];

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.lg = breakpoints[1];

export default {
  mediaQueries: {
    sm: `@media screen and (min-width: ${breakpoints[0]})`,
    lg: `@media screen and (min-width: ${breakpoints[1]})`,
  },

  breakpoints,
  border: ['1px solid rgba(191, 190, 190, 0.5)'],
  colors: {
    purple: [],
    green: ['#1de9b6'],
    red: [],
    yellow: [],
    gray: ['#707070'],
    blue: [],
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, 0.125)',
  },
};
