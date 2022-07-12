import { message } from 'antd';
import { ApisauceInstance, create } from 'apisauce';
import { parseCookies } from 'nookies';

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.taalei-edu.com';
const oldURL = process.env.NEXT_PUBLIC_OLD_URL || 'https://taalei-edu.ir';

// create main request configs
const request = ((): ApisauceInstance => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
  };

  return create({ baseURL, headers });
})();

request.addRequestTransform((req) => {
  const token = parseCookies()?.taalei;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
});

request.axiosInstance.interceptors.response.use(
  (response) => {
    console.log('res', response); // eslint-disable-line
    return response;
  },
  async (error) => {
    if (error.response.status !== 401) {
      return error;
    }

    return error;
  },
);

// for show notification on errors.
export const requestMonitor = (response): void => {
  const originalMessage = response?.originalError?.response?.data?.message;
  const showErrorMessage = response?.config?.params?.showErrorMessage !== false;

  const dict = {
    CLIENT_ERROR: 'خطا در عملیات',
    SERVER_ERROR: 'خطای سرور',
    TIMEOUT_ERROR: 'خطای سرور',
    CONNECTION_ERROR: 'خطای سرور',
    NETWORK_ERROR: 'خطای سرور',
    CANCEL_ERROR: 'لغو عملیات',
    UNKNOWN_ERROR: 'خطای ناشناخته',
  };

  const messages = (originalMessage &&
    (typeof originalMessage === 'string'
      ? [originalMessage]
      : Object.keys(originalMessage).map((item) => originalMessage[item][0]))) || [
    dict[response.problem],
  ];

  if (response.config.url.includes('profile')) {
    return;
  }

  if (!response.ok) {
    showErrorMessage && messages.forEach((key) => message.warn(key));
  }
};

export default request;
export { baseURL, isDevelopment, oldURL };
