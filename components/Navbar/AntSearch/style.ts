import styled from '@emotion/styled';
import { Select } from 'antd';

type SelectType = { focus: number; isdown: number; landing: boolean };
export const SSelect = styled(Select)<SelectType>`
  width: ${({ landing }): string => (landing ? '250px' : '100vw')};
  position: ${({ landing }): string => (landing ? 'unset' : 'fixed')};
  margin-top: ${({ landing }): string => landing && '10px'};
  right: 0;
  top: 69px;
  font-size: 20px;
  transition: all 0.3s;

  transform: ${({ isdown }): string => (isdown ? 'translateY(-100%)' : 'translateY(0)')};
  ${({ theme }): string => theme.mediaQueries.sm} {
    .ant-select-selector {
      border-radius: ${({ focus }): string => (focus ? '8px' : '20px ')} !important;
      height: ${({ landing }): string => landing && '50px'} !important;
      input {
        height: ${({ landing }): string => landing && '50px'} !important;
      }
      padding-top: ${({ landing }): string => landing && '5px'} !important;
    }
    transform: translateY(0);
    margin: ${({ landing }): string => (landing ? '12px 0' : '4px 12px')};
    position: unset;
    width: ${({ focus, landing }): string =>
      landing ? '550px' : focus ? '400px' : '40px'};
    display: block;
  }
`;
