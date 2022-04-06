import { baseURL, newURL } from './request';

export const DoatRoute = (): string => `${baseURL}/categories/129/دعاة`;
export const HomatRoute = (): string => `${baseURL}/categories/128/حماة`;
export const RoatRoute = (): string => `${baseURL}/categories/130/رعاة`;
export const ConditionRoute = (): string => `/conditions`;
export const FinanceRoute = (): string => `https://idpay.ir/taaleei`;
export const DownloadRoute = (): string => `https://dl.taalei-edu.ir/taalei.apk`;
export const CookieRoute = (): string => `${newURL}/sanctum/csrf-cookie`;
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

export const UserUrl = (): string => `${newURL}/getInforUser`;
export const CheckAuthPhoneUrl = (): string => `${newURL}/auth/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `${newURL}/auth/checkAuthEmail`;
export const ForgetPasswordUrl = (): string => `${newURL}/auth/ForgetPassword_step0`;
export const ForgetPasswordCodedUrl = (): string => `${newURL}/auth/ForgetPassword_step1`;
export const ForgetPasswordNewUrl = (): string => `${newURL}/auth/ForgetPassword_step2`;
export const MobileVerifyUrl = (): string => `${newURL}/auth/RegisterVerifyCode`;
export const EmailVerifyUrl = (): string => `${newURL}/auth/AuthVerifyEmail`;
export const LoginUrl = (): string => `${newURL}/auth/loginUsingPassword`;
export const FillFormUrl = (): string => `${newURL}/auth/RequiredFieldsFill`;
export const ChangeMobileUrl = (): string => `${newURL}/auth/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `${newURL}/auth/confirmMobileOrEmail`;
