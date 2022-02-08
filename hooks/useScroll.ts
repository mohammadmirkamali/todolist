import { useState, useEffect } from 'react';

// https://javascript.plainenglish.io/custom-scrolling-direction-react-hook-f55558206ab6
export const useScroll = (): string => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);
  const toggleScrollDirection = (): void => {
    const { scrollY } = window;
    if (scrollY === 0) {
      setScrollDirection(null);
    }
    if (scrollY > prevOffset) {
      setScrollDirection('down');
    } else if (scrollY < prevOffset) {
      setScrollDirection('up');
    }
    setPrevOffset(scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleScrollDirection);
    return (): void => {
      window.removeEventListener('scroll', toggleScrollDirection);
    };
  });

  return scrollDirection;
};
