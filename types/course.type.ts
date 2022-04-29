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
  teachers: { nickname: string; avatar: string }[];
};

export type LessonType = {
  id: number;
  time: number;
  free: number;
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

export type AttachesType = {
  link: string;
  name: string;
  size: string;
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
  categories: { title: string; image: string }[];
  teachers: { nickname: string; avatar: string }[];
};

export type PostType = {
  post_img: string;
  user_name: string;
  user_avatar: string;
  datetime_formatDifference: string;
  created_at: string;
  post_text: string;
  post_title: string;
  post_film: string;
  post_type: string;
  post_id: number;
};

export type TopRateType = {
  id: number;
  total_rate: number;
  nickname: string;
  avatar: string;
};

export type ChapterDataType = {
  data: ChapterType[];
  topRate: TopRateType[];
  userRate: TopRateType[];
};

export type WebinarType = {
  id: number;
  price: number;
  title: string;
  link: string;
  teacher_avatar: string;
  teacher_name: string;
  teacher_title: string;
  description: string;
  image: string;
  headline: string;
  for_student: string;
  webinar_times: { date: string; start: string; end: string; description: string }[];
};

export type CourseReducerType = {
  coursesLoading: boolean;
  coursesError: boolean;
  courses: CoursesType[];
  postsLoading: boolean;
  postsError: boolean;
  posts: PostType[];
  webinar: { [id: number]: { loading: boolean; error: boolean; data: WebinarType } };
  chapters: { [id: number]: { loading: boolean; error: boolean; data: ChapterDataType } };
};
