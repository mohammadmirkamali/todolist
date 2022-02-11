import '@emotion/react';
import { theme } from 'tailwind.config';

type BreakpointsProp = Array<string> & {
  sm?: string;
  lg?: string;
};

/**
 * theme.js
 * https://github.com/system-ui/theme-specification
 */

const breakpoints: BreakpointsProp = ['768px', '1280px'];

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.lg = breakpoints[1];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mediaQueries: {
    sm: `@media screen and (min-width: ${breakpoints[0]})`,
    lg: `@media screen and (min-width: ${breakpoints[1]})`,
  },

  breakpoints,
  borders: theme.border,
  colors: theme.colors,
  shadows: theme.shadows,
};
