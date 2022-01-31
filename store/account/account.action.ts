/* eslint-disable arrow-body-style */
import request from 'services/request';
import { CheckAuthPhoneUrl } from 'services/routes';
import { ResType } from 'types/commen.type';
import * as type from './account.constants';

export const postCheckPhoneAction = (number) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.POST_PHONE_REQUEST });
    const response: ResType = await request.post(CheckAuthPhoneUrl(), number);

    if (response.ok) {
      dispatch({ type: type.POST_PHONE_SUCCESS, payload: response });
      return response.data;
    }

    return null;
  };
};
