export type UserType = {
  avatar: string;
  nickname: string;
  name: string;
  family: string;
  email: string;
  mobile: string;
  price: string;
  real_rate: string;
  fake_rate: string;
  sex: number;
  info: { birthYear: string };
  workshops: { id: number; passed_lessons: number[] }[];
  events: { id: number; title: string }[];
};

export type AccountType = {
  user: UserType;
  userLoading: boolean;
  loginLoading: boolean;
  login: any; // eslint-disable-line
  profileLoading: boolean;
  profile: any; // eslint-disable-line
};
