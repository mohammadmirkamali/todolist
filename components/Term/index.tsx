import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Information from './information';
import Schedule from './schedule';
import TermInfo from './termInfo';

const Term: React.FC = () => {
  const data = useSelector((state) => state.course.term);
  const searchData = useSelector((state) => state.course.searchData);

  const [hourPerWeek, setHourPerWeek] = useState(null);
  const [days, setDays] = useState(null);

  useEffect(() => {
    data && setDays(data.available_days);
    data && setHourPerWeek(data.week_hours);
  }, [data]);

  return (
    <div className="duration-300 bg-gray-0 min-h-[calc(100vh-70px)] flex-col flex items-center justify-items-start">
      <Information
        data={data}
        setHourPerWeek={setHourPerWeek}
        hourPerWeek={hourPerWeek}
        setDays={setDays}
        days={days}
      />

      {data && searchData ? (
        data.registered ? (
          <Schedule data={data} days={days} hourPerWeek={hourPerWeek} />
        ) : (
          <TermInfo />
        )
      ) : (
        <Skeleton active className="p-[50px] pr-[400px]" />
      )}
    </div>
  );
};

export default Term;
