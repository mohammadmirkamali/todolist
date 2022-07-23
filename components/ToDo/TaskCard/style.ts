import styled from '@emotion/styled';

export const StyledTaskCard = styled.div`
  border-radius: 6px;
  border: ${({ theme }): string => theme.borders[0]};
  width: 100%;
  height: 70px;
  padding: 8px 16px;
  direction: initial;
  display: flex;
  margin: 12px 0;
`;

export const StyledPriorityBadge = styled.div<{ priority: string }>`
  border-radius: 50%;
  border: ${({ theme }): string => theme.borders[0]};
  width: 20px;
  height: 20px;
  margin-left: 4px;
  background: ${({ theme, priority }): string =>
    priority === 'Low'
      ? theme.colors.grass30
      : priority === 'HIGH'
      ? theme.colors.rose80
      : theme.colors.sun50};
`;
