export type CoursesType = {
  category_name: string;
  price_string: string;
  teacher_name: string;
  workshop_title: string;
  count_students: number;
  id: number;
}[];

export type MainType = {
  coursesLoading: boolean;
  courses: CoursesType;
};
