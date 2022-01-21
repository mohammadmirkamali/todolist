/* eslint-disable arrow-body-style */
import request from 'services/request';
import { ResType } from 'types/commen.type';
import * as type from './account.constants';
import { CheckAuthPhoneUrl, CourseUrl } from './account.service';

export const getCoursesAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_COURSE_REQUEST });
    const response: ResType = await request.get(CourseUrl());

    if (response.ok) {
      dispatch({ type: type.GET_COURSE_SUCCESS, payload: response.data.workshops.data });
      return response.data;
    }

    return null;
  };
};

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
