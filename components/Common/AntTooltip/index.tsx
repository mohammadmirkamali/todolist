import { Tooltip } from 'antd';
import React from 'react';

const AntTooltip: React.FC<{ name: string; length?: number }> = ({ name, length }) => {
  const showName = name.length < length + 2 ? name : `...${name.slice(0, length)}`;
  return (
    <Tooltip title={name}>
      <span>{showName}</span>
    </Tooltip>
  );
};

export default AntTooltip;
