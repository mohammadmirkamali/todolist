import styled from '@emotion/styled';
import { Select } from 'antd';

type SelectType = { focus?: number; landing: number };
export const SSelect = styled(Select)<SelectType>`
  width: 100%;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQueries.lg} {
    width: ${({ landing }): string => (landing === 1 ? '500px' : '350px')};
  }
  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    :hover {
      border: ${({ theme }): string => theme.borders[0]} !important;
    }
  }
`;

export const SContainer = styled.div<SelectType>`
  width: ${({ landing }): string => (landing === 1 ? '250px' : '100vw')};
  overflow: hidden;
  border-radius: 8px;
  border: ${({ landing }): string => landing === 0 && '1px solid #dee2e6'};
  transition: all 0.3s;

  ${({ theme }): string => theme.mediaQueries.sm} {
    width: ${({ landing }): string => (landing === 1 ? '500px' : '350px')};
  }
  ${({ theme }): string => theme.mediaQueries.lg} {
    width: ${({ focus, landing }): string =>
      landing ? '500px' : focus === 1 ? '350px' : '40px'};
    border-radius: ${({ focus, landing }): string =>
      focus === 1 || landing === 1 ? '8px' : '50%'};
  }
`;
