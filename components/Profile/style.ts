import styled from '@emotion/styled';
import { Select } from 'antd';
import { SubmitForm } from 'components/Common/formField';

export const SSubmitForm = styled(SubmitForm)`
  border-radius: 8px;
  height: 40px;
  font-size: 18px;
  margin: 30px 0;
  width: 400px;
`;

export const SSelect = styled(Select)`
  width: 130px;
  margin: 0 25px 20px 0px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    margin: 0 45px 20px 0px;
  }
  ${({ theme }): string => theme.mediaQueries.lg} {
    margin: 0 10px 20px 0px;
  }
  .ant-select-selector {
    border-radius: 6px !important;
  }
`;
