import styled from '@emotion/styled';
import AntButton from 'components/Common/AntButton';

export const SButton = styled(AntButton)`
  width: 240px;
  height: 40px;
  margin: 25px 0;
  border-radius: 8px;
  font-size: 18px;
  background-color: ${({ theme }): string => theme.colors.blue[2]};
  color: ${({ theme }): string => theme.colors.white};
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;
export const SComment = styled(AntButton)`
  width: 240px;
  height: 35px;
  border-radius: 8px;
  font-size: 18px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;
