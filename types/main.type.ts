export type CourseType = {
  category_name: string;
  price_string: string;
  teacher_name: string;
  workshop_title: string;
  teacher_avatar: string;
  category_image: string;
  workshop_img: string;
  created_at: string;
  workshop_time_to_min: number;
  workshop_price: number;
  count_students: number;
  id: number;
};

export type MainType = {
  coursesLoading: boolean;
  courses: CourseType[];
};
