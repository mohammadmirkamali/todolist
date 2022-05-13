import { useEffect, useState } from 'react';

type StopWatchType = (length: number, start: boolean) => number;
const useStopWatch: StopWatchType = (length, start) => {
  const [time, setTime] = useState(length);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  return time;
};

export default useStopWatch;
