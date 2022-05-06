import { t } from 'i18next';
import React from 'react';
import AntSearch from 'components/Navbar/AntSearch';
import { CoursesType } from 'types/course.type';
import { generateOptions } from 'utils/common.util';

const HeroSection: React.FC<{ courses: CoursesType[] }> = ({ courses }) => (
  <div className="w-screen md:w-[650px] h-[230px] flex flex-col items-center xl:text-right xl:items-start text-center xl:pr-[40px] xl:w-[1260px] xl:h-[270px] bg-blue-8 bg-cover md:rounded-[8px] mt-[40px] text-[20px] xl:bg-[url('/search-image.webp')] ">
    <h1 className="text-white font-bold text-[24px] md:text-[30px]  xl:text-[40px]  mt-[30px]">
      {t('landing.title')}
    </h1>
    <h2 className="text-white w-[240px] md:w-[400px] xl:w-[600px] text-[14px] xl:text-[20px]">
      {t('landing.subTitle')}
    </h2>
    <div className="mt-[-20px] md:mt-[10px]">
      <AntSearch options={generateOptions(courses)} landing />
    </div>
  </div>
);

export default HeroSection;
