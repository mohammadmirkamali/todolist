import { t } from 'i18next';
import React from 'react';
import { faNumber } from 'utils/common.util';

type ItemsType = { count: number; text: string };
const Items: React.FC<ItemsType> = ({ count, text }) => {
  return (
    <div className="center flex-col w-[250px] my-[30px]">
      <div className="font-bold text-[40px] xl:text-[48px] mt-[10px] center">
        {faNumber(count.toLocaleString())}+
      </div>
      <div className="text-[16px] xl:text-[18px] center text-gray-8">
        {t(`landing.${text}`)}
      </div>
    </div>
  );
};

const Info: React.FC = () => (
  <div className="center mt-[20px] mb-[60px]">
    <div className="w-[280px] flex-col md:flex-row relative md:w-[90vw] justify-around max-w-[1200px] rounded-[8px] center">
      <Items count={14000} text="infoStudent" />
      <Items count={100} text="infoCourses" />
      <Items count={126000} text="infoTime" />
    </div>
  </div>
);

export default Info;
