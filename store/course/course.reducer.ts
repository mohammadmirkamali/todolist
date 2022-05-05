import { CourseReducerType } from 'types/course.type';
import * as type from './course.constants';

const initialState: CourseReducerType = {
  coursesLoading: false,
  courses: null,
  coursesError: false,
  postsLoading: false,
  posts: null,
  postsError: false,
  webinar: null,
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

    case type.GET_COURSE_REQUEST:
      return { ...state, coursesLoading: true, courses: null, coursesError: false };
    case type.GET_COURSE_SUCCESS:
      return {
        ...state,
        coursesLoading: false,
        courses: action.payload,
        coursesError: false,
      };
    case type.GET_COURSE_ERROR:
      return { ...state, coursesLoading: false, courses: null, coursesError: true };

    case type.GET_WEBINAR_REQUEST:
      return {
        ...state,
        webinar: {
          ...state.webinar,
          [action.id]: { loading: true, data: null, error: null },
        },
      };
    case type.GET_WEBINAR_SUCCESS:
      return {
        ...state,
        webinar: {
          ...state.webinar,
          [action.id]: { loading: false, data: action.payload, error: null },
        },
      };
    case type.GET_WEBINAR_ERROR:
      return {
        ...state,
        webinar: {
          ...state.webinar,
          [action.id]: { loading: true, data: null, error: true },
        },
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
