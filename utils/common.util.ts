import { CoursesType } from 'types/course.type';

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
  return `${faNumber(hours)}:${faNumber(minutes)}`;
};

export const fileSize = (size: number | string): string =>
  Number(size) > 1000000
    ? `${faNumber((Number(size) / 1000000).toFixed(1))}MB`
    : Number(size) > 1000
    ? `${faNumber(Math.floor(Number(size) / 1000))}KB`
    : `${faNumber(Math.floor(Number(size)))}B`;

export const generateOptions = (
  courses: CoursesType[],
): { name: string; id: number; avatar?: string; category?: string }[] => {
  if (!courses) return null;
  const data: CoursesType[] = JSON.parse(JSON.stringify(courses));
  const teachers = [
    ...new Set(
      data
        ?.map((item) => item.teachers.map((k) => k.nickname))
        .flat()
        .filter((k) => k !== null),
    ),
  ];

  const teacherOptions = teachers.map((name) => ({
    name,
    id: null,
    category: null,
    avatar: data
      .find((item) => item.teachers.every((teacher) => teacher.nickname === teachers[0]))
      .teachers.find((teacher) => teacher.nickname === teachers[0]).avatar,
  }));

  const coursesOptions = data?.map((item) => ({
    name: item.title,
    id: item.id,
    category: item.categories[0]?.title,
  }));

  return [...coursesOptions, ...teacherOptions];
};

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
