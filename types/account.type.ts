export type UserType = {
  avatar: string;
  nickname: string;
  info: { birthYear: string };
  workshops: { workshop_id: number }[];
};

export type AccountType = {
  user: UserType;
  loginLoading: boolean;
  login: any; // eslint-disable-line
};
