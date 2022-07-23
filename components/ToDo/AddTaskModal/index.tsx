import { Modal, Radio } from 'antd';
import { StyledDiv } from 'components/Common/commonStyle';
import FormInput from 'components/Common/FormInput';
import React, { ReactElement, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ADD_TASK, EDIT_TASK } from 'store/tasks/tasks.constants';
import { TaskType } from 'types/tasks.type';
import { StyledSubmitButton } from './style';

type AddModalType = {
  setTask: (status) => void;
  task: TaskType | boolean;
};

const AddTaskModal: React.FC<AddModalType> = ({ setTask, task }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data): void => {
    typeof task === 'boolean'
      ? dispatch({ type: ADD_TASK, payload: { ...data, id: uuidv4() } })
      : dispatch({ type: EDIT_TASK, payload: data });
    setTask(false);
  };

  useEffect(() => {
    typeof task !== 'boolean'
      ? reset(task)
      : reset({ title: '', description: '', gif: '', priority: '' });
  }, [task]);

  return (
    <Modal visible={!!task} footer={null} onCancel={(): void => setTask(false)}>
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

          <Controller
            render={({ field }): ReactElement => (
              <Radio.Group aria-label="gender" {...field}>
                <Radio value="Low">Low</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="HIGH">HIGH</Radio>
              </Radio.Group>
            )}
            name="priority"
            rules={{ required: true }}
            control={control}
          />
          {errors?.priority && (
            <StyledDiv color="rose80">This field is required</StyledDiv>
          )}

          <StyledSubmitButton htmlType="submit">
            {typeof task !== 'boolean' ? 'Edit Task' : 'Add To Tasks'}
          </StyledSubmitButton>
        </StyledDiv>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
