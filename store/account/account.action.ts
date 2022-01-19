/* eslint-disable arrow-body-style */
import request from 'services/request';
import { ResType } from 'types/commen.type';

import { GET_COURSE_REQUEST, GET_COURSE_SUCCESS } from './account.constants';
import { CourseRoute } from './account.service';

export const getCoursesActio1 = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: GET_COURSE_REQUEST });
    const response: ResType = await request.get(CourseRoute());

    if (response.ok) {
      dispatch({ type: GET_COURSE_SUCCESS, payload: response.data.workshops.data });
      return response.data;
    }

    return null;
  };
};
