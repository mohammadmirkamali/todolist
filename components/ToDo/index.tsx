import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { StyledDiv, StyledH1 } from 'components/Common/commonStyle';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTaskModal from './AddTaskModal';
import DoneTasksModal from './DoneTasksModal';
import TaskCard from './TaskCard';

const StyledContainer = styled.div`
  width: 700px;
  height: 500px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
`;

const StyledFirstTaskButton = styled(Button)`
  border-radius: 6px;
  direction: initial;
  font-size: 1.8rem;
  height: 50px;
  margin-top: 100px;
  background: ${({ theme }): string => theme.colors.other1};
`;

const StyledDoneTaskButton = styled(Button)`
  border-radius: 6px;
  direction: initial;
  font-size: 1.4rem;
  height: 30px;
  position: absolute;
  top: 40px;
  left: 32px;
  background: ${({ theme }): string => theme.colors.berry40};

  :focus {
    background: ${({ theme }): string => theme.colors.berry40};
    color: #000;
  }

  :hover {
    background: ${({ theme }): string => theme.colors.berry80};
    color: #000;
  }
`;

const StyledAddTaskButton = styled(Button)`
  border-radius: 50%;
  font-size: 2.4rem;
  height: 50px;
  width: 60px;
  height: 60px;
  background: ${({ theme }): string => theme.colors.rose90};
  position: absolute;
  bottom: 18px;
  right: 18px;
  :hover {
    background: ${({ theme }): string => theme.colors.rose50};
    color: #000;
  }
`;

const ToDo: React.FC = () => {
  const [taskModal, setTaskModal] = useState(false); // boolean for add task, object for edit task
  const [isDoneTaskModalVisible, setIsDoneTaskModalVisible] = useState(false);
  const taskList = useSelector((state) => state.tasks.taskList);
  const doneTasks = useSelector((state) => state.tasks.doneTasks);

  const isEmpty = !doneTasks.length && !taskList.length;
  return (
    <StyledDiv centered minHeight="100vh" bg="blue20">
      <StyledContainer>
        <StyledH1 mb="12px">Hello World</StyledH1>

        {isEmpty && (
          <StyledFirstTaskButton onClick={(): void => setTaskModal(true)}>
            Create Your First Task ;)
          </StyledFirstTaskButton>
        )}

        <StyledDiv width="100%">
          {taskList.map((task) => (
            <TaskCard task={task} key={task.title} setTask={setTaskModal} />
          ))}
        </StyledDiv>

        {!isEmpty && (
          <StyledAddTaskButton onClick={(): void => setTaskModal(true)}>
            <PlusOutlined />
          </StyledAddTaskButton>
        )}

        {!isEmpty && (
          <StyledDoneTaskButton onClick={(): void => setIsDoneTaskModalVisible(true)}>
            View Done Tasks
          </StyledDoneTaskButton>
        )}

        <DoneTasksModal
          setVisible={setIsDoneTaskModalVisible}
          visible={isDoneTaskModalVisible}
        />
        <AddTaskModal task={taskModal} setTask={setTaskModal} />
      </StyledContainer>
    </StyledDiv>
  );
};

export default ToDo;
