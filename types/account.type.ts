import { WebinarsType } from './course.type';

export type UserType = {
  avatar: string;
  nickname: string;
  info: { birthYear: string };
  workshops: { workshop_id: number }[];
};

export type AccountType = {
  user: UserType;
  userLoading: boolean;
  loginLoading: boolean;
  webinarsLoading: boolean;
  webinarsError: boolean;
  webinars: WebinarsType[];
  login: any; // eslint-disable-line
};
