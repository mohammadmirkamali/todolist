export type UserType = {
  avatar: string;
  nickname: string;
  name: string;
  family: string;
  sex: number;
  info: { birthYear: string };
  workshops: { id: number; passed_lessons: number }[];
  events: { id: number; title: string }[];
};

export type AccountType = {
  user: UserType;
  userLoading: boolean;
  loginLoading: boolean;
  login: any; // eslint-disable-line
};
