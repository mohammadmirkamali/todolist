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
  if (req.url.includes('trainings')) {
    req.headers['Content-Type'] = `multipart/form-data`;
    req.headers.Accept = 'application/json';
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
export { baseURL, isDevelopment, oldURL };
