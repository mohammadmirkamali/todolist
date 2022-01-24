export const BadgeCategory = (type): { name: string; color: string } | undefined => {
  // see antd badge color : https://ant.design/components/badge/
  const types = [
    { name: 'حماة', color: 'cyan' },
    { name: 'دعاة', color: 'green' },
    { name: 'رعاة', color: 'magenta' },
    { name: 'معارف توحیدی', color: 'purple' },
    { name: 'اخلاق توحیدی', color: 'geekblue' },
    { name: 'قرآن', color: 'gold' },
  ];

  return types.find((item) => item.name === type);
};

/**
 *  0123456789 => ۰۱۲۳۴۵۶۷۸۹
 * @param {string | number} number
 * @returns {string}
 */
export const faNumber = (value: string | number): string => {
  if (value === null || value === undefined) return '';

  const toFaDict = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
  };
  const letters = value.toString().split('');
  const arr = letters.map((item) => (item in toFaDict ? toFaDict[item] : item));
  return arr.join('');
};
