export type TaskType = {
  title: string;
  description: string;
  id: string;
  gif?: string;
  priority: 'low' | 'medium' | 'high';
};

export type TaskReducerType = {
  taskList: TaskType[];
  doneTasks: TaskType[];
};
