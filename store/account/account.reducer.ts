import { AccountType } from 'types/account.type';
import {
  GET_CAPTCHA_REQUEST,
  GET_CAPTCHA_SUCCESS,
  GET_CAPTCHA_ERROR,
} from './account.constants';

const initialState: AccountType = {
  captchaLoading: false,
  captchaError: false,
  captcha: null,
};

// eslint-disable-next-line default-param-last
const accountReducer = (state = initialState, action): AccountType => {
  switch (action.type) {
    case GET_CAPTCHA_REQUEST:
      return {
        ...state,
        captchaLoading: true,
        captchaError: false,
        captcha: null,
      };
    case GET_CAPTCHA_SUCCESS:
      return {
        ...state,
        captchaLoading: false,
        captchaError: false,
        captcha: action.payload,
      };
    case GET_CAPTCHA_ERROR:
      return {
        ...state,
        captchaLoading: false,
        captchaError: true,
        captcha: null,
      };

    default:
      return state;
  }
};

export default accountReducer;
