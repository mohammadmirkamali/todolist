import { Modal } from 'antd';
import { StyledDiv } from 'components/Common/commonStyle';
import FormInput from 'components/Common/FormInput';
import FormRadio from 'components/Common/FormRadio';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ADD_TASK } from 'store/tasks/tasks.constants';
import { StyledSubmitButton } from './style';

type AddModalType = {
  setIsVisible: (status) => void;
  isVisible: boolean;
};

const AddTaskModal: React.FC<AddModalType> = ({ setIsVisible, isVisible }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data): void => {
    dispatch({ type: ADD_TASK, payload: data });
    reset();
  };

  return (
    <Modal visible={isVisible} footer={null} onCancel={(): void => setIsVisible(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDiv p="30px" display="flex" flexDirection="column" direction="initial">
          <FormInput
            placeholder="Task Title"
            label="title"
            register={register}
            required
            errors={errors}
          />
          <FormInput
            placeholder="Task Description"
            label="description"
            register={register}
            required
            textArea
            errors={errors}
          />
          <FormInput
            placeholder="Gifs and KPI for this task"
            label="gif"
            register={register}
            errors={errors}
          />

          <div>
            <FormRadio
              items={[
                { label: 'priority', value: 'low', title: 'Low' },
                { label: 'priority', value: 'medium', title: 'Medium' },
                { label: 'priority', value: 'high', title: 'High' },
              ]}
              register={register}
              required
            />
          </div>

          <StyledSubmitButton htmlType="submit">Add To Tasks</StyledSubmitButton>
        </StyledDiv>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
