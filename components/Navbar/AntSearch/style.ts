import styled from '@emotion/styled';
import { Select } from 'antd';

type SelectType = { focus: number; landing: number };
export const SSelect = styled(Select)<SelectType>`
  width: ${({ landing }): string => (landing === 1 ? '250px' : '100vw')};
  position: ${({ landing }): string => (landing === 1 ? 'unset' : 'fixed')};
  margin-top: ${({ landing }): string => landing === 1 && '10px'};
  right: 0;
  top: 69px;
  font-size: 20px;
  transition: all 0.3s;

  .ant-select-selector {
    border-color: ${({ focus, theme }): string =>
      focus && theme.colors.gray[12]} !important;
    box-shadow: none !important;
    :hover {
      border: ${({ theme }): string => theme.borders[0]} !important;
    }
  }

  ${({ theme }): string => theme.mediaQueries.sm} {
    .ant-select-selector {
      border-radius: ${({ focus }): string => (focus ? '8px' : '20px ')} !important;
      height: ${({ landing }): string => landing === 1 && '50px'} !important;
      padding-top: ${({ landing }): string => landing === 1 && '5px'} !important;

      input {
        height: ${({ landing }): string => landing === 1 && '50px'} !important;
      }
    }

    transform: translateY(0);
    margin: ${({ landing }): string => (landing === 1 ? '12px 0' : '4px 12px')};
    position: unset;
    width: ${({ focus, landing }): string =>
      landing === 1 ? '550px' : focus ? '400px' : '40px'};
    display: block;
  }
`;
