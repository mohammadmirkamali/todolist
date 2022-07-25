import { Modal } from 'antd';
import {
  StyledButton,
  StyledDiv,
  StyledH2,
  StyledP,
  StyledSpan,
} from 'components/Common/commonStyle';
import React from 'react';
import { TaskType } from 'types/tasks.type';
import { StyledPriorityBadge } from 'components/ToDo/TaskCard/style';
import { useDispatch } from 'react-redux';
import { DELETE_TASK, DONE_TASK } from 'store/tasks/tasks.constants';

type DetailsModalType = {
  task: TaskType;
  setDetailsModalTask: (status) => void;
  setTask: (status) => void;
};

const TaskDetailsModal: React.FC<DetailsModalType> = ({
  task,
  setDetailsModalTask,
  setTask,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      visible={!!task}
      width={600}
      footer={null}
      onCancel={(): void => setDetailsModalTask(null)}
    >
      <StyledDiv p="16px" minHeight="200px" position="relative">
        <StyledH2 textAlign="center" mb="24px" fontWeight="bold">
          {task?.title}
        </StyledH2>

        <StyledP direction="initial" px="40px">
          {task?.description}
        </StyledP>

        <StyledDiv position="absolute" top="0" display="flex" left="0">
          <StyledSpan ml="6px" fontSize="1.8rem" mt="-4px">
            {task?.priority}{' '}
          </StyledSpan>{' '}
          <StyledPriorityBadge priority={task?.priority} />
        </StyledDiv>

        <StyledDiv display="flex" justifyContent="space-between" mt="52px">
          <StyledButton
            fontSize={14}
            bg="rose80"
            type="primary"
            width="100px"
            onClick={(): void => {
              dispatch({ type: DELETE_TASK, payload: task?.id });
              setDetailsModalTask(false);
            }}
          >
            Delete Task
          </StyledButton>
          <StyledButton
            fontSize={14}
            bg="grass60"
            type="primary"
            width="100px"
            onClick={(): void => (setDetailsModalTask(false), setTask(task))}
          >
            Edit Task
          </StyledButton>
          <StyledButton
            width="100px"
            fontSize={14}
            bg="other1"
            type="primary"
            onClick={(): void => {
              dispatch({ type: DONE_TASK, payload: task?.id });
              setDetailsModalTask(false);
            }}
          >
            Done Task
          </StyledButton>
        </StyledDiv>
      </StyledDiv>
    </Modal>
  );
};

export default TaskDetailsModal;
