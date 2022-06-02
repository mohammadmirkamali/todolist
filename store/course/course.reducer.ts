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
            data: action.payload,
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
