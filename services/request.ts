import { ApisauceInstance, create } from 'apisauce';
import { parseCookies } from 'nookies';

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://taalei-edu.ir';
const newURL = process.env.NEXT_PUBLIC_NEW_URL || 'https://api.taalei-edu.com';

// create main request configs
const request = ((): ApisauceInstance => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
  };

  // eslint-disable-next-line no-underscore-dangle
  const _api = create({
    baseURL,
    headers,
  });

  return _api;
})();

request.addRequestTransform((req) => {
  // eslint-disable-next-line no-underscore-dangle
  const _token = parseCookies().taalei;
  if (_token) {
    req.headers.authorization = `Bearer ${_token}`;
  }
});

request.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status !== 401) {
      return error;
    }

    return error;
  },
);

export default request;
export { baseURL, isDevelopment, newURL };
