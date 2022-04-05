import { ApisauceInstance, create } from 'apisauce';

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.taalei-edu.com';

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

// request.addRequestTransform((req) => {
//   // eslint-disable-next-line no-underscore-dangle
//   const _token = getCookie('access_token');
//   if (_token) {
//     req.headers.Authorization = `Bearer ${_token}`;
//   }
// });

request.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status !== 401) {
      return error;
    }

    // const refresh = getCookie('refresh_token');
    // const originalRequest = error.config;
    // const newToken: ApiResponse<any> = await request.post(postRefreshTokenUrl(), {
    //   refresh,
    // });

    // if (newToken.ok) {
    //   // set header and cookie with new access token
    //   setUaaCookie(newToken.data.data.access, refresh);

    //   // retry original request
    //   originalRequest.headers.Authorization = `Bearer ${newToken.data.data.access}`;
    //   const newData = await request.axiosInstance.request(originalRequest);
    //   return newData;
    // }

    return error;
  },
);

export default request;
export { baseURL, isDevelopment };
