import styled from '@emotion/styled';
import { Tooltip } from 'antd';

export const SNav = styled.nav<{ isdown: number }>`
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
  transform: ${({ isdown }): string => (isdown ? 'translateY(-100%)' : 'translateY(0)')};
`;

export const SExit = styled(Tooltip)`
  transition: all 0.3s;
  :hover {
    color: ${({ theme }): string => theme.colors.red[0]};
  }
`;

export const SUser = styled.div`
  transition: all 0.3s;
  padding: 0 7px 0 15px;
  border-radius: 10px;
  background: #211a58;
  color: #fff;
  height: 50px;
  position: relative;
  transform: scale(0.9);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 14px;

  :before {
    content: '';
    position: absolute;
    top: 5px;
    right: -11px;
    height: 40px;
    width: 40px;
    background-image: linear-gradient(220deg, #211a58, #211a58, #fff0, #fff0);
    transform: rotate(45deg);
    border-radius: 10px;
  }

  :after {
    content: '';
    position: absolute;
    top: 5px;
    left: -11px;
    height: 40px;
    width: 40px;
    background-image: linear-gradient(-317deg, #211a58, #211a58, #fff0, #fff0);
    transform: rotate(45deg);
    border-radius: 10px;
  }
  :hover {
    transform: scale(0.95);
  }
`;
