import { CourseReducerType } from 'types/course.type';
import * as type from './course.constants';

const initialState: CourseReducerType = {
  coursesLoading: false,
  courses: null,
  coursesError: false,
  chapterLoading: false,
  chapterError: false,
  chapters: null,
};

// eslint-disable-next-line default-param-last
const courseReducer = (state = initialState, action): CourseReducerType => {
  switch (action.type) {
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
    case type.GET_CHAPTER_REQUEST:
      return { ...state, chapterLoading: true, chapters: null, chapterError: null };
    case type.GET_CHAPTER_SUCCESS:
      return {
        ...state,
        chapterLoading: false,
        chapters: action.payload,
        chapterError: null,
      };
    case type.GET_CHAPTER_ERROR:
      return { ...state, chapterLoading: false, chapters: null, chapterError: true };

    default:
      return state;
  }
};

export default courseReducer;
