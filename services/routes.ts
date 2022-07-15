export const SearchUrl = (): string => `/initial`;
export const CourseUrl = (id): string => `/workshops/${id}`;
export const LessonUrl = (courseId, lessonId): string =>
  `/workshops/${courseId}/lessons/${lessonId}`;
export const CookieRoute = (): string => `https://api.taalei-edu.com/sanctum/csrf-cookie`;
export const HomeUrl = (): string => `/home`;
export const UserUrl = (): string => `/user`;
export const LogoutUrl = (): string => `/logout`;
export const AllTermsUrl = (): string => `/terms`;
export const PassedUrl = (courseId, lessonId): string =>
  `/workshops/${courseId}/lessons/${lessonId}/passed`;
export const TermUrl = (id): string => `/terms/${id}`;
export const discountUrl = (): string => `/takhfif-check`;
export const walletPayUrl = (id, type): string => `/buyUsingWallet/${type}/${id}`;
export const DirectPayUrl = (id, type): string => `/DirectPay/${type}/${id}`;
export const EventUrl = (id): string => `/events/${id}`;
export const CommentUrl = (id, page): string => `/workshops/${id}/comments?page=${page}`;
export const SendCommentUrl = (id, type): string => `/${type}/${id}/comments`;
export const SendQuestionUrl = (id, type): string => `/${type}/${id}/questions`;
export const QuestionUrl = (id): string => `/workshops/${id}/questions`;
export const ExamInfoUrl = (examId): string => `/exams/${examId}/exam-review`;
export const ExamUrl = (examId): string => `/exams/${examId}/exam-questions`;
export const ExamResultUrl = (examId): string => `/exams/${examId}/submit-exam-answers`;
export const SendNoteUrl = (courseId, lessonId): string =>
  `/workshops/${courseId}/lessons/${lessonId}/notes`;
export const SendTrainUrl = (courseId, lessonId): string =>
  `/workshops/${courseId}/lessons/${lessonId}/trainings`;
export const DeleteNoteUrl = (courseId, lessonId, noteId): string =>
  `/workshops/${courseId}/lessons/${lessonId}/notes/${noteId}`;
export const PostsUrl = (): string => `/posts`;
export const RateCourseUrl = (id): string => `/workshops/${id}/setRate`;
export const ChangeTermHoursUrl = (id): string => `/terms/${id}/update-setting`;
export const ChangeUserImgUrl = (): string => `/change-user-avatar`;
export const UpdateUserInfoUrl = (): string => `/update-user-info`;
export const PayResultUrl = (): string => `/DirectPay/result`;
export const MyTransactionsUrl = (): string => `/my_transactions`;
export const MyCommentsUrl = (): string => `/my_comments`;
export const MyTrainingUrl = (): string => `/my_trainings`;
export const MyQuestionsUrl = (): string => `/my_questions`;

// ///////////////////////////////////////////////////////////////

export const MobileVerifyUrl = (): string => `/verifyMobile`;
export const EmailVerifyUrl = (): string => `/verifyEmail`;
export const CheckAuthPhoneUrl = (): string => `/checkAuthPhone`;
export const CheckAuthEmailUrl = (): string => `/checkAuthEmail`;
export const LoginMobileUrl = (): string => `/loginUsingMobilePassword`;
export const LoginEmailUrl = (): string => `/loginUsingEmailPassword`;
export const FillFormUrl = (): string => `/RequiredFieldsFill`;
export const ForgetPasswordUrl = (): string => `/forget_password_step0`;
export const ForgetPasswordCodedUrl = (): string => `/forget_password_step1`;
export const ForgetPasswordNewUrl = (): string => `/forget_password_step2`;
export const ChangeMobileUrl = (): string => `/changeMobileOrEmail`;
export const ConfirmMobileUrl = (): string => `/confirm-MobileOrEmail`;
export const ChargeWalletUrl = (amount): string => `/DirectPay/wallet/${amount}`;

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
export const ExamInfoRoute = (examId): string => `/exam/${examId}/info`;
export const ExamRoute = (examId): string => `/exam/${examId}/question`;
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
