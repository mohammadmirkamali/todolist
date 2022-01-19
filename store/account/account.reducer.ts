import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  coursesLoading: false,
  courses: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
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
