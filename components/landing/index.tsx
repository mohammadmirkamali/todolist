import React from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import HeroSection from './heroSection';
import Slider from './slider';

const Info = dynamic(() => import('./Info'));
const Teachers = dynamic(() => import('./teachers'));
const Footer = dynamic(() => import('components/Footer'));
const AskUs = dynamic(() => import('./askUs'));

const Landing = (): JSX.Element => {
  const { courses } = useSelector((state) => state.course);
  const profile = false; // to do ...

  if (!courses) {
    return <Skeleton active paragraph={{ rows: 4 }} className="p-[80px]" />;
  }

  const time = (date): number => new Date(date).getTime();
  const mostPopular = [...courses].sort((a, b) => b.count_students - a.count_students);
  const newest = [...courses].sort((a, b) => time(b.created_at) - time(a.created_at));

  // console.log(courses.map((k) => k.teacher_name.replaceAll(' ', '-')));
  return (
    <div className="pt-[70px] bg-gray-0 relative flex-col min-h-full center">
      <HeroSection courses={courses} />
      {profile && <Slider courses={courses} title="myCourses" />}
      <Slider courses={newest} title="newCourses" />
      <Slider courses={mostPopular} title="popularCourses" />
      <Info />
      <Teachers courses={courses} />
      <AskUs />
      <Footer />
    </div>
  );
};

export default Landing;
