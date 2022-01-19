import { MainType } from 'types/main.type';
import * as type from './main.constants';

const initialState: MainType = {
  coursesLoading: false,
  courses: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): MainType => {
  switch (action.type) {
    case type.GET_COURSE_REQUEST:
      return { ...state, coursesLoading: true, courses: null };
    case type.GET_COURSE_SUCCESS:
      return { ...state, coursesLoading: false, courses: action.payload };

    default:
      return state;
  }
};

export default accountReducer;
