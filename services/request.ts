import Axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://taalei-edu.com';
const newURL = process.env.NEXT_PUBLIC_NEW_URL || 'https://api.taalei-edu.com';

const request = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

request.interceptors.response.use(
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
