import styled from '@emotion/styled';
import { Button } from 'antd';
import React from 'react';

export const SButton = styled(Button)`
  :hover {
    color: #000 !important;
    border: ${({ theme }): string => theme.borders[0]};
  }

  :focus {
    color: #000 !important;
    border: ${({ theme }): string => theme.borders[0]};
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AntButton: React.FC<any> = ({ children, ...rest }) => (
  <SButton {...rest}>{children}</SButton>
);

export default AntButton;
