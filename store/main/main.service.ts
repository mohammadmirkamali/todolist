import { baseURL } from 'services/request';

export const CourseRoute = (): string => `/api/v2/workshops/s/قرآن`;
export const CourseUrl = (id): string => `${baseURL}/workshop/see/${id}`;
