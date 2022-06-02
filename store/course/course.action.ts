/* eslint-disable arrow-body-style */
import request from 'services/request';
import * as api from 'services/routes';
import { ResType } from 'types/common.type';
import * as type from './course.constants';

export const getCoursesAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_SEARCH_DATA_REQUEST });
    const response: ResType = await request.get(api.SearchUrl());
    if (response.ok) {
      dispatch({ type: type.GET_SEARCH_DATA_SUCCESS, payload: response.data });
      return response.data;
    }

    dispatch({ type: type.GET_SEARCH_DATA_ERROR });
    return false;
  };
};

export const getChapterAction = (id) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_CHAPTER_REQUEST, id });
    const response: ResType = await request.get(api.CourseUrl(id));
    if (response.ok) {
      dispatch({
        type: type.GET_CHAPTER_SUCCESS,
        payload: response.data,
        id,
      });
      return response.data;
    }

    dispatch({ type: type.GET_CHAPTER_ERROR, id });
    return false;
  };
};

export const getExamInfoAction = (courseId, lessonId) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_EXAM_INFO_REQUEST });
    const response: ResType = await request.get(api.ExamInfoUrl(courseId, lessonId));
    if (response.ok) {
      dispatch({
        type: type.GET_EXAM_INFO_SUCCESS,
        payload: response.data,
      });
      return response.data;
    }

    dispatch({ type: type.GET_EXAM_INFO_ERROR });
    return false;
  };
};

export const getPostsAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_POSTS_REQUEST });
    const response: ResType = await request.get(api.PostsUrl());
    if (response.ok) {
      dispatch({ type: type.GET_POSTS_SUCCESS, payload: response.data.data });
      return response.data;
    }

    dispatch({ type: type.GET_POSTS_ERROR });
    return false;
  };
};

export const getEventAction = (id) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_EVENT_REQUEST, id });
    const response: ResType = await request.get(api.EventUrl(id));
    if (response.ok) {
      dispatch({ type: type.GET_EVENT_SUCCESS, payload: response.data, id });
      return response.data;
    }

    dispatch({ type: type.GET_EVENT_ERROR, id });
    return false;
  };
};
