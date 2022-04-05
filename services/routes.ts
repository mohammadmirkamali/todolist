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
export const WebinarRoute = (): string => `/webinar`;
export const HomeRoute = (): string => `/`;
export const ProfileRoute = (name): string => `/profile/${name}`;
export const CourseRoute = (id): string => `/${id}`;
export const LessonRoute = (courseId, lessonId): string => `/${courseId}/${lessonId}`;

export const ProfileUrl = (): string => `/api/v2/getProfile`;
export const PostsUrl = (): string => `/api/v2/getPosts`;
export const AllCoursesUrl = (): string => `/api/v2/workshops/s/فلسفه`;
export const CourseUrl = (id): string => `/api/v2/workshop/${id}/getLessons`;
export const WebinarUrl = (id): string => `/api/v2/webinar/${id}`;
export const WorkshopUrl = (id): string => `/api/v2/workshop/${id}`;

export const UserUrl = (): string => `/api/v2/getInforUser`;
export const CheckAuthPhoneUrl = (): string => `/api/v2/auth/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `/api/v2/auth/checkAuthEmail`;
export const ForgetPasswordUrl = (): string => `/api/v2/auth/ForgetPassword_step0`;
export const ForgetPasswordCodedUrl = (): string => `/api/v2/auth/ForgetPassword_step1`;
export const ForgetPasswordNewUrl = (): string => `/api/v2/auth/ForgetPassword_step2`;
export const MobileVerifyUrl = (): string => `/api/v2/auth/mobileVerifyCode`;
export const EmailVerifyUrl = (): string => `/api/v2/auth/AuthVerifyEmail`;
export const LoginUrl = (): string => `/api/v2/auth/loginUsingPassword`;
export const FillFormUrl = (): string => `/api/v2/auth/RegisterRequiredFields`;
export const ChangeMobileUrl = (): string => `/api/v2/auth/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `/api/v2/auth/confirmMobileOrEmail`;
