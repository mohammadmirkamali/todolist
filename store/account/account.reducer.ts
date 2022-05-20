import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  user: null,
  login: { data: null, prevStep: null },
  loginLoading: false,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case type.GET_USER_SUCCESS:
      return { ...state, user: action.payload };

    case type.POST_LOGIN_REQUEST:
      return { ...state, loginLoading: true };
    case type.POST_LOGIN_SUCCESS:
      return { ...state, loginLoading: false, login: action.payload };
    case type.POST_LOGIN_ERROR:
      return { ...state, loginLoading: false };

    default:
      return state;
  }
};

export default accountReducer;
