import React from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import HeroSection from './heroSection';
import Slider from './slider';

const Landing = (): JSX.Element => {
  const { courses } = useSelector((state) => state.account);

  if (!courses) {
    return <Skeleton active paragraph={{ rows: 7 }} className="p-[80px]" />;
  }

  const time = (date) => new Date(date).getTime();
  const mostPopular = [...courses].sort((a, b) => b.count_students - a.count_students);
  const newest = [...courses].sort((a, b) => time(b.created_at) - time(a.created_at));

  return (
    <div className="pt-[70px] bg-gray-0 relative flex flex-col min-h-full">
      <HeroSection />
      <Slider courses={courses} title="myCourses" />
      <Slider courses={newest} title="newCourses" />
      <Slider courses={mostPopular} title="popularCourses" />
    </div>
  );
};

export default Landing;
