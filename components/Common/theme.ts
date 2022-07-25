import '@emotion/react';

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
  borders: ['1px solid #000', '1px solid #E53935'],
  colors: {
    // sun
    sun10: '#FFFEE7',
    sun20: '#FFFAC4',
    sun30: '#FEF69C',
    sun40: '#FDF174',
    sun50: '#FBEC53',
    sun60: '#FFEB00',
    sun70: '#FFDC35',
    sun80: '#FEC42C',
    sun90: '#FD9C35',
    sun100: '#F98214',

    // grass
    grass10: '#DFFFD7',
    grass20: '#C9FFB0',
    grass30: '#A5E696',
    grass40: '#5EDE50',
    grass50: '#55D342',
    grass60: '#1DCA0A',
    grass70: '#17B505',
    grass80: '#43A047',
    grass90: '#009100',
    grass100: '#006E00',

    // rose
    rose10: '#FFEBEE',
    rose20: '#FFDBDB',
    rose30: '#FFCDD2',
    rose40: '#FFA0A0',
    rose50: '#E57373',
    rose60: '#EF5350',
    rose70: '#F44336',
    rose80: '#E53935',
    rose90: '#C62828',
    rose100: '#B71C1C',

    // berry
    berry10: '#F1F6FF',
    berry20: '#C4E0FF',
    berry30: '#A1CDFF',
    berry40: '#80B9FF',
    berry50: '#6DA9FF',
    berry60: '#639AFF',
    berry70: '#3B7CFF',
    berry80: '#5173DB',
    berry90: '#3852CD',
    berry100: '#4B47A7',

    // blue
    blue10: '#E2E9F7',
    blue20: '#C5CAE8',
    blue30: '#9EA8D8',
    blue40: '#7886C8',
    blue50: '#5B6CBC',
    blue60: '#3E52B1',
    blue70: '#384AA7',
    blue80: '#2F409B',
    blue90: '#27368F',
    blue100: '#00036D',

    // ash
    ash10: '#FFFFFF',
    ash20: '#F5F5F7',
    ash30: '#F0F1F8',
    ash40: '#EBECF0',
    ash50: '#D2D3D9',
    ash60: '#A5A6AC',
    ash70: '#7B7C82',
    ash80: '#67686D',
    ash90: '#47484E',
    ash100: '#26272C',

    // others
    other1: '#ff9900',
  },
  shadows: {
    card: '0px 15px 30px rgba(15, 24, 66, 0.2)',
  },
};
