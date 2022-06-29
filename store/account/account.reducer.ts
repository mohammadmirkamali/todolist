import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  user: null,
  userLoading: false,
  login: { data: null, prevStep: null },
  loginLoading: false,
  profile: { data: null, prevStep: null },
  profileLoading: false,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case type.GET_USER_REQUEST:
      return { ...state, userLoading: true };
    case type.GET_USER_SUCCESS:
      return { ...state, user: action.payload, userLoading: false };

    case type.POST_LOGIN_REQUEST:
      return { ...state, loginLoading: true };
    case type.POST_LOGIN_SUCCESS:
      return { ...state, loginLoading: false, login: action.payload };
    case type.POST_LOGIN_ERROR:
      return { ...state, loginLoading: false };

    case type.POST_PROFILE_REQUEST:
      return { ...state, profileLoading: true };
    case type.POST_PROFILE_SUCCESS:
      return { ...state, profileLoading: false, profile: action.payload };
    case type.POST_PROFILE_ERROR:
      return { ...state, profileLoading: false };

    case type.UPDATE_USER: {
      const newUser = { ...state.user };
      if (action.filed === 'passed_lessons') {
        newUser.workshops
          .find((item) => item.id === Number(action.courseId))
          .passed_lessons.push(Number(action.lessonId));
      }

      return { ...state, user: newUser };
    }
    default:
      return state;
  }
};

export default accountReducer;
