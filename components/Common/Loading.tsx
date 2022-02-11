import { Skeleton } from 'antd';
import React from 'react';

const Loading: React.FC<{ number?: number }> = ({ number = 1 }) => {
  const array = Array.from(Array(number), (_, i) => i + 1);
  return (
    <div className="m-[15px]">
      {array.map((k) => (
        <Skeleton active key={k} />
      ))}
    </div>
  );
};

export default Loading;
