/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SLeft, SMenuItems, SRight } from './style';

export const RightArrow: React.FC<any> = ({ ...rest }) => <SRight {...rest} />;
export const LeftArrow: React.FC<any> = ({ ...rest }) => <SLeft {...rest} />;
export const MenuItems: React.FC<any> = ({ ...rest }) => (
  <SMenuItems {...rest}>
    <div className="w-[20px] h-[20px] relative overflow-hidden">
      <i className="b1 c1" />
      <i className="b1 c2" />
      <i className="b1 c3" />
      <i className="b2 c1" />
      <i className="b2 c2" />
      <i className="b2 c3" />
      <i className="b3 c1" />
      <i className="b3 c2" />
      <i className="b3 c3" />
    </div>
  </SMenuItems>
);
