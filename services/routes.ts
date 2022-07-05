export const SearchUrl = (): string => `/v1/initial`;
export const CourseUrl = (id): string => `/v1/workshops/${id}`;
export const LessonUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}`;
export const CookieRoute = (): string => `/sanctum/csrf-cookie`;
export const HomeUrl = (): string => `/v1/home`;
export const UserUrl = (): string => `/user`;
export const AllTermsUrl = (): string => `/v1/terms`;
export const PassedUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/passed`;
export const TermUrl = (id): string => `/v1/terms/${id}`;
export const discountUrl = (): string => `/v1/takhfif-check`;
export const ratePayUrl = (id, type): string => `/v1/buyUsingRate/${type}/${id}`;
export const walletPayUrl = (id, type): string => `/v1/buyUsingWallet/${type}/${id}`;
export const DirectPayUrl = (id, type): string => `/v1/DirectPay/${type}/${id}`;
export const EventUrl = (id): string => `/v1/events/${id}`;
export const CommentUrl = (id, page): string =>
  `/v1/workshops/${id}/comments?page=${page}`;
export const SendCommentUrl = (id, type): string => `/v1/${type}/${id}/comments`;
export const SendQuestionUrl = (id, type): string => `/v1/${type}/${id}/questions`;
export const QuestionUrl = (id): string => `/v1/workshops/${id}/questions`;
export const ExamInfoUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/exam-review`;
export const ExamUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/exam-questions`;
export const ExamResultUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/submit-exam-answers`;
export const SendNoteUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/notes`;
export const SendTrainUrl = (courseId, lessonId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/trainings`;
export const DeleteNoteUrl = (courseId, lessonId, noteId): string =>
  `/v1/workshops/${courseId}/lessons/${lessonId}/notes/${noteId}`;
export const PostsUrl = (): string => `/v1/posts`;
export const RateCourseUrl = (id): string => `/v1/workshops/${id}/setRate`;
export const ChangeTermHoursUrl = (id): string => `/v1/terms/${id}/update-setting`;
export const ChangeUserImgUrl = (): string => `/v1/change-user-avatar`;
export const UpdateUserInfoUrl = (): string => `/v1/update-user-info`;
export const PayResultUrl = (): string => `/v1/DirectPay/result`;
export const MyTransactionsUrl = (): string => `/my_transactions`;
export const MyCommentsUrl = (): string => `/my_comments`;
export const MyTrainingUrl = (): string => `/my_trainings`;
export const MyQuestionsUrl = (): string => `/my_questions`;

// ///////////////////////////////////////////////////////////////

export const MobileVerifyUrl = (): string => `/v1/verifyMobile`;
export const EmailVerifyUrl = (): string => `/v1/verifyEmail`;
export const CheckAuthPhoneUrl = (): string => `/v1/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `/v1/checkAuthEmail`;
export const LoginUrl = (): string => `/v1/loginUsingMobilePassword`;
export const FillFormUrl = (): string => `/v1/RequiredFieldsFill`;
export const ForgetPasswordUrl = (): string => `/v1/forget_password_step0`;
export const ForgetPasswordCodedUrl = (): string => `/v1/forget_password_step1`;
export const ForgetPasswordNewUrl = (): string => `/v1/forget_password_step2`;
export const ChangeMobileUrl = (): string => `/v1/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `/v1/confirm-MobileOrEmail`;
export const ChargeWalletUrl = (amount): string => `/v1/DirectPay/wallet/${amount}`;

// //////////////////////////////////////////////////////////////////////////////////
export const HomeRoute = (): string => `/`;
export const AllPageRoute = (type): string => `/all/${type}`;
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
export const GooglePlayRoute = (): string =>
  `https://play.google.com/store/apps/details?id=ir.taalei.app`;
export const TelNumber = (): string => `0915 424 1197`;
export const ContactUsRoute = (): string => `/contact-us`;
export const PostsRoute = (): string => `/posts`;
