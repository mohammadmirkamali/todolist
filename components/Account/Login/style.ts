import styled from '@emotion/styled';
import { Modal } from 'antd';
import { SubmitForm } from 'components/Common/formField';

export const SSubmitForm = styled(SubmitForm)`
  border-radius: 8px;
  height: 40px;
  font-size: 18px;
  margin-top: 30px;
  width: 400px;
`;

export const SModal = styled(Modal)`
  border-radius: 12px;
  .ant-modal-body {
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-modal-content {
    border-radius: 20px;
  }

  input {
    direction: ltr;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
