import styled from '@emotion/styled';
import { Button } from 'antd';
import { StyledDiv } from 'components/Common/commonStyle';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTaskModal from './AddTaskModal';

const StyledContainer = styled.div`
  width: 700px;
  height: 500px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const StyledFirstTaskButton = styled(Button)`
  border-radius: 6px;
  direction: initial;
  font-size: 1.8rem;
  height: 50px;
  margin-top: 100px;
  background: ${({ theme }): string => theme.colors.rose30};
`;

const ToDo: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const taskList = useSelector((state) => state.tasks.taskList);
  console.log('taskList', taskList);
  return (
    <StyledDiv centered minHeight="100vh" bg="blue20">
      <StyledContainer>
        <h1>Hello World</h1>

        <StyledFirstTaskButton onClick={(): void => setIsAddModalVisible(true)}>
          Create Your First Task ;)
        </StyledFirstTaskButton>

        <AddTaskModal isVisible={isAddModalVisible} setIsVisible={setIsAddModalVisible} />
      </StyledContainer>
    </StyledDiv>
  );
};

export default ToDo;
