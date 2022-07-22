import styled from '@emotion/styled';
import { Button } from 'antd';

export const StyledSubmitButton = styled(Button)`
  border-radius: 6px;
  font-size: 1.6rem;
  height: 40px;
  margin-top: 16px;
  background: ${({ theme }): string => theme.colors.other1};
`;
