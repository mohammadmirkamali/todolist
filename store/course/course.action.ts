/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable arrow-body-style */
import { message } from 'antd';
import request from 'services/request';
import * as api from 'services/routes';
import { ResType } from 'types/common.type';
import * as type from './course.constants';

export const getSearchDataAction = () => {
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

export const getChapterAction = (id, user) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_CHAPTER_REQUEST, id });
    const response: ResType = await request.get(api.CourseUrl(id));

    if (response.ok) {
      dispatch({
        type: type.GET_CHAPTER_SUCCESS,
        payload: response.data,
        id,
        user,
      });
      return response.data;
    }

    dispatch({ type: type.GET_CHAPTER_ERROR, id });
    return false;
  };
};

export const getHomeAction = () => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_HOME_REQUEST });
    const response: ResType = await request.get(api.HomeUrl());

    if (response.ok) {
      dispatch({ type: type.GET_HOME_SUCCESS, payload: response.data });
      return response.data;
    }

    dispatch({ type: type.GET_HOME_ERROR });
    return false;
  };
};

export const getTermAction = (id) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_TERM_REQUEST });
    const response: ResType = await request.get(api.TermUrl(id));

    if (response.ok) {
      dispatch({ type: type.GET_TERM_SUCCESS, payload: response.data });
      return response.data;
    }

    dispatch({ type: type.GET_TERM_ERROR });
    return false;
  };
};

export const changeTermHourAction = (id, hours, days) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.CHANGE_TERM_HOUR_REQUEST });
    const response: ResType = await request.post(api.ChangeTermHoursUrl(id), {
      week_hours: hours,
      available_days: days,
    });

    if (response.ok) {
      message.success(response.data.message);
      dispatch({ type: type.CHANGE_TERM_HOUR_SUCCESS, hours, days });
      return response.data;
    }

    message.error(response.data.message);
    dispatch({ type: type.CHANGE_TERM_HOUR_ERROR });
    return false;
  };
};

export const getExamInfoAction = (examId) => {
  return async (dispatch): Promise<unknown> => {
    dispatch({ type: type.GET_EXAM_INFO_REQUEST });
    const response: ResType = await request.get(api.ExamInfoUrl(examId));
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
