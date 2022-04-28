export type UserType = {
  birthYear: string;
  avatar: string;
  api_token: string;
  full_name: string;
  reshte: string;
  username: string;
  email: string;
  mobile: string;
  workshops_count: number;
  sex: number;
};

export type AccountType = {
  user: UserType;
  loginLoading: boolean;
  login: any; // eslint-disable-line
};
