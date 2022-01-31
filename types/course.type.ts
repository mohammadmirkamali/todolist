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

export type ChapterType = {
  id: number;
  name: string;
  lessons: {
    time_string: string;
    lesson_title: string;
    lesson_free: number;
    lesson_id: number;
  }[];
};

export type CourseReducerType = {
  coursesLoading: boolean;
  coursesError: boolean;
  courses: CourseType[];
  chapters: { [id: number]: { loading: boolean; error: boolean; data: ChapterType[] } };
};
