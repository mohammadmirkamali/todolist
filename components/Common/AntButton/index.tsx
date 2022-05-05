import styled from '@emotion/styled';
import { Button } from 'antd';
import React from 'react';
import { CommonStyle } from 'components/Common/commonStyle';

export const SButton = styled(CommonStyle(Button))`
  border-radius: 6px;
  transition: all 0.3s;
  border: 1px solid;
  direction: ltr;
  color: ${({ theme }): string => theme.colors.gray[12]};
  border-color: ${({ theme }): string => theme.colors.gray[5]};
  :hover {
    color: #000;
    border-color: #000;
  }

  .ant-btn-loading-icon {
    margin-right: 12px !important;
    margin-left: 0px !important;
  }

  :focus {
    color: #000;
    border-color: #000;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AntButton: React.FC<any> = ({ children, ...rest }) => (
  <SButton {...rest}>{children}</SButton>
);

export default AntButton;
