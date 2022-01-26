import React from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import HeroSection from './heroSection';
import Slider from './slider';
import Info from './Info';
import Teachers from './teachers';

const Landing = (): JSX.Element => {
  const { courses } = useSelector((state) => state.account);

  if (!courses) {
    return <Skeleton active paragraph={{ rows: 7 }} className="p-[80px]" />;
  }

  const time = (date): number => new Date(date).getTime();
  const mostPopular = [...courses].sort((a, b) => b.count_students - a.count_students);
  const newest = [...courses].sort((a, b) => time(b.created_at) - time(a.created_at));

  return (
    <div className="pt-[70px] bg-blue-7 relative flex-col min-h-full center">
      <HeroSection courses={courses} />
      <Slider courses={courses} title="myCourses" />
      <Slider courses={newest} title="newCourses" />
      <Slider courses={mostPopular} title="popularCourses" />
      <Info />
      <Teachers courses={courses} />
    </div>
  );
};

export default Landing;
