import 'react-redux';
import { AccountType } from 'types/account.type';
import { MainType } from 'types/main.type';

// set default root state for all reducer
declare module 'react-redux' {
  interface DefaultRootState {
    account: AccountType;
    main: MainType;
  }
}
