import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './heroSection';
import Slider from './slider';
import Terms from './terms';
import { useSelector } from 'react-redux';

const Info = dynamic(() => import('./Info'));
const Webinars = dynamic(() => import('./webinars'));
const Teachers = dynamic(() => import('./teachers'));
const Footer = dynamic(() => import('components/Footer'));

const Landing: React.FC = () => {
  const courses = useSelector((state) => state.course.searchData?.workshops) || [];
  const time = (date): number => new Date(date).getTime();
  const mostPopular = [...courses]?.sort((a, b) => b.price - a.price);
  const newest = [...courses]?.sort((a, b) => time(b.created_at) - time(a.created_at));

  return (
    <div className="bg-gray-11 relative flex-col min-h-full center">
      <HeroSection />
      <Terms />
      <Slider courses={newest} title="newCourses" />
      <Info />
      <Slider courses={mostPopular} title="popularCourses" />
      <Webinars />
      <Teachers />
      {/* <AskUs /> */}
      <Footer />
    </div>
  );
};

export default Landing;
