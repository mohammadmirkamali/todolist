import styled from '@emotion/styled';
import { StyledP } from 'components/Common/commonStyle';

export const StyledTaskCard = styled.div<{ isDoneList?: boolean }>`
  border-radius: 6px;
  border: ${({ theme }): string => theme.borders[0]};
  width: 100%;
  height: 70px;
  padding: 8px 16px;
  direction: initial;
  display: flex;
  margin: 12px 0;
  cursor: ${({ isDoneList }): string => !isDoneList && 'pointer'};
  background: #fff;
  transition: all 0.3s;
  :hover {
    box-shadow: ${({ theme, isDoneList }): string => !isDoneList && theme.shadows.card};
  }
`;

export const StyledText = styled(StyledP)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 460px;
  margin: 0;
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
