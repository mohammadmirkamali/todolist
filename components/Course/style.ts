import styled from '@emotion/styled';
import { Button } from 'antd';

export const SButton = styled(Button)`
  width: 240px;
  height: 40px;
  margin: 40px 0;
  border-radius: 8px;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;
export const SComment = styled(Button)`
  width: 240px;
  height: 35px;
  border-radius: 8px;
  font-size: 18px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;
