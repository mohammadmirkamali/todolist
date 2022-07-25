import { TaskReducerType } from 'types/tasks.type';
import * as type from './tasks.constants';

const initialState: TaskReducerType = {
  taskList: [],
  doneTasks: [],
};

// eslint-disable-next-line default-param-last
const tasksReducer = (state = initialState, action): TaskReducerType => {
  switch (action.type) {
    case type.ADD_TASK:
      return { ...state, taskList: [...state.taskList, action.payload] };

    case type.DONE_TASK: {
      const target = state.taskList.find((task) => task.id === action.payload);
      const taskList = state.taskList.filter((task) => task.id !== action.payload);
      const doneTasks = [...state.doneTasks, target];
      return { ...state, taskList, doneTasks };
    }

    case type.EDIT_TASK: {
      const taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
      return { ...state, taskList };
    }

    case type.DELETE_TASK: {
      const taskList = state.taskList.filter((task) => task.id !== action.payload);
      return { ...state, taskList };
    }

    default:
      return state;
  }
};

export default tasksReducer;
