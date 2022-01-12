/* eslint-disable arrow-body-style */
import request from 'services/request';
import { CaptchaType } from 'types/account.type';
import { ResType } from 'types/commen.type';

import {
  GET_CAPTCHA_ERROR,
  GET_CAPTCHA_REQUEST,
  GET_CAPTCHA_SUCCESS,
} from './account.constants';
import { CaptchaImageUrl } from './account.service';

export const getCaptchaAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: GET_CAPTCHA_REQUEST });
    const response: ResType<CaptchaType> = await request.get(CaptchaImageUrl(), {});

    if (response.ok) {
      dispatch({ type: GET_CAPTCHA_SUCCESS, payload: response.data.data });
      return response.data;
    }

    dispatch({ type: GET_CAPTCHA_ERROR });
    return null;
  };
};
