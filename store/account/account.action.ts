/* eslint-disable arrow-body-style */
import { destroyCookie, setCookie } from 'nookies';
import request from 'services/request';
import { UserUrl } from 'services/routes';
import * as type from './account.constants';

export const postLoginAction = (user) => {
  return async (dispatch): Promise<unknown> => {
    const token = user.api_token.replace('Bearer ', '');
    setCookie(null, 'taalei', token);
    dispatch({ type: type.GET_USER_SUCCESS, payload: user });
    return user;
  };
};

export const getUserAction = () => {
  return async (dispatch): Promise<unknown> => {
    const response = await request.post(UserUrl());
    if (response.ok) {
      dispatch({ type: type.GET_USER_SUCCESS, payload: response.data });
      return true;
    }
    return false;
  };
};

export const logoutAction = () => {
  return async (dispatch): Promise<unknown> => {
    request.setHeader('authorization', '');
    destroyCookie(null, 'taalei', { path: '/' });
    dispatch({ type: type.GET_USER_SUCCESS, payload: '' });

    return false;
  };
};
