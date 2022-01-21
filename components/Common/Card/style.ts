import styled from '@emotion/styled';
import { Badge } from 'antd';

export const SBadge = styled(Badge.Ribbon)`
  z-index: 1;
`;

export const SContainer = styled.div`
  .img {
    transition: transform 0.3s ease-out;
    transform: translateY(-10px);
  }
  .register {
    transition: all 0.3s ease-out;
    transform: translateY(-10px);
    opacity: 0;
  }

  .enter {
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }
  :hover {
    .img {
      transform: translateY(0px);
    }
    .register {
      transform: translateY(0);
      opacity: 1;
    }
    .enter {
      opacity: 1;
    }
  }
`;
