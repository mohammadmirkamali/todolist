/* eslint-disable arrow-body-style */
import { message } from 'antd';
import { t } from 'i18next';
import { destroyCookie, setCookie } from 'nookies';
import request from 'services/request';
import { UserUrl } from 'services/routes';
import * as type from './account.constants';

export const postLoginAction = (url, body) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.POST_LOGIN_REQUEST });
    const response: any = url ? await request.post(url, body) : body; // eslint-disable-line

    if (response.ok) {
      const { data } = response;
      data.token && setCookie(null, 'taalei', data.token.replace('Bearer ', ''));
      dispatch({ type: type.POST_LOGIN_SUCCESS, payload: data });
      return data.token && !data.next ? null : true;
    }

    message.error(response.data.message || t('global.apiError'));
    dispatch({ type: type.POST_LOGIN_ERROR });
    return false;
  };
};

export const getUserAction = () => {
  return async (dispatch): Promise<unknown> => {
    const response = await request.get(UserUrl());
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
