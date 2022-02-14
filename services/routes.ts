import { baseURL } from './request';

export const DoatRoute = (): string => `${baseURL}/categories/129/دعاة`;
export const HomatRoute = (): string => `${baseURL}/categories/128/حماة`;
export const RoatRoute = (): string => `${baseURL}/categories/130/رعاة`;
export const ConditionRoute = (): string => `/conditions`;
export const FinanceRoute = (): string => `https://idpay.ir/taaleei`;
export const DownloadRoute = (): string => `https://dl.taalei-edu.ir/taalei.apk`;
export const TelNumber = (): string => `0915 424 1197`;
export const ContactUsRoute = (): string => `/contact-us`;
export const PostsRoute = (): string => `/posts`;
export const HomeRoute = (): string => `/`;
export const ProfileRoute = (name): string => `/profile/${name}`;
export const CourseRoute = (id): string => `/${id}`;
export const LessonRoute = (courseId, lessonId): string => `/${courseId}/${lessonId}`;

export const CheckAuthPhoneUrl = (): string => `/auth/checkAuthPhone`;
export const AllCoursesUrl = (): string => `/api/v2/workshops/s/فلسفه`;
export const CourseUrl = (id): string => `/api/v2/workshop/${id}/getLessons`;
