/* eslint-disable arrow-body-style */
import request from 'services/request';
import { LogoutUrl, UserUrl } from 'services/routes';
import * as type from './tasks.constants';

export const postLoginAction = (url, body) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.POST_LOGIN_REQUEST });
    const response: any = url ? await request.post(url, body) : body; // eslint-disable-line

    if (response.ok) {
      const { data } = response;
      dispatch({ type: type.POST_LOGIN_SUCCESS, payload: data });
      return data.token && !data.next ? null : response;
    }

    dispatch({ type: type.POST_LOGIN_ERROR });
    return false;
  };
};

export const postProfileAction = (url, body) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.POST_PROFILE_REQUEST });
    const response: any = url ? await request.post(url, body) : body; // eslint-disable-line
    if (response.ok) {
      const { data } = response;
      dispatch({ type: type.POST_PROFILE_SUCCESS, payload: data });
      return data.token && !data.next ? null : response;
    }

    dispatch({ type: type.POST_PROFILE_ERROR });
    return false;
  };
};

export const getUserAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_USER_REQUEST });
    // await request.get(CookieRoute());
    const response: any = await request.get(UserUrl()); // eslint-disable-line
    if (response.ok) {
      const user = {
        ...response.data,
        workshops: response.data.workshops.map((item) => ({
          ...item, // to not get error when user choose isSeen for first time
          passed_lessons: item.passed_lessons || [], // eslint-disable-line
        })),
      };

      dispatch({ type: type.GET_USER_SUCCESS, payload: user });
      return true;
    }
    dispatch({ type: type.GET_USER_ERROR });
    return false;
  };
};

export const logoutAction = () => {
  return async (dispatch): Promise<unknown> => {
    await request.post(LogoutUrl());
    dispatch({ type: type.GET_USER_SUCCESS, payload: '' });

    return false;
  };
};
