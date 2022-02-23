import styled from '@emotion/styled';

export const SRight = styled.div<{ disable?: boolean }>`
  display: block;
  width: 30px;
  height: 30px;
  cursor: ${({ disable }): string => (disable ? 'default' : 'pointer')};

  :before {
    content: '';
    position: absolute;
    margin-top: -4px;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 2px;
    background-color: ${({ disable }): string => (disable ? '#d1d1d1' : '#171717')};
    border-radius: 1px;
    margin-left: -4px;
    transform: rotate(45deg);
    transform-origin: 50% 50%;
    transition: margin-left 0.5s ease-out, transform 0.5s ease-out;
  }

  :after {
    content: '';
    position: absolute;
    margin-top: 2px;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 2px;
    background-color: ${({ disable }): string => (disable ? '#d1d1d1' : '#171717')};
    border-radius: 1px;
    margin-left: -4px;
    transform-origin: 50% 50%;
    transform: rotate(-45deg);
    transition: margin-left 0.5s ease-out, transform 0.5s ease-out;
  }

  :hover:before {
    margin-left: ${({ disable }): string => !disable && '0px'};
    transform: ${({ disable }): string => !disable && 'rotate(-135deg)'};
  }

  :hover:after {
    margin-left: ${({ disable }): string => !disable && '0px'};
    transform: ${({ disable }): string => !disable && 'rotate(135deg)'};
  }
`;

export const SLeft = styled.div<{ disable?: boolean }>`
  display: block;
  width: 30px;
  height: 30px;
  cursor: ${({ disable }): string => (disable ? 'default' : 'pointer')};

  :before {
    content: '';
    position: absolute;
    margin-top: -4px;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 2px;
    background-color: ${({ disable }): string => (disable ? '#d1d1d1' : '#171717')};
    border-radius: 1px;
    margin-left: -4px;
    transform: rotate(-45deg);
    transform-origin: 50% 50%;
    transition: margin-left 0.5s ease-out, transform 0.5s ease-out;
  }

  :after {
    content: '';
    position: absolute;
    margin-top: 2px;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 2px;
    background-color: ${({ disable }): string => (disable ? '#d1d1d1' : '#171717')};
    border-radius: 1px;
    margin-left: -4px;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    transition: margin-left 0.5s ease-out, transform 0.5s ease-out;
  }

  :hover:before {
    margin-left: ${({ disable }): string => !disable && '0px'};
    transform: ${({ disable }): string => !disable && 'rotate(135deg)'};
  }

  :hover:after {
    margin-left: ${({ disable }): string => !disable && '0px'};
    transform: ${({ disable }): string => !disable && 'rotate(-135deg)'};
  }
`;

export const SMenuItems = styled.div`
  position: relative;
  padding: 10px;
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;

  i {
    display: block;
    position: absolute;
    background-color: #000;
    width: 6px;
    transition-property: height, transform;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.3, 1);
  }
  i.c1.b1 {
    height: 7px;
    transform: translate(0, 0);
  }
  i.c1 {
    left: 0px;
  }
  i.c2.b1 {
    height: 10px;
    transform: translate(0, 0);
  }
  i.c2 {
    left: 7px;
  }
  i.c3.b1 {
    height: 5px;
    transform: translate(0, 0);
  }
  i.c3 {
    left: 14px;
  }

  i.c1.b2 {
    height: 7px;
    transform: translate(0, 8px);
  }
  i.c1 {
    left: 0px;
  }
  i.c2.b2 {
    height: 7px;
    transform: translate(0, 11px);
  }
  i.c2 {
    left: 7px;
  }
  i.c3.b2 {
    height: 7px;
    transform: translate(0, 6px);
  }
  i.c3 {
    left: 14px;
  }

  i.c1.b3 {
    height: 7px;
    transform: translate(0, 40px);
  }
  i.c1 {
    left: 0px;
  }
  i.c2.b3 {
    height: 7px;
    transform: translate(0, 35px);
  }
  i.c2 {
    left: 7px;
  }
  i.c3.b3 {
    height: 7px;
    transform: translate(0, 33px);
  }
  i.c3 {
    left: 14px;
  }

  :hover {
    i.c1.b1 {
      transform: translate(0, -8px);
    }
    i.c2.b1 {
      transform: translate(0, -11px);
    }
    i.c3.b1 {
      transform: translate(0, -6px);
    }
    i.c1.b2 {
      transform: translate(0, 0px);
    }
    i.c2.b2 {
      transform: translate(0, 0px);
    }
    i.c3.b2 {
      transform: translate(0, 0px);
    }
    i.c1.b3 {
      transform: translate(0, 8px);
    }
    i.c2.b3 {
      transform: translate(0, 9px);
    }
    i.c3.b3 {
      transform: translate(0, 6px);
    }
  }
`;
