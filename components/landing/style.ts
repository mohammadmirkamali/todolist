import styled from '@emotion/styled';

export const StyledLanding = styled.div`
  color: ${({ theme }): string => theme.colors.gray[0]};
  background-color: ${({ theme }): string => theme.colors.gray[0]};
  font-size: 20px;
  padding-top: 70px;
  width: 100%;
  height: 200vh;
`;
