/* eslint-disable @typescript-eslint/camelcase */
import { CourseReducerType } from 'types/course.type';
import * as type from './course.constants';

const initialState: CourseReducerType = {
  searchDataLoading: false,
  searchData: null,
  searchDataError: false,
  postsLoading: false,
  posts: null,
  postsError: false,
  examInfoLoading: false,
  examInfo: null,
  examInfoError: false,
  homeLoading: false,
  home: null,
  homeError: false,
  changeTermLoading: false,
  termLoading: false,
  term: null,
  termError: false,
  event: null,
  chapters: null,
};

// eslint-disable-next-line default-param-last
const courseReducer = (state = initialState, action): CourseReducerType => {
  switch (action.type) {
    case type.GET_POSTS_REQUEST:
      return { ...state, postsLoading: true, posts: null, postsError: false };
    case type.GET_POSTS_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        posts: action.payload,
        postsError: false,
      };
    case type.GET_POSTS_ERROR:
      return { ...state, postsLoading: false, posts: null, postsError: true };

    case type.GET_EXAM_INFO_REQUEST:
      return { ...state, examInfoLoading: true, examInfo: null, examInfoError: false };
    case type.GET_EXAM_INFO_SUCCESS:
      return {
        ...state,
        examInfoLoading: false,
        examInfo: action.payload,
        examInfoError: false,
      };
    case type.GET_EXAM_INFO_ERROR:
      return { ...state, examInfoLoading: false, examInfo: null, examInfoError: true };

    case type.UPDATE_COURSE: {
      const rewChapter = { ...state.chapters };

      if (action.filed === 'workshop_user_rate')
        rewChapter[action.id].data.workshop_user_rate = action.rate;

      return { ...state, chapters: rewChapter };
    }

    case type.GET_EVENT_REQUEST:
      return {
        ...state,
        event: {
          ...state.event,
          [action.id]: { ...state.event?.[action.id], loading: true },
        },
      };
    case type.GET_EVENT_SUCCESS:
      return {
        ...state,
        event: {
          ...state.event,
          [action.id]: {
            loading: false,
            data: action.payload,
            error: null,
          },
        },
      };
    case type.GET_EVENT_ERROR:
      return {
        ...state,
        event: {
          ...state.event,
          [action.id]: { loading: true, data: null, error: true },
        },
      };

    case type.GET_SEARCH_DATA_REQUEST:
      return {
        ...state,
        searchDataLoading: true,
        searchData: null,
        searchDataError: false,
      };
    case type.GET_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        searchDataLoading: false,
        searchData: action.payload,
        searchDataError: false,
      };
    case type.GET_SEARCH_DATA_ERROR:
      return {
        ...state,
        searchDataLoading: false,
        searchData: null,
        searchDataError: true,
      };

    case type.GET_HOME_REQUEST:
      return { ...state, homeLoading: true, home: null, homeError: false };
    case type.GET_HOME_SUCCESS:
      return { ...state, homeLoading: false, home: action.payload, homeError: false };
    case type.GET_HOME_ERROR:
      return { ...state, homeLoading: false, home: null, homeError: true };

    case type.GET_TERM_REQUEST:
      return { ...state, termLoading: true, term: null, termError: false };
    case type.GET_TERM_SUCCESS:
      return { ...state, termLoading: false, term: action.payload, termError: false };
    case type.GET_TERM_ERROR:
      return { ...state, termLoading: false, term: null, termError: true };

    case type.CHANGE_TERM_HOUR_REQUEST:
      return { ...state, changeTermLoading: true };
    case type.CHANGE_TERM_HOUR_SUCCESS: {
      const term = { ...state.term };
      term.available_days = action.days;
      term.week_hours = action.hours;
      return { ...state, changeTermLoading: false, term };
    }
    case type.CHANGE_TERM_HOUR_ERROR:
      return { ...state, changeTermLoading: false };

    case type.CLEAR_STORE:
      return { ...state, term: null, chapters: null, event: null };
    case type.GET_CHAPTER_REQUEST:
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [action.id]: { ...state.chapters?.[action.id], loading: true }, // not show loading when user register a course
        },
      };
    case type.GET_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [action.id]: {
            loading: false,
            data: { ...action.payload, user: action.user },
            error: null,
          },
        },
      };
    case type.GET_CHAPTER_ERROR:
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [action.id]: { loading: true, data: null, error: true },
        },
      };

    default:
      return state;
  }
};

export default courseReducer;
