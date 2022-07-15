/* eslint-disable arrow-body-style */
import request from 'services/request';
import { LogoutUrl, UserUrl } from 'services/routes';
import * as type from './account.constants';

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
    const response = await request.get(UserUrl());
    if (response.ok) {
      dispatch({ type: type.GET_USER_SUCCESS, payload: response.data });
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
