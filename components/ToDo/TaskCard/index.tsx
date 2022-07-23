import { StyledButton, StyledDiv } from 'components/Common/commonStyle';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DONE_TASK } from 'store/tasks/tasks.constants';
import { TaskType } from 'types/tasks.type';
import { StyledPriorityBadge, StyledTaskCard } from './style';

type TaskCardType = {
  task: TaskType;
  setTask?: (task) => void;
  isDoneList?: boolean;
};

const TaskCard: React.FC<TaskCardType> = ({ task, setTask, isDoneList }) => {
  const dispatch = useDispatch();
  return (
    <StyledTaskCard>
      <StyledDiv flex="1">
        <StyledDiv fontWeight="bold" fontSize="16px">
          {task.title}
        </StyledDiv>
        <StyledDiv fontSize="14px">{task.description}</StyledDiv>
      </StyledDiv>

      <StyledDiv width="142px" direction="rtl">
        <StyledDiv display="flex" alignItems="center">
          <StyledPriorityBadge priority={task.priority} /> {task.priority}
        </StyledDiv>
        {!isDoneList && (
          <StyledDiv display="flex" mt={1}>
            <StyledButton
              size="small"
              fontSize={12}
              ml={1}
              bg="grass60"
              type="primary"
              onClick={(): void => setTask(task)}
            >
              Edit Task
            </StyledButton>
            <StyledButton
              size="small"
              fontSize={12}
              ml={1}
              bg="other1"
              type="primary"
              onClick={(): void => {
                dispatch({ type: DONE_TASK, payload: task.id });
              }}
            >
              Done Task
            </StyledButton>
          </StyledDiv>
        )}
      </StyledDiv>
    </StyledTaskCard>
  );
};

export default TaskCard;
