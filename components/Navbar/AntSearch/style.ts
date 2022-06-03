import styled from '@emotion/styled';
import { Select } from 'antd';

type SelectType = { focus?: number; landing: number; user?: number };
export const SSelect = styled(Select)<SelectType>`
  width: 100%;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQueries.lg} {
    width: 500px;
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
  margin-right: ${({ landing, user }): string =>
    landing === 0 && (user === 0 ? '-205px' : '-140px')} ;
  margin-left: ${({ landing }): string => landing === 0 && '-40px'} ;
  overflow: hidden;
  border: ${({ landing, focus }): string =>
    focus ? '1px solid #000' : landing === 0 && '1px solid #dee2e6'};
  transition: all 0.3s;

  ${({ theme }): string => theme.mediaQueries.sm} {
    width: ${({ landing }): string => (landing === 1 ? '500px' : '400px')};
    margin-right: 0;
    border-radius: 8px;
    margin-left: 0;
  }
  ${({ theme }): string => theme.mediaQueries.lg} {
    width: ${({ landing }): string => (landing ? '500px' : '500px')};

`;
// border-radius: ${({ focus, landing }): string =>
// focus === 1 || landing === 1 ? '8px' : '50%'};
// }
