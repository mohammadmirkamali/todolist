import styled from '@emotion/styled';
import { Button, Modal } from 'antd';

export const SButton = styled(Button)`
  border-radius: 8px;
  height: 50px;
  font-size: 20px;
  margin-top: 40px;
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
