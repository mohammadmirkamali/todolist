/* eslint-disable arrow-body-style */
import request from 'services/request';
import { AllCoursesUrl, CourseUrl, PostsUrl } from 'services/routes';
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
    dispatch({ type: type.GET_CHAPTER_REQUEST, id });
    const response: ResType = await request.get(CourseUrl(id));
    if (response.ok) {
      dispatch({ type: type.GET_CHAPTER_SUCCESS, payload: response.data.chapters, id });
      return response.data;
    }

    dispatch({ type: type.GET_CHAPTER_ERROR, id });
    return false;
  };
};

export const getPostsAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_POSTS_REQUEST });
    const response: ResType = await request.get(PostsUrl());
    if (response.ok) {
      dispatch({ type: type.GET_POSTS_SUCCESS, payload: response.data.data });
      return response.data;
    }

    dispatch({ type: type.GET_POSTS_ERROR });
    return false;
  };
};
