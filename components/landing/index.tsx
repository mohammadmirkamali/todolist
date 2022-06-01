import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './heroSection';
import Slider from './slider';
import { CoursesType } from 'types/course.type';

const Info = dynamic(() => import('./Info'));
const Webinars = dynamic(() => import('./webinars'));
const Teachers = dynamic(() => import('./teachers'));
const Footer = dynamic(() => import('components/Footer'));
const AskUs = dynamic(() => import('./askUs'));

const Landing: React.FC<{ courses: CoursesType[] }> = ({ courses }) => {
  const time = (date): number => new Date(date).getTime();
  const mostPopular = [...courses].sort((a, b) => b.price - a.price);
  const newest = [...courses].sort((a, b) => time(b.created_at) - time(a.created_at));

  return (
    <div className="bg-gray-11 relative flex-col min-h-full center">
      <HeroSection />
      <Slider courses={newest} title="newCourses" />
      <Info />
      <Slider courses={mostPopular} title="popularCourses" />
      <Webinars />
      <Teachers courses={courses} />
      <AskUs />
      <Footer />
    </div>
  );
};

export default Landing;
