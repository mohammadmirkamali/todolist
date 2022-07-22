import 'react-redux';
import { TaskReducerType } from 'types/tasks.type';

// set default root state for all reducer
declare module 'react-redux' {
  interface DefaultRootState {
    tasks: TaskReducerType;
  }
}
