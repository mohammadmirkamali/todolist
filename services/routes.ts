export const SearchUrl = (): string => `/api/v1/initial`;
export const CourseUrl = (id): string => `/api/v1/workshops/${id}`;
export const LessonUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}`;
export const CookieRoute = (): string => `/sanctum/csrf-cookie`;
export const HomeUrl = (): string => `/api/v1/home`;
export const UserUrl = (): string => `/api/user`;
export const AllTermsUrl = (): string => `/api/v1/terms`;
export const PassedUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/passed`;
export const TermUrl = (id): string => `/api/v1/terms/${id}`;
export const MobileVerifyUrl = (): string => `/api/v1/verifyMobile`;
export const EmailVerifyUrl = (): string => `/api/v1/verifyEmail`;
export const discountUrl = (): string => `/api/v1/takhfif-check`;
export const ratePayUrl = (id, type): string => `/api/v1/buyUsingRate/${type}/${id}`;
export const walletPayUrl = (id, type): string => `/api/v1/buyUsingWallet/${type}/${id}`;
export const DirectPayUrl = (id, type): string => `/api/v1/DirectPay/${type}/${id}`;
export const EventUrl = (id): string => `/api/v1/events/${id}`;
export const CommentUrl = (id, page): string =>
  `/api/v1/workshops/${id}/comments?page=${page}`;
export const SendCommentUrl = (id, type): string => `/api/v1/${type}/${id}/comments`;
export const SendQuestionUrl = (id): string => `/api/v1/workshops/${id}/questions`;
export const QuestionUrl = (id): string => `/api/v1/workshops/${id}/questions`;
export const ExamInfoUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/exam-review`;
export const ExamUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/exam-questions`;
export const ExamResultUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/submit-exam-answers`;
export const SendNoteUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/notes`;
export const SendTrainUrl = (courseId, lessonId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/trainings`;
export const DeleteNoteUrl = (courseId, lessonId, noteId): string =>
  `/api/v1/workshops/${courseId}/lessons/${lessonId}/notes/${noteId}`;
export const PostsUrl = (): string => `/api/v1/posts`;
export const RateCourseUrl = (id): string => `/api/v1/workshops/${id}/setRate`;
export const ChangeTermHoursUrl = (id): string => `/api/v1/terms/${id}/update-setting`;
export const ChangeUserImgUrl = (): string => `/api/v1/change-user-avatar`;
export const UpdateUserInfoUrl = (): string => `/api/v1/update-user-info`;

// ///////////////////////////////////////////////////////////////

export const CheckAuthPhoneUrl = (): string => `/api/v1/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `/api/v1/checkAuthEmail`;
export const LoginUrl = (): string => `/api/v1/loginUsingMobilePassword`;
export const FillFormUrl = (): string => `/api/v1/RequiredFieldsFill`;
export const ForgetPasswordUrl = (): string => `/api/v1/forget_password_step0`;
export const ForgetPasswordCodedUrl = (): string => `/api/v1/forget_password_step1`;
export const ForgetPasswordNewUrl = (): string => `/api/v1/forget_password_step2`;
export const ChangeMobileUrl = (): string => `/api/v1/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `/api/v1/confirm-MobileOrEmail`;

// //////////////////////////////////////////////////////////////////////////////////
export const HomeRoute = (): string => `/`;
export const CourseRoute = (id, name): string =>
  `/workshop/${id}/${name?.replace(/ /g, '-')}`;
export const WebinarRoute = (id, name): string =>
  `/event/${id}/${name?.replace(/ /g, '-')}`;
export const LessonRoute = (courseId, lessonId, lessonName): string =>
  `/workshop/${courseId}/lesson/${lessonId}/${lessonName.replace(/ /g, '-')}`;
export const ProfileRoute = (id, name): string =>
  `/profile/${id}/${name?.replace(/ /g, '-')}`;
export const ExamInfoRoute = (courseId, lessonId): string =>
  `/exam/${courseId}/${lessonId}/info`;
export const ExamRoute = (courseId, lessonId): string =>
  `/exam/${courseId}/${lessonId}/question`;
export const TermRoute = (termId, termTitle): string =>
  `/term/${termId}/${termTitle?.replace(/ /g, '-')}/`;

export const ConditionRoute = (): string => `/conditions`;
export const FinanceRoute = (): string => `https://idpay.ir/taaleei`;
export const DownloadRoute = (): string => `https://dl.taalei-edu.ir/taalei.apk`;
export const TelNumber = (): string => `0915 424 1197`;
export const ContactUsRoute = (): string => `/contact-us`;
export const PostsRoute = (): string => `/posts`;
// /////////////////////////////////////////////////////////////////////

export const ProfileUrl = (): string => `/api/v2/getProfile`;
export const WebinarUrl = (id): string => `/api/v2/webinar/${id}`;
export const WorkshopUrl = (id): string => `/api/v2/workshop/${id}`;
