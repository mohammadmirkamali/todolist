import { ApisauceInstance, create } from 'apisauce';

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://taalei-edu.ir';
const newURL = process.env.NEXT_PUBLIC_NEW_URL || 'https://api.taalei-edu.com';

// create main request configs
const request = ((): ApisauceInstance => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
  };

  return create({
    baseURL,
    headers,
    withCredentials: true,
  });
})();

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
