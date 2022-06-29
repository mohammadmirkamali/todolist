import styled from '@emotion/styled';
import { Card } from 'antd';

export const SCard = styled(Card)<{ index?: number }>`
  overflow-x: auto;
  margin-bottom: 40px;
  border-radius: 12px;
  .ant-card-head {
    font-weight: bold;
  }
  .ant-card-body {
    padding: 0;
  }
`;

export const SCardItem = styled(Card.Grid)<{ index?: number }>`
  width: ${({ index }): string => (index === 0 || index === 1 ? '120px' : '250px')};
  cursor: ${({ index }): string => !(index === 0 || index === 1) && 'pointer'};
  height: 80px;
  display: flex;
  position: relative;
  justify-content: ${({ index }): string =>
    !(index === 0 || index === 1) ? 'start' : 'center'};
  align-items: center;
  padding: 16px;
  padding-right: ${({ index }): string =>
    !(index === 0 || index === 1) ? '30px' : '16px'};
  color: initial;
`;
