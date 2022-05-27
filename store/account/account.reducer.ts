import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  user: null,
  userLoading: false,
  login: { data: null, prevStep: null },
  loginLoading: false,
  webinarsLoading: false,
  webinars: null,
  webinarsError: false,
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

    case type.GET_ALL_WEBINAR_REQUEST:
      return { ...state, webinarsLoading: true, webinars: null, webinarsError: false };
    case type.GET_ALL_WEBINAR_SUCCESS:
      return {
        ...state,
        webinarsLoading: false,
        webinars: action.payload,
        webinarsError: false,
      };
    case type.GET_ALL_WEBINAR_ERROR:
      return { ...state, webinarsLoading: false, webinars: null, webinarsError: true };

    default:
      return state;
  }
};

export default accountReducer;
