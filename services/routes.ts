import { baseURL } from './request';

export const AllCoursesUrl = (): string => `/api/v1/workshops`;
export const CourseUrl = (id): string => `/api/v1/workshops/${id}`;
export const CookieRoute = (): string => `/sanctum/csrf-cookie`;
export const HomeUrl = (): string => `/api/v1/home`;
export const UserUrl = (): string => `/api/user`;
export const RegisterUrl = (id): string => `/api/v1/workshops/${id}/register`;
export const discountUrl = (): string => `/api/v1/takhfif-check`;
export const ratePayUrl = (id): string => `/api/v1/workshops/${id}/buyUsingRate`;
export const DirectPayUrl = (id): string => `/api/v1/DirectPay/workshop/${id}`;
export const CommentUrl = (id, page): string =>
  `/api/v1/workshops/${id}/comments?page=${page}`;
export const QuestionUrl = (id): string => `/api/v1/workshops/${id}/questions`;

// ///////////////////////////////////////////////////////////////

export const CheckAuthPhoneUrl = (): string => `/api/v1/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `/api/v1/checkAuthEmail`;
export const LoginUrl = (): string => `/api/v1/loginUsingMobilePassword`;
export const MobileVerifyUrl = (): string => `/api/v1/verifyCode`;
export const FillFormUrl = (): string => `/api/v1/RequiredFieldsFill`;

// //////////////////////////////////////////////////////

export const EmailVerifyUrl = (): string => `/api/v1/AuthVerifyEmail`;
export const ForgetPasswordUrl = (): string => `/api/v1/ForgetPassword_step0`;
export const ForgetPasswordCodedUrl = (): string => `/api/v1/ForgetPassword_step1`;
export const ForgetPasswordNewUrl = (): string => `/api/v1/ForgetPassword_step2`;

export const ChangeMobileUrl = (): string => `/auth/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `/auth/confirmMobileOrEmail`;

export const DoatRoute = (): string => `${baseURL}/categories/129/دعاة`;
export const HomatRoute = (): string => `${baseURL}/categories/128/حماة`;
export const RoatRoute = (): string => `${baseURL}/categories/130/رعاة`;

// //////////////////////////////////////////////////////////////////////////////////
export const CourseRoute = (id, name): string =>
  `/workshop/${id}/${name.replace(/ /g, '-')}`;
export const LessonRoute = (courseId, lessonId, lessonName): string =>
  `/workshop/${courseId}/lesson/${lessonId}/${lessonName.replace(/ /g, '-')}`;
export const ProfileRoute = (name): string => `/profile/${name.replace(/ /g, '-')}`;

// /////////////////////////////////////////////////////////////////////
export const ConditionRoute = (): string => `/conditions`;
export const FinanceRoute = (): string => `https://idpay.ir/taaleei`;
export const DownloadRoute = (): string => `https://dl.taalei-edu.ir/taalei.apk`;
export const TelNumber = (): string => `0915 424 1197`;
export const ContactUsRoute = (): string => `/contact-us`;
export const PostsRoute = (): string => `/posts`;
export const WebinarRoute = (): string => `/webinar`;
export const HomeRoute = (): string => `/`;

export const ProfileUrl = (): string => `/api/v2/getProfile`;
export const PostsUrl = (): string => `/api/v2/getPosts`;
export const WebinarUrl = (id): string => `/api/v2/webinar/${id}`;
export const WorkshopUrl = (id): string => `/api/v2/workshop/${id}`;
