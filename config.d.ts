import 'react-redux';
import { AccountType } from 'types/account.type';
import { CourseReducerType } from 'types/course.type';

// set default root state for all reducer
declare module 'react-redux' {
  interface DefaultRootState {
    account: AccountType;
    course: CourseReducerType;
  }
}
