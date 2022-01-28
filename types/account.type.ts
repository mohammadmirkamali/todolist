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

export type AccountType = {
  coursesLoading: boolean;
  courses: CourseType[];
  postPhoneLoading: boolean;
  postPhone: any;
};
