import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  userLoading: false,
  userError: false,
  user: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case type.POST_LOGIN_REQUEST:
      return { ...state, userLoading: true, user: null, userError: false };
    case type.POST_LOGIN_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
        userError: false,
      };
    case type.POST_LOGIN_ERROR:
      return { ...state, userLoading: false, user: null, userError: true };

    default:
      return state;
  }
};

export default accountReducer;
