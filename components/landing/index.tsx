import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './heroSection';
import Slider from './slider';
import Terms from './terms';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeAction } from 'store/course/course.action';

const Info = dynamic(() => import('./Info'));
const Webinars = dynamic(() => import('./webinars'));
const Teachers = dynamic(() => import('./teachers'));
const Footer = dynamic(() => import('components/Footer'));

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.course.home);

  useEffect(() => {
    !home && dispatch(getHomeAction());
  }, [home]);

  return (
    <div className="bg-gray-11 relative flex-col min-h-full center">
      <HeroSection />
      <Slider courses={home?.recent_workshops} title="newCourses" />
      <Info />
      <Slider courses={home?.favorite_workshops} title="popularCourses" />
      <Terms />
      <Webinars />
      <Teachers />
      {/* <AskUs /> */}
      <Footer />
    </div>
  );
};

export default Landing;
