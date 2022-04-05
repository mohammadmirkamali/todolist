export type CourseType = {
  category_name: string;
  price_string: string;
  teacher_name: string;
  teacher_title: string;
  workshop_title: string;
  teacher_avatar: string;
  category_image: string;
  workshop_img: string;
  created_at: string;
  workshop_time: string;
  workshop_description: string;
  workshop_time_to_min: number;
  workshop_price: number;
  count_students: number;
  lessons_count: number;
  rates_avg: number;
  count_rates: number;
  id: number;
};

export type LessonType = {
  time_string: string;
  lesson_title: string;
  workshop_title: string;
  lesson_file: string;
  lesson_free: number;
  lesson_id: number;
  has_exam: number;
  attaches: { attach_type: string; attach_link: string }[];
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

export type ChapterType = {
  id: number;
  name: string;
  lessons: LessonType[];
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
  courses: CourseType[];
  postsLoading: boolean;
  postsError: boolean;
  posts: PostType[];
  webinar: { [id: number]: { loading: boolean; error: boolean; data: WebinarType } };
  chapters: { [id: number]: { loading: boolean; error: boolean; data: ChapterDataType } };
};