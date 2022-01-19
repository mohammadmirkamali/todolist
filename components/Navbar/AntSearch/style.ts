import styled from '@emotion/styled';
import { Select } from 'antd';

export const SSelect = styled(Select)<{ focus: number; isDown: number }>`
  width: 100vw;
  position: fixed;
  right: 0;
  top: 69px;

  font-size: 20px;
  transition: all 0.3s;

  transform: ${({ isDown }): string => (isDown ? 'translateY(-100%)' : 'translateY(0)')};
  ${({ theme }): string => theme.mediaQueries.sm} {
    .ant-select-selector {
      border-radius: ${({ focus }): string => (focus ? '8px' : '20px ')} !important;
    }
    transform: translateY(0);
    margin: 4px 12px;
    position: unset;
    width: ${({ focus }): string => (focus ? '400px' : '40px')};
    display: block;
  }
`;
