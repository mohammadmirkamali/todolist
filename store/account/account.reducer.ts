import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  postPhoneLoading: false,
  postPhone: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case type.POST_PHONE_REQUEST:
      return { ...state, postPhoneLoading: true, postPhone: null };
    case type.POST_PHONE_SUCCESS:
      return { ...state, postPhoneLoading: false, postPhone: action.payload };

    default:
      return state;
  }
};

export default accountReducer;
