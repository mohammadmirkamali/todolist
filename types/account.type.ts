export type CaptchaType = {
  header: string[];
  chart: [string, number][];
};

export type AccountType = {
  captchaLoading: boolean;
  captchaError: boolean;
  captcha: CaptchaType;
};
