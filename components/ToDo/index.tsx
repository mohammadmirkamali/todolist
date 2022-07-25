import { PlusOutlined } from '@ant-design/icons';
import { StyledDiv, StyledH1 } from 'components/Common/commonStyle';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTaskModal from './AddTaskModal';
import DoneTasksModal from './DoneTasksModal';
import {
  StyledAddTaskButton,
  StyledContainer,
  StyledDoneTaskButton,
  StyledFirstTaskButton,
} from './style';
import TaskCard from './TaskCard';
import TaskDetailsModal from './TaskDetailsModal';

const ToDo: React.FC = () => {
  const [taskModal, setTaskModal] = useState(false); // boolean for add task, object for edit task
  const [isDoneTaskModalVisible, setIsDoneTaskModalVisible] = useState(false);
  const [detailsModalTask, setDetailsModalTask] = useState(null);

  const taskList = useSelector((state) => state.tasks.taskList);
  const doneTasks = useSelector((state) => state.tasks.doneTasks);

  const isEmpty = !doneTasks.length && !taskList.length;
  return (
    <StyledDiv centered minHeight="100vh" bg="blue20">
      <StyledContainer>
        <StyledH1 mb="11px">Hello World</StyledH1>

        {/* startup button */}
        {isEmpty && (
          <StyledFirstTaskButton onClick={(): void => setTaskModal(true)}>
            Create Your First Task ;)
          </StyledFirstTaskButton>
        )}

        {/* list of tasks */}
        <StyledDiv width="100%" p="0 24px 24px" overflowY="scroll">
          {taskList.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              setTask={setTaskModal}
              setDetailsModalTask={setDetailsModalTask}
            />
          ))}
        </StyledDiv>

        {/* add task button */}
        {!isEmpty && (
          <StyledAddTaskButton onClick={(): void => setTaskModal(true)}>
            <PlusOutlined />
          </StyledAddTaskButton>
        )}

        {/* view done tasks button */}
        {!isEmpty && (
          <StyledDoneTaskButton onClick={(): void => setIsDoneTaskModalVisible(true)}>
            View Done Tasks
          </StyledDoneTaskButton>
        )}

        <AddTaskModal task={taskModal} setTask={setTaskModal} />
        <DoneTasksModal
          setVisible={setIsDoneTaskModalVisible}
          visible={isDoneTaskModalVisible}
        />
        <TaskDetailsModal
          setDetailsModalTask={setDetailsModalTask}
          task={detailsModalTask}
          setTask={setTaskModal}
        />
      </StyledContainer>
    </StyledDiv>
  );
};

export default ToDo;
