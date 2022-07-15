import { t } from 'i18next';
import React from 'react';
import { TopRateType } from 'types/course.type';
import { faNumber } from 'utils/common.util';

const RateStudents: React.FC<{ data: TopRateType[]; top?: boolean }> = ({
  data,
  top,
}) => (
  <div className="py-[7px] flex text-[16px] flex-col pr-[15px] overflow-hidden w-full">
    <p className="m-0 mb-[8px]">{t(`course.${top ? 'rateStudents' : 'yourRate'}`)}</p>
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div key={item.id} className=" flex text-[14px] toLeft text-center">
          {top ? faNumber(index + 1) : '...'}. {item.nickname}{' '}
          <span className="mr-[4px]"> ({faNumber(item.total_rate)})</span>
        </div>
      ))}
    </div>
  </div>
);

export default RateStudents;
