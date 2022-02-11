import styled from '@emotion/styled';
import { Button, Tooltip } from 'antd';

export const SNav = styled.nav`
  height: 70px;
  width: 100%;
  position: fixed;
  background-color: #fff;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  z-index: 100;
`;

export const SExit = styled(Tooltip)`
  transition: all 0.3s;
  :hover {
    color: ${({ theme }): string => theme.colors.red[0]};
  }
`;

export const SButton = styled(Button)`
  transition: all 0.3s;
  color: ${({ theme }): string => theme.colors.gray[3]};
  font-size: 20px;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 2px 7px 0 0;
    font-size: 18px;
  }

  ${({ theme }): string => theme.mediaQueries.lg} {
    width: 160px;
  }
`;
