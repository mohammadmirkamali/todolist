import { StyledButton, StyledDiv } from 'components/Common/commonStyle';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DONE_TASK } from 'store/tasks/tasks.constants';
import { TaskType } from 'types/tasks.type';
import { StyledPriorityBadge, StyledTaskCard, StyledText } from './style';

type TaskCardType = {
  task: TaskType;
  setTask?: (task) => void; // use for edit or add new task
  setDetailsModalTask?: (task: TaskType) => void; // use for details task
  isDoneList?: boolean; // use when show card in doneTaskModal
};

const TaskCard: React.FC<TaskCardType> = ({
  task,
  setTask,
  isDoneList,
  setDetailsModalTask,
}) => {
  const dispatch = useDispatch();
  return (
    <StyledTaskCard
      onClick={(): void => !isDoneList && setDetailsModalTask(task)}
      isDoneList={isDoneList}
    >
      <StyledDiv flex="1">
        <StyledText fontWeight="bold" fontSize="16px">
          {task.title}
        </StyledText>
        <StyledText fontSize="14px">{task.description}</StyledText>
      </StyledDiv>

      <StyledDiv width="145px" direction="rtl">
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
              onClick={(e): void => {
                e.stopPropagation();
                setTask(task);
              }}
            >
              Edit Task
            </StyledButton>
            <StyledButton
              size="small"
              fontSize={12}
              ml={1}
              bg="other1"
              type="primary"
              onClick={(e): void => {
                e.stopPropagation();
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
