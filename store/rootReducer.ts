import { combineReducers } from 'redux';
import account from './account/account.reducer';

const appReducer = combineReducers({
  account,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined; // eslint-disable-line no-param-reassign
  }

  return appReducer(state, action);
};

export default rootReducer;
