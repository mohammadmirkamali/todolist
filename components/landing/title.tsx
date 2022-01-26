import { t } from 'i18next';
import React from 'react';

type TitleType = { title: string; subTitle: string };
const Title: React.FC<TitleType> = ({ title, subTitle }) => (
  <div className="center flex-col my-8">
    <div className="font-bold text-blue-3 text-[20px] md:text-[30px] flex items-center">
      <div className="w-[7rem] md:w-[10rem] h-[5px] bg-blue-3 mx-6 rounded-[4px]" />
      {t(title)}
      <div className="w-[7rem] md:w-[10rem] h-[5px] bg-blue-3 mx-6 rounded-[4px]" />
    </div>
    <div className="text-[13px] md:text-[16px] mt-2 text-gray-9">{t(subTitle)}</div>
  </div>
);

export default Title;
