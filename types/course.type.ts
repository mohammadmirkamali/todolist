export type TeacherType = {
  nickname: string;
  avatar: string;
  family: string;
  id: number;
};

export type CoursesType = {
  id: number;
  price: number;
  discount: number;
  created_at: string;
  title: string;
  thumb: string;
  time: number;
  description: string;
  updated_at: string;
  lessons: number[];
  categories: { title: string; image: string }[];
  teachers: TeacherType[];
};

export type WebinarsType = {
  capacity: number;
  contacts: string;
  description: string;
  headline: string;
  created_at: string;
  id: number;
  image: string;
  price: string;
  isWebinar: boolean;
  teachers: TeacherType[];
  title: string;
};

export type SearchDataType = {
  workshops: CoursesType[];
  events: WebinarsType[];
};

export type LessonType = {
  id: number;
  time: number;
  free: number;
  order: number;
  exam: boolean;
  previous_lesson: number;
  next_lesson: number;
  description: string;
  title: string;
  files: { file: string }[];
};

export type ChapterType = {
  id: number;
  name: string;
  lessons: LessonType[];
};

export type CommentsType = {
  answer: { nickname: string; text: string; avatar: string };
  nickname: string;
  text: string;
  avatar: string;
};

export type QuestionsType = {
  description: string;
  title: string;
  type: string;
  answer: { description: string; title: string; type: string };
};

export type AttachesType = {
  link: string;
  name: string;
  size: string;
};

export type TopRateType = {
  id: number;
  total_rate: number;
  nickname: string;
  avatar: string;
};

export type CourseType = {
  create_at: string;
  image: string;
  title: string;
  description: string;
  discount: number;
  students_count: number;
  rate: number;
  id: number;
  lessons_count: number;
  price: number;
  progress_percent: number;
  time: number;
  registered: boolean;
  chapters: ChapterType[];
  attaches: AttachesType[];
  comments: CommentsType[];
  questions: QuestionsType[];
  top_users: TopRateType[];
  user_rate: TopRateType[];
  categories: { title: string; image: string }[];
  teachers: TeacherType[];
};

export type PostType = {
  image: string;
  datetime_formatDifference: string;
  description: string;
  categories: { id: number; title: string; name: string; image: string }[];
  title: string;
  film: string;
  id: number;
};

export type WebinarType = {
  id: number;
  price: number;
  capacity: number;
  comments: { data: CommentsType[]; next_page_usr: string };
  description: string;
  image: string;
  registered: boolean;
  link: string;
  teachers: TeacherType[];
  times: { date: string; start: string; end: string; description: string }[];
  title: string;
  headline: string;
};

export type ExamInfoType = {
  acceptance_percent: number;
  qtype: number;
  duration: number;
  payAmount: number;
  retry_exam: number;
  number_of_questions: number;
  title: string;
  needPay: boolean;
};

export type CourseReducerType = {
  searchDataLoading: boolean;
  searchDataError: boolean;
  searchData: SearchDataType;
  postsLoading: boolean;
  postsError: boolean;
  posts: PostType[];
  examInfoLoading: boolean;
  examInfoError: boolean;
  examInfo: ExamInfoType;
  event: { [id: number]: { loading: boolean; error: boolean; data: WebinarType } };
  chapters: { [id: number]: { loading: boolean; error: boolean; data: CourseType } };
};

export type ExamType = {
  question: string;
  options: { id: number; option: string }[];
};

export type LessonNotesType = {
  notes: { text: string; time: number }[];
  my_notes: { text: string; time: number }[];
  attaches: { link: string; size?: string }[];
  questions: { title: string; description: string; visit: number }[];
  trainings: {
    attachment: string;
    description: string;
    title: string;
    user: { avatar: string; nickname: string };
  }[];
};

export type SearchOptionType = {
  name: string;
  id: number;
  avatar?: string;
  category?: string;
  webinar?: boolean;
  isTeacher?: boolean;
};
