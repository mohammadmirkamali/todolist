import { Modal } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from 'components/ToDo/TaskCard';
import { StyledDiv, StyledH2 } from 'components/Common/commonStyle';

type DoneTasksType = {
  visible: boolean;
  setVisible: (status) => void;
};

const DoneTasksModal: React.FC<DoneTasksType> = ({ visible, setVisible }) => {
  const tasks = useSelector((state) => state.tasks.doneTasks);
  return (
    <Modal
      visible={visible}
      footer={null}
      width={700}
      onCancel={(): void => setVisible(false)}
    >
      <StyledDiv p="16px" minHeight="300px">
        <StyledH2 textAlign="center" mb="24px">
          Done Tasks
        </StyledH2>

        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} isDoneList />
        ))}
      </StyledDiv>
    </Modal>
  );
};

export default DoneTasksModal;
