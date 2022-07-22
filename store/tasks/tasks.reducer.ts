import { TaskReducerType } from 'types/tasks.type';
import * as type from './tasks.constants';

const initialState: TaskReducerType = {
  taskList: [],
};

// eslint-disable-next-line default-param-last
const tasksReducer = (state = initialState, action): TaskReducerType => {
  switch (action.type) {
    case type.ADD_TASK:
      return { ...state, taskList: [...state.taskList, action.payload] };

    default:
      return state;
  }
};

export default tasksReducer;
