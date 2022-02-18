/* eslint-disable arrow-body-style */
import { setCookie } from 'nookies';
import request from 'services/request';
import { LoginUrl } from 'services/routes';
import { ResType } from 'types/commen.type';
import * as type from './account.constants';

export const postLoginAction = (body) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.POST_LOGIN_REQUEST });
    const response: ResType = await request.post(LoginUrl(), body);

    if (response.ok) {
      const token = response.data.user.api_token.replace('Bearer ', '');
      setCookie(null, 'taalei', token);
      dispatch({ type: type.POST_LOGIN_SUCCESS, payload: response.data.user });
      return response.data;
    }

    dispatch({ type: type.POST_LOGIN_ERROR });
    return null;
  };
};
