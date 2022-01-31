/* eslint-disable arrow-body-style */
import request from 'services/request';
import { AllCoursesUrl, CourseUrl } from 'services/routes';
import { ResType } from 'types/commen.type';
import * as type from './course.constants';

export const getCoursesAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_COURSE_REQUEST });
    const response: ResType = await request.get(AllCoursesUrl());
    if (response.ok) {
      dispatch({ type: type.GET_COURSE_SUCCESS, payload: response.data.workshops.data });
      return response.data;
    }

    dispatch({ type: type.GET_COURSE_ERROR });
    return false;
  };
};

export const getChapterAction = (id) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_CHAPTER_REQUEST });
    const response: ResType = await request.get(CourseUrl(id));
    if (response.ok) {
      dispatch({ type: type.GET_CHAPTER_SUCCESS, payload: response.data.chapters });
      return response.data;
    }

    dispatch({ type: type.GET_CHAPTER_ERROR });
    return false;
  };
};
