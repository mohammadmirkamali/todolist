import { t } from 'i18next';
import { SearchDataType, SearchOptionType } from 'types/course.type';
import userImage from 'public/user.svg';

export const BadgeCategory = (type): { name: string; color: string } | undefined => {
  // see antd badge color : https://ant.design/components/badge/
  const types = [
    { name: t('global.homat'), color: 'cyan' },
    { name: t('global.doat'), color: 'green' },
    { name: t('global.roat'), color: 'magenta' },
    { name: t('global.event'), color: 'geekblue' },
    { name: t('global.qoran'), color: 'gold' },
    { name: t('global.term'), color: 'orange' },
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

/**
 * Convert dash-separated string to camelCase
 * @param {string} : dash-separated-string
 * @returns {string} : dashSeparatedString
 */
export const camelCase = (input: string): string =>
  input &&
  (input.slice(0, 1).toLowerCase() + input.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => cur + acc[0].toUpperCase() + acc.substring(1));

/**
 * Convert camelCase string to kebab-case
 * @param {string} : dashSeparatedString
 * @returns {string} :  dash-separated-string
 */
export const kebabCase = (input: string): string =>
  input &&
  input
    .split(/(?=[A-Z])/)
    .join('-')
    .toLocaleLowerCase();

export const calcTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const secondes = time - hours * 3600 - minutes * 60;
  return hours
    ? `${faNumber(secondes)} : ${faNumber(minutes)} : ${faNumber(hours)}`
    : `${faNumber(secondes)} : ${faNumber(minutes)}`;
};

export const fileSize = (size: number | string): string =>
  Number(size) > 1000000
    ? `${faNumber((Number(size) / 1000000).toFixed(1))}MB`
    : Number(size) > 1000
    ? `${faNumber(Math.floor(Number(size) / 1000))}KB`
    : `${faNumber(Math.floor(Number(size)))}B`;

export const generateOptions = (searchData: SearchDataType): SearchOptionType[] => {
  if (!searchData) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (searchData.workshops as any)?.concat(
    searchData.events.map((item) => ({ ...item, webinar: true })),
  );

  const teachers = [
    ...new Set(
      data
        ?.map((item) => item.teachers.map((k) => k.nickname))
        .flat()
        .filter((k) => k !== null),
    ),
  ];

  const teacherOptions = teachers.map((name) => {
    const target = data
      ?.find((item) => item.teachers.every((teacher) => teacher.nickname === name))
      .teachers.find((teacher) => teacher.nickname === name);
    return {
      name: name || target.family,
      id: target.id,
      isTeacher: true,
      avatar: target.avatar || userImage,
    };
  });

  const coursesOptions =
    data
      ?.concat(searchData.terms.map((item) => ({ ...item, term: true })))
      .map((item) => ({
        name: item.title,
        id: item.id,
        category: item.term
          ? t('global.term')
          : item.webinar
          ? t('global.event')
          : item.categories[0]?.title,
        webinar: item.webinar,
        term: item.term,
      })) || [];

  const homeRote = { name: t('global.home'), home: true, id: 1 };

  return [homeRote, ...coursesOptions, ...teacherOptions];
};

export const ellipsisText = (text, length): string => {
  return text?.length > length ? `${text.slice(0, length)}...` : text;
};

export const PLAYER_CONTROLS = [
  'play',
  'progress',
  'current-time',
  'mute',
  'volume',
  'settings',
  'download',
  'fullscreen',
];
