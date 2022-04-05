import { AccountType } from 'types/account.type';
import * as type from './account.constants';

const initialState: AccountType = {
  user: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case type.GET_USER_SUCCESS:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default accountReducer;
