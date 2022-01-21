import { baseURL } from 'services/request';

export const CourseUrl = (): string => `/api/v2/workshops/s/قرآن`;
export const CheckAuthPhoneUrl = (): string => `/auth/checkAuthPhone`;

export const CourseRoute = (id): string => `${baseURL}/workshop/see/${id}`;
