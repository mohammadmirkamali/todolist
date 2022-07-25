import styled from '@emotion/styled';
import { Button } from 'antd';

export const StyledContainer = styled.div`
  width: 700px;
  height: 500px;
  background: ${({ theme }): string => theme.colors.ash20};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 0;
  position: relative;
`;

export const StyledFirstTaskButton = styled(Button)`
  border-radius: 6px;
  direction: initial;
  font-size: 1.8rem;
  height: 50px;
  margin-top: 100px;
  background: ${({ theme }): string => theme.colors.other1};
`;

export const StyledDoneTaskButton = styled(Button)`
  border-radius: 6px;
  direction: initial;
  font-size: 1.4rem;
  height: 30px;
  position: absolute;
  top: 40px;
  left: 32px;
  background: ${({ theme }): string => theme.colors.berry40};

  :focus {
    background: ${({ theme }): string => theme.colors.berry40};
    color: #000;
  }

  :hover {
    background: ${({ theme }): string => theme.colors.berry80};
    color: #000;
  }
`;

export const StyledAddTaskButton = styled(Button)`
  border-radius: 50%;
  font-size: 2.4rem;
  height: 50px;
  width: 60px;
  height: 60px;
  background: ${({ theme }): string => theme.colors.rose90};
  position: absolute;
  bottom: 18px;
  right: 18px;
  :hover {
    background: ${({ theme }): string => theme.colors.rose50};
    color: #000;
  }
`;
