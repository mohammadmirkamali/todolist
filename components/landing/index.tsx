import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './heroSection';
import Slider from './slider';
import { CourseType } from 'types/course.type';
import request from 'services/request';
import { WebinarUrl } from 'services/routes';

const Info = dynamic(() => import('./Info'));
const Teachers = dynamic(() => import('./teachers'));
const Footer = dynamic(() => import('components/Footer'));
const AskUs = dynamic(() => import('./askUs'));

const Landing: React.FC<{ courses: CourseType[] }> = ({ courses }) => {
  const profile = false; // to do ...

  const time = (date): number => new Date(date).getTime();
  const mostPopular = [...courses].sort((a, b) => b.count_students - a.count_students);
  const newest = [...courses].sort((a, b) => time(b.created_at) - time(a.created_at));

  // console.log(courses.map((k) => k.teacher_name.replaceAll(' ', '-')));
  return (
    <div className="pt-[70px] bg-gray-11 relative flex-col min-h-full center">
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
